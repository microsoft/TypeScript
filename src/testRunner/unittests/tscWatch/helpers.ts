import * as ts from "../../_namespaces/ts";
import { patchHostForBuildInfoReadWrite } from "../../_namespaces/fakes";
import { Baseline } from "../../_namespaces/Harness";
import { changeToHostTrackingWrittenFiles, createWatchedSystem, File, FileOrFolderOrSymLink, FileOrFolderOrSymLinkMap, TestServerHost, TestServerHostCreationParameters, TestServerHostTrackingWrittenFiles } from "../../../harness/virtualFileSystemWithWatch";
import { commandLineCallbacks, CommandLineCallbacks, CommandLineProgram, createSolutionBuilderHostForBaseline } from "../tsc/helpers";
import { generateSourceMapBaselineFiles } from "../tsbuild/helpers";

export const commonFile1: File = {
    path: "/a/b/commonFile1.ts",
    content: "let x = 1"
};
export const commonFile2: File = {
    path: "/a/b/commonFile2.ts",
    content: "let y = 1"
};

export type WatchOrSolution<T extends ts.BuilderProgram> = void | ts.SolutionBuilder<T> | ts.WatchOfConfigFile<T> | ts.WatchOfFilesAndCompilerOptions<T>;
export interface TscWatchCompileChange<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram> {
    caption: string;
    change: (sys: TestServerHostTrackingWrittenFiles) => void;
    timeouts: (
        sys: TestServerHostTrackingWrittenFiles,
        programs: readonly CommandLineProgram[],
        watchOrSolution: WatchOrSolution<T>
    ) => void;
}
export interface TscWatchCheckOptions {
    baselineSourceMap?: boolean;
    baselineDependencies?: boolean;
}
export interface TscWatchCompileBase<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram> extends TscWatchCheckOptions {
    scenario: string;
    subScenario: string;
    commandLineArgs: readonly string[];
    changes: readonly TscWatchCompileChange<T>[];
}
export interface TscWatchCompile extends TscWatchCompileBase {
    sys: () => TestServerHost;
}

export const noopChange: TscWatchCompileChange = {
    caption: "No change",
    change: ts.noop,
    timeouts: sys => sys.checkTimeoutQueueLength(0),
};

export type SystemSnap = ReturnType<TestServerHost["snap"]>;
function tscWatchCompile(input: TscWatchCompile) {
    it("tsc-watch:: Generates files matching the baseline", () => {
        const { sys, baseline, oldSnap } = createBaseline(input.sys());
        const {
            scenario, subScenario,
            commandLineArgs, changes,
            baselineSourceMap, baselineDependencies
        } = input;

        if (!isWatch(commandLineArgs)) sys.exit = exitCode => sys.exitCode = exitCode;
        const { cb, getPrograms } = commandLineCallbacks(sys);
        const watchOrSolution = ts.executeCommandLine(
            sys,
            cb,
            commandLineArgs,
        );
        runWatchBaseline({
            scenario,
            subScenario,
            commandLineArgs,
            sys,
            baseline,
            oldSnap,
            getPrograms,
            baselineSourceMap,
            baselineDependencies,
            changes,
            watchOrSolution
        });
    });
}

export interface BaselineBase {
    baseline: string[];
    sys: TestServerHostTrackingWrittenFiles;
    oldSnap: SystemSnap;
}

export interface Baseline extends BaselineBase, CommandLineCallbacks {
}

export function createBaseline(system: TestServerHost, modifySystem?: (sys: TestServerHost, originalRead: TestServerHost["readFile"]) => void): Baseline {
    const originalRead = system.readFile;
    const initialSys = patchHostForBuildInfoReadWrite(system);
    modifySystem?.(initialSys, originalRead);
    const sys = changeToHostTrackingWrittenFiles(initialSys);
    const baseline: string[] = [];
    baseline.push("Input::");
    sys.diff(baseline);
    const { cb, getPrograms } = commandLineCallbacks(sys);
    return { sys, baseline, oldSnap: sys.snap(), cb, getPrograms };
}

export function createSolutionBuilderWithWatchHostForBaseline(sys: TestServerHost, cb: ts.ExecuteCommandLineCallbacks) {
    const host = ts.createSolutionBuilderWithWatchHost(sys,
        /*createProgram*/ undefined,
        ts.createDiagnosticReporter(sys, /*pretty*/ true),
        ts.createBuilderStatusReporter(sys, /*pretty*/ true),
        ts.createWatchStatusReporter(sys, /*pretty*/ true)
    );
    host.afterProgramEmitAndDiagnostics = cb;
    host.afterEmitBundle = cb;
    return host;
}

interface CreateWatchCompilerHostOfConfigFileForBaseline<T extends ts.BuilderProgram> extends ts.CreateWatchCompilerHostOfConfigFileInput<T> {
    system: TestServerHost,
    cb: ts.ExecuteCommandLineCallbacks;
}

