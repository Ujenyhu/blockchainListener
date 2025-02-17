import { ethers, WebSocketProvider } from "ethers";
import VarHelper from "../helpers/varHelper";
import { IWalletService } from "../logic/interfaces/IWalletService";

export class EthereumListener {
  private readonly ethProvider: WebSocketProvider;
  private walletService: IWalletService;

  constructor(_walletService: IWalletService) {
    this.walletService = _walletService;
    this.ethProvider = new WebSocketProvider(
      `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
    );
  }

  ERC20_ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
  ];

  async listenForEthDeposit() {}

  async listenForERC20Deposit() {}

  async listenForUSDTDeposit() {
    console.log("Getting ready");

    const network = await this.ethProvider.getNetwork();
    console.log("✅ Connected to Ethereum network:", network);

    const contract = new ethers.Contract(
      VarHelper.TokenContracts.ETH_USDT_CONTRACT,
      this.ERC20_ABI,
      this.ethProvider
    );
    contract.on("Transfer", async (from, to, value, event) => {
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
