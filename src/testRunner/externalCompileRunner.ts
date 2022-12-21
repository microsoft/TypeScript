import * as del from "del";
import * as fs from "fs";
import * as path from "path";

import * as ts from "./_namespaces/ts";
import {
    Baseline,
    IO,
    isWorker,
    RunnerBase,
    TestRunnerKind,
} from "./_namespaces/Harness";

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

export class UserCodeRunner extends ExternalCompileRunnerBase {
    readonly testDir = "tests/cases/user/";
    kind(): TestRunnerKind {
        return "user";
    }
    report(result: ExecResult) {
        // eslint-disable-next-line no-null/no-null
        return result.status === 0 && !result.stdout.length && !result.stderr.length ? null : `Exit Code: ${result.status}
Standard output:
${sortErrors(stripAbsoluteImportPaths(result.stdout.toString().replace(/\r\n/g, "\n")))}


Standard error:
${stripAbsoluteImportPaths(result.stderr.toString().replace(/\r\n/g, "\n"))}`;
    }
}

export class DockerfileRunner extends ExternalCompileRunnerBase {
    readonly testDir = "tests/cases/docker/";
    kind(): TestRunnerKind {
        return "docker";
    }
    initializeTests(): void {
        // Read in and evaluate the test list
        const testList = this.tests && this.tests.length ? this.tests : this.getTestFiles();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const cls = this;
        describe(`${this.kind()} code samples`, function (this: Mocha.Suite) {
            this.timeout(cls.timeout); // 20 minutes
            before(() => {
                // cached because workspace is hashed to determine cacheability
                cls.exec("docker", ["build", ".", "-t", "typescript/typescript", "-f", cls.testDir + "Dockerfile"], {
                    cwd: IO.getWorkspaceRoot(),
                    env: { ...process.env, DOCKER_BUILDKIT: "1" }, // We need buildkit to allow Dockerfile.dockerignore to work.
                });
            });
            for (const test of testList) {
                const directory = typeof test === "string" ? test : test.file;
                const cwd = path.join(IO.getWorkspaceRoot(), cls.testDir, directory);
                it(`should build ${directory} successfully`, () => {
                    const imageName = `tstest/${directory}`;
                    cls.exec("docker", ["build", "--no-cache", ".", "-t", imageName], { cwd }); // --no-cache so the latest version of the repos referenced is always fetched
                    const cp: typeof import("child_process") = require("child_process");
                    Baseline.runBaseline(`${cls.kind()}/${directory}.log`, cls.report(cp.spawnSync(`docker`, ["run", imageName], { cwd, timeout: cls.timeout, shell: true })));
                });
            }
        });
    }

    private timeout = 1_200_000; // 20 minutes;
    private exec(command: string, args: string[], options: { cwd: string; env?: NodeJS.ProcessEnv }): void {
        const cp: typeof import("child_process") = require("child_process");
        const stdio = isWorker ? "pipe" : "inherit";
        const res = cp.spawnSync(isWorker ? `${command} 2>&1` : command, args, { timeout: this.timeout, shell: true, stdio, ...options });
        if (res.status !== 0) {
            throw new Error(`${command} ${args.join(" ")} for ${options.cwd} failed: ${res.stdout && res.stdout.toString()}`);
        }
    }
    report(result: ExecResult) {
        // eslint-disable-next-line no-null/no-null
        return result.status === 0 && !result.stdout.length && !result.stderr.length ? null : `Exit Code: ${result.status}
Standard output:
${sanitizeDockerfileOutput(result.stdout.toString())}


Standard error:
${sanitizeDockerfileOutput(result.stderr.toString())}`;
    }
}

function sanitizeDockerfileOutput(result: string): string {
    return [
        normalizeNewlines,
        stripANSIEscapes,
        stripRushStageNumbers,
        stripWebpackHash,
        sanitizeVersionSpecifiers,
        sanitizeTimestamps,
        sanitizeSizes,
        sanitizeUnimportantGulpOutput,
        stripAbsoluteImportPaths,
    ].reduce((result, f) => f(result), result);
}

function normalizeNewlines(result: string): string {
    return result.replace(/\r\n/g, "\n");
}

function stripANSIEscapes(result: string): string {
    return result.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, "");
}

function stripRushStageNumbers(result: string): string {
    return result.replace(/\d+ of \d+:/g, "XX of XX:");
}

function stripWebpackHash(result: string): string {
    return result.replace(/Hash: \w+/g, "Hash: [redacted]");
}

function sanitizeSizes(result: string): string {
    return result.replace(/\d+(\.\d+)? ((Ki|M)B|bytes)/g, "X KiB");
}

/**
 * Gulp's output order within a `parallel` block is nondeterministic (and there's no way to configure it to execute in series),
 * so we purge as much of the gulp output as we can
 */
