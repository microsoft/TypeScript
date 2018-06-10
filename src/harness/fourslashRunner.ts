///<reference path="fourslash.ts" />
///<reference path="harness.ts"/>
///<reference path="runnerbase.ts" />

const enum FourSlashTestType {
    Native,
    Shims,
    ShimsWithPreprocess,
    Server
}

class FourSlashRunner extends RunnerBase {
    protected basePath: string;
    protected testSuiteName: TestRunnerKind;

    constructor(private testType: FourSlashTestType) {
        super();
        switch (testType) {
            case FourSlashTestType.Native:
                this.basePath = "tests/cases/fourslash";
                this.testSuiteName = "fourslash";
                break;
            case FourSlashTestType.Shims:
                this.basePath = "tests/cases/fourslash/shims";
                this.testSuiteName = "fourslash-shims";
                break;
            case FourSlashTestType.ShimsWithPreprocess:
                this.basePath = "tests/cases/fourslash/shims-pp";
                this.testSuiteName = "fourslash-shims-pp";
                break;
            case FourSlashTestType.Server:
                this.basePath = "tests/cases/fourslash/server";
                this.testSuiteName = "fourslash-server";
                break;
        }
    }

    public enumerateTestFiles() {
        // see also: `enumerateTestFiles` in tests/webTestServer.ts
        return this.enumerateFiles(this.basePath, /\.ts/i, { recursive: false });
    }

    public kind() {
        return this.testSuiteName;
    }

    public initializeTests() {
        if (this.tests.length === 0) {
            this.tests = Harness.IO.enumerateTestFiles(this);
        }

        describe(this.testSuiteName + " tests", () => {
            this.tests.forEach(test => {
                const file = typeof test === "string" ? test : test.file;
                describe(file, () => {
                    let fn = ts.normalizeSlashes(file);
                    const justName = fn.replace(/^.*[\\\/]/, "");

                    // Convert to relative path
                    const testIndex = fn.indexOf("tests/");
                    if (testIndex >= 0) fn = fn.substr(testIndex);

                    if (justName && !justName.match(/fourslash\.ts$/i) && !justName.match(/\.d\.ts$/i)) {
                        it(this.testSuiteName + " test " + justName + " runs correctly", () => {
                            FourSlash.runFourSlashTest(this.basePath, this.testType, fn);
                        });
                    }
                });
            });
        });
    }
}

class GeneratedFourslashRunner extends FourSlashRunner {
    constructor(testType: FourSlashTestType) {
        super(testType);
        this.basePath += "/generated/";
    }
}
