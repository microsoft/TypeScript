/// <reference path="harness.ts"/>
/// <reference path="runnerbase.ts" />
const fs = require("fs");
const path = require("path");
abstract class ExternalCompileRunnerBase extends RunnerBase {
    abstract testDir: string;
    abstract report(result: any, cwd: string): string;
    enumerateTestFiles() {
        return Harness.IO.getDirectories(this.testDir);
    }
    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    initializeTests(): void {
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
                    return this.report(cp.spawnSync(`node`, [path.join(__dirname, "tsc.js")], { cwd, timeout, shell: true }), cwd);
                });
            });
        });
    }
}

class UserCodeRunner extends ExternalCompileRunnerBase {
    readonly testDir = "tests/cases/user/";
    kind(): TestRunnerKind {
        return "user";
    }
    report(result: any) {
        // tslint:disable-next-line:no-null-keyword
        return result.status === 0 && !result.stdout.length && !result.stderr.length ? null : `Exit Code: ${result.status}
Standard output:
${result.stdout.toString().replace(/\r\n/g, "\n")}


Standard error:
${result.stderr.toString().replace(/\r\n/g, "\n")}`;
    }
}

class DefinitelyTypedRunner extends ExternalCompileRunnerBase {
    readonly testDir = "../DefinitelyTyped/types/";
    workingDirectory = this.testDir;
    kind(): TestRunnerKind {
        return "dt";
    }
    report(result: any, cwd: string) {
        const stdout = filterExpectedErrors(result.stdout.toString(), cwd)
        const stderr = result.stderr.toString()
        // tslint:disable-next-line:no-null-keyword
        return !stdout.length && !stderr.length ? null : `Exit Code: ${result.status}
Standard output:
${stdout.replace(/\r\n/g, "\n")}


Standard error:
${stderr.replace(/\r\n/g, "\n")}`;
    }
}

function filterExpectedErrors(errors: string, cwd: string): string {
    return breaks(errors.split("\n"), s => /^\w+/.test(s)).filter(isExpectedError(cwd)).map(lines => lines.join("\n")).join("\n");
}
function isExpectedError(cwd: string) {
    return (error: string[]) => {
        if (error.length === 0) {
            return true;
        }
        const match = error[0].match(/(.+\.ts)\((\d+),\d+\): error TS/);
        if (!match) {
            return true;
        }
        const errlines = fs.readFileSync(path.join(cwd, match[1]), { encoding: "utf8" }).split("\n");
        const index = parseInt(match[2]);
        const errline = index < errlines.length ? errlines[index] : "";
        const prevline = index - 1 < errlines.length && index > 0 ? errlines[index - 1] : "";
        if (errline.indexOf("$ExpectError") > -1 || prevline.indexOf("$ExpectError") > -1) {
            return false;
        }
        return true;
    }
}
function breaks<T>(xs: T[], isStart: (T: any) => boolean): T[][] {
    const result = [];
    let group: T[] = [];
    for (const x of xs) {
        if (isStart(x)) {
            if (group.length) {
                result.push(group);
            }
            group = [x];
        }
        else {
            group.push(x);
        }
    }
    if (group.length) {
        result.push(group);
    }
    return result;
}
