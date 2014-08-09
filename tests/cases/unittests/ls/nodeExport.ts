///<reference path='..\..\..\..\src\harness\harness.ts' />

describe("nodeExport", () => {

    it("ts is exported to commonjs", () => {
        // Test always passes in non-nodejs test environments
        if (typeof module === "undefined" || !module.exports) {
            return;
        }

        var servicesFile = "./typescriptServices.js";
        var ts = require(servicesFile);

        // We test by some known function name
        if (ts && ts.getDefaultCompilerOptions) {
            return;
        }
         
        throw new Error("ts should be exported from the language service");
    });
});