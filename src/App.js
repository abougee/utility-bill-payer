import React, { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Bills from "./components/Bills";
import PaymentHistory from "./components/PaymentHistory";
import Navbar from "./components/Navbar";
import { api } from "./services/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const pathnames = {
  login: "/login",
  dashboard: "/dashboard",
  bills: "/bills",
  history: "/payment-history",
  root: "/"
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (username, password) => {
    try {
      const response = await api.login(username, password);
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        setToken(response.data.access_token);
        setUser(response.data.usersession);
        return { success: true };
      }
      return { success: false, error: "Login failed" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <Router>
        <div className="App">
          {user && <Navbar />}
          <Routes>
            <Route
              path={pathnames.login}
              element={!user ? <Login /> : <Navigate to={pathnames.dashboard} />}
            />
            <Route
              path={pathnames.dashboard}
              element={user ? <Dashboard /> : <Navigate to={pathnames.login} />}
            />
            <Route
              path={pathnames.bills}
              element={user ? <Bills /> : <Navigate to={pathnames.login} />}
            />
            <Route
              path={pathnames.history}
              element={user ? <PaymentHistory /> : <Navigate to={pathnames.login} />}
            />
            <Route
              path={pathnames.root}
              element={<Navigate to={user ? pathnames.dashboard : pathnames.login } />}
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
