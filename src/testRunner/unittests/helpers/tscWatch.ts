import {
    verifyProgramStructure,
    verifyResolutionCache,
} from "../../../harness/incrementalUtils";
import {
    patchHostForBuildInfoReadWrite,
} from "../../_namespaces/fakes";
import {
    Baseline,
} from "../../_namespaces/Harness";
import * as ts from "../../_namespaces/ts";
import {
    baselinePrograms,
    CommandLineCallbacks,
    commandLineCallbacks,
    CommandLineProgram,
    generateSourceMapBaselineFiles,
    tscBaselineName,
} from "./baseline";
import {
    changeToHostTrackingWrittenFiles,
    File,
    SerializeOutputOrder,
    StateLogger,
    TestServerHost,
    TestServerHostTrackingWrittenFiles,
} from "./virtualFileSystemWithWatch";

export const commonFile1: File = {
    path: "/a/b/commonFile1.ts",
    content: "let x = 1",
};
export const commonFile2: File = {
    path: "/a/b/commonFile2.ts",
    content: "let y = 1",
};

export type WatchOrSolution<T extends ts.BuilderProgram> = void | ts.SolutionBuilder<T> | ts.WatchOfConfigFile<T> | ts.WatchOfFilesAndCompilerOptions<T>;
export interface TscWatchCompileChange<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram> {
    caption: string;
    edit: (sys: TscWatchSystem) => void;
    timeouts: (
        sys: TscWatchSystem,
        programs: readonly CommandLineProgram[],
        watchOrSolution: WatchOrSolution<T>,
    ) => void;
    // TODO:: sheetal: Needing these fields are technically issues that need to be fixed later
    symlinksNotReflected?: readonly string[];
    skipStructureCheck?: true;
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
    timeouts: ts.noop,
};

function tscWatchCompile(input: TscWatchCompile) {
    it("tsc-watch:: Generates files matching the baseline", () => {
        const { sys, baseline } = createBaseline(input.sys());
        const {
            scenario,
            subScenario,
            commandLineArgs,
            edits,
            baselineSourceMap,
            baselineDependencies,
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
            getPrograms,
            baselineSourceMap,
            baselineDependencies,
            edits,
            watchOrSolution,
        });
    });
}

export type TscWatchSystem = TestServerHostTrackingWrittenFiles;

function changeToTestServerHostWithTimeoutLogging(host: TestServerHostTrackingWrittenFiles, baseline: string[]): TscWatchSystem {
    const logger: StateLogger = {
        log: s => baseline.push(s),
        logs: baseline,
    };
    host.timeoutCallbacks.switchToBaseliningInvoke(logger, SerializeOutputOrder.BeforeDiff);
    host.immediateCallbacks.switchToBaseliningInvoke(logger, SerializeOutputOrder.BeforeDiff);
    return host;
}

export interface BaselineBase {
    baseline: string[];
    sys: TscWatchSystem;
}

export interface Baseline extends BaselineBase, CommandLineCallbacks {
}

export function createBaseline(system: TestServerHost, modifySystem?: (sys: TestServerHost, originalRead: TestServerHost["readFile"]) => void): Baseline {
    const originalRead = system.readFile;
    const initialSys = patchHostForBuildInfoReadWrite(system);
    modifySystem?.(initialSys, originalRead);
    const baseline: string[] = [];
    const sys = changeToTestServerHostWithTimeoutLogging(changeToHostTrackingWrittenFiles(initialSys), baseline);
    baseline.push(`currentDirectory:: ${sys.getCurrentDirectory()} useCaseSensitiveFileNames: ${sys.useCaseSensitiveFileNames}`);
    baseline.push("Input::");
    sys.serializeState(baseline, SerializeOutputOrder.None);
    const { cb, getPrograms } = commandLineCallbacks(sys);
    return { sys, baseline, cb, getPrograms };
}

export function createSolutionBuilderWithWatchHostForBaseline(sys: TestServerHost, cb: ts.ExecuteCommandLineCallbacks) {
    const host = ts.createSolutionBuilderWithWatchHost(sys, /*createProgram*/ undefined, ts.createDiagnosticReporter(sys, /*pretty*/ true), ts.createBuilderStatusReporter(sys, /*pretty*/ true), ts.createWatchStatusReporter(sys, /*pretty*/ true));
    host.afterProgramEmitAndDiagnostics = cb;
    host.afterEmitBundle = cb;
    return host;
}

interface CreateWatchCompilerHostOfConfigFileForBaseline<T extends ts.BuilderProgram> extends ts.CreateWatchCompilerHostOfConfigFileInput<T> {
    system: TestServerHost;
    cb: ts.ExecuteCommandLineCallbacks;
}

export function createWatchCompilerHostOfConfigFileForBaseline<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(
    input: CreateWatchCompilerHostOfConfigFileForBaseline<T>,
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
    system: TestServerHost;
    cb: ts.ExecuteCommandLineCallbacks;
}
export function createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(
    input: CreateWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T>,
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
    baseline.push(`Change::${caption ? " " + caption : ""}`, "");
    edit(sys);
    baseline.push("Input::");
    sys.serializeState(baseline, SerializeOutputOrder.AfterDiff);
}

