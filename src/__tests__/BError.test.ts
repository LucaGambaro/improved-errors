import { BError } from "../BError";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    const l = new BError()
      .addMetadata({ bello: "xxx" })
      .addCauses([new Error("prova erorre ca")]);

    l.getErrorChain();
    expect(true).toBeTruthy();
  });
});
