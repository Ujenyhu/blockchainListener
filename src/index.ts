const express = require("express");
import { EthereumListener } from "./listeners/ethereumListener";
import router, { walletService } from "./routes";

const app = express();

app.use(express.json());

app.use("/api", router);

const ethereumListener = new EthereumListener(walletService);
ethereumListener.listenForEthDeposit();
//ethereumListener.listenForUSDTDeposit();
//ethereumListener.listenForERC20Deposit();

const PORT = `${process.env.PORT}` || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});

// NEXT STEPS:
// 1:  fULLY Implement listerners for eth and erc20 tokens, picks events and queue in rabbitMq
// 2: Implement listeners for trx and trc20, pick events and queue in rabbitMq
// 3: Add up database support. Store trasanctions and wallets: Use mongoDB
// 4: Add docker support
// 5: Would be nice to run the listeners as background services

//NOTE: Remember to test after every implementation.
