import * as fs from "fs";
import * as path from "path";

const scriptsDir = import.meta.dirname;
const manualTestsPath = path.join(scriptsDir, "manualTests.txt");
const genDir = path.join(scriptsDir, "../", "tests", "gen");
const manualDir = path.join(scriptsDir, "../", "tests", "manual");

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error("Please provide the name of the generated test file.");
        process.exit(1);
    }

    const testName = args[0];
    const testFileName = testName;
    const genTestFile = path.join(genDir, testFileName + "_test.go");
    if (!fs.existsSync(genTestFile)) {
        console.error(`Test file not found: '${genTestFile}'. Make sure the test exists in the gen directory first.`);
        process.exit(1);
    }

    if (!fs.existsSync(manualDir)) {
        fs.mkdirSync(manualDir, { recursive: true });
    }

    const manualTestFile = path.join(manualDir, path.basename(genTestFile));
    renameAndRemoveSkip(genTestFile, manualTestFile);

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

function renameAndRemoveSkip(genFilePath: string, manualFilePath: string) {
    const content = fs.readFileSync(genFilePath, "utf-8");
    const updatedContent = content.replace(/^\s*t\.Skip\(\)\s*$/m, "");
    fs.writeFileSync(manualFilePath, updatedContent, "utf-8");
    fs.rmSync(genFilePath);
}

main();
