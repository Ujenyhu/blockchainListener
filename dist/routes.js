"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const WalletService_1 = require("./logic/services/WalletService");
const walletController_1 = require("./controllers/walletController");
const validateAddressMiddleware_1 = require("./Middlewares/validateAddressMiddleware");
exports.router = (0, express_1.default)();
const walletService = new WalletService_1.WalletService();
const _walletController = new walletController_1.walletController(walletService);
//Wallet routes
exports.router.post("/wallet", (0, validateAddressMiddleware_1.validateAddressMiddleware)(walletService), _walletController.addWallet);
//# sourceMappingURL=routes.js.map