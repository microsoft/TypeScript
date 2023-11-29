import * as documents from "../_namespaces/documents";
import * as fakes from "../_namespaces/fakes";
import * as Harness from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
import * as vfs from "../_namespaces/vfs";
import {
    jsonToReadableText,
} from "./helpers";

function verifyMissingFilePaths(missing: ReturnType<ts.Program["getMissingFilePaths"]>, expected: readonly string[]) {
    assert.isDefined(missing);
    const missingPaths = ts.arrayFrom(missing.keys());
    const map = new Set(expected);
    for (const missing of missingPaths) {
        const value = map.has(missing);
        assert.isTrue(value, `${missing} to be ${value === undefined ? "not present" : "present only once"}, in actual: ${missingPaths} expected: ${expected}`);
        map.delete(missing);
    }
    const notFound = ts.arrayFrom(ts.mapDefinedIterator(map.keys(), k => map.has(k) ? k : undefined));
    assert.equal(notFound.length, 0, `Not found ${notFound} in actual: ${missingPaths} expected: ${expected}`);
}

describe("unittests:: programApi:: Program.getMissingFilePaths", () => {
    const options: ts.CompilerOptions = {
        noLib: true,
    };

    const emptyFileName = "empty.ts";
    const emptyFileRelativePath = "./" + emptyFileName;

    const emptyFile = new documents.TextDocument(emptyFileName, "");

    const referenceFileName = "reference.ts";
    const referenceFileRelativePath = "./" + referenceFileName;

    const referenceFile = new documents.TextDocument(
        referenceFileName,
        '/// <reference path="d:/imaginary/nonexistent1.ts"/>\n' + // Absolute
            '/// <reference path="./nonexistent2.ts"/>\n' + // Relative
            '/// <reference path="nonexistent3.ts"/>\n' + // Unqualified
            '/// <reference path="nonexistent4"/>\n', // No extension
    );

    const testCompilerHost = new fakes.CompilerHost(
        vfs.createFromFileSystem(
            Harness.IO,
            /*ignoreCase*/ true,
            { documents: [emptyFile, referenceFile], cwd: "d:\\pretend\\" },
        ),
        { newLine: ts.NewLineKind.LineFeed },
    );

    it("handles no missing root files", () => {
        const program = ts.createProgram([emptyFileRelativePath], options, testCompilerHost);
        const missing = program.getMissingFilePaths();
        verifyMissingFilePaths(missing, []);
    });

    it("handles missing root file", () => {
        const program = ts.createProgram(["./nonexistent.ts"], options, testCompilerHost);
        const missing = program.getMissingFilePaths();
        verifyMissingFilePaths(missing, ["d:/pretend/nonexistent.ts"]); // Absolute path
    });

    it("handles multiple missing root files", () => {
        const program = ts.createProgram(["./nonexistent0.ts", "./nonexistent1.ts"], options, testCompilerHost);
        const missing = program.getMissingFilePaths();
        verifyMissingFilePaths(missing, ["d:/pretend/nonexistent0.ts", "d:/pretend/nonexistent1.ts"]);
    });

    it("handles a mix of present and missing root files", () => {
        const program = ts.createProgram(["./nonexistent0.ts", emptyFileRelativePath, "./nonexistent1.ts"], options, testCompilerHost);
        const missing = program.getMissingFilePaths();
        verifyMissingFilePaths(missing, ["d:/pretend/nonexistent0.ts", "d:/pretend/nonexistent1.ts"]);
    });

    it("handles repeatedly specified root files", () => {
        const program = ts.createProgram(["./nonexistent.ts", "./nonexistent.ts"], options, testCompilerHost);
        const missing = program.getMissingFilePaths();
        verifyMissingFilePaths(missing, ["d:/pretend/nonexistent.ts"]);
    });

    it("normalizes file paths", () => {
        const program0 = ts.createProgram(["./nonexistent.ts", "./NONEXISTENT.ts"], options, testCompilerHost);
        const program1 = ts.createProgram(["./NONEXISTENT.ts", "./nonexistent.ts"], options, testCompilerHost);
        const missing0 = ts.arrayFrom(program0.getMissingFilePaths().keys());
        const missing1 = ts.arrayFrom(program1.getMissingFilePaths().keys());
        assert.equal(missing0.length, 1);
        assert.deepEqual(missing0, missing1);
    });

    it("handles missing triple slash references", () => {
        const program = ts.createProgram([referenceFileRelativePath], options, testCompilerHost);
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
            "d:/pretend/nonexistent4.tsx",
        ]);
    });

    it("should not have missing file paths", () => {
        const testSource = `
            class Foo extends HTMLElement {
                bar: string = 'baz';
            }`;

        const host: ts.CompilerHost = {
            getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget, _onError?: (message: string) => void) => {
                return fileName === "test.ts" ? ts.createSourceFile(fileName, testSource, languageVersion) : undefined;
            },
            getDefaultLibFileName: () => "",
            writeFile: (_fileName, _content) => {
                throw new Error("unsupported");
            },
            getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
            getCanonicalFileName: fileName => ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
            getNewLine: () => ts.sys.newLine,
            useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
            fileExists: fileName => fileName === "test.ts",
            readFile: fileName => fileName === "test.ts" ? testSource : undefined,
            resolveModuleNames: (_moduleNames: string[], _containingFile: string) => {
                throw new Error("unsupported");
            },
            getDirectories: _path => {
                throw new Error("unsupported");
            },
        };

        const program = ts.createProgram(["test.ts"], { module: ts.ModuleKind.ES2015 }, host);
        assert(program.getSourceFiles().length === 1, "expected 'getSourceFiles' length to be 1");
        assert(program.getMissingFilePaths().size === 0, "expected 'getMissingFilePaths' length to be 0");
        assert((program.getFileProcessingDiagnostics()?.length || 0) === 0, "expected 'getFileProcessingDiagnostics' length to be 0");
    });
});

