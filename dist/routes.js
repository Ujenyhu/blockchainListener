"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WalletService_1 = require("./logic/services/WalletService");
const walletController_1 = require("./controllers/walletController");
const router = (0, express_1.default)();
const walletService = new WalletService_1.WalletService();
const _walletController = new walletController_1.walletController(walletService);
//Wallet routes
// router.post(
//   "/wallet",
//   validateAddressMiddleware(walletService),
//   _walletController.addWallet
// );
exports.default = router;
