import { DEFAULT_LOG_LEVELS, DefaultLogLevel } from "../types/IErrorLogger";

export function isValidLogLevel(level: string): level is DefaultLogLevel {
  return DEFAULT_LOG_LEVELS.some((l) => l === level);
}
