/// <reference path="../src/harness/external/node.d.ts" />
/// <reference path="../built/local/typescript.d.ts" />

import * as fs from "fs";
import * as path from "path";
import * as typescript from "typescript";
declare var ts: typeof typescript;

var tsSourceDir = "../src";
var tsBuildDir = "../built/local";
var testOutputDir = "../built/benchmark";
var sourceFiles = [
    "compiler/types.ts",
    "compiler/core.ts",
    "compiler/sys.ts",
    "compiler/diagnosticInformationMap.generated.ts",
    "compiler/scanner.ts",
    "compiler/binder.ts",
    "compiler/utilities.ts",
    "compiler/parser.ts",
    "compiler/checker.ts",
    "compiler/declarationEmitter.ts",
    "compiler/emitter.ts",
    "compiler/program.ts",
    "compiler/commandLineParser.ts",
    "compiler/tsc.ts"];

// .ts sources for the compiler, used as a test input
var rawCompilerSources = "";
sourceFiles.forEach(f=> {
    rawCompilerSources += "\r\n" + fs.readFileSync(path.join(tsSourceDir, f)).toString();
});
var compilerSoruces = `var compilerSources = ${JSON.stringify(rawCompilerSources) };`;

// .js code for the compiler, what we are actuallty testing
var rawCompilerJavaScript = fs.readFileSync(path.join(tsBuildDir, "tsc.js")).toString();
rawCompilerJavaScript = rawCompilerJavaScript.replace("ts.executeCommandLine(ts.sys.args);", "");

// lib.d.ts sources
var rawLibSources = fs.readFileSync(path.join(tsBuildDir, "lib.d.ts")).toString();
var libSoruces = `var libSources = ${JSON.stringify(rawLibSources) };`;

// write test output
if (!fs.existsSync(testOutputDir)) {
    fs.mkdirSync(testOutputDir);
}

// 1. compiler ts sources, used to test
fs.writeFileSync(
    path.join(testOutputDir, "compilerSources.js"),
    `${ compilerSoruces } \r\n ${ libSoruces }`);

// 2. the compiler js sources + a call the compiler
fs.writeFileSync(
    path.join(testOutputDir, "benchmarktsc.js"),
    `${ rawCompilerJavaScript }\r\n${ compile.toString() }\r\ncompile(compilerSources, libSources);`);

// 3. test html file to drive the test
fs.writeFileSync(
    path.join(testOutputDir, "benchmarktsc.html"),
    `<!DOCTYPE HTML>
<html>
<head>
    <meta content="IE=Edge" http-equiv="X-UA-Compatible">
    <title>Typescript 1.1 Compiler</title>
    <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
</head>
<body>
    <div><span>Status: </span><span id="status">Running</span></div>
    <div id="main"><span>End-to-End Time: </span><span id="totalTime">N/A</span></div>
    <script>
        var startTime = performance.now();
    </script>
    <script src="compilerSources.js"></script>
    <script src="benchmarktsc.js"></script>
    <script>
        var endTime = performance.now();
        document.getElementById("totalTime").innerHTML = parseInt(endTime - startTime, 10);
        document.getElementById("status").innerHTML = "DONE";
    </script>
</body>
</html>`);

function compile(compilerSources, librarySources) {
    var program = ts.createProgram(
        ["lib.d.ts", "compiler.ts"],
        {
            noResolve: true,
            out: "compiler.js",
            removeComments: true,
            target: ts.ScriptTarget.ES3
        }, {
            getDefaultLibFileName: () => "lib.d.ts",
            getSourceFile: (filename, languageVersion) => {
                var source: string;
                if (filename === "lib.d.ts") source = librarySources;
                else if (filename === "compiler.ts") source = compilerSources;
                else console.error("Unexpected read file request: " + filename);

                return ts.createSourceFile(filename, source, languageVersion);
            },
            writeFile: (filename, data, writeByteOrderMark) => {
                if (filename !== "compiler.js")
                    console.error("Unexpected write file request: " + filename);
                // console.log(data);
            },
            getCurrentDirectory: () => "",
            getCanonicalFileName: (filename) => filename,
            useCaseSensitiveFileNames: () => false,
            getNewLine: () => "\r\n"
        });

    var emitOutput = program.emit();

    var errors = program.getSyntacticDiagnostics()
        .concat(program.getSemanticDiagnostics())
        .concat(program.getGlobalDiagnostics())
        .concat(emitOutput.diagnostics);

    if (errors.length) {
        console.error("Unexpected errors.");
        errors.forEach(e=> console.log(`${e.code}: ${e.messageText}`))
    }
}
