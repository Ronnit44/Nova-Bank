// src/pages/api/accounts/getBalance.js
import dbConnect from "../../../../utils/dbConnect";
import Account from "../../../../models/Account"; // adjust path as needed

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { userId } = req.body;
    // Find the account for the user. This is an example; adjust as needed.
    const account = await Account.findOne({ userId });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json({ balance: account.balance, transactions: account.transactions });
  } catch (error) {
    console.error("Error in getBalance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
