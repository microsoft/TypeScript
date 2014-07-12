/// <reference path="../../src/compiler/io.ts" />
/// <reference path="../../src/harness/harness.ts" />

class RunnerBase {
    constructor() { }

    // contains the tests to run
    public tests: string[] = [];

    /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
    public addTest(fileName: string) {
        this.tests.push(fileName);
    }

    public enumerateFiles(folder: string, options?: { recursive: boolean }): string[] {
        return TypeScript.IO.dir(Harness.userSpecifiedroot + folder, /\.ts$/, { recursive: (options ? options.recursive : false) });
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness 
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        throw new Error('method not implemented');
    }

    public _getDiagnosticText(diagnostic: TypeScript.Diagnostic): string {
        return RunnerBase.removeFullPaths(TypeScript.TypeScriptCompiler.getFullDiagnosticText(diagnostic, path => TypeScript.switchToForwardSlashes(path)));
    }

    /** Replaces instances of full paths with filenames only */
    static removeFullPaths(path: string) {
        var fullPath = /(\w+:)?(\/|\\)([\w+\-\.]|\/)*\.ts/g;
        var fullPathList = path.match(fullPath);
        if (fullPathList) {
            fullPathList.forEach((match: string) => path = path.replace(match, Harness.getFileName(match)));
        }
        return path;
    }
}