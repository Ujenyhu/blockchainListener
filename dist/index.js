"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const app = express();
app.use(express.json());
app.use("/api", routes_1.router);
const PORT = `${process.env.PORT}` || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
});
//# sourceMappingURL=index.js.map