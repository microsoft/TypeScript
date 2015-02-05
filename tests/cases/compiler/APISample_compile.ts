// @module: commonjs
// @includebuiltfile: typescript.d.ts
// @stripInternal:true

/*
 * Note: This test is a public API sample. The sample sources can be found 
         at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var os: any;

import ts = require("typescript");

export function compile(fileNames: string[], options: ts.CompilerOptions): void {
    var program = ts.createProgram(fileNames, options);
    var emitResult = program.emit();

    var allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        var lineChar = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);
        console.log(`${diagnostic.file.fileName} (${lineChar.line},${lineChar.character}): ${ts.flattenDiagnosticMessageText(diagnostic.messageText, os.EOL)}`);
    });

    console.log(`Process exiting with code '${emitResult.emitResultStatus}'.`);
    process.exit(emitResult.emitResultStatus);
}

compile(process.argv.slice(2), {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
});