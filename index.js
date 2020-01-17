const express = require("express");

const router = require("./data/helpers/router.js");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("<h1>Greetings<h1>");
});

server.use("/api/projects", router);
const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} **`));
