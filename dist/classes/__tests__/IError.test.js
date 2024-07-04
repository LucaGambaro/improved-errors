"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IError_1 = require("../IError");
describe("IError", () => {
    it("returnFullStructure", () => {
        const testMultipleThrows = () => {
            try {
                try {
                    throw new Error("First Error");
                }
                catch (error) {
                    throw new IError_1.IError("Second Error")
                        .addMetadata({ mockMetadataSecondError: "test" })
                        .addCauses(error);
                }
            }
            catch (error) {
                return new IError_1.IError("Third Error")
                    .addMetadata({ mockMetadataThirdError: true })
                    .addCauses(error);
            }
        };
        const fullIErrorStructure = testMultipleThrows().returnFullStructure();
        expect(fullIErrorStructure).toMatchObject({
            message: "Third Error",
            metadata: {
                mockMetadataThirdError: true,
            },
            causes: [
                {
                    message: "Second Error",
                    metadata: {
                        mockMetadataSecondError: "test",
                    },
                    causes: [
                        {
                            causes: undefined,
                            message: "First Error",
                            metadata: undefined,
                        },
                    ],
                },
            ],
        });
    });
});
//# sourceMappingURL=IError.test.js.map