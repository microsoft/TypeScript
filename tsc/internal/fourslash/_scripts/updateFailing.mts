import * as cp from "child_process";
import * as fs from "fs";
import path from "path";
import * as readline from "readline";
import which from "which";

const failingTestsPath = path.join(import.meta.dirname, "failingTests.txt");
const crashingTestsPath = path.join(import.meta.dirname, "crashingTests.txt");

interface TestEvent {
    Time?: string;
    Action: string;
    Package?: string;
    Test?: string;
    Output?: string;
    Elapsed?: number;
}

async function main() {
    const go = which.sync("go");

    let testProcess: cp.ChildProcess;
    try {
        // Run tests with TSGO_FOURSLASH_IGNORE_FAILING=1 to run all tests including those in failingTests.txt
        testProcess = cp.spawn(go, ["test", "-json", "./internal/fourslash/tests/gen"], {
            stdio: ["ignore", "pipe", "pipe"],
            env: { ...process.env, TSGO_FOURSLASH_IGNORE_FAILING: "1" },
        });
    }
    catch (error) {
        throw new Error("Failed to spawn test process: " + error);
    }

    if (!testProcess.stdout || !testProcess.stderr) {
        throw new Error("Test process stdout or stderr is null");
    }

    const failingTests: string[] = [];
    const crashingTests: string[] = [];
    const testOutputs = new Map<string, string[]>();
    const allOutputs: string[] = [];
    let hadPanic = false;

    const rl = readline.createInterface({
        input: testProcess.stdout,
        crlfDelay: Infinity,
    });

    rl.on("line", line => {
        try {
            const event: TestEvent = JSON.parse(line);

            // Collect output for each test
            if (event.Action === "output" && event.Output) {
                allOutputs.push(event.Output);
                if (event.Test) {
                    if (!testOutputs.has(event.Test)) {
                        testOutputs.set(event.Test, []);
                    }
                    testOutputs.get(event.Test)!.push(event.Output);
                }

                // Check for panics
                if (/^panic/m.test(event.Output)) {
                    hadPanic = true;
                }
            }

            // Process failed tests
            if (event.Action === "fail" && event.Test) {
                const outputs = testOutputs.get(event.Test) || [];

                // Check if this is a crashing test (contains InternalError)
                const hasCrash = outputs.some(line => line.includes("InternalError"));
                if (hasCrash) {
                    crashingTests.push(event.Test);
                }

                // A test is only considered a baseline-only failure if ALL error messages
                // are baseline-related. Any non-baseline error message means it's a real failure.
                const baselineMessagePatterns = [
                    /^\s*baseline\.go:\d+: the baseline file .* has changed\./,
                    /^\s*baseline\.go:\d+: new baseline created at /,
                    /^\s*baseline\.go:\d+: the baseline file .* does not exist in the TypeScript submodule/,
                    /^\s*baseline\.go:\d+: the baseline file .* does not match the reference in the TypeScript submodule/,
                ];

                // Check each output line that looks like an error message
                // Error messages from Go tests typically contain ".go:" with a line number
                const errorLines = outputs.filter(line => /^\s*\w+\.go:\d+:/.test(line));

                // If there are no error lines, it's a real failure.
                // If all error lines match baseline patterns, it's a baseline-only failure
                const isBaselineOnlyFailure = errorLines.length > 0 &&
                    errorLines.every(line => baselineMessagePatterns.some(pattern => pattern.test(line)));

                if (!isBaselineOnlyFailure) {
                    failingTests.push(event.Test);
                }
            }
        }
        catch (e) {
            // Not JSON, possibly stderr or other output - ignore
        }
    });

    testProcess.stderr.on("data", data => {
        // Check stderr for panics too
        const output = data.toString();
        allOutputs.push(output);
        if (/^panic/m.test(output)) {
            hadPanic = true;
        }
    });

    await new Promise<void>((resolve, reject) => {
        testProcess.on("close", code => {
            if (hadPanic) {
                reject(new Error("Unrecovered panic detected in tests\n" + allOutputs.join("")));
                return;
            }

            fs.writeFileSync(failingTestsPath, failingTests.sort((a, b) => a.localeCompare(b, "en-US")).join("\n") + "\n", "utf-8");
            fs.writeFileSync(crashingTestsPath, crashingTests.sort((a, b) => a.localeCompare(b, "en-US")).join("\n") + "\n", "utf-8");
            resolve();
        });

        testProcess.on("error", error => {
            reject(error);
        });
    });
}

main().catch(error => {
    console.error("Error:", error);
    process.exit(1);
});
