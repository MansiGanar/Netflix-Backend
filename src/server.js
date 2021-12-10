import express from "express";
import mediaRouter from "./media/index.js";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/media", mediaRouter);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port", port);
});