export function createWatchCompilerHostOfConfigFileForBaseline<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(
    input: CreateWatchCompilerHostOfConfigFileForBaseline<T>
) {
    const host = ts.createWatchCompilerHostOfConfigFile({
        ...input,
        reportDiagnostic: ts.createDiagnosticReporter(input.system, /*pretty*/ true),
        reportWatchStatus: ts.createWatchStatusReporter(input.system, /*pretty*/ true),
    });
    updateWatchHostForBaseline(host, input.cb);
    return host;
}

interface CreateWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T extends ts.BuilderProgram> extends ts.CreateWatchCompilerHostOfFilesAndCompilerOptionsInput<T> {
    system: TestServerHost,
    cb: ts.ExecuteCommandLineCallbacks;
}
export function createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(
    input: CreateWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T>
) {
    const host = ts.createWatchCompilerHostOfFilesAndCompilerOptions({
        ...input,
        reportDiagnostic: ts.createDiagnosticReporter(input.system, /*pretty*/ true),
        reportWatchStatus: ts.createWatchStatusReporter(input.system, /*pretty*/ true),
    });
    updateWatchHostForBaseline(host, input.cb);
    return host;
}

function updateWatchHostForBaseline<T extends ts.BuilderProgram>(host: ts.WatchCompilerHost<T>, cb: ts.ExecuteCommandLineCallbacks) {
    const emitFilesAndReportErrors = host.afterProgramCreate!;
    host.afterProgramCreate = builderProgram => {
        emitFilesAndReportErrors.call(host, builderProgram);
        cb(builderProgram);
    };
    return host;
}

export function applyChange(sys: BaselineBase["sys"], baseline: BaselineBase["baseline"], change: TscWatchCompileChange["change"], caption?: TscWatchCompileChange["caption"]) {
    const oldSnap = sys.snap();
    baseline.push(`Change::${caption ? " " + caption : ""}`, "");
    change(sys);
    baseline.push("Input::");
    sys.diff(baseline, oldSnap);
    return sys.snap();
}

