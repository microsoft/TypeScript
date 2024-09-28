import {
    IO,
    userSpecifiedRoot,
} from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";

export type TestRunnerKind = CompilerTestKind | FourslashTestKind | "project" | "transpile";
export type CompilerTestKind = "conformance" | "compiler";
export type FourslashTestKind = "fourslash" | "fourslash-server";

export let shards = 1;
export let shardId = 1;

// The following have setters as while they're read here in the harness, they're only set in the runner
export function setShards(count: number): void {
    shards = count;
}
export function setShardId(id: number): void {
    shardId = id;
}

export abstract class RunnerBase {
    // contains the tests to run
    public tests: string[] = [];

    /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
    public addTest(fileName: string): void {
        this.tests.push(fileName);
    }

    public enumerateFiles(folder: string, regex?: RegExp, options?: { recursive: boolean; }): string[] {
        return ts.map(IO.listFiles(userSpecifiedRoot + folder, regex, { recursive: (options ? options.recursive : false) }), ts.normalizeSlashes);
    }

    abstract kind(): TestRunnerKind;

    abstract enumerateTestFiles(): string[];

    getTestFiles(): ReturnType<this["enumerateTestFiles"]> {
        const all = this.enumerateTestFiles();
        if (shards === 1) {
            return all as ReturnType<this["enumerateTestFiles"]>;
        }
        return all.filter((_val, idx) => idx % shards === (shardId - 1)) as ReturnType<this["enumerateTestFiles"]>;
    }

    /** The working directory where tests are found. Needed for batch testing where the input path will differ from the output path inside baselines */
    public workingDirectory = "";

    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    public abstract initializeTests(): void;

    /** Replaces instances of full paths with fileNames only */
    static removeFullPaths(path: string): string {
        // If its a full path (starts with "C:" or "/") replace with just the filename
        let fixedPath = /^(?:\w:|\/)/.test(path) ? ts.getBaseFileName(path) : path;

        // when running in the browser the 'full path' is the host name, shows up in error baselines
        const localHost = /http:\/localhost:\d+/g;
        fixedPath = fixedPath.replace(localHost, "");
        return fixedPath;
    }
}
