import express from "express";
import mediaRouter from "./media/index.js";
import listEndpoints from "express-list-endpoints";
const server = express();
const port = 3001;
server.use(express.json());

server.use("/media", mediaRouter);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port", port);
});
