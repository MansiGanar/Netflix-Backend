import express from "express";
import mediaRouter from "./media/index.js";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/media", mediaRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port", port);
});
