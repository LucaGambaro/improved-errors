import { IErrorFullStructure } from "../types/IError";
import { unknownCauseToIError } from "../Utils/unknownCauseToIError";

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

  public returnFullStructure(): IErrorFullStructure {
    const parsedCauses = this.causes.map((c) => c.returnFullStructure());
    return {
      message: this.message,
      metadata: this.metadata,
      causes: this.causes.length ? parsedCauses : undefined,
    };
  }
}
