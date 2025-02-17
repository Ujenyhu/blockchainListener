"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenSymbols;
(function (TokenSymbols) {
    TokenSymbols["USDT"] = "USDT";
    TokenSymbols["USDC"] = "USDC";
    TokenSymbols["ETH"] = "ETH";
    TokenSymbols["TRX"] = "TRX";
})(TokenSymbols || (TokenSymbols = {}));
var TokenContracts;
(function (TokenContracts) {
    TokenContracts["ETH_USDT_CONTRACT"] = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0";
    TokenContracts["ETH_USDC_CONTRACT"] = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
    TokenContracts["TRON_USDT_CONTRACT"] = "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs";
    // TRON_USDC_CONTRACT = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
})(TokenContracts || (TokenContracts = {}));
var TokenDecimals;
(function (TokenDecimals) {
    TokenDecimals[TokenDecimals["USDT"] = 6] = "USDT";
    TokenDecimals[TokenDecimals["USDC"] = 6] = "USDC";
    TokenDecimals[TokenDecimals["ETH"] = 18] = "ETH";
    TokenDecimals[TokenDecimals["TRX"] = 6] = "TRX";
})(TokenDecimals || (TokenDecimals = {}));
var Networks;
(function (Networks) {
    Networks["ETHEREUM"] = "ETHEREUM";
    Networks["TRON"] = "TRON";
})(Networks || (Networks = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "SUCCESS";
    ResponseStatus["ERROR"] = "ERROR";
})(ResponseStatus || (ResponseStatus = {}));
var HttpStatusCodes;
(function (HttpStatusCodes) {
    HttpStatusCodes[HttpStatusCodes["OK"] = 200] = "OK";
    HttpStatusCodes[HttpStatusCodes["Created"] = 201] = "Created";
    HttpStatusCodes[HttpStatusCodes["BadRequest"] = 400] = "BadRequest";
    HttpStatusCodes[HttpStatusCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpStatusCodes[HttpStatusCodes["Forbidden"] = 403] = "Forbidden";
    HttpStatusCodes[HttpStatusCodes["NotFound"] = 404] = "NotFound";
    HttpStatusCodes[HttpStatusCodes["InternalServerError"] = 500] = "InternalServerError";
})(HttpStatusCodes || (HttpStatusCodes = {}));
var TrackingHash;
(function (TrackingHash) {
    TrackingHash["Eth"] = "eth_wallets";
    TrackingHash["Tron"] = "tron_wallets";
})(TrackingHash || (TrackingHash = {}));
class VarHelper {
}
VarHelper.TokenSymbols = TokenSymbols;
VarHelper.TokenContracts = TokenContracts;
VarHelper.TokenDecimals = TokenDecimals;
VarHelper.Networks = Networks;
VarHelper.ResponseStatus = ResponseStatus;
VarHelper.HttpStatusCodes = HttpStatusCodes;
VarHelper.TrackingHash = TrackingHash;
exports.default = VarHelper;
//# sourceMappingURL=varHelper.js.map