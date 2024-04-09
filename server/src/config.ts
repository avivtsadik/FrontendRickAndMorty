import { config } from 'dotenv';
import validateEnv from './utils/validateEnv';
validateEnv();
config();

export const { SERVER_URL, SERVER_PORT,MONGO_CONNECTION_STRING } = process.env;
