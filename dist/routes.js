"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletService = void 0;
const express_1 = __importDefault(require("express"));
const WalletService_1 = require("./logic/services/WalletService");
const walletController_1 = require("./controllers/walletController");
const validateAddressMiddleware_1 = require("./Middlewares/validateAddressMiddleware");
const router = (0, express_1.default)();
exports.walletService = new WalletService_1.WalletService();
const _walletController = new walletController_1.WalletController(exports.walletService);
//Wallet routes
router.post("/wallet", (0, validateAddressMiddleware_1.validateAddressMiddleware)(exports.walletService), _walletController.addWallet.bind(_walletController));
router.delete("/wallet", (0, validateAddressMiddleware_1.validateAddressMiddleware)(exports.walletService), _walletController.removeWallet.bind(_walletController));
exports.default = router;
//# sourceMappingURL=routes.js.map