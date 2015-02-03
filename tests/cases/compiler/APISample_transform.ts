// @module: commonjs
// @includebuiltfile: typescript.d.ts

/*
 * Note: This test is a public API sample. The sample sources can be found 
         at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var fs: any;
declare var path: any;

import ts = require("typescript");

function transform(contents: string, compilerOptions: ts.CompilerOptions = {}) {
    // Sources
    var files = {
        "file.ts": contents,
        "lib.d.ts": fs.readFileSync(ts.getDefaultLibFilePath(compilerOptions)).toString()
    };

    // Generated outputs
    var outputs = [];

    // Create a compilerHost object to allow the compiler to read and write files
    var compilerHost = {
        getSourceFile: (filename, target) => {
            return files[filename] !== undefined ?
                ts.createSourceFile(filename, files[filename], target) : undefined;
        },
        writeFile: (name, text, writeByteOrderMark) => {
            outputs.push({ name: name, text: text, writeByteOrderMark: writeByteOrderMark });
        },
        getDefaultLibFilename: () => "lib.d.ts",
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: (filename) => filename,
        getCurrentDirectory: () => "",
        getNewLine: () => "\n"
    };

    // Create a program from inputs
    var program = ts.createProgram(["file.ts"], compilerOptions, compilerHost);

    // Query for early errors
    var errors = program.getDiagnostics();
    // Do not generate code in the presence of early errors
    if (!errors.length) {
        // Type check and get semantic errors
        var checker = program.getTypeChecker(true);
        errors = checker.getDiagnostics();
        // Generate output
        program.emitFiles();
    }
    return {
        outputs: outputs,
        errors: errors.map(function (e) { return e.file.filename + "(" + e.file.getLineAndCharacterFromPosition(e.start).line + "): " + e.messageText; })
    };
}

// Calling our transform function using a simple TypeScript variable declarations, 
// and loading the default library like:
var source = "var x: number  = 'string'";
var result = transform(source);

console.log(JSON.stringify(result));