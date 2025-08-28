import * as cp from "child_process";
import * as fs from "fs";
import path from "path";
import which from "which";
import { main as convertFourslash } from "./convertFourslash.mts";

const failingTestsPath = path.join(import.meta.dirname, "failingTests.txt");

function main() {
    const oldFailingTests = fs.readFileSync(failingTestsPath, "utf-8");
    fs.writeFileSync(failingTestsPath, "", "utf-8");
    convertFourslash();
    const go = which.sync("go");
    let testOutput: string;
    try {
        testOutput = cp.execFileSync(go, ["test", "./internal/fourslash/tests/gen"], { encoding: "utf-8" });
    }
    catch (error) {
        testOutput = (error as { stdout: string; }).stdout as string;
    }
    const panicRegex = /^panic/m;
    if (panicRegex.test(testOutput)) {
        fs.writeFileSync(failingTestsPath, oldFailingTests, "utf-8");
        throw new Error("Unrecovered panic detected in tests");
    }
    const failRegex = /--- FAIL: ([\S]+)/gm;
    const failingTests: string[] = [];
    let match;

    while ((match = failRegex.exec(testOutput)) !== null) {
        failingTests.push(match[1]);
    }

    fs.writeFileSync(failingTestsPath, failingTests.sort().join("\n") + "\n", "utf-8");
    convertFourslash();
}

main();
