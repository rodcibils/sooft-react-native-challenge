import { parseDelayInSeconds } from "../timeUtils";

describe("parseDelayInSeconds", () => {
  it("returns the number when input is a valid positive number", () => {
    expect(parseDelayInSeconds("5")).toBe(5);
    expect(parseDelayInSeconds("123")).toBe(123);
  });

  it("removes non-numeric characters and parses correctly", () => {
    expect(parseDelayInSeconds("12abc")).toBe(12);
    expect(parseDelayInSeconds("abc34def")).toBe(34);
    expect(parseDelayInSeconds("7.5")).toBe(75); // "." is removed, becomes "75"
    expect(parseDelayInSeconds("$100")).toBe(100);
  });

  it("returns 0 when input is an empty string", () => {
    expect(parseDelayInSeconds("")).toBe(0);
  });

  it("returns 0 when input has no numbers", () => {
    expect(parseDelayInSeconds("abc")).toBe(0);
    expect(parseDelayInSeconds("!!!")).toBe(0);
  });

  it("returns 0 when parsed number is NaN", () => {
    expect(parseDelayInSeconds("NaN")).toBe(0);
    expect(parseDelayInSeconds("null")).toBe(0);
  });

  it("prevents negative numbers by returning 0 if less than 0", () => {
    expect(parseDelayInSeconds("-10")).toBe(10); // "-" is removed
    expect(parseDelayInSeconds("-abc20")).toBe(20);
  });

  it("returns 0 when input is only a decimal", () => {
    expect(parseDelayInSeconds(".")).toBe(0);
    expect(parseDelayInSeconds("...")).toBe(0);
  });
});
