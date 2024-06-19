import * as performance from "../../compiler/performance.js";

const name = "mark";
describe("clear measures", () => {
  before(() => {
    performance.mark(name);
  });

  it("count should be 0", () => {
    performance.clearMeasures(name);
    expect(performance.getDuration(name)).to.equal(0);
  });

  after(() => {
    performance.clearMarks(name);
  });
});

describe("Duration of non existend mark", () => {
  const markName = "testMark";

  it("should be 0", () => {
    expect(performance.getDuration(markName)).to.equal(0);
  });
});
