import Router from "express";
import { WalletService } from "./logic/services/WalletService";
import { walletController } from "./controllers/walletController";
import { validateAddressMiddleware } from "./Middlewares/validateAddressMiddleware";

export const router = Router();
const walletService = new WalletService();
const _walletController = new walletController(walletService);

//Wallet routes
router.post(
  "/wallet",
  validateAddressMiddleware(walletService),
  _walletController.addWallet
);
