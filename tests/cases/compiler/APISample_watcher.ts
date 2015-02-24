// @module: commonjs
// @includebuiltfile: typescript.d.ts
// @stripInternal:true

/*
 * Note: This test is a public API sample. The sample sources can be found 
         at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#incremental-build-support-using-the-language-services
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var fs: any;
declare var path: any;

import ts = require("typescript");

function watch(rootFileNames: string[], options: ts.CompilerOptions) {
    var files: ts.Map<{ version: number }> = {};

    // initialize the list of files
    rootFileNames.forEach(fileName => {
        files[fileName] = { version: 0 };
    });

    // Create the language service host to allow the LS to communicate with the host
    var servicesHost: ts.LanguageServiceHost = {
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
    };

    // Create the language service files
    var services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())

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
        var output = services.getEmitOutput(fileName);

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
        var allDiagnostics = services.getCompilerOptionsDiagnostics()
            .concat(services.getSyntacticDiagnostics(fileName))
            .concat(services.getSemanticDiagnostics(fileName));

        allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file) {
                var lineChar = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                console.log(`  Error ${diagnostic.file.fileName} (${lineChar.line + 1},${lineChar.character + 1}): ${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`);
            }
            else {
                console.log(`  Error: ${diagnostic.messageText}`);
            }
        });
    }
}

// Initialize files constituting the program as all .ts files in the current directory
var currentDirectoryFiles = fs.readdirSync(process.cwd()).
    filter(fileName=> fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === ".ts");

// Start the watcher
watch(currentDirectoryFiles, { module: ts.ModuleKind.CommonJS });