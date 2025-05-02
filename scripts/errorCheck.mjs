import fs from "fs";
import fsPromises from "fs/promises";
import { glob } from "glob";

async function checkErrorBaselines() {
    const data = await fsPromises.readFile("src/compiler/diagnosticMessages.json", "utf-8");
    const messages = JSON.parse(data);
    const keys = Object.keys(messages);
    console.log("Loaded " + keys.length + " errors");

    for (const k of keys) {
        messages[k].seen = false;
    }

    const errRegex = /\(\d+,\d+\): error TS([^:]+):/g;
    const baseDir = "tests/baselines/reference/";

    const files = (await fsPromises.readdir(baseDir)).filter(f => f.endsWith(".errors.txt"));

    for (const f of files) {
        const baseline = fs.readFileSync(baseDir + f, "utf-8");

        let g;
        while (g = errRegex.exec(baseline)) {
            const errCode = +g[1];
            const msg = keys.filter(k => messages[k].code === errCode)[0];
            messages[msg].seen = true;
        }
    }

    console.log("== List of errors not present in baselines ==");
    let count = 0;
    for (const k of keys) {
        if (messages[k].seen !== true) {
            console.log(k);
            count++;
        }
    }
    console.log(count + " of " + keys.length + " errors are not in baselines");
}

async function checkSourceFiles() {
    const data = await fsPromises.readFile("src/compiler/diagnosticInformationMap.generated.ts", "utf-8");

    const errorRegexp = /\s(\w+): \{ code/g;
    const errorNames = [];
    let errMatch;
    while (errMatch = errorRegexp.exec(data)) {
        errorNames.push(errMatch[1]);
    }

    let allSrc = "";
    const files = await glob("./src/**/*.ts");
    console.log("Reading " + files.length + " source files");
    for (const file of files) {
        if (file.indexOf("diagnosticInformationMap.generated.ts") > 0) {
            continue;
        }

        const src = fs.readFileSync(file, "utf-8");
        allSrc = allSrc + src;
    }

    console.log("Consumed " + allSrc.length + " characters of source");

    let count = 0;
    console.log("== List of errors not used in source ==");
    for (const errName of errorNames) {
        if (!allSrc.includes(errName)) {
            console.log(errName);
            count++;
        }
    }
    console.log(count + " of " + errorNames.length + " errors are not used in source");
}

async function main() {
    await checkErrorBaselines();
    await checkSourceFiles();
}

main();
