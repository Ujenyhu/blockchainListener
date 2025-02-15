"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletController = void 0;
class walletController {
    constructor(_walletService) {
        this.walletService = _walletService;
    }
    addWallet(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = request.body;
            const result = yield this.walletService.addWallet(requestBody);
            response.status(result.status).json(result);
        });
    }
    removeWallet(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.walletService.removeWallet(request.body);
        });
    }
    getWallets(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.walletService.getWallets(network);
        });
    }
    isWalletTracked(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.walletService.isWalletTracked(request);
        });
    }
}
exports.walletController = walletController;
