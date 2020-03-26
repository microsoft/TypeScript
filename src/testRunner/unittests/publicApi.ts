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
            Harness.Baseline.runBaseline(api, fileContent);
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
    function assertDefinedTokenToString(initial: ts.SyntaxKind, last: ts.SyntaxKind) {
        for (let t = initial; t <= last; t++) {
            assert.isDefined(ts.tokenToString(t), `Expected tokenToString defined for ${ts.Debug.formatSyntaxKind(t)}`);
        }
    }

    it("for punctuations", () => {
        assertDefinedTokenToString(ts.SyntaxKind.FirstPunctuation, ts.SyntaxKind.LastPunctuation);
    });
    it("for keywords", () => {
        assertDefinedTokenToString(ts.SyntaxKind.FirstKeyword, ts.SyntaxKind.LastKeyword);
    });
});

describe("unittests:: Public APIs:: createPrivateIdentifier", () => {
    it("throws when name doesn't start with #", () => {
        assert.throw(() => ts.createPrivateIdentifier("not"), "Debug Failure. First character of private identifier must be #: not");
    });
});

describe("unittests:: Public APIs:: isPropertyName", () => {
    it("checks if a PrivateIdentifier is a valid property name", () => {
        const prop = ts.createPrivateIdentifier("#foo");
        assert.isTrue(ts.isPropertyName(prop), "PrivateIdentifier must be a valid property name.");
    });
});
