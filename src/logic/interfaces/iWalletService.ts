import { WalletRequest } from "../../dtos/walletRequest";

export interface IWalletService {
  addWallet(request: WalletRequest): Promise<void>;
  removeWallet(request: WalletRequest): Promise<void>;
  getWallets(network: string): Promise<string[]>;
  isWalletTracked(request: WalletRequest): Promise<boolean>;
  IsValidWallet(request: WalletRequest): Promise<boolean>;
}