export interface RunWatchBaseline<T extends ts.BuilderProgram> extends BaselineBase, TscWatchCompileBase<T> {
    sys: TscWatchSystem;
    getPrograms: () => readonly CommandLineProgram[];
    watchOrSolution: WatchOrSolution<T>;
    useSourceOfProjectReferenceRedirect?: () => boolean;
}
export function runWatchBaseline<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>({
    scenario,
    subScenario,
    commandLineArgs,
    getPrograms,
    sys,
    baseline,
    baselineSourceMap,
    baselineDependencies,
    edits,
    watchOrSolution,
    useSourceOfProjectReferenceRedirect,
}: RunWatchBaseline<T>) {
    baseline.push(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}`);
    let programs = watchBaseline({
        baseline,
        getPrograms,
        oldPrograms: ts.emptyArray,
        sys,
        baselineSourceMap,
        baselineDependencies,
    });

    if (edits) {
        for (const { caption, edit, timeouts, symlinksNotReflected, skipStructureCheck } of edits) {
            applyEdit(sys, baseline, edit, caption);
            timeouts(sys, programs, watchOrSolution);
            programs = watchBaseline({
                baseline,
                getPrograms,
                oldPrograms: programs,
                sys,
                baselineSourceMap,
                baselineDependencies,
                caption,
                resolutionCache: !skipStructureCheck ? (watchOrSolution as ts.WatchOfConfigFile<T> | undefined)?.getResolutionCache?.() : undefined,
                useSourceOfProjectReferenceRedirect,
                symlinksNotReflected,
            });
        }
    }
    Baseline.runBaseline(tscBaselineName(scenario, subScenario, commandLineArgs, isWatch(commandLineArgs)), baseline.join("\r\n"));
}

export function isWatch(commandLineArgs: readonly string[]) {
    return ts.forEach(commandLineArgs, arg => {
        if (arg.charCodeAt(0) !== ts.CharacterCodes.minus) return false;
        const option = arg.slice(arg.charCodeAt(1) === ts.CharacterCodes.minus ? 2 : 1).toLowerCase();
        return option === "watch" || option === "w";
    });
}

export interface WatchBaseline extends BaselineBase, TscWatchCheckOptions {
    oldPrograms: readonly (CommandLineProgram | undefined)[];
    getPrograms: () => readonly CommandLineProgram[];
    caption?: string;
    resolutionCache?: ts.ResolutionCache;
    useSourceOfProjectReferenceRedirect?: () => boolean;
    symlinksNotReflected?: readonly string[];
}
export function watchBaseline({
    baseline,
    getPrograms,
    oldPrograms,
    sys,
    baselineSourceMap,
    baselineDependencies,
    caption,
    resolutionCache,
    useSourceOfProjectReferenceRedirect,
    symlinksNotReflected,
}: WatchBaseline) {
    if (baselineSourceMap) generateSourceMapBaselineFiles(sys);
    const programs = getPrograms();
    sys.writtenFiles.forEach((value, key) => {
        assert.equal(value, 1, `Expected to write file ${key} only once`);
    });
    sys.serializeState(baseline, SerializeOutputOrder.BeforeDiff);
    baselinePrograms(baseline, programs, oldPrograms, baselineDependencies);
    baseline.push(`exitCode:: ExitStatus.${ts.ExitStatus[sys.exitCode as ts.ExitStatus]}`, "");
    // Verify program structure and resolution cache when incremental edit with tsc --watch (without build mode)
    if (resolutionCache && programs.length) {
        ts.Debug.assert(programs.length === 1);
        verifyProgramStructureAndResolutionCache(caption!, sys, programs[0][0], resolutionCache, useSourceOfProjectReferenceRedirect, symlinksNotReflected);
    }
    return programs;
}
function verifyProgramStructureAndResolutionCache(
    caption: string,
    sys: TscWatchSystem,
    program: ts.Program,
    resolutionCache: ts.ResolutionCache,
    useSourceOfProjectReferenceRedirect?: () => boolean,
    symlinksNotReflected?: readonly string[],
) {
    const options = program.getCompilerOptions();
    const compilerHost = ts.createCompilerHostWorker(options, /*setParentNodes*/ undefined, sys);
    compilerHost.trace = ts.noop;
    compilerHost.writeFile = ts.notImplemented;
    compilerHost.useSourceOfProjectReferenceRedirect = useSourceOfProjectReferenceRedirect;
    const readFile = compilerHost.readFile;
    compilerHost.readFile = fileName => {
        const text = readFile.call(compilerHost, fileName);
        if (!ts.contains(symlinksNotReflected, fileName)) return text;
        // Handle symlinks that dont reflect the watch change
        ts.Debug.assert(sys.toPath(sys.realpath(fileName)) !== sys.toPath(fileName));
        const file = program.getSourceFile(fileName)!;
        ts.Debug.assert(file.text !== text);
        return file.text;
    };
    verifyProgramStructure(
        ts.createProgram({
            rootNames: program.getRootFileNames(),
            options,
            projectReferences: program.getProjectReferences(),
            host: compilerHost,
        }),
        program,
        caption,
    );
    verifyResolutionCache(resolutionCache, program, {
        ...compilerHost,

        getCompilerHost: () => compilerHost,
        toPath: fileName => sys.toPath(fileName),
        getCompilationSettings: () => options,
        fileIsOpen: ts.returnFalse,
        getCurrentProgram: () => program,

        watchDirectoryOfFailedLookupLocation: ts.returnNoopFileWatcher,
        watchAffectingFileLocation: ts.returnNoopFileWatcher,
        onInvalidatedResolution: ts.noop,
        watchTypeRootsDirectory: ts.returnNoopFileWatcher,
        onChangedAutomaticTypeDirectiveNames: ts.noop,
        scheduleInvalidateResolutionsOfFailedLookupLocations: ts.noop,
        getCachedDirectoryStructureHost: ts.returnUndefined,
        writeLog: ts.noop,
    }, caption);
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
