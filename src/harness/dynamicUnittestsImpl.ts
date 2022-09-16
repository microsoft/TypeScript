
namespace DynamicUnittests {
    export const enum TestType {
        Tsbuild = "tsbuild",
        TsbuildWatch = "tsbuildWatch",
        Tsc = "tsc",
        TscWatch = "tscWatch",
        Tsserver = "tsserver",
    }
    export function runTests(basePath: string, fileName: string, dynamicTestName: string) {
        const content = Harness.IO.readFile(fileName)!;

        // Give file paths an absolute path for the virtual file system
        const absoluteBasePath = ts.combinePaths(Harness.virtualFileSystemRoot, basePath);
        const absoluteFileName = ts.combinePaths(Harness.virtualFileSystemRoot, fileName);

        // Parse out the files and their metadata
        // const testData = parseTestData(absoluteBasePath, content, absoluteFileName);
        // const state = new TestState(absoluteFileName, absoluteBasePath, testType, testData);
        const actualFileName = Harness.IO.resolvePath(fileName) || absoluteFileName;
        const output = ts.transpileModule(content, { reportDiagnostics: true, fileName: actualFileName, compilerOptions: { target: ts.ScriptTarget.ES2015, inlineSourceMap: true, inlineSources: true } });
        if (output.diagnostics?.length) {
            throw new Error(`Syntax error in ${absoluteBasePath}: ${ts.formatDiagnostics(output.diagnostics, {
                getNewLine: () => "\n",
                getCanonicalFileName: ts.createGetCanonicalFileName(Harness.IO.useCaseSensitiveFileNames()),
                getCurrentDirectory: () => ts.getDirectoryPath(absoluteBasePath)
            })}`);
        }
        runCode(output.outputText, actualFileName, dynamicTestName);
    }

    function runCode(code: string, fileName: string, dynamicTestName: string): void {
        // Compile and execute the test
        const generatedFile = ts.changeExtension(fileName, ".js");
        const wrappedCode = `(function(ts, Utils, Harness, vfs, fakes, dynamicTestName) {${code}\n//# sourceURL=${ts.getBaseFileName(generatedFile)}\n})`;

        type SourceMapSupportModule = typeof import("source-map-support") & {
            // TODO(rbuckton): This is missing from the DT definitions and needs to be added.
            resetRetrieveHandlers(): void
        };

        // Provide the content of the current test to 'source-map-support' so that it can give us the correct source positions
        // for test failures.
        let sourceMapSupportModule: SourceMapSupportModule | undefined;
        try {
            sourceMapSupportModule = require("source-map-support");
        }
        catch {
            // do nothing
        }

        sourceMapSupportModule?.install({
            retrieveFile: path => {
                return path === generatedFile ? wrappedCode :
                    undefined!;
            }
        });

        try {
            // eslint-disable-next-line no-eval
            const f = eval(wrappedCode);
            f(ts, Utils, Harness, vfs, fakes, dynamicTestName);
        }
        catch (err) {
            // ensure 'source-map-support' is triggered while we still have the handler attached by accessing `error.stack`.
            err.stack?.toString();
            throw err;
        }
        finally {
            sourceMapSupportModule?.resetRetrieveHandlers();
        }
    }
}