/// <reference path="harness.ts"/>
/// <reference path="runnerbase.ts" />
abstract class ExternalCompileRunnerBase extends RunnerBase {
    abstract testDir: string;
    public enumerateTestFiles() {
        return Harness.IO.getDirectories(this.testDir);
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
                const cwd = path.join(__dirname, "../../", this.testDir, directoryName);
                const timeout = 600000; // 600s = 10 minutes
                if (fs.existsSync(path.join(cwd, "package.json"))) {
                    if (fs.existsSync(path.join(cwd, "package-lock.json"))) {
                        fs.unlinkSync(path.join(cwd, "package-lock.json"));
                    }
                    const stdio = isWorker ? "pipe" : "inherit";
                    const install = cp.spawnSync(`npm`, ["i"], { cwd, timeout, shell: true, stdio });
                    if (install.status !== 0) throw new Error(`NPM Install for ${directoryName} failed!`);
                }
                Harness.Baseline.runBaseline(`${this.kind()}/${directoryName}.log`, () => {
                    const result = cp.spawnSync(`node`, [path.join(__dirname, "tsc.js")], { cwd, timeout, shell: true });
                    // tslint:disable-next-line:no-null-keyword
                    return result.status === 0 ? null : `Exit Code: ${result.status}
Standard output:
${result.stdout.toString().replace(/\r\n/g, "\n")}


Standard error:
${result.stderr.toString().replace(/\r\n/g, "\n")}`;
                });
            });
        });
    }
}

class UserCodeRunner extends ExternalCompileRunnerBase {
    public readonly testDir = "tests/cases/user/";
    public kind(): TestRunnerKind {
        return "user";
    }
}

class DefinitelyTypedRunner extends ExternalCompileRunnerBase {
    public readonly testDir = "../DefinitelyTyped/types/";
    public workingDirectory = this.testDir;
    public kind(): TestRunnerKind {
        return "dt";
    }
}
