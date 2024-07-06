import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import {
  IErrorLoggerConstructorParams,
  LogStringBuilderFunc,
} from "../../types/IErrorLogger";
import { getIErrorConfig } from "../IErrorConfig";
import { logStringBuilder } from "./loggerPrintableString";

export class IErrorLogger {
  public logger: winston.Logger;

  constructor(params: IErrorLoggerConstructorParams) {
    const { customLogStringBuilder, contextName } = params;
    const logStringBuilderFunction = customLogStringBuilder ?? logStringBuilder;
    const format = IErrorLogger.setupPrintFormat(logStringBuilderFunction);
    this.logger = IErrorLogger.setupLogger({ format, contextName });
  }

  protected static setupLogger(params: {
    format: winston.Logform.Format;
    contextName?: string;
  }) {
    const { format, contextName } = params;

    const logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(winston.format.timestamp(), format),
      transports: IErrorLogger.setupTransports(),
    });

    if (process.env.NODE_ENV !== "production") {
      logger.add(new winston.transports.Console());
    }

    if (contextName) {
      return logger.child({ contextName });
    }

    return logger;
  }

  protected static setupTransports() {
    const { logFolder } = getIErrorConfig();
    return [
      new DailyRotateFile({
        filename: `${logFolder}/error.log`,
        level: "error",
      }),
      new DailyRotateFile({ filename: `${logFolder}ƒ/combined.log` }),
    ];
  }

  protected static setupPrintFormat(
    customPrintableString: LogStringBuilderFunc
  ) {
    return winston.format.printf((info: winston.Logform.TransformableInfo) =>
      customPrintableString({
        context: info.context,
        timestamp: info.timestamp,
        level: info.level,
        IErr: {
          message: info.message,
          metadata: info.metadata,
          causes: info.causes,
        },
      })
    );
  }
}

export function getBasicLogger(params: IErrorLoggerConstructorParams) {
  const { logger } = new IErrorLogger(params);
  return logger;
}
