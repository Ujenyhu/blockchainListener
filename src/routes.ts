import Router from "express";
import { WalletService } from "./logic/services/WalletService";
import { WalletController } from "./controllers/walletController";
import { validateAddressMiddleware } from "./Middlewares/validateAddressMiddleware";

const router = Router();
export const walletService = new WalletService();
const _walletController = new WalletController(walletService);

//Wallet routes
router.post(
  "/wallet",
  validateAddressMiddleware(walletService),
  _walletController.addWallet.bind(_walletController)
);

router.delete(
  "/wallet",
  validateAddressMiddleware(walletService),
  _walletController.removeWallet.bind(_walletController)
);

export default router;
