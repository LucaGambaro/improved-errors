import { Logger } from "winston";
import { IError } from "../IError";

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

describe("IError", () => {
  it("returnFullStructure", () => {
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

  it("Log", () => {
    //const p = jest.spyOn(x, "getLogger");
    const p = jest.spyOn(Logger.prototype ,"warn").mockImplementation((x) => {
      x;
      console.log("MOCKKK");
      return {}
    });

    testMultipleThrows().log("warn");
    expect(p.mock.calls).toMatchInlineSnapshot(`[]`);
  });
});
