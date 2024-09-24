import {
    verifyProgramStructure,
    verifyResolutionCache,
} from "../../../harness/incrementalUtils.js";
import { Baseline } from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";
import {
    applyEdit,
    baselineAfterTscCompile,
    BaselineBase,
    commandLineCallbacks,
    CommandLineProgram,
    createBaseline,
    isWatch,
    tscBaselineName,
    TscWatchSystem,
} from "./baseline.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";

export type WatchOrSolution<T extends ts.BuilderProgram> = void | ts.SolutionBuilder<T> | ts.WatchOfConfigFile<T> | ts.WatchOfFilesAndCompilerOptions<T>;
export interface TscWatchCompileChange<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram> {
    caption: string;
    edit: (sys: TscWatchSystem) => void;
    timeouts: (
        sys: TscWatchSystem,
        programs: readonly CommandLineProgram[],
        watchOrSolution: WatchOrSolution<T>,
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
    timeouts: ts.noop,
};

function tscWatchCompile(input: TscWatchCompile) {
    it("tscWatch:: Generates files matching the baseline", () => {
        const { sys, baseline } = createBaseline(input.sys());
        const {
            scenario,
            subScenario,
            commandLineArgs,
            edits,
            baselineSourceMap,
            baselineDependencies,
        } = input;
        ts.Debug.assert(isWatch(commandLineArgs), "use verifyTsc");
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

export function createSolutionBuilderWithWatchHostForBaseline(sys: TestServerHost, cb: ts.ExecuteCommandLineCallbacks): ts.SolutionBuilderWithWatchHost<ts.EmitAndSemanticDiagnosticsBuilderProgram> {
    const host = ts.createSolutionBuilderWithWatchHost(sys, /*createProgram*/ undefined, ts.createDiagnosticReporter(sys, /*pretty*/ true), ts.createBuilderStatusReporter(sys, /*pretty*/ true), ts.createWatchStatusReporter(sys, /*pretty*/ true));
    host.afterProgramEmitAndDiagnostics = cb;
    return host;
}

interface CreateWatchCompilerHostOfConfigFileForBaseline<T extends ts.BuilderProgram> extends ts.CreateWatchCompilerHostOfConfigFileInput<T> {
    system: TestServerHost;
    cb: ts.ExecuteCommandLineCallbacks;
}

export function createWatchCompilerHostOfConfigFileForBaseline<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(
    input: CreateWatchCompilerHostOfConfigFileForBaseline<T>,
): ts.WatchCompilerHostOfConfigFile<T> {
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
): ts.WatchCompilerHostOfFilesAndCompilerOptions<T> {
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
}: RunWatchBaseline<T>): void {
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
        for (const { caption, edit, timeouts } of edits) {
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
                resolutionCache: (watchOrSolution as ts.WatchOfConfigFile<T> | undefined)?.getResolutionCache?.(),
                useSourceOfProjectReferenceRedirect,
            });
        }
    }
    Baseline.runBaseline(tscBaselineName(scenario, subScenario, commandLineArgs), baseline.join("\r\n"));
}

export interface WatchBaseline extends BaselineBase, TscWatchCheckOptions {
    oldPrograms: readonly (CommandLineProgram | undefined)[];
    getPrograms: () => readonly CommandLineProgram[];
    caption?: string;
    resolutionCache?: ts.ResolutionCache;
    useSourceOfProjectReferenceRedirect?: () => boolean;
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
}: WatchBaseline): readonly CommandLineProgram[] {
    const programs = baselineAfterTscCompile(
        sys,
        baseline,
        getPrograms,
        oldPrograms,
        baselineSourceMap,
        /*shouldBaselinePrograms*/ true,
        baselineDependencies,
    );
    // Verify program structure and resolution cache when incremental edit with tsc --watch (without build mode)
    if (resolutionCache && programs.length) {
        ts.Debug.assert(programs.length === 1);
        verifyProgramStructureAndResolutionCache(
            caption!,
            sys,
            programs[0][0],
            resolutionCache,
            useSourceOfProjectReferenceRedirect,
        );
    }
    return programs;
}
function verifyProgramStructureAndResolutionCache(
    caption: string,
    sys: TscWatchSystem,
    program: ts.Program,
    resolutionCache: ts.ResolutionCache,
    useSourceOfProjectReferenceRedirect?: () => boolean,
) {
    const options = program.getCompilerOptions();
    const compilerHost = ts.createCompilerHostWorker(options, /*setParentNodes*/ undefined, sys);
    compilerHost.trace = ts.noop;
    compilerHost.writeFile = ts.notImplemented;
    compilerHost.useSourceOfProjectReferenceRedirect = useSourceOfProjectReferenceRedirect;
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
        preferNonRecursiveWatch: sys.preferNonRecursiveWatch,

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
export function verifyTscWatch(input: VerifyTscWatch): void {
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
