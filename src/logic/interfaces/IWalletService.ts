import { WalletRequest } from "../../dtos/walletRequest";

export interface IWalletService {
  addWallet(request: WalletRequest): Promise<any>;
  removeWallet(request: WalletRequest): Promise<any>;
  getWallets(network: string): Promise<string[]>;
  // isWalletTracked(request: WalletRequest): Promise<boolean>;
  isWalletTracked(
    tracking_hash: string,
    walletAddress: string
  ): Promise<boolean>;
  IsValidWallet(request: WalletRequest): Promise<boolean>;
}
