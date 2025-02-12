import { useState, useEffect } from "react";
import axios from "axios";

const BankDashboard = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.post('/api/accounts/getBalance', { userId })
      .then(res => {
        setBalance(res.data.balance);
        setTransactions(res.data.transactions);
      })
      .catch(err => console.error(err));
  }, [userId]);

  const handleTransaction = async (action, amount, recipientId = null) => {
    try {
      const response = await axios.post('/api/transactions', { userId, action, amount, recipientId });
      alert(response.data.message);
      setBalance(response.data.balance);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Welcome to Nova Bank</h2>
      <h3>Balance: ${balance}</h3>

      <button onClick={() => handleTransaction("deposit", 500)}>Deposit $500</button>
      <button onClick={() => handleTransaction("withdraw", 200)}>Withdraw $200</button>
      <button onClick={() => handleTransaction("transfer", 300, "anotherUserId")}>Transfer $300</button>

      <h3>Transaction History:</h3>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>{tx.type}: ${tx.amount} - {new Date(tx.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default BankDashboard;
