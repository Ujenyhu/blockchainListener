require("dotenv").config();
const express = require("express");
import { routers } from "./routes";

const app = express();

app.use(express.json()).use("api", routers);

const PORT = `${process.env.PORT}` || 5000;
app.listen(PORT);
