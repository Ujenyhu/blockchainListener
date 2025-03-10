import { redis } from "../../config/redis";
import { IWalletService } from "../interfaces/IWalletService";
import VarHelper from "../../helpers/varHelper";
import { WalletRequest } from "../../dtos/walletRequest";
import { isAddress, JsonRpcProvider } from "ethers";
import ResponseBase from "../../dtos/responseBase";
const { TronWeb } = require("tronweb");

export class WalletService implements IWalletService {
  // private readonly ethProvider: JsonRpcProvider;
  // private readonly tronProvider: any;

  constructor() {
    // this.ethProvider = new JsonRpcProvider(
    //   `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    // );
    // this.tronProvider = new TronWeb({
    //   fullHost: "https://api.shasta.trongrid.io",
    //   headers: { "TRON-PRO-API-KEY": process.env.TRON_API_KEY },
    // });
  }

  async addWallet(request: WalletRequest): Promise<any> {
    try {
      const hash = await this.getRedisHash(request.networkType);
      await redis.hSet(hash, request.walletAddress, "1");
      console.log(`Added wallet ${request.walletAddress} to tracking list`);

      return new ResponseBase(
        VarHelper.HttpStatusCodes.OK,
        VarHelper.ResponseStatus.SUCCESS,
        "Wallet added successfully"
      );
    } catch (error: any) {
      return new ResponseBase(
        VarHelper.HttpStatusCodes.InternalServerError,
        VarHelper.ResponseStatus.ERROR,
        error?.message,
        error
      );
    }
  }

  async removeWallet(request: WalletRequest): Promise<any> {
    try {
      const hash = await this.getRedisHash(request.networkType);
      await redis.hDel(hash, request.walletAddress);

      return new ResponseBase(
        VarHelper.HttpStatusCodes.OK,
        VarHelper.ResponseStatus.SUCCESS,
        "Wallet removed successfully"
      );
    } catch (error: any) {
      return new ResponseBase(
        VarHelper.HttpStatusCodes.InternalServerError,
        VarHelper.ResponseStatus.ERROR,
        error?.message,
        error
      );
    }
  }

  async getWallets(network: string): Promise<string[]> {
    try {
      const hash = await this.getRedisHash(network);
      return Object.keys(await redis.hGetAll(hash));
    } catch (error: any) {
      return [];
    }
  }

  // async isWalletTracked(request: WalletRequest): Promise<boolean> {
  //   const hash = await this.getRedisHash(request.networkType);
  //   return await redis.hExists(hash, request.walletAddress);
  // }

  async isWalletTracked(
    tracking_hash: string,
    walletAddress: string
  ): Promise<boolean> {
    return await redis.hExists(tracking_hash, walletAddress);
  }

  private async isValidEthAddress(walletAddress: string): Promise<boolean> {
    return isAddress(walletAddress);
  }

  private async isValidTronAddress(walletAddress: string): Promise<boolean> {
    return TronWeb.isAddress(walletAddress);
  }

  public async IsValidWallet(request: WalletRequest): Promise<boolean> {
    if (request.networkType === VarHelper.Networks.ETHEREUM) {
      return await this.isValidEthAddress(request.walletAddress);
    } else if (request.networkType === VarHelper.Networks.TRON) {
      return await this.isValidTronAddress(request.walletAddress);
    }
    return false;
  }

  private getRedisHash(network: string): string {
    return network === VarHelper.Networks.ETHEREUM
      ? VarHelper.TrackingHash.Eth
      : VarHelper.TrackingHash.Tron;
  }
}
