import { IErrorFullStructure } from "../types/IError";
export declare class IError {
    private message;
    private metadata;
    private causes;
    constructor(message: string);
    addMetadata(metadata: unknown): this;
    addCauses(causes: unknown): this;
    returnFullStructure(): IErrorFullStructure;
}