function sanitizeUnimportantGulpOutput(result: string): string {
    return result.replace(/^.*(\] (Starting)|(Finished)).*$/gm, "") // "gulp" task start/end messages (nondeterministic order)
        .replace(/^.*(\] . (finished)|(started)).*$/gm, "") // "just" task start/end messages (nondeterministic order)
        .replace(/^.*\] Respawned to PID: \d+.*$/gm, "") // PID of child is OS and system-load dependent (likely stableish in a container but still dangerous)
        .replace(/\n+/g, "\n")
        .replace(/\/tmp\/yarn--.*?\/node/g, "");
}

function sanitizeTimestamps(result: string): string {
    return result.replace(/\[\d?\d:\d\d:\d\d (A|P)M\]/g, "[XX:XX:XX XM]")
        .replace(/\[\d?\d:\d\d:\d\d\]/g, "[XX:XX:XX]")
        .replace(/\/\d+-\d+-[\d_TZ]+-debug.log/g, "\/XXXX-XX-XXXXXXXXX-debug.log")
        .replace(/\d+\/\d+\/\d+ \d+:\d+:\d+ (AM|PM)/g, "XX/XX/XX XX:XX:XX XM")
        .replace(/\d+(\.\d+)? sec(onds?)?/g, "? seconds")
        .replace(/\d+(\.\d+)? min(utes?)?/g, "")
        .replace(/\d+(\.\d+)? ?m?s/g, "?s")
        .replace(/ \(\?s\)/g, "");
}

function sanitizeVersionSpecifiers(result: string): string {
    return result
        .replace(/\d+.\d+.\d+-insiders.\d\d\d\d\d\d\d\d/g, "X.X.X-insiders.xxxxxxxx")
        .replace(/Rush Multi-Project Build Tool (\d+)\.\d+\.\d+/g, "Rush Multi-Project Build Tool $1.X.X")
        .replace(/([@v\()])\d+\.\d+\.\d+/g, "$1X.X.X")
        .replace(/webpack (\d+)\.\d+\.\d+/g, "webpack $1.X.X")
        .replace(/Webpack version: (\d+)\.\d+\.\d+/g, "Webpack version: $1.X.X");
}

/**
 * Import types and some other error messages use absolute paths in errors as they have no context to be written relative to;
 * This is problematic for error baselines, so we grep for them and strip them out.
 */
function stripAbsoluteImportPaths(result: string) {
    const workspaceRegexp = new RegExp(IO.getWorkspaceRoot().replace(/\\/g, "\\\\"), "g");
    return result
        .replace(/import\(".*?\/tests\/cases\/user\//g, `import("/`)
        .replace(/Module '".*?\/tests\/cases\/user\//g, `Module '"/`)
        .replace(workspaceRegexp, "../../..");
}

function sortErrors(result: string) {
    return ts.flatten(splitBy(result.split("\n"), s => /^\S+/.test(s)).sort(compareErrorStrings)).join("\n");
}

const errorRegexp = /^(.+\.[tj]sx?)\((\d+),(\d+)\)(: error TS.*)/;
function compareErrorStrings(a: string[], b: string[]) {
    ts.Debug.assertGreaterThanOrEqual(a.length, 1);
    ts.Debug.assertGreaterThanOrEqual(b.length, 1);
    const matchA = a[0].match(errorRegexp);
    if (!matchA) {
        return -1;
    }
    const matchB = b[0].match(errorRegexp);
    if (!matchB) {
        return 1;
    }
    const [, errorFileA, lineNumberStringA, columnNumberStringA, remainderA] = matchA;
    const [, errorFileB, lineNumberStringB, columnNumberStringB, remainderB] = matchB;
    return ts.comparePathsCaseSensitive(errorFileA, errorFileB) ||
        ts.compareValues(parseInt(lineNumberStringA), parseInt(lineNumberStringB)) ||
        ts.compareValues(parseInt(columnNumberStringA), parseInt(columnNumberStringB)) ||
        ts.compareStringsCaseSensitive(remainderA, remainderB) ||
        ts.compareStringsCaseSensitive(a.slice(1).join("\n"), b.slice(1).join("\n"));
}

export class DefinitelyTypedRunner extends ExternalCompileRunnerBase {
    readonly testDir = "../DefinitelyTyped/types/";
    workingDirectory = this.testDir;
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

/**
 * Split an array into multiple arrays whenever `isStart` returns true.
 * @example
 * splitBy([1,2,3,4,5,6], isOdd)
 * ==> [[1, 2], [3, 4], [5, 6]]
 * where
 * const isOdd = n => !!(n % 2)
 */
function splitBy<T>(xs: T[], isStart: (x: T) => boolean): T[][] {
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
