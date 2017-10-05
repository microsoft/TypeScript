/// <reference path="../harness.ts" />

describe("Public APIs", () => {
    function verifyApi(fileName: string) {
        const builtFile = `built/local/${fileName}`;
        const api = `api/${fileName}`;
        let fileContent: string;
        before(() => {
            fileContent = Harness.IO.readFile(builtFile);
        });

        it("should be acknowledged when they change", () => {
            Harness.Baseline.runBaseline(api, () => fileContent);
        });

        it("should compile", () => {
            const testFile: Harness.Compiler.TestFile = {
                unitName: builtFile,
                content: fileContent
            };
            const inputFiles = [testFile];
            const output = Harness.Compiler.compileFiles(inputFiles, [], /*harnessSettings*/ undefined, /*options*/ {}, /*currentDirectory*/ undefined);
            assert(!output.result.errors || !output.result.errors.length, Harness.Compiler.minimalDiagnosticsToString(output.result.errors, /*pretty*/ true));
        });
    }

    describe("for the language service and compiler", () => {
        verifyApi("typescript.d.ts");
    });

    describe("for the language server", () => {
        verifyApi("tsserverlibrary.d.ts");
    });
});
