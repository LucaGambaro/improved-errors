import chalk from "chalk";

export class BError extends Error {
  private causeStr = "";

  private metadata: unknown[] = [];

  public getErrorChain() {
    console.log(chalk.redBright(this.message + this.causeStr));
    // this.message + this.causeStr;
  }

  public addMetadata(...args: unknown[]) {
    this.metadata.concat(args);
    return this;
  }

  public addCauses(causes: unknown[]) {
    causes.forEach((cause, idx) => {
      if (cause instanceof Error) {
        const error = cause;
        if (error.message) {
          this.causeStr += `${idx}) => caused by ${error.message.toString()}`;
        }
      }
    });

    return this;
  }
}
