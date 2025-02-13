const express = require("express");
import { walletService } from "./logic/services/walletService";

const app = express();

app.express.use(express.json());
const _walletService = new walletService();

app.post("/wallets", async (req: any, res: any) => {
  const { wallet, hash } = req.body;
  await _walletService.addWallet(wallet, hash);
  res.status(200).send();
});
