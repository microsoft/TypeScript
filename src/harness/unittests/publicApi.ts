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
            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false);
            fs.linkSync(`${vfs.builtFolder}/${fileName}`, `${vfs.srcFolder}/${fileName}`);
            const sys = new fakes.System(fs);
            const host = new fakes.CompilerHost(sys);
            const result = compiler.compileFiles(host, [`${vfs.srcFolder}/${fileName}`], {});
            assert(!result.diagnostics || !result.diagnostics.length, Harness.Compiler.minimalDiagnosticsToString(result.diagnostics, /*pretty*/ true));
        });
    }

    describe("for the language service and compiler", () => {
        verifyApi("typescript.d.ts");
    });

    describe("for the language server", () => {
        verifyApi("tsserverlibrary.d.ts");
    });
});