describe("unittests:: Program.isSourceFileFromExternalLibrary", () => {
    it("works on redirect files", () => {
        // In this example '/node_modules/foo/index.d.ts' will redirect to '/node_modules/bar/node_modules/foo/index.d.ts'.
        const a = new documents.TextDocument("/a.ts", 'import * as bar from "bar"; import * as foo from "foo";');
        const bar = new documents.TextDocument("/node_modules/bar/index.d.ts", 'import * as foo from "foo";');
        const fooPackageJsonText = jsonToReadableText({ name: "foo", version: "1.2.3" });
        const fooIndexText = "export const x: number;";
        const barFooPackage = new documents.TextDocument("/node_modules/bar/node_modules/foo/package.json", fooPackageJsonText);
        const barFooIndex = new documents.TextDocument("/node_modules/bar/node_modules/foo/index.d.ts", fooIndexText);
        const fooPackage = new documents.TextDocument("/node_modules/foo/package.json", fooPackageJsonText);
        const fooIndex = new documents.TextDocument("/node_modules/foo/index.d.ts", fooIndexText);

        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [a, bar, barFooPackage, barFooIndex, fooPackage, fooIndex], cwd: "/" });
        const program = ts.createProgram(["/a.ts"], ts.emptyOptions, new fakes.CompilerHost(fs, { newLine: ts.NewLineKind.LineFeed }));
        assertIsExternal(program, [a, bar, barFooIndex, fooIndex], f => f !== a);
    });

    it('works on `/// <reference types="" />`', () => {
        const a = new documents.TextDocument("/a.ts", '/// <reference types="foo" />');
        const fooIndex = new documents.TextDocument("/node_modules/foo/index.d.ts", "declare const foo: number;");
        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [a, fooIndex], cwd: "/" });
        const program = ts.createProgram(["/a.ts"], ts.emptyOptions, new fakes.CompilerHost(fs, { newLine: ts.NewLineKind.LineFeed }));
        assertIsExternal(program, [a, fooIndex], f => f !== a);
    });

    function assertIsExternal(program: ts.Program, files: readonly documents.TextDocument[], isExternalExpected: (file: documents.TextDocument) => boolean): void {
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
        const pkg = new documents.TextDocument("/package.json", jsonToReadableText({ version: "1.0.0" }));

        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [main, pkg], cwd: "/" });
        const program = ts.createProgram(["/main.ts"], { resolveJsonModule: true }, new fakes.CompilerHost(fs, { newLine: ts.NewLineKind.LineFeed }));

        const json = program.getSourceFile("/package.json")!;
        assert.equal(json.scriptKind, ts.ScriptKind.JSON);
        assert.isNumber(json.nodeCount);
        assert.isNumber(json.identifierCount);

        assert.isNotNaN(program.getNodeCount());
        assert.isNotNaN(program.getIdentifierCount());
    });
});

describe("unittests:: programApi:: Program.getTypeChecker / Program.getSemanticDiagnostics", () => {
    it("does not produce errors on `as const` it would not normally produce on the command line", () => {
        const main = new documents.TextDocument("/main.ts", "0 as const");

        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [main], cwd: "/" });
        const program = ts.createProgram(["/main.ts"], {}, new fakes.CompilerHost(fs, { newLine: ts.NewLineKind.LineFeed }));
        const typeChecker = program.getTypeChecker();
        const sourceFile = program.getSourceFile("main.ts")!;
        typeChecker.getTypeAtLocation(((sourceFile.statements[0] as ts.ExpressionStatement).expression as ts.AsExpression).type);
        const diag = program.getSemanticDiagnostics();
        assert.isEmpty(diag);
    });
    it("getSymbolAtLocation does not cause additional error to be added on module resolution failure", () => {
        const main = new documents.TextDocument("/main.ts", 'import "./module";');
        const mod = new documents.TextDocument("/module.d.ts", "declare const foo: any;");

        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [main, mod], cwd: "/" });
        const program = ts.createProgram(["/main.ts"], {}, new fakes.CompilerHost(fs, { newLine: ts.NewLineKind.LineFeed }));

        const sourceFile = program.getSourceFile("main.ts")!;
        const typeChecker = program.getTypeChecker();
        typeChecker.getSymbolAtLocation((sourceFile.statements[0] as ts.ImportDeclaration).moduleSpecifier);
        assert.isEmpty(program.getSemanticDiagnostics());
    });
});

describe("unittests:: programApi:: CompilerOptions relative paths", () => {
    it("resolves relative paths by getCurrentDirectory", () => {
        const main = new documents.TextDocument("/main.ts", 'import "module";');
        const mod = new documents.TextDocument("/lib/module.ts", "declare const foo: any;");

        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, { documents: [main, mod], cwd: "/" });
        const program = ts.createProgram(["./main.ts"], {
            paths: { "*": ["./lib/*"] },
        }, new fakes.CompilerHost(fs, { newLine: ts.NewLineKind.LineFeed }));

        assert.isEmpty(program.getConfigFileParsingDiagnostics());
        assert.isEmpty(program.getGlobalDiagnostics());
        assert.isEmpty(program.getSemanticDiagnostics());
    });
});
