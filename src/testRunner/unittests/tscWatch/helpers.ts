namespace ts.tscWatch {
    export const projects = `/user/username/projects`;
    export const projectRoot = `${projects}/myproject`;
    export import WatchedSystem = TestFSWithWatch.TestServerHost;
    export type File = TestFSWithWatch.File;
    export type SymLink = TestFSWithWatch.SymLink;
    export import libFile = TestFSWithWatch.libFile;
    export import createWatchedSystem = TestFSWithWatch.createWatchedSystem;
    export import checkArray = TestFSWithWatch.checkArray;
    export import checkWatchedFiles = TestFSWithWatch.checkWatchedFiles;
    export import checkWatchedFilesDetailed = TestFSWithWatch.checkWatchedFilesDetailed;
    export import checkWatchedDirectories = TestFSWithWatch.checkWatchedDirectories;
    export import checkWatchedDirectoriesDetailed = TestFSWithWatch.checkWatchedDirectoriesDetailed;
    export import checkOutputContains = TestFSWithWatch.checkOutputContains;
    export import checkOutputDoesNotContain = TestFSWithWatch.checkOutputDoesNotContain;

    export const commonFile1: File = {
        path: "/a/b/commonFile1.ts",
        content: "let x = 1"
    };
    export const commonFile2: File = {
        path: "/a/b/commonFile2.ts",
        content: "let y = 1"
    };

    export function checkProgramActualFiles(program: Program, expectedFiles: readonly string[]) {
        checkArray(`Program actual files`, program.getSourceFiles().map(file => file.fileName), expectedFiles);
    }

    export function getDiagnosticMessageChain(message: DiagnosticMessage, args?: (string | number)[], next?: DiagnosticMessageChain[]): DiagnosticMessageChain {
        let text = getLocaleSpecificMessage(message);
        if (args?.length) {
            text = formatStringFromArgs(text, args);
        }
        return {
            messageText: text,
            category: message.category,
            code: message.code,
            next
        };
    }

    function isDiagnosticMessageChain(message: DiagnosticMessage | DiagnosticMessageChain): message is DiagnosticMessageChain {
        return !!(message as DiagnosticMessageChain).messageText;
    }

    export function getDiagnosticOfFileFrom(file: SourceFile | undefined, start: number | undefined, length: number | undefined, message: DiagnosticMessage | DiagnosticMessageChain, ...args: (string | number)[]): Diagnostic {
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

    export function getDiagnosticWithoutFile(message: DiagnosticMessage | DiagnosticMessageChain, ...args: (string | number)[]): Diagnostic {
        return getDiagnosticOfFileFrom(/*file*/ undefined, /*start*/ undefined, /*length*/ undefined, message, ...args);
    }

    export function getDiagnosticOfFile(file: SourceFile, start: number, length: number, message: DiagnosticMessage | DiagnosticMessageChain, ...args: (string | number)[]): Diagnostic {
        return getDiagnosticOfFileFrom(file, start, length, message, ...args);
    }

    export function getDiagnosticOfFileFromProgram(program: Program, filePath: string, start: number, length: number, message: DiagnosticMessage | DiagnosticMessageChain, ...args: (string | number)[]): Diagnostic {
        return getDiagnosticOfFileFrom(program.getSourceFileByPath(toPath(filePath, program.getCurrentDirectory(), s => s.toLowerCase())),
            start, length, message, ...args);
    }

    export function getUnknownCompilerOption(program: Program, configFile: File, option: string) {
        const quotedOption = `"${option}"`;
        return getDiagnosticOfFile(program.getCompilerOptions().configFile!, configFile.content.indexOf(quotedOption), quotedOption.length, Diagnostics.Unknown_compiler_option_0, option);
    }

    export function getUnknownDidYouMeanCompilerOption(program: Program, configFile: File, option: string, didYouMean: string) {
        const quotedOption = `"${option}"`;
        return getDiagnosticOfFile(program.getCompilerOptions().configFile!, configFile.content.indexOf(quotedOption), quotedOption.length, Diagnostics.Unknown_compiler_option_0_Did_you_mean_1, option, didYouMean);
    }

    export function getDiagnosticModuleNotFoundOfFile(program: Program, file: File, moduleName: string) {
        const quotedModuleName = `"${moduleName}"`;
        return getDiagnosticOfFileFromProgram(program, file.path, file.content.indexOf(quotedModuleName), quotedModuleName.length, Diagnostics.Cannot_find_module_0_Did_you_mean_to_set_the_moduleResolution_option_to_node_or_to_add_aliases_to_the_paths_option, moduleName);
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

    export type WatchOrSolution<T extends BuilderProgram> = void | SolutionBuilder<T> | WatchOfConfigFile<T> | WatchOfFilesAndCompilerOptions<T>;
    export interface TscWatchCompileChange<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram> {
        caption: string;
        change: (sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles) => void;
        timeouts: (
            sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles,
            programs: readonly CommandLineProgram[],
            watchOrSolution: WatchOrSolution<T>
        ) => void;
    }
    export interface TscWatchCheckOptions {
        baselineSourceMap?: boolean;
        baselineDependencies?: boolean;
    }
    export interface TscWatchCompileBase<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram> extends TscWatchCheckOptions {
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
        change: noop,
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
            const { cb, getPrograms } = commandLineCallbacks(sys);
            const watchOrSolution = executeCommandLine(
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
        sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles;
        oldSnap: SystemSnap;
    }

    export interface Baseline extends BaselineBase, CommandLineCallbacks {
    }

    export function createBaseline(system: WatchedSystem, modifySystem?: (sys: WatchedSystem) => void): Baseline {
        const initialSys = fakes.patchHostForBuildInfoReadWrite(system);
        modifySystem?.(initialSys);
        const sys = TestFSWithWatch.changeToHostTrackingWrittenFiles(initialSys);
        const baseline: string[] = [];
        baseline.push("Input::");
        sys.diff(baseline);
        const { cb, getPrograms } = commandLineCallbacks(sys);
        return { sys, baseline, oldSnap: sys.snap(), cb, getPrograms };
    }

    export function createSolutionBuilderWithWatchHostForBaseline(sys: WatchedSystem, cb: ExecuteCommandLineCallbacks) {
        const host = createSolutionBuilderWithWatchHost(sys,
            /*createProgram*/ undefined,
            createDiagnosticReporter(sys, /*pretty*/ true),
            createBuilderStatusReporter(sys, /*pretty*/ true),
            createWatchStatusReporter(sys, /*pretty*/ true)
        );
        host.afterProgramEmitAndDiagnostics = cb;
        host.afterEmitBundle = cb;
        return host;
    }

    interface CreateWatchCompilerHostOfConfigFileForBaseline<T extends BuilderProgram> extends CreateWatchCompilerHostOfConfigFileInput<T> {
        system: WatchedSystem,
        cb: ExecuteCommandLineCallbacks;
    }

    export function createWatchCompilerHostOfConfigFileForBaseline<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(
        input: CreateWatchCompilerHostOfConfigFileForBaseline<T>
    ) {
        const host = createWatchCompilerHostOfConfigFile({
            ...input,
            reportDiagnostic: createDiagnosticReporter(input.system, /*pretty*/ true),
            reportWatchStatus: createWatchStatusReporter(input.system, /*pretty*/ true),
        });
        updateWatchHostForBaseline(host, input.cb);
        return host;
    }

    interface CreateWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T extends BuilderProgram> extends CreateWatchCompilerHostOfFilesAndCompilerOptionsInput<T> {
        system: WatchedSystem,
        cb: ExecuteCommandLineCallbacks;
    }
    export function createWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(
        input: CreateWatchCompilerHostOfFilesAndCompilerOptionsForBaseline<T>
    ) {
        const host = createWatchCompilerHostOfFilesAndCompilerOptions({
            ...input,
            reportDiagnostic: createDiagnosticReporter(input.system, /*pretty*/ true),
            reportWatchStatus: createWatchStatusReporter(input.system, /*pretty*/ true),
        });
        updateWatchHostForBaseline(host, input.cb);
        return host;
    }

    function updateWatchHostForBaseline<T extends BuilderProgram>(host: WatchCompilerHost<T>, cb: ExecuteCommandLineCallbacks) {
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

    export interface RunWatchBaseline<T extends BuilderProgram> extends BaselineBase, TscWatchCompileBase<T> {
        sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles;
        getPrograms: () => readonly CommandLineProgram[];
        watchOrSolution: WatchOrSolution<T>;
    }
    export function runWatchBaseline<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>({
        scenario, subScenario, commandLineArgs,
        getPrograms, sys, baseline, oldSnap,
        baselineSourceMap, baselineDependencies,
        changes, watchOrSolution
    }: RunWatchBaseline<T>) {
        baseline.push(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}`);
        let programs = watchBaseline({
            baseline,
            getPrograms,
            oldPrograms: emptyArray,
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
        Harness.Baseline.runBaseline(`${isBuild(commandLineArgs) ? "tsbuild" : "tsc"}${isWatch(commandLineArgs) ? "Watch" : ""}/${scenario}/${subScenario.split(" ").join("-")}.js`, baseline.join("\r\n"));
    }

    function isWatch(commandLineArgs: readonly string[]) {
        return forEach(commandLineArgs, arg => {
            if (arg.charCodeAt(0) !== CharacterCodes.minus) return false;
            const option = arg.slice(arg.charCodeAt(1) === CharacterCodes.minus ? 2 : 1).toLowerCase();
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
        baseline.push(`exitCode:: ExitStatus.${ExitStatus[sys.exitCode as ExitStatus]}`, "");
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
            const internalState = state as unknown as BuilderState;
            if (state.semanticDiagnosticsPerFile?.size) {
                baseline.push("Semantic diagnostics in builder refreshed for::");
                for (const file of program.getSourceFiles()) {
                    if (!state.semanticDiagnosticsFromOldState || !state.semanticDiagnosticsFromOldState.has(file.resolvedPath)) {
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
                    internalState.hasCalledUpdateShapeSignature.forEach((path: Path) => {
                        const info = state.fileInfos.get(path);
                        if(info?.version === info?.signature || !info?.signature) {
                            baseline.push(path + " (used version)");
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
        const content = Debug.checkDefined(sys.readFile(file));
        sys.writeFile(file, content.replace(searchValue, replaceValue));
    }

    export function createSolutionBuilder(system: WatchedSystem, rootNames: readonly string[], defaultOptions?: BuildOptions) {
        const host = createSolutionBuilderHost(system);
        return ts.createSolutionBuilder(host, rootNames, defaultOptions || {});
    }

    export function ensureErrorFreeBuild(host: WatchedSystem, rootNames: readonly string[]) {
        // ts build should succeed
        const solutionBuilder = createSolutionBuilder(host, rootNames, {});
        solutionBuilder.build();
        assert.equal(host.getOutput().length, 0, JSON.stringify(host.getOutput(), /*replacer*/ undefined, " "));
    }

    export function createSystemWithSolutionBuild(solutionRoots: readonly string[], files: readonly TestFSWithWatch.FileOrFolderOrSymLink[], params?: TestFSWithWatch.TestServerHostCreationParameters) {
        const sys = createWatchedSystem(files, params);
        const originalReadFile = sys.readFile;
        const originalWrite = sys.write;
        const originalWriteFile = sys.writeFile;
        const solutionBuilder = createSolutionBuilder(TestFSWithWatch.changeToHostTrackingWrittenFiles(
            fakes.patchHostForBuildInfoReadWrite(sys)
        ), solutionRoots, {});
        solutionBuilder.build();
        sys.readFile = originalReadFile;
        sys.write = originalWrite;
        sys.writeFile = originalWriteFile;
        return sys;
    }
}
