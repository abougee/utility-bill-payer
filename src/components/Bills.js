import React, { useState, useEffect } from "react";
import { api } from "../services/api";

function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(null);
  const [message, setMessage] = useState("");
  const [paystatus, setPayStatus] = useState(false);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await api.getBills();
      setBills(response.data);
    } catch (error) {
      setMessage("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  const handlePayBill = async (billId) => {
    setPaying(billId);
    try {
      await api.payBill(billId);
      setMessage("Payment successful!");
      fetchBills();
      setPayStatus(true);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Payment failed. Please try again.");
      setPayStatus(false);
    } finally {
      setPaying(null);
    }
  };

  const getBillTypeColor = (type) => {
    const colors = {
      electricity: "#ffc107",
      water: "#17a2b8",
      gas: "#fd7e14",
      internet: "#28a745",
    };
    return colors[type] || "#6c757d";
  };

  if (loading) return <div style={styles.loading}>Loading bills...</div>;

  return (
    <div style={styles.container}>
      <h2>Your Pending Bills</h2>
      {message && <div style={paystatus ? styles.message_success : styles.message_error}>{message}</div>}
      {bills.length === 0 ? (
        <div style={styles.noBills}>No pending bills. Great job!</div>
      ) : (
        <div style={styles.billsGrid}>
          {bills.map((bill) => (
            <div key={bill.Billerid} style={styles.billCard}>
              <div
                style={{
                  ...styles.billType,
                  backgroundColor: getBillTypeColor(bill.type),
                }}
              >
                {bill.type.toUpperCase()}
              </div>
              <div style={styles.billContent}>
                <h3>{bill.provider}</h3>
                <p>Account: {bill.accountNumber}</p>
                <p>Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                <div style={styles.amount}>${bill.amount.toFixed(2)}</div>
                <button
                  onClick={() => handlePayBill(bill.Billerid)}
                  disabled={paying === bill.Billerid}
                  style={styles.payButton}
                >
                  {paying === bill.Billerid ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  billsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  },
  billCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  billType: {
    padding: "0.5rem",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  billContent: {
    padding: "1rem",
  },
  amount: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#28a745",
    margin: "1rem 0",
  },
  payButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
    fontSize: "1.2rem",
  },
  noBills: {
    textAlign: "center",
    padding: "2rem",
    fontSize: "1.2rem",
    color: "#666",
  },
  message_success: {
    padding: "1rem",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
  message_error: {
    padding: "1rem",
    backgroundColor: "#edd4d4",
    color: "#571515",
    borderRadius: "4px",
    marginBottom: "1rem",
  },
};

export default Bills;
