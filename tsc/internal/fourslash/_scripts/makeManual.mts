import * as fs from "fs";
import * as path from "path";

const scriptsDir = import.meta.dirname;
const manualTestsPath = path.join(scriptsDir, "manualTests.txt");
const genDir = path.join(scriptsDir, "../", "tests", "gen");
const manualDir = path.join(scriptsDir, "../", "tests", "manual");
const submoduleDir = path.join(scriptsDir, "../../../", "_submodules", "TypeScript", "tests", "cases", "fourslash");

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error("Please provide the name of the generated test file.");
        process.exit(1);
    }

    const testName = args[0];
    const testFileName = testName;
    const genTestFile = path.join(genDir, testFileName + "_test.go");
    const submoduleTestFile = path.join(submoduleDir, testFileName + ".ts");
    const submoduleServerTestFile = path.join(submoduleDir, "server", testFileName + ".ts");
    let testKind: "gen" | "submodule" | "submoduleServer" | undefined;
    if (fs.existsSync(genTestFile)) {
        testKind = "gen";
    }
    else if (fs.existsSync(submoduleTestFile)) {
        testKind = "submodule";
    }
    else if (fs.existsSync(submoduleServerTestFile)) {
        testKind = "submoduleServer";
    }

    if (!testKind) {
        console.error(
            `Could not find test neither as '${genTestFile}', nor as '${submoduleTestFile}' or '${submoduleServerTestFile}'.` +
                `Make sure the test exists in the gen directory or in the submodule.`,
        );
        process.exit(1);
    }

    if (!fs.existsSync(manualDir)) {
        fs.mkdirSync(manualDir, { recursive: true });
    }

    if (testKind === "gen") {
        const manualTestFile = path.join(manualDir, path.basename(genTestFile));
        markAsManual(genTestFile, manualTestFile);
    }

    let manualTests: string[] = [];
    if (fs.existsSync(manualTestsPath)) {
        const content = fs.readFileSync(manualTestsPath, "utf-8");
        manualTests = content.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    }

    if (!manualTests.includes(testName)) {
        manualTests.push(testName);
        manualTests.sort();
        fs.writeFileSync(manualTestsPath, [...manualTests, ""].join("\n"), "utf-8");
    }
}

function markAsManual(genFilePath: string, manualFilePath: string) {
    const content = fs.readFileSync(genFilePath, "utf-8");
    const updatedContent = content.replace(/^\s*t\.Skip\(\)\s*$/m, "");
    fs.writeFileSync(manualFilePath, updatedContent, "utf-8");
    fs.rmSync(genFilePath);
}

main();
