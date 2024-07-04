import { IError } from "../IError";

describe("IError", () => {
  it("returnFullStructure", () => {

const mainError = new IError('Main error occurred');
mainError.addMetadata({ userId: 12345 });

const causeError1 = new IError('First cause of the main error');
const causeError2 = new IError('Second cause of the main error').addMetadata({ info: 'Additional info' });

mainError.addCauses([causeError1, causeError2]);

const fullError = mainError.returnFullStructure();
console.log(JSON.stringify(fullError));
  });
});
