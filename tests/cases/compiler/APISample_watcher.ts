// @module: commonjs
// @includebuiltfile: typescript.d.ts

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

function watch(rootFilenames: string[], options: ts.CompilerOptions) {
    var files: ts.Map<{ version: number }> = {};

    // initialize the list of files
    rootFilenames.forEach(filename => {
        files[filename] = { version: 0 };
    });

    // Create the language service host to allow the LS to communicate with the host
    var servicesHost: ts.LanguageServiceHost = {
        getScriptFileNames: () => rootFilenames,
        getScriptVersion: (filename) => files[filename] && files[filename].version.toString(),
        getScriptSnapshot: (filename) => {
            if (!fs.existsSync(filename)) {
                return undefined;
            }

            return ts.ScriptSnapshot.fromString(fs.readFileSync(filename).toString());
        },
        getCurrentDirectory: () => process.cwd(),
        getCompilationSettings: () => options,
        getDefaultLibFilename: (options) => ts.getDefaultLibFilePath(options),
    };

    // Create the language service files
    var services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())

    // Now let's watch the files
    rootFilenames.forEach(filename => {
        // First time around, emit all files
        emitFile(filename);

        // Add a watch on the file to handle next change
        fs.watchFile(filename,
            { persistent: true, interval: 250 },
            (curr, prev) => {
                // Check timestamp
                if (+curr.mtime <= +prev.mtime) {
                    return;
                }

                // Update the version to signal a change in the file
                files[filename].version++;

                // write the changes to disk
                emitFile(filename);
            });
    });

    function emitFile(filename: string) {
        var output = services.getEmitOutput(filename);

        if (output.emitOutputStatus === ts.EmitReturnStatus.Succeeded) {
            console.log(`Emitting ${filename}`);
        }
        else {
            console.log(`Emitting ${filename} failed`);
            logErrors(filename);
        }

        output.outputFiles.forEach(o => {
            fs.writeFileSync(o.name, o.text, "utf8");
        });
    }

    function logErrors(filename: string) {
        var allDiagnostics = services.getCompilerOptionsDiagnostics()
            .concat(services.getSyntacticDiagnostics(filename))
            .concat(services.getSemanticDiagnostics(filename));

        allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file) {
                var lineChar = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);
                console.log(`  Error ${diagnostic.file.filename} (${lineChar.line},${lineChar.character}): ${diagnostic.messageText}`);
            }
            else {
                console.log(`  Error: ${diagnostic.messageText}`);
            }
        });
    }
}

// Initialize files constituting the program as all .ts files in the current directory
var currentDirectoryFiles = fs.readdirSync(process.cwd()).
    filter(filename=> filename.length >= 3 && filename.substr(filename.length - 3, 3) === ".ts");

// Start the watcher
watch(currentDirectoryFiles, { module: ts.ModuleKind.CommonJS });