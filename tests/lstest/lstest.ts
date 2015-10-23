/// <reference path="..\..\src\compiler\sys.ts"/>
/// <reference path="..\..\src\compiler\commandLineParser.ts"/>
/// <reference path="..\..\src\services\services.ts"/>
/// <reference path="..\..\src\services\shims.ts"/>

interface FileInfo {
    name: string;
    text: string;
}

interface TestLS {
    runSemanticClassificationForFile(name: string): void;
    runSyntacticClassificationForFile(name: string): void;
    runGetSemanticDiagnostics(name: string): void;
    incrementVersions(): void;
}

declare var files: FileInfo[];

var compilerOptions: ts.CompilerOptions = { target: ts.ScriptTarget.ES5 };

function prepareTestLS(): TestLS {
    let version = 1;
    let host: ts.LanguageServiceHost = {
        getScriptFileNames: () => files.map(f => f.name),
        getScriptSnapshot: name => {
            let fi = ts.forEach(files, f => f.name === name ? f : undefined);
            return fi && ts.ScriptSnapshot.fromString(fi.text);
        },
        trace: () => void 0,
        getCompilationSettings: () => compilerOptions,
        getScriptVersion: _ => "" + version,
        getDefaultLibFileName: () => "lib.d.ts",
        getCurrentDirectory: () => ""
    };
    let ls = ts.createLanguageService(host);

    return {
        runSemanticClassificationForFile,
        runSyntacticClassificationForFile,
        incrementVersions: () => version++,
        runGetSemanticDiagnostics
    }

    function runGetSemanticDiagnostics(name: string): void {
        ls.getSemanticDiagnostics(name);
    }

    function runSemanticClassificationForFile(name: string) {
        let file = host.getScriptSnapshot(name);
        ts.Debug.assert(file !== undefined)
        ls.getEncodedSemanticClassifications(name, ts.createTextSpanFromBounds(0, file.getLength()));
    }

    function runSyntacticClassificationForFile(name: string) {
        let file = host.getScriptSnapshot(name);
        ts.Debug.assert(file !== undefined)
        ls.getEncodedSyntacticClassifications(name, ts.createTextSpanFromBounds(0, file.getLength()));
    }
}

if (ts.sys && ts.sys.args.length) {
    let program = ts.createProgram(ts.sys.args, compilerOptions);
    if (program) {
        for (let f of program.getSourceFiles()) {
            console.log(f.fileName);
        }
        let files: FileInfo[] = program.getSourceFiles().map(f => ({ name: ts.getBaseFileName(f.fileName), text: f.text }));
        let text = `var files = ${JSON.stringify(files) }`;
        let outputPath = ts.combinePaths(ts.sys.getCurrentDirectory(), "files.js");
        ts.sys.writeFile(outputPath, text);
    }
}