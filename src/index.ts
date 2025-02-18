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
