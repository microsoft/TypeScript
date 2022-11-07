import * as ts from "../../_namespaces/ts";
import * as fakes from "../../_namespaces/fakes";
import * as Harness from "../../_namespaces/Harness";

export const projects = `/user/username/projects`;
export const projectRoot = `${projects}/myproject`;
export import WatchedSystem = ts.TestFSWithWatch.TestServerHost;
export type File = ts.TestFSWithWatch.File;
export type SymLink = ts.TestFSWithWatch.SymLink;
export import libFile = ts.TestFSWithWatch.libFile;
export import createWatchedSystem = ts.TestFSWithWatch.createWatchedSystem;
export import checkArray = ts.TestFSWithWatch.checkArray;
export import checkOutputContains = ts.TestFSWithWatch.checkOutputContains;
export import checkOutputDoesNotContain = ts.TestFSWithWatch.checkOutputDoesNotContain;

export const commonFile1: File = {
    path: "/a/b/commonFile1.ts",
    content: "let x = 1"
};
export const commonFile2: File = {
    path: "/a/b/commonFile2.ts",
    content: "let y = 1"
};

export function checkProgramActualFiles(program: ts.Program, expectedFiles: readonly string[]) {
    checkArray(`Program actual files`, program.getSourceFiles().map(file => file.fileName), expectedFiles);
}

export function getDiagnosticMessageChain(message: ts.DiagnosticMessage, args?: (string | number)[], next?: ts.DiagnosticMessageChain[]): ts.DiagnosticMessageChain {
    let text = ts.getLocaleSpecificMessage(message);
    if (args?.length) {
        text = ts.formatStringFromArgs(text, args);
    }
    return {
        messageText: text,
        category: message.category,
        code: message.code,
        next
    };
}

function isDiagnosticMessageChain(message: ts.DiagnosticMessage | ts.DiagnosticMessageChain): message is ts.DiagnosticMessageChain {
    return !!(message as ts.DiagnosticMessageChain).messageText;
}

export function getDiagnosticOfFileFrom(file: ts.SourceFile | undefined, start: number | undefined, length: number | undefined, message: ts.DiagnosticMessage | ts.DiagnosticMessageChain, ...args: (string | number)[]): ts.Diagnostic {
    return {
        file,
        start,
        length,

        messageText: isDiagnosticMessageChain(message) ?
            message :
            getDiagnosticMessageChain(message, args).messageText,
        category: message.category,
        code: message.code,
    };
}

export function getDiagnosticWithoutFile(message: ts.DiagnosticMessage | ts.DiagnosticMessageChain, ...args: (string | number)[]): ts.Diagnostic {
    return getDiagnosticOfFileFrom(/*file*/ undefined, /*start*/ undefined, /*length*/ undefined, message, ...args);
}

export function getDiagnosticOfFile(file: ts.SourceFile, start: number, length: number, message: ts.DiagnosticMessage | ts.DiagnosticMessageChain, ...args: (string | number)[]): ts.Diagnostic {
    return getDiagnosticOfFileFrom(file, start, length, message, ...args);
}

export function getDiagnosticOfFileFromProgram(program: ts.Program, filePath: string, start: number, length: number, message: ts.DiagnosticMessage | ts.DiagnosticMessageChain, ...args: (string | number)[]): ts.Diagnostic {
    return getDiagnosticOfFileFrom(program.getSourceFileByPath(ts.toPath(filePath, program.getCurrentDirectory(), s => s.toLowerCase())),
        start, length, message, ...args);
}

export function getUnknownCompilerOption(program: ts.Program, configFile: File, option: string) {
    const quotedOption = `"${option}"`;
    return getDiagnosticOfFile(program.getCompilerOptions().configFile!, configFile.content.indexOf(quotedOption), quotedOption.length, ts.Diagnostics.Unknown_compiler_option_0, option);
}

export function getUnknownDidYouMeanCompilerOption(program: ts.Program, configFile: File, option: string, didYouMean: string) {
    const quotedOption = `"${option}"`;
    return getDiagnosticOfFile(program.getCompilerOptions().configFile!, configFile.content.indexOf(quotedOption), quotedOption.length, ts.Diagnostics.Unknown_compiler_option_0_Did_you_mean_1, option, didYouMean);
}

export function getDiagnosticModuleNotFoundOfFile(program: ts.Program, file: File, moduleName: string) {
    const quotedModuleName = `"${moduleName}"`;
    return getDiagnosticOfFileFromProgram(program, file.path, file.content.indexOf(quotedModuleName), quotedModuleName.length, ts.Diagnostics.Cannot_find_module_0_Did_you_mean_to_set_the_moduleResolution_option_to_node_or_to_add_aliases_to_the_paths_option, moduleName);
}

export function runQueuedTimeoutCallbacks(sys: WatchedSystem) {
    sys.runQueuedTimeoutCallbacks();
}

export function checkSingleTimeoutQueueLengthAndRun(sys: WatchedSystem) {
    sys.checkTimeoutQueueLengthAndRun(1);
}

export function checkSingleTimeoutQueueLengthAndRunAndVerifyNoTimeout(sys: WatchedSystem) {
    sys.checkTimeoutQueueLengthAndRun(1);
    sys.checkTimeoutQueueLength(0);
}

