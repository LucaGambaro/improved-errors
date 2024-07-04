"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IError = void 0;
const unknownCauseToIError_1 = require("../Utils/unknownCauseToIError");
class IError {
    constructor(message) {
        this.message = message;
        this.causes = [];
    }
    addMetadata(metadata) {
        this.metadata = metadata;
        return this;
    }
    addCauses(causes) {
        this.causes = (0, unknownCauseToIError_1.unknownCauseToIError)(causes);
        return this;
    }
    returnFullStructure() {
        const parsedCauses = this.causes.map((c) => c.returnFullStructure());
        return {
            message: this.message,
            metadata: this.metadata,
            causes: this.causes.length ? parsedCauses : undefined,
        };
    }
}
exports.IError = IError;
//# sourceMappingURL=IError.js.map