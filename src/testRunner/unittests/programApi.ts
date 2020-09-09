namespace ts {
    function verifyMissingFilePaths(missingPaths: readonly Path[], expected: readonly string[]) {
        assert.isDefined(missingPaths);
        const map = new Set(expected);
        for (const missing of missingPaths) {
            const value = map.has(missing);
            assert.isTrue(value, `${missing} to be ${value === undefined ? "not present" : "present only once"}, in actual: ${missingPaths} expected: ${expected}`);
            map.delete(missing);
        }
        const notFound = arrayFrom(mapDefinedIterator(map.keys(), k => map.has(k) ? k : undefined));
        assert.equal(notFound.length, 0, `Not found ${notFound} in actual: ${missingPaths} expected: ${expected}`);
    }

    describe("unittests:: Program.getMissingFilePaths", () => {

        const options: CompilerOptions = {
            noLib: true,
        };

        const emptyFileName = "empty.ts";
        const emptyFileRelativePath = "./" + emptyFileName;

        const emptyFile = new documents.TextDocument(emptyFileName, "");

        const referenceFileName = "reference.ts";
        const referenceFileRelativePath = "./" + referenceFileName;

        const referenceFile = new documents.TextDocument(referenceFileName,
            "/// <reference path=\"d:/imaginary/nonexistent1.ts\"/>\n" + // Absolute
            "/// <reference path=\"./nonexistent2.ts\"/>\n" + // Relative
            "/// <reference path=\"nonexistent3.ts\"/>\n" + // Unqualified
            "/// <reference path=\"nonexistent4\"/>\n"   // No extension
        );

        const testCompilerHost = new fakes.CompilerHost(
            vfs.createFromFileSystem(
                Harness.IO,
                /*ignoreCase*/ true,
                { documents: [emptyFile, referenceFile], cwd: "d:\\pretend\\" }),
            { newLine: NewLineKind.LineFeed });

        it("handles no missing root files", () => {
            const program = createProgram([emptyFileRelativePath], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            verifyMissingFilePaths(missing, []);
        });

        it("handles missing root file", () => {
            const program = createProgram(["./nonexistent.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            verifyMissingFilePaths(missing, ["d:/pretend/nonexistent.ts"]); // Absolute path
        });

        it("handles multiple missing root files", () => {
            const program = createProgram(["./nonexistent0.ts", "./nonexistent1.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            verifyMissingFilePaths(missing, ["d:/pretend/nonexistent0.ts", "d:/pretend/nonexistent1.ts"]);
        });

        it("handles a mix of present and missing root files", () => {
            const program = createProgram(["./nonexistent0.ts", emptyFileRelativePath, "./nonexistent1.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            verifyMissingFilePaths(missing, ["d:/pretend/nonexistent0.ts", "d:/pretend/nonexistent1.ts"]);
        });

        it("handles repeatedly specified root files", () => {
            const program = createProgram(["./nonexistent.ts", "./nonexistent.ts"], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            verifyMissingFilePaths(missing, ["d:/pretend/nonexistent.ts"]);
        });

        it("normalizes file paths", () => {
            const program0 = createProgram(["./nonexistent.ts", "./NONEXISTENT.ts"], options, testCompilerHost);
            const program1 = createProgram(["./NONEXISTENT.ts", "./nonexistent.ts"], options, testCompilerHost);
            const missing0 = program0.getMissingFilePaths();
            const missing1 = program1.getMissingFilePaths();
            assert.equal(missing0.length, 1);
            assert.deepEqual(missing0, missing1);
        });

        it("handles missing triple slash references", () => {
            const program = createProgram([referenceFileRelativePath], options, testCompilerHost);
            const missing = program.getMissingFilePaths();
            verifyMissingFilePaths(missing, [
                // From absolute reference
                "d:/imaginary/nonexistent1.ts",

                // From relative reference
                "d:/pretend/nonexistent2.ts",

                // From unqualified reference
                "d:/pretend/nonexistent3.ts",

                // From no-extension reference
                "d:/pretend/nonexistent4.d.ts",
                "d:/pretend/nonexistent4.ts",
                "d:/pretend/nonexistent4.tsx"
            ]);
        });

        it("should not have missing file paths", () => {
            const testSource = `
            class Foo extends HTMLElement {
                bar: string = 'baz';
            }`;

            const host: CompilerHost = {
                getSourceFile: (fileName: string, languageVersion: ScriptTarget, _onError?: (message: string) => void) => {
                    return fileName === "test.ts" ? createSourceFile(fileName, testSource, languageVersion) : undefined;
                },
                getDefaultLibFileName: () => "",
                writeFile: (_fileName, _content) => { throw new Error("unsupported"); },
                getCurrentDirectory: () => sys.getCurrentDirectory(),
                getCanonicalFileName: fileName => sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
                getNewLine: () => sys.newLine,
                useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
                fileExists: fileName => fileName === "test.ts",
                readFile: fileName => fileName === "test.ts" ? testSource : undefined,
                resolveModuleNames: (_moduleNames: string[], _containingFile: string) => { throw new Error("unsupported"); },
                getDirectories: _path => { throw new Error("unsupported"); },
            };

            const program = createProgram(["test.ts"], { module: ModuleKind.ES2015 }, host);
            assert(program.getSourceFiles().length === 1, "expected 'getSourceFiles' length to be 1");
            assert(program.getMissingFilePaths().length === 0, "expected 'getMissingFilePaths' length to be 0");
            assert(program.getFileProcessingDiagnostics().getDiagnostics().length === 0, "expected 'getFileProcessingDiagnostics' length to be 0");
        });
    });

    describe("unittests:: Program.isSourceFileFromExternalLibrary", () => {
        it("works on redirect files", () => {
            // In this example '/node_modules/foo/index.d.ts' will redirect to '/node_modules/bar/node_modules/foo/index.d.ts'.
            const a = new documents.TextDocument("/a.ts", 'import * as bar from "bar"; import * as foo from "foo";');
            const bar = new documents.TextDocument("/node_modules/bar/index.d.ts", 'import * as foo from "foo";');
            const fooPackageJsonText = '{ "name": "foo", "version": "1.2.3" }';
            const fooIndexText = "export const x: number;";
            const barFooPackage = new documents.TextDocument("/node_modules/bar/node_modules/foo/package.json", fooPackageJsonText);
            const barFooIndex = new documents.TextDocument("/node_modules/bar/node_modules/foo/index.d.ts", fooIndexText);
            const fooPackage = new documents.TextDocument("/node_modules/foo/package.json", fooPackageJsonText);
            const fooIndex = new documents.TextDocument("/node_modules/foo/index.d.ts", fooIndexText);

            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [a, bar, barFooPackage, barFooIndex, fooPackage, fooIndex], cwd: "/" });
            const program = createProgram(["/a.ts"], emptyOptions, new fakes.CompilerHost(fs, { newLine: NewLineKind.LineFeed }));
            assertIsExternal(program, [a, bar, barFooIndex, fooIndex], f => f !== a);
        });

        it('works on `/// <reference types="" />`', () => {
            const a = new documents.TextDocument("/a.ts", '/// <reference types="foo" />');
            const fooIndex = new documents.TextDocument("/node_modules/foo/index.d.ts", "declare const foo: number;");
            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [a, fooIndex], cwd: "/" });
            const program = createProgram(["/a.ts"], emptyOptions, new fakes.CompilerHost(fs, { newLine: NewLineKind.LineFeed }));
            assertIsExternal(program, [a, fooIndex], f => f !== a);
        });

        function assertIsExternal(program: Program, files: readonly documents.TextDocument[], isExternalExpected: (file: documents.TextDocument) => boolean): void {
            for (const file of files) {
                const actual = program.isSourceFileFromExternalLibrary(program.getSourceFile(file.file)!);
                const expected = isExternalExpected(file);
                assert.equal(actual, expected, `Expected ${file.file} isSourceFileFromExternalLibrary to be ${expected}, got ${actual}`);
            }
        }
    });

    describe("unittests:: Program.getNodeCount / Program.getIdentifierCount", () => {
        it("works on projects that have .json files", () => {
            const main = new documents.TextDocument("/main.ts", 'export { version } from "./package.json";');
            const pkg = new documents.TextDocument("/package.json", '{"version": "1.0.0"}');

            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [main, pkg], cwd: "/" });
            const program = createProgram(["/main.ts"], { resolveJsonModule: true }, new fakes.CompilerHost(fs, { newLine: NewLineKind.LineFeed }));

            const json = program.getSourceFile("/package.json")!;
            assert.equal(json.scriptKind, ScriptKind.JSON);
            assert.isNumber(json.nodeCount);
            assert.isNumber(json.identifierCount);

            assert.isNotNaN(program.getNodeCount());
            assert.isNotNaN(program.getIdentifierCount());
        });
    });

    describe("unittests:: programApi:: Program.getDiagnosticsProducingTypeChecker / Program.getSemanticDiagnostics", () => {
        it("does not produce errors on `as const` it would not normally produce on the command line", () => {
            const main = new documents.TextDocument("/main.ts", "0 as const");

            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [main], cwd: "/" });
            const program = createProgram(["/main.ts"], {}, new fakes.CompilerHost(fs, { newLine: NewLineKind.LineFeed }));
            const typeChecker = program.getDiagnosticsProducingTypeChecker();
            const sourceFile = program.getSourceFile("main.ts")!;
            typeChecker.getTypeAtLocation(((sourceFile.statements[0] as ExpressionStatement).expression as AsExpression).type);
            const diag = program.getSemanticDiagnostics();
            assert.isEmpty(diag);
        });
        it("getSymbolAtLocation does not cause additional error to be added on module resolution failure", () => {
            const main = new documents.TextDocument("/main.ts", "import \"./module\";");
            const mod = new documents.TextDocument("/module.d.ts", "declare const foo: any;");

            const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [main, mod], cwd: "/" });
            const program = createProgram(["/main.ts"], {}, new fakes.CompilerHost(fs, { newLine: NewLineKind.LineFeed }));

            const sourceFile = program.getSourceFile("main.ts")!;
            const typeChecker = program.getDiagnosticsProducingTypeChecker();
            typeChecker.getSymbolAtLocation((sourceFile.statements[0] as ImportDeclaration).moduleSpecifier);
            assert.isEmpty(program.getSemanticDiagnostics());
        });
    });
}
