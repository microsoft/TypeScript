/// <reference types="node"/>
import { normalize, dirname, join } from "path";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import assert = require("assert");
import { execSync } from "child_process";
const args = process.argv.slice(2);



/**
 * A minimal description for a parsed package.json object.
 */
interface PackageJson {
    name: string;
    bin: {};
    main: string;
}

// function exec(path: string, args: string[] = []) {
//     const cmdLine = ["node", path, ...args].join(" ");
//     console.log(cmdLine);
//     execSync(cmdLine);
// }

function main(): void {
    if (args.length < 1) {
        console.log("Usage:");
        console.log("\tnode configureTSCBuild.js <package.json location>");
        return;
    }

    // Acquire the version from the package.json file and modify it appropriately.
    const packageJsonFilePath = normalize(args[0]);
    const packageJsonValue: PackageJson = JSON.parse(readFileSync(packageJsonFilePath).toString());

    // Remove the bin section from the current package
    delete packageJsonValue.bin;

    // Set the new name
    packageJsonValue.name = "@orta/tsc";

    writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonValue, /*replacer:*/ undefined, /*space:*/ 4));

    // Remove the files which aren't use when just using the API
    const toRemove = [
        // JS Files
        "tsserver.js",
        "tsserverlibrary.js",
        "typescriptServices.js",
        "typingsInstaller.js",
        "tsc.js",
        // DTS files
        "typescriptServices.d.ts",
        "tsserverlibrary.d.ts"
    ];

    // Get a link to the main dependency JS file, then remove the sibling JS files referenced above
    const lib = join(dirname(packageJsonFilePath), packageJsonValue.main);
    const libPath = dirname(lib);
    toRemove.forEach(file => {
        const path = join(libPath, file);
        if (existsSync(path)) unlinkSync(path);
    });

    ///////////////////////////////////

    // This section verifies that the build of TypeScript compiles and emits

    const ts = require("../" + lib);
    const source = "let x: string = 'string'";

    const results =ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
    console.log(Object.keys(results));

    assert(results.outputText.trim() === "var x = 'string';", `Running typescript with ${packageJsonValue.name} did not return the expected results, got: ${results.outputText}`);


}

main();
