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
exports.EthereumListener = void 0;
const ethers_1 = require("ethers");
const varHelper_1 = __importDefault(require("../helpers/varHelper"));
class EthereumListener {
    constructor(_walletService) {
        this.ERC20_ABI = [
            "event Transfer(address indexed from, address indexed to, uint256 value)",
        ];
        this.walletService = _walletService;
        this.ethProvider = new ethers_1.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
    }
    listenForEthDeposit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    listenForERC20Deposit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    listenForUSDTDeposit() {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = new ethers_1.ethers.Contract(varHelper_1.default.TokenContracts.ETH_USDT_CONTRACT, this.ERC20_ABI, this.ethProvider);
            contract.addListener("Transfer", (from, to, value, event) => __awaiter(this, void 0, void 0, function* () {
                const isWallet = yield this.walletService.isWalletTracked(varHelper_1.default.TrackingHash.Eth, to);
                if (!isWallet) {
                    console.log("not involved");
                }
            }));
        });
    }
}
exports.EthereumListener = EthereumListener;
//# sourceMappingURL=ethereumListener.js.map