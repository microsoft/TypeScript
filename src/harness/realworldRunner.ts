/// <reference path="harness.ts"/>
/// <reference path="runnerbase.ts" />
class RealworldRunner extends RunnerBase {
    private static readonly testDir = "tests/cases/realworld/";
    public enumerateTestFiles() {
        return Harness.IO.getDirectories(RealworldRunner.testDir);
    }

    public kind(): TestRunnerKind {
        return "realworld";
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        // Read in and evaluate the test list
        const testList = this.tests && this.tests.length ? this.tests : this.enumerateTestFiles();

        describe("realworld code samples", () => {
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
                const cwd = path.join(__dirname, "../../", RealworldRunner.testDir, directoryName);
                const timeout = 600000; // 10 minutes
                const stdio = isWorker ? "pipe" : "inherit";
                const install = cp.spawnSync(`npm`, ["i"], { cwd, timeout, shell: true, stdio });
                if (install.status !== 0) throw new Error(`NPM Install for ${directoryName} failed!`);
                Harness.Baseline.runBaseline(`realworld/${directoryName}.log`, () => {
                    const result = cp.spawnSync(`node`, ["../../../../built/local/tsc.js"], { cwd, timeout, shell: true });
                    return `Exit Code: ${result.status}
Standard output:
${result.stdout.toString()}


Standard error:
${result.stderr.toString()}`;
                });
            });
        });
    }
}
