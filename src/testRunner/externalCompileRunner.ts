import * as del from "del";
import * as fs from "fs";
import * as path from "path";

import {
    Baseline,
    IO,
    isWorker,
    RunnerBase,
    TestRunnerKind,
} from "./_namespaces/Harness";
import * as ts from "./_namespaces/ts";

interface ExecResult {
    stdout: Buffer;
    stderr: Buffer;
    status: number | null;
}

interface UserConfig {
    types: string[];
    cloneUrl: string;
    branch?: string;
    path?: string;
}

abstract class ExternalCompileRunnerBase extends RunnerBase {
    abstract testDir: string;
    abstract report(result: ExecResult): string | null;
    enumerateTestFiles() {
        return IO.getDirectories(this.testDir);
    }
    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    initializeTests(): void {
        // Read in and evaluate the test list
        const testList = this.tests && this.tests.length ? this.tests : this.getTestFiles();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const cls = this;
        describe(`${this.kind()} code samples`, function (this: Mocha.Suite) {
            this.timeout(600_000); // 10 minutes
            for (const test of testList) {
                cls.runTest(typeof test === "string" ? test : test.file);
            }
        });
    }
    private runTest(directoryName: string) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const cls = this;
        const timeout = 600_000; // 10 minutes
        describe(directoryName, function (this: Mocha.Suite) {
            this.timeout(timeout);
            const cp: typeof import("child_process") = require("child_process");

            it("should build successfully", () => {
                let cwd = path.join(IO.getWorkspaceRoot(), cls.testDir, directoryName);
                const originalCwd = cwd;
                const stdio = isWorker ? "pipe" : "inherit";
                let types: string[] | undefined;
                if (fs.existsSync(path.join(cwd, "test.json"))) {
                    const config = JSON.parse(fs.readFileSync(path.join(cwd, "test.json"), { encoding: "utf8" })) as UserConfig;
                    ts.Debug.assert(!!config.types, "Bad format from test.json: Types field must be present.");
                    ts.Debug.assert(!!config.cloneUrl, "Bad format from test.json: cloneUrl field must be present.");
                    const submoduleDir = path.join(cwd, directoryName);
                    if (!fs.existsSync(submoduleDir)) {
                        exec("git", ["--work-tree", submoduleDir, "clone", "-b", config.branch || "master", config.cloneUrl, path.join(submoduleDir, ".git")], { cwd });
                    }
                    else {
                        exec("git", ["--git-dir", path.join(submoduleDir, ".git"), "--work-tree", submoduleDir, "checkout", config.branch || "master"], { cwd: submoduleDir });
                        exec("git", ["--git-dir", path.join(submoduleDir, ".git"), "--work-tree", submoduleDir, "reset", "HEAD", "--hard"], { cwd: submoduleDir });
                        exec("git", ["--git-dir", path.join(submoduleDir, ".git"), "--work-tree", submoduleDir, "clean", "-f"], { cwd: submoduleDir });
                        exec("git", ["--git-dir", path.join(submoduleDir, ".git"), "--work-tree", submoduleDir, "pull", "-f"], { cwd: submoduleDir });
                    }

                    types = config.types;

                    cwd = config.path ? path.join(cwd, config.path) : submoduleDir;
                }
                const npmVersionText = exec("npm", ["--version"], { cwd, stdio: "pipe" })?.trim();
                const npmVersion = npmVersionText ? ts.Version.tryParse(npmVersionText.trim()) : undefined;
                const isV7OrLater = !!npmVersion && npmVersion.major >= 7;
                if (fs.existsSync(path.join(cwd, "package.json"))) {
                    if (fs.existsSync(path.join(cwd, "package-lock.json"))) {
                        fs.unlinkSync(path.join(cwd, "package-lock.json"));
                    }
                    if (fs.existsSync(path.join(cwd, "node_modules"))) {
                        del.sync(path.join(cwd, "node_modules"), { force: true });
                    }
                    exec("npm", ["i", "--ignore-scripts", ...(isV7OrLater ? ["--legacy-peer-deps"] : [])], { cwd, timeout: timeout / 2 }); // NPM shouldn't take the entire timeout - if it takes a long time, it should be terminated and we should log the failure
                }
                const args = [path.join(IO.getWorkspaceRoot(), "built/local/tsc.js")];
                if (types) {
                    args.push("--types", types.join(","));
                    // Also actually install those types (for, eg, the js projects which need node)
                    if (types.length) {
                        exec("npm", ["i", ...types.map(t => `@types/${t}`), "--no-save", "--ignore-scripts", ...(isV7OrLater ? ["--legacy-peer-deps"] : [])], { cwd: originalCwd, timeout: timeout / 2 }); // NPM shouldn't take the entire timeout - if it takes a long time, it should be terminated and we should log the failure
                    }
                }
                args.push("--noEmit");
                Baseline.runBaseline(`${cls.kind()}/${directoryName}.log`, cls.report(cp.spawnSync(`node`, args, { cwd, timeout, shell: true })));

                function exec(command: string, args: string[], options: { cwd: string, timeout?: number, stdio?: import("child_process").StdioOptions }): string | undefined {
                    const res = cp.spawnSync(isWorker ? `${command} 2>&1` : command, args, { shell: true, stdio, ...options });
                    if (res.status !== 0) {
                        throw new Error(`${command} ${args.join(" ")} for ${directoryName} failed: ${res.stdout && res.stdout.toString()}`);
                    }
                    return options.stdio === "pipe" ? res.stdout.toString("utf8") : undefined;
                }
            });
        });
    }
}

export class DefinitelyTypedRunner extends ExternalCompileRunnerBase {
    readonly testDir = "../DefinitelyTyped/types/";
    override workingDirectory = this.testDir;
    kind(): TestRunnerKind {
        return "dt";
    }
    report(result: ExecResult) {
        // eslint-disable-next-line no-null/no-null
        return !result.stdout.length && !result.stderr.length ? null : `Exit Code: ${result.status}
Standard output:
${result.stdout.toString().replace(/\r\n/g, "\n")}


Standard error:
${result.stderr.toString().replace(/\r\n/g, "\n")}`;
    }
}
