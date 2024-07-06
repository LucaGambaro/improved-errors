import chalk from "chalk";
import { isValidLogLevel } from "../../Utils/typeGuards";
import { IErrorFullStructure } from "../../types/IError";
import {
  LOG_LEVEL_COLOR,
  LogStringBuilderParameters
} from "../../types/IErrorLogger";
import { IError } from "../IError";

export function logStringBuilder(params: LogStringBuilderParameters) {
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
