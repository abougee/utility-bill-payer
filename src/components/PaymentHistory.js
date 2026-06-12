import React, { useState, useEffect } from "react";
import { api } from "../services/api";

function PaymentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.getPaymentHistory();
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading)
    return <div style={styles.loading}>Loading payment history...</div>;

  return (
    <div style={styles.container}>
      <h2>Payment History</h2>
      {history.length === 0 ? (
        <div style={styles.noHistory}>No payment history yet.</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Provider</th>
              <th>Account Number</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.type}</td>
                <td>{bill.provider}</td>
                <td>{bill.accountNumber}</td>
                <td>${bill.amount.toFixed(2)}</td>
                <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                <td style={{ color: "#28a745" }}>✓ Paid</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1.5rem",
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
  },
  noHistory: {
    textAlign: "center",
    padding: "2rem",
    fontSize: "1.2rem",
    color: "#666",
  },
};

export default PaymentHistory;
