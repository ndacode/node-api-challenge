const express = require("express");
const actionRouter = require("./data/helpers/actionRouter.js");
const router = require("./data/helpers/router.js");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("<h1>Greetings<h1>");
});

server.use("/api/projects", router);
server.use("/api/actions", actionRouter);
const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} **`));
