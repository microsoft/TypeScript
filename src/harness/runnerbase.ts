/// <reference path="harness.ts" />

class RunnerBase {
    constructor() { }

    // contains the tests to run
    public tests: string[] = [];

    /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
    public addTest(fileName: string) {
        this.tests.push(fileName);
    }

    public enumerateFiles(folder: string, regex?: RegExp, options?: { recursive: boolean }): string[] {
        return Harness.IO.listFiles(Harness.userSpecifiedroot + folder, regex, { recursive: (options ? options.recursive : false) });
    }

    /** Setup the runner's tests so that they are ready to be executed by the harness 
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public initializeTests(): void {
        throw new Error('method not implemented');
    }

    /** Replaces instances of full paths with filenames only */
    static removeFullPaths(path: string) {
        var fixedPath = path;

        // full paths either start with a drive letter or / for *nix, shouldn't have \ in the path at this point
        var fullPath = /(\w+:|\/)?([\w+\-\.]|\/)*\.ts/g; 
        var fullPathList = fixedPath.match(fullPath);
        if (fullPathList) {
            fullPathList.forEach((match: string) => fixedPath = fixedPath.replace(match, Harness.Path.getFileName(match)));
        }
        
        // when running in the browser the 'full path' is the host name, shows up in error baselines
        var localHost = /http:\/localhost:\d+/g;
        fixedPath = fixedPath.replace(localHost, '');
        return fixedPath;
    }
}