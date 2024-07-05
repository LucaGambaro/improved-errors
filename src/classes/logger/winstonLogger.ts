import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const myFormat = winston.format.printf(
  ({ level, message, timestamp, causes, metadata, context }) => {
    metadata;
    return `[${level}] ${timestamp} ${context} - ${message}  ${JSON.stringify(
      causes
    )}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({ message: true, all: true, level: true }),
    winston.format.timestamp(),
    myFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: "__logs/error.log",
      level: "error",
    }),
    new DailyRotateFile({ filename: "__logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console());
}

export function getLogger(params: { contextName: string }) {
  return logger.child({ context: params.contextName });
}
