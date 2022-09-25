/// <reference types="node"/>
import { normalize, dirname, join } from "path";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import * as assert from "assert";
import { execSync } from "child_process";
const args = process.argv.slice(2);

/**
 * A minimal description for a parsed package.json object.
 */
interface PackageJson {
    name: string;
    bin?: {};
    main: string;
    scripts: {
        prepare?: string
        postpublish?: string
    }
}

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
    // We won't be running eslint which would run before publishing
    delete packageJsonValue.scripts.prepare;
    // No infinite loops
    delete packageJsonValue.scripts.postpublish;

    // Set the new name
    packageJsonValue.name = "@typescript/language-services";

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

    // Get a link to the main dependency JS file
    const lib = join(dirname(packageJsonFilePath), packageJsonValue.main);
    const libPath = dirname(lib);

    // Remove the sibling JS large files referenced above
    toRemove.forEach(file => {
        const path = join(libPath, file);
        if (existsSync(path)) unlinkSync(path);
    });

    // Remove VS-specific localization keys
    execSync("rm -rf loc", { cwd: dirname(packageJsonFilePath) });

    // Remove runnable file reference
    execSync("rm -rf bin", { cwd: dirname(packageJsonFilePath) });

    ///////////////////////////////////

    // This section verifies that the build of TypeScript compiles and emits

    const ts = require(lib);
    const source = "let x: string = 'string'";

    const results = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS }
    });

    assert(results.outputText.trim() === "var x = 'string';", `Running typescript with ${packageJsonValue.name} did not return the expected results, got: ${results.outputText}`);
}

main();
