"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownCauseToIError = void 0;
const IError_1 = require("../classes/IError");
function unknownCauseToIError(causes) {
    const IErrList = [];
    if (Array.isArray(causes)) {
        const parsedCauses = [];
        causes.forEach((cause) => {
            parsedCauses.push(...unknownCauseToIError(cause));
        });
        IErrList.push(...parsedCauses);
    }
    else if (typeof causes === "string") {
        IErrList.push(new IError_1.IError(causes));
    }
    else if (causes instanceof Error) {
        IErrList.push(new IError_1.IError(causes.message));
    }
    else if (causes instanceof IError_1.IError) {
        IErrList.push(causes);
    }
    else {
        IErrList.push(new IError_1.IError(JSON.stringify(causes)));
    }
    return IErrList;
}
exports.unknownCauseToIError = unknownCauseToIError;
//# sourceMappingURL=unknownCauseToIError.js.map