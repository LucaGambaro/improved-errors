import { IError } from "../IError";

describe("IError", () => {
  it("returnFullStructure", () => {
    const testMultipleThrows = (): IError => {
      try {
        try {
          throw new Error("First Error");
        } catch (error) {
          throw new IError("Second Error")
            .addMetadata({ mockMetadataSecondError: "test" })
            .addCauses(error);
        }
      } catch (error) {
        return new IError("Third Error")
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
