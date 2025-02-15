import { IWalletService } from "../logic/interfaces/IWalletService";
import { WalletRequest } from "../dtos/walletRequest";
import RequestBase from "../dtos/requestBase";
import { Request, Response } from "express";

export class walletController {
  private walletService: IWalletService;

  constructor(_walletService: IWalletService) {
    this.walletService = _walletService;
  }

  async addWallet(request: Request, response: Response): Promise<void> {
    const requestBody = request.body as WalletRequest;
    const result = await this.walletService.addWallet(requestBody);
    response.status(result.status).json(result);
  }

  async removeWallet(
    request: RequestBase<WalletRequest>,
    response: Response
  ): Promise<void> {
    await this.walletService.removeWallet(request.body);
  }

  async getWallets(network: string): Promise<string[]> {
    return await this.walletService.getWallets(network);
  }

  async isWalletTracked(request: WalletRequest): Promise<boolean> {
    return await this.walletService.isWalletTracked(request);
  }
}
