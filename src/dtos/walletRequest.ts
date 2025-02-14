export class WalletRequest {
  walletAddress: string;
  networkType: string;

  constructor(walletAddress: string, networkType: string) {
    this.walletAddress = walletAddress;
    this.networkType = networkType;
  }
}
