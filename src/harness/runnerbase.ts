type TestRunnerKind = CompilerTestKind | FourslashTestKind | "project" | "rwc" | "test262" | "user" | "dt";
type CompilerTestKind = "conformance" | "compiler";
type FourslashTestKind = "fourslash" | "fourslash-shims" | "fourslash-shims-pp" | "fourslash-server";

abstract class RunnerBase {
    // contains the tests to run
    public tests: (string | Harness.FileBasedTest)[] = [];

    /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
    public addTest(fileName: string) {
        this.tests.push(fileName);
    }

    public enumerateFiles(folder: string, regex?: RegExp, options?: { recursive: boolean }): string[] {
        return ts.map(Harness.IO.listFiles(Harness.userSpecifiedRoot + folder, regex, { recursive: (options ? options.recursive : false) }), ts.normalizeSlashes);
    }

    abstract kind(): TestRunnerKind;

    abstract enumerateTestFiles(): (string | Harness.FileBasedTest)[];

    /** The working directory where tests are found. Needed for batch testing where the input path will differ from the output path inside baselines */
    public workingDirectory = "";

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public abstract initializeTests(): void;

    /** Replaces instances of full paths with fileNames only */
    static removeFullPaths(path: string) {
        // If its a full path (starts with "C:" or "/") replace with just the filename
        let fixedPath = /^(\w:|\/)/.test(path) ? ts.getBaseFileName(path) : path;

        // when running in the browser the 'full path' is the host name, shows up in error baselines
        const localHost = /http:\/localhost:\d+/g;
        fixedPath = fixedPath.replace(localHost, "");
        return fixedPath;
    }
}
