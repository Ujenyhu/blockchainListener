import { IWalletService } from "../logic/interfaces/iWalletService";

export const validateAddressMiddleware = (walletService: IWalletService) => {
  return async (req: any, res: any, next: any) => {
    const { wallet, network } = req.body;
    if (!wallet || !network) {
      return res.status(400).send("Missing wallet or network");
    }
    if (!(await walletService.IsValidWallet(wallet, network))) {
      return res.status(400).send("Invalid wallet address");
    }
    next();
  };
};
