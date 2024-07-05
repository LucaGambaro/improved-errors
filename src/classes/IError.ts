import { IErrorFullStructure } from "../types/IError";
import { unknownCauseToIError } from "../Utils/unknownCauseToIError";
import { getLogger } from "./logger/winstonLogger";

const logger = getLogger({ contextName: "IError" });

export class IError {
  private message: string;
  private metadata: unknown;
  private causes: IError[];

  constructor(message: string) {
    this.message = message;
    this.causes = [];
  }

  public addMetadata(metadata: unknown) {
    this.metadata = metadata;
    return this;
  }

  public addCauses(causes: unknown) {
    this.causes = unknownCauseToIError(causes);
    return this;
  }

  public log(level: "warn" | "info" | "err") {
    const struct = this.returnFullStructure();

    switch (level) {
      case "warn":
        logger.warn(struct);
        break;
      default:
        break;
    }
  }

  public returnFullStructure(): IErrorFullStructure {
    const parsedCauses = this.causes.map((c) => c.returnFullStructure());

    const fullErrorStruct = {
      message: this.message,
      metadata: this.metadata,
      causes: this.causes.length ? parsedCauses : undefined,
    };

    return fullErrorStruct;
  }
}
