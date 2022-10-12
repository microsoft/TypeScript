import * as ts from "./_namespaces/ts";
import * as compiler from "./_namespaces/compiler";
import * as Utils from "./_namespaces/Utils";
import { Baseline, Compiler, IO, RunnerBase, TestCaseParser, TestRunnerKind } from "./_namespaces/Harness";

// In harness baselines, null is different than undefined. See `generateActual` in `harness.ts`.
export class Test262BaselineRunner extends RunnerBase {
    private static readonly basePath = "internal/cases/test262";
    private static readonly helpersFilePath = "tests/cases/test262-harness/helpers.d.ts";
    private static readonly helperFile: Compiler.TestFile = {
        unitName: Test262BaselineRunner.helpersFilePath,
        content: IO.readFile(Test262BaselineRunner.helpersFilePath)!,
    };
    private static readonly testFileExtensionRegex = /\.js$/;
    private static readonly options: ts.CompilerOptions = {
        allowNonTsExtensions: true,
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.CommonJS
    };
    private static readonly baselineOptions: Baseline.BaselineOptions = {
        Subfolder: "test262",
        Baselinefolder: "internal/baselines"
    };

    private static getTestFilePath(filename: string): string {
        return Test262BaselineRunner.basePath + "/" + filename;
    }

    private runTest(filePath: string) {
        describe("test262 test for " + filePath, () => {
            // Mocha holds onto the closure environment of the describe callback even after the test is done.
            // Everything declared here should be cleared out in the "after" callback.
            let testState: {
                filename: string;
                compilerResult: compiler.CompilationResult;
                inputFiles: Compiler.TestFile[];
            };

            before(() => {
                const content = IO.readFile(filePath)!;
                const testFilename = ts.removeFileExtension(filePath).replace(/\//g, "_") + ".test";
                const testCaseContent = TestCaseParser.makeUnitsFromTest(content, testFilename);

                const inputFiles: Compiler.TestFile[] = testCaseContent.testUnitData.map(unit => {
                    const unitName = Test262BaselineRunner.getTestFilePath(unit.name);
                    return { unitName, content: unit.content };
                });

                // Emit the results
                testState = {
                    filename: testFilename,
                    inputFiles,
                    compilerResult: undefined!, // TODO: GH#18217
                };

                testState.compilerResult = Compiler.compileFiles(
                    [Test262BaselineRunner.helperFile].concat(inputFiles),
                    /*otherFiles*/ [],
                    /* harnessOptions */ undefined,
                    Test262BaselineRunner.options,
                    /* currentDirectory */ undefined);
            });

            after(() => {
                testState = undefined!;
            });

            it("has the expected emitted code", () => {
                const files = Array.from(testState.compilerResult.js.values()).filter(f => f.file !== Test262BaselineRunner.helpersFilePath);
                Baseline.runBaseline(testState.filename + ".output.js", Compiler.collateOutputs(files), Test262BaselineRunner.baselineOptions);
            });

            it("has the expected errors", () => {
                const errors = testState.compilerResult.diagnostics;
                // eslint-disable-next-line no-null/no-null
                const baseline = errors.length === 0 ? null : Compiler.getErrorBaseline(testState.inputFiles, errors);
                Baseline.runBaseline(testState.filename + ".errors.txt", baseline, Test262BaselineRunner.baselineOptions);
            });

            it("satisfies invariants", () => {
                const sourceFile = testState.compilerResult.program!.getSourceFile(Test262BaselineRunner.getTestFilePath(testState.filename));
                Utils.assertInvariants(sourceFile, /*parent:*/ undefined);
            });

            it("has the expected AST", () => {
                const sourceFile = testState.compilerResult.program!.getSourceFile(Test262BaselineRunner.getTestFilePath(testState.filename))!;
                Baseline.runBaseline(testState.filename + ".AST.txt", Utils.sourceFileToJSON(sourceFile), Test262BaselineRunner.baselineOptions);
            });
        });
    }

    public kind(): TestRunnerKind {
        return "test262";
    }

    public enumerateTestFiles() {
        // see also: `enumerateTestFiles` in tests/webTestServer.ts
        return ts.map(this.enumerateFiles(Test262BaselineRunner.basePath, Test262BaselineRunner.testFileExtensionRegex, { recursive: true }), ts.normalizePath);
    }

    public initializeTests() {
        // this will set up a series of describe/it blocks to run between the setup and cleanup phases
        if (this.tests.length === 0) {
            const testFiles = this.getTestFiles();
            testFiles.forEach(fn => {
                this.runTest(fn);
            });
        }
        else {
            this.tests.forEach(test => this.runTest(typeof test === "string" ? test : test.file));
        }
    }
}