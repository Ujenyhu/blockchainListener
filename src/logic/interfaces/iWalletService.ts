export interface iWalletService {
  addWallet(wallet: string, hash: string): Promise<void>;
  removeWallet(wallet: string, hash: string): Promise<void>;
  getWallets(hash: string): Promise<string[]>;
  isWalletTracked(wallet: string, hash: string): Promise<boolean>;
}
