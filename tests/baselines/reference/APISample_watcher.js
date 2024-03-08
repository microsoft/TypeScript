//// [tests/cases/compiler/APISample_watcher.ts] ////

//// [package.json]
{
    "name": "typescript",
    "types": "/.ts/typescript.d.ts"
}

//// [APISample_watcher.ts]
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#incremental-build-support-using-the-language-services
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var fs: {
    existsSync(path: string): boolean;
    readdirSync(path: string): string[];
    readFileSync(filename: string, encoding?: string): string;
    writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; } | string): void;
    watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: (curr: { mtime: Date }, prev: { mtime: Date }) => void): void;
};
declare var path: any;

import * as ts from "typescript";

function watch(rootFileNames: string[], options: ts.CompilerOptions) {
    const files: ts.MapLike<{ version: number }> = {};

    // initialize the list of files
    rootFileNames.forEach(fileName => {
        files[fileName] = { version: 0 };
    });

    // Create the language service host to allow the LS to communicate with the host
    const servicesHost: ts.LanguageServiceHost = {
        getScriptFileNames: () => rootFileNames,
        getScriptVersion: (fileName) => files[fileName] && files[fileName].version.toString(),
        getScriptSnapshot: (fileName) => {
            if (!fs.existsSync(fileName)) {
                return undefined;
            }

            return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
        },
        getCurrentDirectory: () => process.cwd(),
        getCompilationSettings: () => options,
        getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
        fileExists: fileName => fs.existsSync(fileName),
        readFile: fileName => fs.readFileSync(fileName),
    };

    // Create the language service files
    const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())

    // Now let's watch the files
    rootFileNames.forEach(fileName => {
        // First time around, emit all files
        emitFile(fileName);

        // Add a watch on the file to handle next change
        fs.watchFile(fileName,
            { persistent: true, interval: 250 },
            (curr, prev) => {
                // Check timestamp
                if (+curr.mtime <= +prev.mtime) {
                    return;
                }

                // Update the version to signal a change in the file
                files[fileName].version++;

                // write the changes to disk
                emitFile(fileName);
            });
    });

    function emitFile(fileName: string) {
        let output = services.getEmitOutput(fileName);

        if (!output.emitSkipped) {
            console.log(`Emitting ${fileName}`);
        }
        else {
            console.log(`Emitting ${fileName} failed`);
            logErrors(fileName);
        }

        output.outputFiles.forEach(o => {
            fs.writeFileSync(o.name, o.text, "utf8");
        });
    }

    function logErrors(fileName: string) {
        let allDiagnostics = services.getCompilerOptionsDiagnostics()
            .concat(services.getSyntacticDiagnostics(fileName))
            .concat(services.getSemanticDiagnostics(fileName));

        allDiagnostics.forEach(diagnostic => {
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
                console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            }
            else {
                console.log(`  Error: ${message}`);
            }
        });
    }
}

// Initialize files constituting the program as all .ts files in the current directory
const currentDirectoryFiles = fs.readdirSync(process.cwd()).
    filter(fileName=> fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === ".ts");

// Start the watcher
watch(currentDirectoryFiles, { module: ts.ModuleKind.CommonJS });


//// [APISample_watcher.js]
"use strict";
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#incremental-build-support-using-the-language-services
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function watch(rootFileNames, options) {
    var files = {};
    // initialize the list of files
    rootFileNames.forEach(function (fileName) {
        files[fileName] = { version: 0 };
    });
    // Create the language service host to allow the LS to communicate with the host
    var servicesHost = {
        getScriptFileNames: function () { return rootFileNames; },
        getScriptVersion: function (fileName) { return files[fileName] && files[fileName].version.toString(); },
        getScriptSnapshot: function (fileName) {
            if (!fs.existsSync(fileName)) {
                return undefined;
            }
            return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
        },
        getCurrentDirectory: function () { return process.cwd(); },
        getCompilationSettings: function () { return options; },
        getDefaultLibFileName: function (options) { return ts.getDefaultLibFilePath(options); },
        fileExists: function (fileName) { return fs.existsSync(fileName); },
        readFile: function (fileName) { return fs.readFileSync(fileName); },
    };
    // Create the language service files
    var services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());
    // Now let's watch the files
    rootFileNames.forEach(function (fileName) {
        // First time around, emit all files
        emitFile(fileName);
        // Add a watch on the file to handle next change
        fs.watchFile(fileName, { persistent: true, interval: 250 }, function (curr, prev) {
            // Check timestamp
            if (+curr.mtime <= +prev.mtime) {
                return;
            }
            // Update the version to signal a change in the file
            files[fileName].version++;
            // write the changes to disk
            emitFile(fileName);
        });
    });
    function emitFile(fileName) {
        var output = services.getEmitOutput(fileName);
        if (!output.emitSkipped) {
            console.log("Emitting ".concat(fileName));
        }
        else {
            console.log("Emitting ".concat(fileName, " failed"));
            logErrors(fileName);
        }
        output.outputFiles.forEach(function (o) {
            fs.writeFileSync(o.name, o.text, "utf8");
        });
    }
    function logErrors(fileName) {
        var allDiagnostics = services.getCompilerOptionsDiagnostics()
            .concat(services.getSyntacticDiagnostics(fileName))
            .concat(services.getSemanticDiagnostics(fileName));
        allDiagnostics.forEach(function (diagnostic) {
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            if (diagnostic.file) {
                var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
                console.log("  Error ".concat(diagnostic.file.fileName, " (").concat(line + 1, ",").concat(character + 1, "): ").concat(message));
            }
            else {
                console.log("  Error: ".concat(message));
            }
        });
    }
}
// Initialize files constituting the program as all .ts files in the current directory
var currentDirectoryFiles = fs.readdirSync(process.cwd()).
    filter(function (fileName) { return fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === ".ts"; });
// Start the watcher
watch(currentDirectoryFiles, { module: ts.ModuleKind.CommonJS });
