import chalk, { Chalk } from "chalk";
import { IErrorFullStructure } from "../../types/IError";
import { IError } from "../IError";

const DEFAULT_LOG_LEVELS = [
  "error",
  "warn",
  "info",
  "http",
  "verbose",
  "debug",
  "silly",
] as const;
type DefaultLogLevel = (typeof DEFAULT_LOG_LEVELS)[number];

const LOG_LEVEL_COLOR: Record<DefaultLogLevel, Chalk> = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.blue,
  http: chalk.green,
  verbose: chalk.green,
  debug: chalk.green,
  silly: chalk.green,
};

function isValidLogLevel(level: string): level is DefaultLogLevel {
  return DEFAULT_LOG_LEVELS.some((l) => l === level);
}

export function generatePrintableString(params: {
  timestamp: string;
  context: string;
  level: string;
  IErr: IErrorFullStructure;
}) {
  const { IErr, context, level, timestamp } = params;

  if (!isValidLogLevel(level)) {
    throw new IError("Wrong logger Level").addMetadata(params);
  }

  const textColor = LOG_LEVEL_COLOR[level];

  const preFix = `${textColor(timestamp)} - Level [${textColor(
    level
  )}] - Context [${textColor(context)}]`;
  return preFix + "\n" + xp(0, IErr);
}

function xp(idx: number, err: IErrorFullStructure): string {
  const mappedCauses = (err.causes ?? []).map((p) => xp(idx + 1, p));

  let str = `
- Cause ${idx + 1}) 
\t- Message: ${chalk.blue(err.message)}`;

  if (err.metadata) {
    str += `\n\t- Metadata: ${JSON.stringify(err.metadata)}`;
  }

  if (mappedCauses.length) {
    str += `\n${mappedCauses}`;
  }

  return str;
}
