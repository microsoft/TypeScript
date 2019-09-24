"use strict";
exports.__esModule = true;
/// <reference types="node"/>
var path_1 = require("path");
var fs_1 = require("fs");
var assert = require("assert");
var args = process.argv.slice(2);
// function exec(path: string, args: string[] = []) {
//     const cmdLine = ["node", path, ...args].join(" ");
//     console.log(cmdLine);
//     execSync(cmdLine);
// }
function main() {
    if (args.length < 1) {
        console.log("Usage:");
        console.log("\tnode configureTSCBuild.js <package.json location>");
        return;
    }
    // Acquire the version from the package.json file and modify it appropriately.
    var packageJsonFilePath = path_1.normalize(args[0]);
    var packageJsonValue = JSON.parse(fs_1.readFileSync(packageJsonFilePath).toString());
    // Remove the bin section from the current package
    delete packageJsonValue.bin;
    // Set the new name
    packageJsonValue.name = "@orta/tsc";
    fs_1.writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonValue, /*replacer:*/ undefined, /*space:*/ 4));
    // Remove the files which aren't use when just using the API
    var toRemove = [
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
    var lib = path_1.join(path_1.dirname(packageJsonFilePath), packageJsonValue.main);
    var libPath = path_1.dirname(lib);
    toRemove.forEach(function (file) {
        var path = path_1.join(libPath, file);
        if (fs_1.existsSync(path))
            fs_1.unlinkSync(path);
    });
    ///////////////////////////////////
    // This section verifies that the build of TypeScript compiles and emits
    var ts = require("../" + lib);
    var source = "let x: string = 'string'";
    var results = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
    console.log(Object.keys(results));
    assert(results.outputText.trim() === "var x = 'string';", "Running typescript with " + packageJsonValue.name + " did not return the expected results, got: " + results.outputText);
}
main();
