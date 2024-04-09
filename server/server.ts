import Server from "./src/index";
import { SERVER_PORT } from "./src/config";
import { logMessage } from "./src/utils/logger";
const server: Server = new Server();
const PORT: number = SERVER_PORT ? parseInt(SERVER_PORT) : 3000;
import 'reflect-metadata';

server.app
  .listen(PORT, "localhost", function () {
    logMessage(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
