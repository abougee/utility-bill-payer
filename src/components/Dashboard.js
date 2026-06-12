import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "../App";

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, count: 0, historyCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [billsRes, historyRes] = await Promise.all([
          api.getBills(),
          api.getPaymentHistory(),
        ]);
        const totalAmount = billsRes.data.reduce(
          (sum, bill) => sum + bill.amount,
          0,
        );
        setStats({
          total: totalAmount,
          count: billsRes.data.length,
          historyCount: historyRes.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Welcome back, {user?.name}!</h2>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>Pending Bills</h3>
          <div style={styles.statNumber}>{stats.count}</div>
        </div>
        <div style={styles.statCard}>
          <h3>Total Due</h3>
          <div style={styles.statNumber}>${stats.total.toFixed(2)}</div>
        </div>
        <div style={styles.statCard}>
          <h3>Payments Made</h3>
          <div style={styles.statNumber}>{stats.historyCount}</div>
        </div>
      </div>
      <div style={styles.quickActions}>
        <h3>Quick Actions</h3>
        <button
          onClick={() => (window.location.href = "/bills")}
          style={styles.actionButton}
        >
          View & Pay Bills
        </button>
        <button
          onClick={() => (window.location.href = "/history")}
          style={styles.actionButton}
        >
          Payment History
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    margin: "2rem 0",
  },
  statCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#007bff",
    marginTop: "0.5rem",
  },
  quickActions: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginTop: "1rem",
  },
  actionButton: {
    margin: "0.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default Dashboard;
