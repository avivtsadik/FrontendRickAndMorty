import { NextFunction, Response, Request } from "express";
import { HttpException } from "../exceptions/HttpException";
import { logMessage } from "../utils/logger";
const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = error;
  logMessage("Error happend: " + status + " " + message);
  res.status(status).json(message);
};
export default errorMiddleware;
