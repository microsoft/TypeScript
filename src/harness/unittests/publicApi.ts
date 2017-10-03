/// <reference path="../harness.ts" />

describe("Public APIs", () => {
    it("for the language service and compiler should be acknowledged when they change", () => {
        Harness.Baseline.runBaseline("api/typescript.d.ts", () => Harness.IO.readFile("built/local/typescript.d.ts"));
    });
    it("for the language server should be acknowledged when they change", () => {
        Harness.Baseline.runBaseline("api/tsserverlibrary.d.ts", () => Harness.IO.readFile("built/local/tsserverlibrary.d.ts"));
    });
});