export type WatchOrSolution<T extends ts.BuilderProgram> = void | ts.SolutionBuilder<T> | ts.WatchOfConfigFile<T> | ts.WatchOfFilesAndCompilerOptions<T>;
export interface TscWatchCompileChange<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram> {
    caption: string;
    change: (sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles) => void;
    timeouts: (
        sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles,
        programs: readonly ts.CommandLineProgram[],
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
    sys: () => WatchedSystem;
}

export const noopChange: TscWatchCompileChange = {
    caption: "No change",
    change: ts.noop,
    timeouts: sys => sys.checkTimeoutQueueLength(0),
};

export type SystemSnap = ReturnType<WatchedSystem["snap"]>;
function tscWatchCompile(input: TscWatchCompile) {
    it("tsc-watch:: Generates files matching the baseline", () => {
        const { sys, baseline, oldSnap } = createBaseline(input.sys());
        const {
            scenario, subScenario,
            commandLineArgs, changes,
            baselineSourceMap, baselineDependencies
        } = input;

        if (!isWatch(commandLineArgs)) sys.exit = exitCode => sys.exitCode = exitCode;
        const { cb, getPrograms } = ts.commandLineCallbacks(sys);
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
    sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles;
    oldSnap: SystemSnap;
}

export interface Baseline extends BaselineBase, ts.CommandLineCallbacks {
}

export function createBaseline(system: WatchedSystem, modifySystem?: (sys: WatchedSystem, originalRead: WatchedSystem["readFile"]) => void): Baseline {
    const originalRead = system.readFile;
    const initialSys = fakes.patchHostForBuildInfoReadWrite(system);
    modifySystem?.(initialSys, originalRead);
    const sys = ts.TestFSWithWatch.changeToHostTrackingWrittenFiles(initialSys);
    const baseline: string[] = [];
    baseline.push("Input::");
    sys.diff(baseline);
    const { cb, getPrograms } = ts.commandLineCallbacks(sys);
    return { sys, baseline, oldSnap: sys.snap(), cb, getPrograms };
}

export function createSolutionBuilderWithWatchHostForBaseline(sys: WatchedSystem, cb: ts.ExecuteCommandLineCallbacks) {
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
    system: WatchedSystem,
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
    system: WatchedSystem,
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
    sys: ts.TestFSWithWatch.TestServerHostTrackingWrittenFiles;
    getPrograms: () => readonly ts.CommandLineProgram[];
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
    Harness.Baseline.runBaseline(`${ts.isBuild(commandLineArgs) ? "tsbuild" : "tsc"}${isWatch(commandLineArgs) ? "Watch" : ""}/${scenario}/${subScenario.split(" ").join("-")}.js`, baseline.join("\r\n"));
}

function isWatch(commandLineArgs: readonly string[]) {
    return ts.forEach(commandLineArgs, arg => {
        if (arg.charCodeAt(0) !== ts.CharacterCodes.minus) return false;
        const option = arg.slice(arg.charCodeAt(1) === ts.CharacterCodes.minus ? 2 : 1).toLowerCase();
        return option === "watch" || option === "w";
    });
}

export interface WatchBaseline extends BaselineBase, TscWatchCheckOptions {
    oldPrograms: readonly (ts.CommandLineProgram | undefined)[];
    getPrograms: () => readonly ts.CommandLineProgram[];
}
export function watchBaseline({ baseline, getPrograms, oldPrograms, sys, oldSnap, baselineSourceMap, baselineDependencies }: WatchBaseline) {
    if (baselineSourceMap) ts.generateSourceMapBaselineFiles(sys);
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

export function baselinePrograms(baseline: string[], getPrograms: () => readonly ts.CommandLineProgram[], oldPrograms: readonly (ts.CommandLineProgram | undefined)[], baselineDependencies: boolean | undefined) {
    const programs = getPrograms();
    for (let i = 0; i < programs.length; i++) {
        baselineProgram(baseline, programs[i], oldPrograms[i], baselineDependencies);
    }
    return programs;
}

function baselineProgram(baseline: string[], [program, builderProgram]: ts.CommandLineProgram, oldProgram: ts.CommandLineProgram | undefined, baselineDependencies: boolean | undefined) {
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

export function replaceFileText(sys: WatchedSystem, file: string, searchValue: string | RegExp, replaceValue: string) {
    const content = ts.Debug.checkDefined(sys.readFile(file));
    sys.writeFile(file, content.replace(searchValue, replaceValue));
}

export function createSolutionBuilder(system: WatchedSystem, rootNames: readonly string[], originalRead?: WatchedSystem["readFile"]) {
    const host = ts.createSolutionBuilderHostForBaseline(system, /*versionToWrite*/ undefined, originalRead);
    return ts.createSolutionBuilder(host, rootNames, {});
}

export function ensureErrorFreeBuild(host: WatchedSystem, rootNames: readonly string[]) {
    // ts build should succeed
    solutionBuildWithBaseline(host, rootNames);
    assert.equal(host.getOutput().length, 0, JSON.stringify(host.getOutput(), /*replacer*/ undefined, " "));
}

export function solutionBuildWithBaseline(sys: WatchedSystem, solutionRoots: readonly string[], originalRead?: WatchedSystem["readFile"]) {
    const originalReadFile = sys.readFile;
    const originalWrite = sys.write;
    const originalWriteFile = sys.writeFile;
    const solutionBuilder = createSolutionBuilder(ts.TestFSWithWatch.changeToHostTrackingWrittenFiles(
        fakes.patchHostForBuildInfoReadWrite(sys)
    ), solutionRoots, originalRead);
    solutionBuilder.build();
    sys.readFile = originalReadFile;
    sys.write = originalWrite;
    sys.writeFile = originalWriteFile;
    return sys;
}

export function createSystemWithSolutionBuild(solutionRoots: readonly string[], files: ts.TestFSWithWatch.FileOrFolderOrSymLinkMap | readonly ts.TestFSWithWatch.FileOrFolderOrSymLink[], params?: ts.TestFSWithWatch.TestServerHostCreationParameters) {
    return solutionBuildWithBaseline(createWatchedSystem(files, params), solutionRoots);
}