export interface RunWatchBaseline<T extends ts.BuilderProgram> extends BaselineBase, TscWatchCompileBase<T> {
    sys: TestServerHostTrackingWrittenFiles;
    getPrograms: () => readonly CommandLineProgram[];
    watchOrSolution: WatchOrSolution<T>;
}
export function runWatchBaseline<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>({
    scenario, subScenario, commandLineArgs,
    getPrograms, sys, baseline, oldSnap,
    baselineSourceMap, baselineDependencies,
    changes, watchOrSolution
}: RunWatchBaseline<T>) {
    baseline.push(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}`);
    let programs = watchBaseline({
        baseline,
        getPrograms,
        oldPrograms: ts.emptyArray,
        sys,
        oldSnap,
        baselineSourceMap,
        baselineDependencies,
    });

    for (const { caption, change, timeouts } of changes) {
        oldSnap = applyChange(sys, baseline, change, caption);
        timeouts(sys, programs, watchOrSolution);
        programs = watchBaseline({
            baseline,
            getPrograms,
            oldPrograms: programs,
            sys,
            oldSnap,
            baselineSourceMap,
            baselineDependencies,
        });
    }
    Baseline.runBaseline(`${ts.isBuild(commandLineArgs) ? "tsbuild" : "tsc"}${isWatch(commandLineArgs) ? "Watch" : ""}/${scenario}/${subScenario.split(" ").join("-")}.js`, baseline.join("\r\n"));
}

function isWatch(commandLineArgs: readonly string[]) {
    return ts.forEach(commandLineArgs, arg => {
        if (arg.charCodeAt(0) !== ts.CharacterCodes.minus) return false;
        const option = arg.slice(arg.charCodeAt(1) === ts.CharacterCodes.minus ? 2 : 1).toLowerCase();
        return option === "watch" || option === "w";
    });
}

export interface WatchBaseline extends BaselineBase, TscWatchCheckOptions {
    oldPrograms: readonly (CommandLineProgram | undefined)[];
    getPrograms: () => readonly CommandLineProgram[];
}
export function watchBaseline({ baseline, getPrograms, oldPrograms, sys, oldSnap, baselineSourceMap, baselineDependencies }: WatchBaseline) {
    if (baselineSourceMap) generateSourceMapBaselineFiles(sys);
    sys.serializeOutput(baseline);
    const programs = baselinePrograms(baseline, getPrograms, oldPrograms, baselineDependencies);
    sys.serializeWatches(baseline);
    baseline.push(`exitCode:: ExitStatus.${ts.ExitStatus[sys.exitCode as ts.ExitStatus]}`, "");
    sys.diff(baseline, oldSnap);
    sys.writtenFiles.forEach((value, key) => {
        assert.equal(value, 1, `Expected to write file ${key} only once`);
    });
    sys.writtenFiles.clear();
    return programs;
}

export function baselinePrograms(baseline: string[], getPrograms: () => readonly CommandLineProgram[], oldPrograms: readonly (CommandLineProgram | undefined)[], baselineDependencies: boolean | undefined) {
    const programs = getPrograms();
    for (let i = 0; i < programs.length; i++) {
        baselineProgram(baseline, programs[i], oldPrograms[i], baselineDependencies);
    }
    return programs;
}

function baselineProgram(baseline: string[], [program, builderProgram]: CommandLineProgram, oldProgram: CommandLineProgram | undefined, baselineDependencies: boolean | undefined) {
    if (program !== oldProgram?.[0]) {
        const options = program.getCompilerOptions();
        baseline.push(`Program root files: ${JSON.stringify(program.getRootFileNames())}`);
        baseline.push(`Program options: ${JSON.stringify(options)}`);
        baseline.push(`Program structureReused: ${(ts as any).StructureIsReused[program.structureIsReused]}`);
        baseline.push("Program files::");
        for (const file of program.getSourceFiles()) {
            baseline.push(file.fileName);
        }
    }
    else {
        baseline.push(`Program: Same as old program`);
    }
    baseline.push("");

    if (!builderProgram) return;
    if (builderProgram !== oldProgram?.[1]) {
        const state = builderProgram.getState();
        const internalState = state as unknown as ts.BuilderProgramState;
        if (state.semanticDiagnosticsPerFile?.size) {
            baseline.push("Semantic diagnostics in builder refreshed for::");
            for (const file of program.getSourceFiles()) {
                if (!internalState.semanticDiagnosticsFromOldState || !internalState.semanticDiagnosticsFromOldState.has(file.resolvedPath)) {
                    baseline.push(file.fileName);
                }
            }
        }
        else {
            baseline.push("No cached semantic diagnostics in the builder::");
        }
        if (internalState) {
            baseline.push("");
            if (internalState.hasCalledUpdateShapeSignature?.size) {
                baseline.push("Shape signatures in builder refreshed for::");
                internalState.hasCalledUpdateShapeSignature.forEach((path: ts.Path) => {
                    const info = state.fileInfos.get(path);
                    if (info?.version === info?.signature || !info?.signature) {
                        baseline.push(path + " (used version)");
                    }
                    else if (internalState.filesChangingSignature?.has(path)) {
                        baseline.push(path + " (computed .d.ts during emit)");
                    }
                    else {
                        baseline.push(path + " (computed .d.ts)");
                    }
                });
            }
            else {
                baseline.push("No shapes updated in the builder::");
            }
        }
        baseline.push("");
        if (!baselineDependencies) return;
        baseline.push("Dependencies for::");
        for (const file of builderProgram.getSourceFiles()) {
            baseline.push(`${file.fileName}:`);
            for (const depenedency of builderProgram.getAllDependencies(file)) {
                baseline.push(`  ${depenedency}`);
            }
        }
    }
    else {
        baseline.push(`BuilderProgram: Same as old builder program`);
    }
    baseline.push("");
}

export interface VerifyTscWatch extends TscWatchCompile {
    baselineIncremental?: boolean;
}
export function verifyTscWatch(input: VerifyTscWatch) {
    describe(input.scenario, () => {
        describe(input.subScenario, () => {
            tscWatchCompile(input);
        });
        if (input.baselineIncremental) {
            describe(`${input.subScenario} with incremental`, () => {
                tscWatchCompile({
                    ...input,
                    subScenario: `${input.subScenario} with incremental`,
                    commandLineArgs: [...input.commandLineArgs, "--incremental"],
                });
            });
        }
    });
}

export function createSolutionBuilder(system: TestServerHost, rootNames: readonly string[], originalRead?: TestServerHost["readFile"]) {
    const host = createSolutionBuilderHostForBaseline(system, /*versionToWrite*/ undefined, originalRead);
    return ts.createSolutionBuilder(host, rootNames, {});
}

export function ensureErrorFreeBuild(host: TestServerHost, rootNames: readonly string[]) {
    // ts build should succeed
    solutionBuildWithBaseline(host, rootNames);
    assert.equal(host.getOutput().length, 0, JSON.stringify(host.getOutput(), /*replacer*/ undefined, " "));
}

export function solutionBuildWithBaseline(sys: TestServerHost, solutionRoots: readonly string[], originalRead?: TestServerHost["readFile"]) {
    const originalReadFile = sys.readFile;
    const originalWrite = sys.write;
    const originalWriteFile = sys.writeFile;
    const solutionBuilder = createSolutionBuilder(changeToHostTrackingWrittenFiles(
        patchHostForBuildInfoReadWrite(sys)
    ), solutionRoots, originalRead);
    solutionBuilder.build();
    sys.readFile = originalReadFile;
    sys.write = originalWrite;
    sys.writeFile = originalWriteFile;
    return sys;
}

export function createSystemWithSolutionBuild(solutionRoots: readonly string[], files: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], params?: TestServerHostCreationParameters) {
    return solutionBuildWithBaseline(createWatchedSystem(files, params), solutionRoots);
}
