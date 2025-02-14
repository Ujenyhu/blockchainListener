import { IWalletService } from "../logic/interfaces/IWalletService";
import { WalletRequest } from "../dtos/walletRequest";

export class walletController {
  private walletService: IWalletService;

  constructor(_walletService: IWalletService) {
    this.walletService = _walletService;
  }

  async addWallet(request: Request, response: Response): Promise<void> {
    const requestBody: WalletRequest = request.body;
    await this.walletService.addWallet(requestBody);
  }

  async removeWallet(request: Request, response: Response): Promise<void> {
    await this.walletService.removeWallet(req);
  }

  async getWallets(network: string): Promise<string[]> {
    return await this.walletService.getWallets(network);
  }

  async isWalletTracked(wallet: string, network: string): Promise<boolean> {
    return await this.walletService.isWalletTracked(wallet, network);
  }
}
