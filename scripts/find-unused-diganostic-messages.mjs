// This file requires a modern version of node 14+, and grep to be available.

// node scripts/find-unused-diagnostic-messages.mjs
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { EOL } from "os";

const diags = readFileSync("src/compiler/diagnosticInformationMap.generated.ts", "utf8");
const startOfDiags = diags.split("export const Diagnostics")[1];

/** @type {string[]} */
const missingNames = [];
startOfDiags.split(EOL).forEach(line => {
    if (!line.includes(":")) return;
    const diagName = line.split(":")[0].trim();

    try {
        execSync(`grep -rnw 'src' -e 'Diagnostics.${diagName}'`).toString();
        process.stdout.write(".");
    }
    catch {
        missingNames.push(diagName);
        process.stdout.write("x");
    }
});

if (missingNames.length) {
    process.exitCode = 1;
    console.log("Could not find usage of these diagnostics in the codebase:");
    console.log(missingNames);
}
