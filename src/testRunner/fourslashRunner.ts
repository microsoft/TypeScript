import * as FourSlash from "./_namespaces/FourSlash.js";
import {
    IO,
    RunnerBase,
    TestRunnerKind,
} from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";

export class FourSlashRunner extends RunnerBase {
    protected basePath: string;
    protected testSuiteName: TestRunnerKind;

    constructor(private testType: FourSlash.FourSlashTestType) {
        super();
        switch (testType) {
            case FourSlash.FourSlashTestType.Native:
                this.basePath = "tests/cases/fourslash";
                this.testSuiteName = "fourslash";
                break;
            case FourSlash.FourSlashTestType.Server:
                this.basePath = "tests/cases/fourslash/server";
                this.testSuiteName = "fourslash-server";
                break;
            default:
                throw ts.Debug.assertNever(testType);
        }
    }

    public enumerateTestFiles(): string[] {
        // see also: `enumerateTestFiles` in tests/webTestServer.ts
        return this.enumerateFiles(this.basePath, /\.ts/i, { recursive: false });
    }

    public kind(): TestRunnerKind {
        return this.testSuiteName;
    }

    public initializeTests(): void {
        if (this.tests.length === 0) {
            this.tests = IO.enumerateTestFiles(this);
        }

        describe(this.testSuiteName + " tests", () => {
            this.tests.forEach(file => {
                describe(file, () => {
                    let fn = ts.normalizeSlashes(file);
                    const justName = fn.replace(/^.*[\\/]/, "");

                    // Convert to relative path
                    const testIndex = fn.indexOf("tests/");
                    if (testIndex >= 0) fn = fn.substr(testIndex);

                    if (justName !== "fourslash.ts") {
                        let serverLogBaseliner: FourSlash.FourSlashServerLogBaseliner = {};
                        after(() => {
                            serverLogBaseliner = undefined!;
                        });
                        it(this.testSuiteName + " test " + justName + " runs correctly", () => {
                            FourSlash.runFourSlashTest(this.basePath, this.testType, fn, serverLogBaseliner);
                        });
                        if (this.testType === FourSlash.FourSlashTestType.Server) {
                            it(this.testSuiteName + " test " + justName + " tsserver log", () => {
                                serverLogBaseliner.baseline?.();
                            });
                        }
                    }
                });
            });
        });
    }
}

export class GeneratedFourslashRunner extends FourSlashRunner {
    constructor(testType: FourSlash.FourSlashTestType) {
        super(testType);
        this.basePath += "/generated/";
    }
}
