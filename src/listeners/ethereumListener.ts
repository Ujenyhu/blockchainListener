import { ethers, JsonRpcProvider } from "ethers";
import VarHelper from "../helpers/varHelper";
import { IWalletService } from "../logic/interfaces/IWalletService";

export class EthereumListener {
  private readonly ethProvider: JsonRpcProvider;
  private walletService: IWalletService;

  constructor(_walletService: IWalletService) {
    this.walletService = _walletService;
    this.ethProvider = new JsonRpcProvider(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    );
  }

  ERC20_ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
  ];

  async listenForEthDeposit() {}

  async listenForERC20Deposit() {}

  async listenForUSDTDeposit() {
    const contract = new ethers.Contract(
      VarHelper.TokenContracts.ETH_USDT_CONTRACT,
      this.ERC20_ABI,
      this.ethProvider
    );
    contract.addListener("Transfer", async (from, to, value, event) => {
      console.log("starting listener");
      const isWallet = await this.walletService.isWalletTracked(
        VarHelper.TrackingHash.Eth,
        to
      );
      console.log("gotten wallet");
      if (!isWallet) {
        console.log("not involved");
      }
    });
  }
}
