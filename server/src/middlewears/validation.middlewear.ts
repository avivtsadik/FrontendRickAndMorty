import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";

const validationMiddleware = (
  type: any,
  value: string | "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = false
): RequestHandler => {
  return (req, res, next) => {
    const dataArray = Array.isArray(req[value]) ? req[value] : [req[value]];
    const validationPromises = dataArray.map((item) =>
      validate(plainToInstance(type, item), {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
      })
    );
    Promise.all(validationPromises).then(
      (validationResults: ValidationError[][]) => {
        const errors = validationResults.reduce(
          (acc: ValidationError[], result) => {
            return acc.concat(result);
          },
          []
        );

        if (errors.length > 0) {
          const message = errors
            .map((error) => Object.values(error.constraints))
            .join(", ");
          next(new HttpException(400, message));
        } else {
          next();
        }
      }
    );
  };
};

export default validationMiddleware;
