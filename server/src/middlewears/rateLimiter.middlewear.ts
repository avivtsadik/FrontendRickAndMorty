import { NextFunction, Response, Request } from "express";
import { HttpException } from "../exceptions/HttpException";
const TIME_INTERVAL = 10000;
const MAX_REQUESTS = 2;
let numOfRequests: number = 0;
let lastReqTime: number = 0;
const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentTime = Date.now();
  if (currentTime - lastReqTime > TIME_INTERVAL) {
    numOfRequests = 0;
    lastReqTime = currentTime;
  }
  if (numOfRequests >= MAX_REQUESTS) {
    next(new HttpException(429, "Too many requests"));
  } else {
    numOfRequests++;
    next();
  }
};

export default rateLimiterMiddleware;
