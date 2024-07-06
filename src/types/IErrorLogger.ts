import chalk, { Chalk } from "chalk";
import { IErrorFullStructure } from "./IError";

export const DEFAULT_LOG_LEVELS = [
  "error",
  "warn",
  "info",
  "http",
  "verbose",
  "debug",
  "silly",
] as const;
export type DefaultLogLevel = (typeof DEFAULT_LOG_LEVELS)[number];

export const LOG_LEVEL_COLOR: Record<DefaultLogLevel, Chalk> = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.blue,
  http: chalk.green,
  verbose: chalk.green,
  debug: chalk.green,
  silly: chalk.green,
};

export type LogStringBuilderParameters = {
  timestamp: string;
  context: string;
  level: string;
  IErr: IErrorFullStructure;
};
export type LogStringBuilderFunc = (
  params: LogStringBuilderParameters
) => string;

export type IErrorLoggerConstructorParams = {
  /**
   * Custom function to generate the log string
   */
  customLogStringBuilder?: LogStringBuilderFunc;
  /**
   * Define a custom context name to better identify the error context
   */
  contextName?: string;
};
