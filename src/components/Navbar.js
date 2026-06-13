import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import {pathnames} from "../App";

function Navbar() {
  const { user, logout } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    logout();
    navigateTo(pathnames.login);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.logo}>BillPay</div>
        <div style={styles.navLinks}>
          <Link to={pathnames.dashboard} style={styles.link}>
            Dashboard
          </Link>
          <Link to={pathnames.bills} style={styles.link}>
            Bills
          </Link>
          <Link to={pathnames.history} style={styles.link}>
            History
          </Link>
        </div>
        <div style={styles.userInfo}>
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#007bff",
    padding: "1rem 0",
    color: "white",
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  logoutBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
