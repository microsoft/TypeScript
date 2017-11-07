/// <reference path="harness.ts"/>
/// <reference path="runnerbase.ts" />
class DefinitelyTypedRunner extends RunnerBase {
    private static readonly testDir = "../DefinitelyTyped/types/";

    public workingDirectory = DefinitelyTypedRunner.testDir;

    public enumerateTestFiles() {
        return Harness.IO.getDirectories(DefinitelyTypedRunner.testDir);
    }

    public kind(): TestRunnerKind {
        return "dt";
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        // Read in and evaluate the test list
        const testList = this.tests && this.tests.length ? this.tests : this.enumerateTestFiles();

        describe(`${this.kind()} code samples`, () => {
            for (const test of testList) {
                this.runTest(test);
            }
        });
    }

    private runTest(directoryName: string) {
        describe(directoryName, () => {
            const cp = require("child_process");
            const path = require("path");
            const fs = require("fs");

            it("should build successfully", () => {
                const cwd = path.join(__dirname, "../../", DefinitelyTypedRunner.testDir, directoryName);
                const timeout = 600000; // 600s = 10 minutes
                if (fs.existsSync(path.join(cwd, "package.json"))) {
                    const stdio = isWorker ? "pipe" : "inherit";
                    const install = cp.spawnSync(`npm`, ["i"], { cwd, timeout, shell: true, stdio });
                    if (install.status !== 0) throw new Error(`NPM Install for ${directoryName} failed!`);
                }
                Harness.Baseline.runBaseline(`${this.kind()}/${directoryName}.log`, () => {
                    const result = cp.spawnSync(`node`, [path.join(__dirname, "tsc.js")], { cwd, timeout, shell: true });
 // tslint:disable:no-null-keyword
                    return result.status === 0 ? null : `Exit Code: ${result.status}
Standard output:
${result.stdout.toString().replace(/\r\n/g, "\n")}


Standard error:
${result.stderr.toString().replace(/\r\n/g, "\n")}`;
 // tslint:enable:no-null-keyword
                });
            });
        });
    }
}
