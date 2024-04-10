import { config } from "dotenv";
import validateEnv from "./utils/validateEnv";
validateEnv();
config();

export const {
  SERVER_URL,
  CLIENT_URL,
  SERVER_PORT,
  MONGO_CONNECTION_STRING,
  LIMIT_PAGINATED_REQ,
} = process.env;
