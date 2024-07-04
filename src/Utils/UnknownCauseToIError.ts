import { IError } from "../classes/IError";

export function unknownCauseToIError(causes: unknown): IError[] {
  const IErrList: IError[] = [];

  // Recursion in case of array
  if (Array.isArray(causes)) {
    const parsedCauses: IError[] = [];
    causes.forEach((cause) => {
      parsedCauses.push(...unknownCauseToIError(cause));
    });
    IErrList.push(...parsedCauses);
  }
  // String
  else if (typeof causes === "string") {
    IErrList.push(new IError(causes));
  }
  // Error
  else if (causes instanceof Error) {
    IErrList.push(new IError(causes.message));
  }
  // IError
  else if (causes instanceof IError) {
    IErrList.push(causes);
  }
  // Everything else
  else {
    IErrList.push(new IError(JSON.stringify(causes)));
  }

  return IErrList;
}
