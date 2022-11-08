import * as ts from "../../_namespaces/ts";
import * as fakes from "../../_namespaces/fakes";
import * as vfs from "../../_namespaces/vfs";
import * as Harness from "../../_namespaces/Harness";

export type TscCompileSystem = fakes.System & {
    writtenFiles: ts.Set<ts.Path>;
    baseLine(): { file: string; text: string; };
    disableUseFileVersionAsSignature?: boolean;
    storeFilesChangingSignatureDuringEmit?: boolean;
};

export function compilerOptionsToConfigJson(options: ts.CompilerOptions) {
    return ts.optionMapToObject(ts.serializeCompilerOptions(options));
}

export const noChangeRun: ts.TestTscEdit = {
    subScenario: "no-change-run",
    modifyFs: ts.noop
};
export const noChangeWithExportsDiscrepancyRun: ts.TestTscEdit = {
    ...noChangeRun,
    discrepancyExplanation: () => [
        "Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files",
        "Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed"
    ]
};
export const noChangeOnlyRuns = [noChangeRun];
export const noChangeWithExportsDiscrepancyOnlyRuns = [noChangeWithExportsDiscrepancyRun];

export interface TestTscCompile extends TestTscCompileLikeBase {
    baselineSourceMap?: boolean;
    baselineReadFileCalls?: boolean;
    baselinePrograms?: boolean;
    baselineDependencies?: boolean;
}

export type CommandLineProgram = [ts.Program, ts.BuilderProgram?];
export interface CommandLineCallbacks {
    cb: ts.ExecuteCommandLineCallbacks;
    getPrograms: () => readonly CommandLineProgram[];
}

function isAnyProgram(program: ts.Program | ts.BuilderProgram | ts.ParsedCommandLine): program is ts.Program | ts.BuilderProgram {
    return !!(program as ts.Program | ts.BuilderProgram).getCompilerOptions;
}
export function commandLineCallbacks(
    sys: TscCompileSystem | ts.tscWatch.WatchedSystem,
    originalReadCall?: ts.System["readFile"],
): CommandLineCallbacks {
    let programs: CommandLineProgram[] | undefined;

    return {
        cb: program => {
            if (isAnyProgram(program)) {
                ts.baselineBuildInfo(program.getCompilerOptions(), sys, originalReadCall);
                (programs || (programs = [])).push(ts.isBuilderProgram(program) ?
                    [program.getProgram(), program] :
                    [program]
                );
            }
            else {
                ts.baselineBuildInfo(program.options, sys, originalReadCall);
            }
        },
        getPrograms: () => {
            const result = programs || ts.emptyArray;
            programs = undefined;
            return result;
        }
    };
}
export interface TestTscCompileLikeBase extends VerifyTscCompileLike {
    diffWithInitial?: boolean;
    modifyFs?: (fs: vfs.FileSystem) => void;
    disableUseFileVersionAsSignature?: boolean;
    environmentVariables?: Record<string, string>;
}

export interface TestTscCompileLike extends TestTscCompileLikeBase {
    compile: (sys: TscCompileSystem) => void;
    additionalBaseline?: (sys: TscCompileSystem) => void;
}
/**
 * Initialize FS, run compile function and save baseline
 */
