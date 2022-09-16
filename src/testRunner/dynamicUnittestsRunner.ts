declare const dynamicTestName: string;
namespace Harness {
    export class DynamicUnittestsRunner extends RunnerBase {
        protected basePath: string;
        constructor(protected testSuiteName: DynamicUnittests.TestType) {
            super();
            this.basePath = `tests/cases/${testSuiteName}`;
        }
        public enumerateTestFiles() {
            // see also: `enumerateTestFiles` in tests/webTestServer.ts
            return this.enumerateFiles(this.basePath, /\.ts/i, { recursive: true });
        }

        public kind() {
            return this.testSuiteName;
        }

        public initializeTests() {
            if (this.tests.length === 0) {
                this.tests = IO.enumerateTestFiles(this);
            }

            describe(this.testSuiteName + " tests", () => {
                this.tests.forEach(test => {
                    const file = typeof test === "string" ? test : test.file;
                    describe(file, () => {
                        let fn = ts.normalizeSlashes(file);
                        const justName = fn.replace(this.basePath + "/", "");

                        // Convert to relative path
                        const testIndex = fn.indexOf("tests/");
                        if (testIndex >= 0) fn = fn.substr(testIndex);
                        it(this.testSuiteName + " test " + justName + " runs correctly", () => {
                            DynamicUnittests.runTests(this.basePath, fn, `${this.testSuiteName} ${justName.replace("/", " ")}`);
                        });
                    });
                });
            });
        }
    }
}