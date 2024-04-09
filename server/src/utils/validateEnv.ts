import { cleanEnv, port, str } from 'envalid';
import { config } from 'dotenv';
config();

const validateEnv = () => {
  cleanEnv(process.env, {
    SERVER_URL: str(),
    SERVER_PORT: port(),
    MONGO_CONNECTION_STRING: str(),
  });
};

export default validateEnv;
