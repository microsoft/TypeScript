// @module: commonjs
// @skipLibCheck: true
// @noImplicitAny:true
// @strictNullChecks:true
// @noTypesAndSymbols: true

// @filename: node_modules/typescript/package.json
{
    "name": "typescript",
    "types": "/.ts/typescript.d.ts"
}

// @filename: APISample_compile.ts
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var os: any;

import ts = require("typescript");

export function compile(fileNames: string[], options: ts.CompilerOptions): void {
    var program = ts.createProgram(fileNames, options);
    var emitResult = program.emit();

    var allDiagnostics = ts.getPreEmitDiagnostics(program);

    allDiagnostics.forEach(diagnostic => {
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        if (!diagnostic.file) {
            console.log(message);
            return;
        }
        var { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    });

    var exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}

compile(process.argv.slice(2), {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
});
