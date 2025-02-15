import { IWalletService } from "../logic/interfaces/IWalletService";
import { WalletRequest } from "../dtos/walletRequest";
import { Request } from "express";

export const validateAddressMiddleware = (walletService: IWalletService) => {
  return async (req: Request, res: any, next: any) => {
    const requestBody = req.body as WalletRequest;
    if (!requestBody.walletAddress || !requestBody.networkType) {
      return res.status(400).send("Missing wallet or network");
    }
    if (!(await walletService.IsValidWallet(requestBody))) {
      return res.status(400).send("Invalid wallet address");
    }
    next();
  };
};
