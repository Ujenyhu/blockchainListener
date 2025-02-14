import redis from "../../config/redis";
import { IWalletService } from "../interfaces/IWalletService";
import { VarHelper } from "../../helpers/varHelper";
import { WalletRequest } from "../../dtos/walletRequest";
import { ethers } from "ethers";
const TronWeb = require("tronweb");

export class WalletService implements IWalletService {
  private readonly ethProvider: ethers.JsonRpcProvider;
  private readonly tronProvider: any;

  constructor() {
    this.ethProvider = new ethers.JsonRpcProvider(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    );
    this.tronProvider = new TronWeb({
      fullHost: "https://api.shasta.trongrid.io",
      headers: { "TRON-PRO-API-KEY": process.env.TRON_API_KEY },
    });
  }

  async addWallet(request: WalletRequest) {
    const hash = await this.getRedisHash(request.networkType);
    await redis.hSet(hash, request.walletAddress, "1");
    console.log(`Added wallet ${request.walletAddress} to tracking list`);
  }

  async removeWallet(request: WalletRequest) {
    const hash = await this.getRedisHash(request.networkType);
    await redis.hDel(hash, request.walletAddress);
  }

  async getWallets(network: string): Promise<string[]> {
    const hash = await this.getRedisHash(network);
    return Object.keys(await redis.hGetAll(hash));
  }

  async isWalletTracked(request: WalletRequest): Promise<boolean> {
    const hash = await this.getRedisHash(request.networkType);
    return await redis.hExists(hash, request.walletAddress);
  }

  private async isValidEthAddress(walletAddress: string): Promise<boolean> {
    return ethers.isAddress(walletAddress);
  }

  private async isValidTronAddress(walletAddress: string): Promise<boolean> {
    return TronWeb.isAddress(walletAddress);
  }

  public async IsValidWallet(request: WalletRequest): Promise<boolean> {
    if (request.networkType === VarHelper.Networks.ETHEUREM) {
      return await this.isValidEthAddress(request.walletAddress);
    } else if (request.networkType === VarHelper.Networks.TRON) {
      return await this.isValidTronAddress(request.walletAddress);
    }
    return false;
  }

  private getRedisHash(network: string): string {
    return network === VarHelper.Networks.ETHEUREM
      ? "eth_wallets"
      : "tron_wallets";
  }
}
