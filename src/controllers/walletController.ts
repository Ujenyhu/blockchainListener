import { iWalletService } from "../logic/interfaces/iWalletService";

export class walletController {
  private walletService: iWalletService;

  constructor(_walletService: iWalletService) {
    this.walletService = _walletService;
  }

  async addWallet(wallet: string, hash: string) {
    await this.walletService.addWallet(wallet, hash);
  }

  async removeWallet(wallet: string, hash: string) {
    await this.walletService.removeWallet(wallet, hash);
  }

  async getWallets(hash: string): Promise<string[]> {
    return await this.walletService.getWallets(hash);
  }

  async isWalletTracked(wallet: string, hash: string): Promise<boolean> {
    return await this.walletService.isWalletTracked(wallet, hash);
  }
}
