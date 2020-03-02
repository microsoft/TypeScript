import { IO, Baseline, Compiler } from "../Harness";
import { createFromFileSystem, builtFolder, srcFolder } from "../vfs";
import { System, CompilerHost } from "../fakes";
import { compileFiles } from "../compiler";
import { SyntaxKind, tokenToString, Debug, createPrivateIdentifier } from "../ts";
describe("Public APIs", () => {
    function verifyApi(fileName: string) {
        const builtFile = `built/local/${fileName}`;
        const api = `api/${fileName}`;
        let fileContent: string;
        before(() => {
            fileContent = (IO.readFile(builtFile)!);
            if (!fileContent)
                throw new Error(`File ${fileName} was not present in built/local`);
            fileContent = fileContent.replace(/\r\n/g, "\n");
        });
        it("should be acknowledged when they change", () => {
            Baseline.runBaseline(api, fileContent);
        });
        it("should compile", () => {
            const fs = createFromFileSystem(IO, /*ignoreCase*/ false);
            fs.linkSync(`${builtFolder}/${fileName}`, `${srcFolder}/${fileName}`);
            const sys = new System(fs);
            const host = new CompilerHost(sys);
            const result = compileFiles(host, [`${srcFolder}/${fileName}`], {});
            assert(!result.diagnostics || !result.diagnostics.length, Compiler.minimalDiagnosticsToString(result.diagnostics, /*pretty*/ true));
        });
    }
    describe("for the language service and compiler", () => {
        verifyApi("typescript.d.ts");
    });
    describe("for the language server", () => {
        verifyApi("tsserverlibrary.d.ts");
    });
});
describe("Public APIs:: token to string", () => {
    function assertDefinedTokenToString(initial: SyntaxKind, last: SyntaxKind) {
        for (let t = initial; t <= last; t++) {
            assert.isDefined(tokenToString(t), `Expected tokenToString defined for ${Debug.formatSyntaxKind(t)}`);
        }
    }
    it("for punctuations", () => {
        assertDefinedTokenToString(SyntaxKind.FirstPunctuation, SyntaxKind.LastPunctuation);
    });
    it("for keywords", () => {
        assertDefinedTokenToString(SyntaxKind.FirstKeyword, SyntaxKind.LastKeyword);
    });
});
describe("Public APIs:: createPrivateIdentifier", () => {
    it("throws when name doesn't start with #", () => {
        assert.throw(() => createPrivateIdentifier("not"), "Debug Failure. First character of private identifier must be #: not");
    });
});
