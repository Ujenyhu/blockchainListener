import { Request } from "express";
import { IWalletService } from "../logic/interfaces/IWalletService";
import { WalletRequest } from "../dtos/walletRequest";
import ResponseBase  from "../dtos/responseBase";
import VarHelper from '../helpers/varHelper';

export const validateAddressMiddleware = (walletService: IWalletService) => {
  return async (req: Request, res: any, next: any) => {
    const requestBody = req.body as WalletRequest;
    if (!requestBody.walletAddress || !requestBody.networkType) {

      var response = new ResponseBase(
        VarHelper.HttpStatusCodes.BadRequest,
        VarHelper.ResponseStatus.ERROR,
        "Missing wallet or network type"
      );
      return res.status(VarHelper.HttpStatusCodes.BadRequest).json(response);
      // return res.status(400).send("Missing wallet or network");
    }
    if (!(await walletService.IsValidWallet(requestBody))) {
      var response = new ResponseBase(
        VarHelper.HttpStatusCodes.BadRequest,
        VarHelper.ResponseStatus.ERROR,
        "Invalid wallet address"
      );
      return res.status(VarHelper.HttpStatusCodes.BadRequest).json(response);
    }

    next();
  };
};
