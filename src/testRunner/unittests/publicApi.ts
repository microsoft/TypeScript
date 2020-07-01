import { assert } from "console";
import { SyntaxKind } from "../../compiler/types";
import { tokenToString } from "../../compiler/scanner";
import { Debug } from "../../compiler/debug";
import { factory, isPropertyName } from "../../../built/local/compiler";

describe("unittests:: Public APIs", () => {
    function verifyApi(fileName: string) {
        const builtFile = `built/local/${fileName}`;
        const api = `api/${fileName}`;
        let fileContent: string;
        before(() => {
            fileContent = Harness.IO.readFile(builtFile)!;
            if (!fileContent) throw new Error(`File ${fileName} was not present in built/local`);
            fileContent = fileContent.replace(/\r\n/g, "\n");
        });

        it("should be acknowledged when they change", () => {
            Harness.Baseline.runBaseline(api, fileContent, { PrintDiff: true });
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

describe("unittests:: Public APIs:: token to string", () => {
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

describe("unittests:: Public APIs:: createPrivateIdentifier", () => {
    it("throws when name doesn't start with #", () => {
        assert.throw(() => factory.createPrivateIdentifier("not"), "Debug Failure. First character of private identifier must be #: not");
    });
});

describe("unittests:: Public APIs:: isPropertyName", () => {
    it("checks if a PrivateIdentifier is a valid property name", () => {
        const prop = factory.createPrivateIdentifier("#foo");
        assert.isTrue(isPropertyName(prop), "PrivateIdentifier must be a valid property name.");
    });
});
