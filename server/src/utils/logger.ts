import { LogTypes } from "./constants";

export const logMessage = (message: string | unknown, type: LogTypes = LogTypes.INFO) => {
  console.log({ type, timeStamp: new Date(), message });
};

