import { ethers, WebSocketProvider, JsonRpcProvider } from "ethers";
import VarHelper from "../helpers/varHelper";
import { IWalletService } from "../logic/interfaces/IWalletService";
import { publishDepositEvent } from "../config/rabbitMq";
import { TransactionEvent } from "../dtos/eventMessage";

export class EthereumListener {
  private readonly ethProvider: WebSocketProvider;
  //private readonly jsonProvider: JsonRpcProvider;
  private walletService: IWalletService;

  constructor(_walletService: IWalletService) {
    this.walletService = _walletService;
    this.ethProvider = new WebSocketProvider(
      `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
    );
    // this.jsonProvider = new JsonRpcProvider(
    //   `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
    // );
  }

  ERC20_ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
  ];

  async listenForEthDeposit() {
    this.ethProvider.on("pending", async (transactionHash: string) => {
      const transaction = await this.ethProvider.getTransaction(
        transactionHash
      );
      if (!transaction || !transaction.to) return;

      console.log(transaction);
      //   const isWallet = await this.walletService.isWalletTracked(
      //     VarHelper.TrackingHash.Eth,
      //     transaction.to
      //   );

      //   if (!isWallet) {
      //     return;
      //   }

      await publishDepositEvent(
        new TransactionEvent(
          VarHelper.Networks.ETHEREUM,
          transaction.from,
          transaction.to,
          ethers.formatUnits(transaction.value, VarHelper.TokenDecimals.ETH),
          VarHelper.TokenSymbols.ETH
        ),
        VarHelper.QueueRoutingKeys.ETH_NATIVE_KEY
      );
    });
  }

  async listenForERC20Deposit() {
    await this.listenForUSDCDeposit();
    await this.listenForUSDTDeposit();
  }

  async listenForUSDTDeposit() {
    const contract = new ethers.Contract(
      VarHelper.TokenContracts.ETH_USDT_CONTRACT,
      this.ERC20_ABI,
      this.ethProvider
    );
    contract.on("Transfer", async (from, to, value, event) => {
      const isWallet = await this.walletService.isWalletTracked(
        VarHelper.TrackingHash.Eth,
        to
      );

      if (!isWallet) {
        return;
      }
      await publishDepositEvent(
        new TransactionEvent(
          VarHelper.Networks.ETHEREUM,
          from,
          to,
          ethers.formatUnits(value, VarHelper.TokenDecimals.USDT),
          VarHelper.TokenSymbols.USDT
        ),
        VarHelper.QueueRoutingKeys.ETH_USDT_KEY
      );
    });
  }

  async listenForUSDCDeposit() {
    const network = await this.ethProvider.getNetwork();

    const contract = new ethers.Contract(
      VarHelper.TokenContracts.ETH_USDC_CONTRACT,
      this.ERC20_ABI,
      this.ethProvider
    );
    contract.on("Transfer", async (from, to, value, event) => {
      const isWallet = await this.walletService.isWalletTracked(
        VarHelper.TrackingHash.Eth,
        to
      );

      if (!isWallet) {
        return;
      }
      await publishDepositEvent(
        new TransactionEvent(
          VarHelper.Networks.ETHEREUM,
          from,
          to,
          ethers.formatUnits(value, VarHelper.TokenDecimals.USDC),
          VarHelper.TokenSymbols.USDC
        ),
        VarHelper.QueueRoutingKeys.ETH_USDC_KEY
      );
    });
  }
}
