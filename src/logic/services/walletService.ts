import redis from "../../config/redis";
import { iWalletService } from "../interfaces/iWalletService";
import { ethers } from "ethers";
const TronWeb = require("tronweb");

export class walletService implements iWalletService {
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

  async addWallet(walletAddress: string, hash: string) {
    await redis.hSet(hash, walletAddress, "1");
    console.log(`Added wallet ${walletAddress} to tracking list`);
  }

  async removeWallet(walletAddress: string, hash: string) {
    await redis.hDel(hash, walletAddress);
  }

  async getWallets(hash: string): Promise<string[]> {
    return Object.keys(await redis.hGetAll(hash));
  }

  async isWalletTracked(walletAddress: string, hash: string): Promise<boolean> {
    return await redis.hExists(hash, walletAddress);
  }

  private async isValidEthAddress(walletAddress: string): Promise<boolean> {
    return ethers.isAddress(walletAddress);
  }

  private async isValidTronAddress(walletAddress: string): Promise<boolean> {
    return TronWeb.isAddress(walletAddress);
  }

  public async IsValidWallet(
    walletAddress: string,
    network: string
  ): Promise<boolean> {
    if (network === "ETHEUREM") {
      return await this.isValidEthAddress(walletAddress);
    } else if (network === "TRON") {
      return await this.isValidTronAddress(walletAddress);
    }
    return false;
  }
}
