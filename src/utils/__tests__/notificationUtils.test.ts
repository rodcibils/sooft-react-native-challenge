import { hasTitleAndBody } from "../notificationUtils";

describe("hasTitleAndBody", () => {
  it("returns true when both title and body are non-empty", () => {
    expect(hasTitleAndBody("Hello", "World")).toBe(true);
  });

  it("returns false when title is empty", () => {
    expect(hasTitleAndBody("", "Body text")).toBe(false);
    expect(hasTitleAndBody("   ", "Body text")).toBe(false);
  });

  it("returns false when body is empty", () => {
    expect(hasTitleAndBody("Title", "")).toBe(false);
    expect(hasTitleAndBody("Title", "    ")).toBe(false);
  });

  it("returns false when both title and body are empty", () => {
    expect(hasTitleAndBody("", "")).toBe(false);
    expect(hasTitleAndBody("   ", "   ")).toBe(false);
  });

  it("returns true when title and body have leading/trailing spaces but valid content", () => {
    expect(hasTitleAndBody("  Hello  ", "  World  ")).toBe(true);
  });
});
