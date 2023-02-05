import { patchHostForBuildInfoReadWrite } from "../../_namespaces/fakes";
import { Baseline } from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    baselinePrograms,
    CommandLineCallbacks,
    commandLineCallbacks,
    CommandLineProgram,
    createSolutionBuilderHostForBaseline,
    generateSourceMapBaselineFiles,
} from "../tsc/helpers";
import {
    changeToHostTrackingWrittenFiles,
    createWatchedSystem,
    File,
    FileOrFolderOrSymLink,
    FileOrFolderOrSymLinkMap,
    TestServerHost,
    TestServerHostCreationParameters,
    TestServerHostTrackingWrittenFiles,
} from "../virtualFileSystemWithWatch";

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
    edit: (sys: TestServerHostTrackingWrittenFiles) => void;
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
    edits?: readonly TscWatchCompileChange<T>[];
}
export interface TscWatchCompile extends TscWatchCompileBase {
    sys: () => TestServerHost;
}

export const noopChange: TscWatchCompileChange = {
    caption: "No change",
    edit: ts.noop,
    timeouts: sys => sys.checkTimeoutQueueLength(0),
};

export type SystemSnap = ReturnType<TestServerHost["snap"]>;
function tscWatchCompile(input: TscWatchCompile) {
    it("tsc-watch:: Generates files matching the baseline", () => {
        const { sys, baseline, oldSnap } = createBaseline(input.sys());
        const {
            scenario, subScenario,
            commandLineArgs, edits,
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
            edits,
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

export function applyEdit(sys: BaselineBase["sys"], baseline: BaselineBase["baseline"], edit: TscWatchCompileChange["edit"], caption?: TscWatchCompileChange["caption"]) {
    const oldSnap = sys.snap();
    baseline.push(`Change::${caption ? " " + caption : ""}`, "");
    edit(sys);
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
    edits, watchOrSolution
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

    if (edits) {
        for (const { caption, edit, timeouts } of edits) {
            oldSnap = applyEdit(sys, baseline, edit, caption);
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
