import * as cp from "child_process";
import * as fs from "fs";
import path from "path";
import which from "which";

const failingTestsPath = path.join(import.meta.dirname, "failingTests.txt");

function main() {
    const go = which.sync("go");
    let testOutput: string;
    try {
        // Run tests with TSGO_FOURSLASH_IGNORE_FAILING=1 to run all tests including those in failingTests.txt
        testOutput = cp.execFileSync(go, ["test", "-v", "./internal/fourslash/tests/gen"], {
            encoding: "utf-8",
            env: { ...process.env, TSGO_FOURSLASH_IGNORE_FAILING: "1" },
        });
    }
    catch (error) {
        testOutput = (error as { stdout: string; }).stdout as string;
    }
    const panicRegex = /^panic/m;
    if (panicRegex.test(testOutput)) {
        throw new Error("Unrecovered panic detected in tests\n" + testOutput);
    }
    const failRegex = /--- FAIL: ([\S]+)/gm;
    const failingTests: string[] = [];
    let match;

    while ((match = failRegex.exec(testOutput)) !== null) {
        failingTests.push(match[1]);
    }

    fs.writeFileSync(failingTestsPath, failingTests.sort((a, b) => a.localeCompare(b, "en-US")).join("\n") + "\n", "utf-8");
}

main();
