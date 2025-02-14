const { Router } = require("express");
const IWalletService = require("./logic/interfaces/IWalletService");
const walletController = require("./controllers/walletController");
const validateAddressMiddleware = require("./Middlewares/validateAddressMiddleware");

const routers = new Router();
const walletService = new IWalletService();
const controller = new walletController(walletService);

//Wallet routes
routers.post(
  "/wallet",
  validateAddressMiddleware(walletService),
  controller.addWallet
);

export default routers;