export function testTscCompileLike(input: TestTscCompileLike) {
    const initialFs = input.fs();
    const inputFs = initialFs.shadow();
    const {
        scenario, subScenario, diffWithInitial,
        commandLineArgs, modifyFs,
        environmentVariables,
        compile: worker, additionalBaseline,
    } = input;
    if (modifyFs) modifyFs(inputFs);
    inputFs.makeReadonly();
    const fs = inputFs.shadow();

    // Create system
    const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc", env: environmentVariables }) as TscCompileSystem;
    if (input.disableUseFileVersionAsSignature) sys.disableUseFileVersionAsSignature = true;
    sys.storeFilesChangingSignatureDuringEmit = true;
    sys.write(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}\n`);
    sys.exit = exitCode => sys.exitCode = exitCode;
    worker(sys);
    sys.write(`exitCode:: ExitStatus.${ts.ExitStatus[sys.exitCode as ts.ExitStatus]}\n`);
    additionalBaseline?.(sys);
    fs.makeReadonly();
    sys.baseLine = () => {
        const baseFsPatch = diffWithInitial ?
            inputFs.diff(initialFs, { includeChangedFileWithSameContent: true }) :
            inputFs.diff(/*base*/ undefined, { baseIsNotShadowRoot: true });
        const patch = fs.diff(inputFs, { includeChangedFileWithSameContent: true });
        return {
            file: `${ts.isBuild(commandLineArgs) ? "tsbuild" : "tsc"}/${scenario}/${subScenario.split(" ").join("-")}.js`,
            text: `Input::
${baseFsPatch ? vfs.formatPatch(baseFsPatch) : ""}

Output::
${sys.output.join("")}

${patch ? vfs.formatPatch(patch) : ""}`
        };
    };
    return sys;
}

function makeSystemReadyForBaseline(sys: TscCompileSystem, versionToWrite?: string) {
    if (versionToWrite) {
        fakes.patchHostForBuildInfoWrite(sys, versionToWrite);
    }
    else {
        fakes.patchHostForBuildInfoReadWrite(sys);
    }
    const writtenFiles = sys.writtenFiles = new ts.Set();
    const originalWriteFile = sys.writeFile;
    sys.writeFile = (fileName, content, writeByteOrderMark) => {
        const path = ts.toPathWithSystem(sys, fileName);
        // When buildinfo is same for two projects,
        // it gives error and doesnt write buildinfo but because buildInfo is written for one project,
        // readable baseline will be written two times for those two projects with same contents and is ok
        ts.Debug.assert(!writtenFiles.has(path) || ts.endsWith(path, "baseline.txt"));
        writtenFiles.add(path);
        return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
    };
}

export function createSolutionBuilderHostForBaseline(
    sys: TscCompileSystem | ts.tscWatch.WatchedSystem,
    versionToWrite?: string,
    originalRead?: (TscCompileSystem | ts.tscWatch.WatchedSystem)["readFile"]
) {
    if (sys instanceof fakes.System) makeSystemReadyForBaseline(sys, versionToWrite);
    const { cb } = commandLineCallbacks(sys, originalRead);
    const host = ts.createSolutionBuilderHost(sys,
        /*createProgram*/ undefined,
        ts.createDiagnosticReporter(sys, /*pretty*/ true),
        ts.createBuilderStatusReporter(sys, /*pretty*/ true),
    );
    host.afterProgramEmitAndDiagnostics = cb;
    host.afterEmitBundle = cb;
    return host;
}

/**
 * Initialize Fs, execute command line and save baseline
 */
export function testTscCompile(input: TestTscCompile) {
    let actualReadFileMap: ts.MapLike<number> | undefined;
    let getPrograms: CommandLineCallbacks["getPrograms"] | undefined;
    return testTscCompileLike({
        ...input,
        compile: commandLineCompile,
        additionalBaseline
    });

    function commandLineCompile(sys: TscCompileSystem) {
        makeSystemReadyForBaseline(sys);
        actualReadFileMap = {};
        const originalReadFile = sys.readFile;
        sys.readFile = path => {
            // Dont record libs
            if (path.startsWith("/src/")) {
                actualReadFileMap![path] = (ts.getProperty(actualReadFileMap!, path) || 0) + 1;
            }
            return originalReadFile.call(sys, path);
        };

        const result = commandLineCallbacks(sys, originalReadFile);
        ts.executeCommandLine(
            sys,
            result.cb,
            input.commandLineArgs,
        );
        sys.readFile = originalReadFile;
        getPrograms = result.getPrograms;
    }

    function additionalBaseline(sys: TscCompileSystem) {
        const { baselineSourceMap, baselineReadFileCalls, baselinePrograms, baselineDependencies } = input;
        if (baselinePrograms) {
            const baseline: string[] = [];
            ts.tscWatch.baselinePrograms(baseline, getPrograms!, ts.emptyArray, baselineDependencies);
            sys.write(baseline.join("\n"));
        }
        if (baselineReadFileCalls) {
            sys.write(`readFiles:: ${JSON.stringify(actualReadFileMap, /*replacer*/ undefined, " ")} `);
        }
        if (baselineSourceMap) ts.generateSourceMapBaselineFiles(sys);
        actualReadFileMap = undefined;
        getPrograms = undefined;
    }
}

export function verifyTscBaseline(sys: () => { baseLine: TscCompileSystem["baseLine"]; }) {
    it(`Generates files matching the baseline`, () => {
        const { file, text } = sys().baseLine();
        Harness.Baseline.runBaseline(file, text);
    });
}
export interface VerifyTscCompileLike {
    scenario: string;
    subScenario: string;
    commandLineArgs: readonly string[];
    fs: () => vfs.FileSystem;
}

/**
 * Verify by baselining after initializing FS and custom compile
 */
export function verifyTscCompileLike<T extends VerifyTscCompileLike>(verifier: (input: T) => { baseLine: TscCompileSystem["baseLine"]; }, input: T) {
    describe(`tsc ${input.commandLineArgs.join(" ")} ${input.scenario}:: ${input.subScenario}`, () => {
        describe(input.scenario, () => {
            describe(input.subScenario, () => {
                verifyTscBaseline(() => verifier({
                    ...input,
                    fs: () => input.fs().makeReadonly()
                }));
            });
        });
    });
}

/**
 * Verify by baselining after initializing FS and command line compile
 */
 export function verifyTsc(input: TestTscCompile) {
    verifyTscCompileLike(testTscCompile, input);
}
