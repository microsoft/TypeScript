/// <reference path="harness.ts"/>
/// <reference path="runnerbase.ts" />
class UserCodeRunner extends RunnerBase {
    private static readonly testDir = "tests/cases/user/";
    public enumerateTestFiles() {
        return Harness.IO.getDirectories(UserCodeRunner.testDir);
    }

    public kind(): TestRunnerKind {
        return "user";
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        // Read in and evaluate the test list
        const testList = this.tests && this.tests.length ? this.tests : this.enumerateTestFiles();

        describe(`${this.kind()} code samples`, () => {
            for (let i = 0; i < testList.length; i++) {
                this.runTest(testList[i]);
            }
        });
    }

    private runTest(directoryName: string) {
        describe(directoryName, () => {
            const cp = require("child_process");
            const path = require("path");

            it("should build successfully", () => {
                const cwd = path.join(__dirname, "../../", UserCodeRunner.testDir, directoryName);
                const timeout = 600000; // 10 minutes
                const stdio = isWorker ? "pipe" : "inherit";
                const install = cp.spawnSync(`npm`, ["i"], { cwd, timeout, shell: true, stdio });
                if (install.status !== 0) throw new Error(`NPM Install for ${directoryName} failed!`);
                Harness.Baseline.runBaseline(`${this.kind()}/${directoryName}.log`, () => {
                    const result = cp.spawnSync(`node`, ["../../../../built/local/tsc.js"], { cwd, timeout, shell: true });
                    return `Exit Code: ${result.status}
Standard output:
${result.stdout.toString().replace(/\r\n/g, "\n")}


Standard error:
${result.stderr.toString().replace(/\r\n/g, "\n")}`;
                });
            });
        });
    }
}
