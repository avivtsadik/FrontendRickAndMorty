import { cleanEnv, num, port, str } from 'envalid';
import { config } from 'dotenv';
config();

const validateEnv = () => {
  cleanEnv(process.env, {
    SERVER_URL: str(),
    SERVER_PORT: port(),
    MONGO_CONNECTION_STRING: str(),
    LIMIT_PAGINATED_REQ: num(),
  });
};

export default validateEnv;
