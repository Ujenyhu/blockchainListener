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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const redis_1 = require("../../config/redis");
const varHelper_1 = __importDefault(require("../../helpers/varHelper"));
const ethers_1 = require("ethers");
const responseBase_1 = __importDefault(require("../../dtos/responseBase"));
const { TronWeb } = require("tronweb");
class WalletService {
    constructor() {
        this.ethProvider = new ethers_1.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
        this.tronProvider = new TronWeb({
            fullHost: "https://api.shasta.trongrid.io",
            headers: { "TRON-PRO-API-KEY": process.env.TRON_API_KEY },
        });
    }
    addWallet(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield this.getRedisHash(request.networkType);
                yield redis_1.redis.hSet(hash, request.walletAddress, "1");
                console.log(`Added wallet ${request.walletAddress} to tracking list`);
                return new responseBase_1.default(varHelper_1.default.HttpStatusCodes.OK, varHelper_1.default.ResponseStatus.SUCCESS, "Wallet added successfully");
            }
            catch (error) {
                return new responseBase_1.default(varHelper_1.default.HttpStatusCodes.InternalServerError, varHelper_1.default.ResponseStatus.ERROR, error === null || error === void 0 ? void 0 : error.message, error);
            }
        });
    }
    removeWallet(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield this.getRedisHash(request.networkType);
                yield redis_1.redis.hDel(hash, request.walletAddress);
                return new responseBase_1.default(varHelper_1.default.HttpStatusCodes.OK, varHelper_1.default.ResponseStatus.SUCCESS, "Wallet removed successfully");
            }
            catch (error) {
                return new responseBase_1.default(varHelper_1.default.HttpStatusCodes.InternalServerError, varHelper_1.default.ResponseStatus.ERROR, error === null || error === void 0 ? void 0 : error.message, error);
            }
        });
    }
    getWallets(network) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield this.getRedisHash(network);
                return Object.keys(yield redis_1.redis.hGetAll(hash));
            }
            catch (error) {
                return [];
            }
        });
    }
    isWalletTracked(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield this.getRedisHash(request.networkType);
            return yield redis_1.redis.hExists(hash, request.walletAddress);
        });
    }
    isValidEthAddress(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, ethers_1.isAddress)(walletAddress);
        });
    }
    isValidTronAddress(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return TronWeb.isAddress(walletAddress);
        });
    }
    IsValidWallet(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.networkType === varHelper_1.default.Networks.ETHEUREM) {
                return yield this.isValidEthAddress(request.walletAddress);
            }
            else if (request.networkType === varHelper_1.default.Networks.TRON) {
                return yield this.isValidTronAddress(request.walletAddress);
            }
            return false;
        });
    }
    getRedisHash(network) {
        return network === varHelper_1.default.Networks.ETHEUREM
            ? "eth_wallets"
            : "tron_wallets";
    }
}
exports.WalletService = WalletService;
//# sourceMappingURL=WalletService.js.map