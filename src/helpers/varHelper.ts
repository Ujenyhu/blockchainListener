enum TokenSymbols {
  USDT = "USDT",
  USDC = "USDC",
  ETH = "ETH",
  TRX = "TRX",
}

enum TokenContracts {
  ETH_USDT_CONTRACT = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
  ETH_USDC_CONTRACT = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  TRON_USDT_CONTRACT = "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs",
  // TRON_USDC_CONTRACT = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
}

enum TokenDecimals {
  USDT = 6,
  USDC = 6,
  ETH = 18,
  TRX = 6,
}

enum Networks {
  ETHEREUM = "ETHEREUM",
  TRON = "TRON",
}

enum ResponseStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

enum HttpStatusCodes {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

enum TrackingHash {
  Eth = "eth_wallets",
  Tron = "tron_wallets",
}

export default class VarHelper {
  static TokenSymbols = TokenSymbols;
  static TokenContracts = TokenContracts;
  static TokenDecimals = TokenDecimals;
  static Networks = Networks;
  static ResponseStatus = ResponseStatus;
  static HttpStatusCodes = HttpStatusCodes;
  static TrackingHash = TrackingHash;
}
