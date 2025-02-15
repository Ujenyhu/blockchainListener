const express = require("express");
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api", router);

const PORT = `${process.env.PORT}` || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});
