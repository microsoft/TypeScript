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

    export function checkProgramRootFiles(program: Program, expectedFiles: readonly string[]) {
        checkArray(`Program rootFileNames`, program.getRootFileNames(), expectedFiles);
    }

    export type Watch = WatchOfConfigFile<EmitAndSemanticDiagnosticsBuilderProgram> | WatchOfFilesAndCompilerOptions<EmitAndSemanticDiagnosticsBuilderProgram>;

    export function createWatchOfConfigFile(configFileName: string, system: WatchedSystem, optionsToExtend?: CompilerOptions, watchOptionsToExtend?: WatchOptions) {
        const compilerHost = createWatchCompilerHostOfConfigFile({ configFileName, optionsToExtend, watchOptionsToExtend, system });
        return createWatchProgram(compilerHost);
    }

    export function createWatchOfFilesAndCompilerOptions(rootFiles: string[], system: WatchedSystem, options: CompilerOptions = {}, watchOptions?: WatchOptions) {
        const compilerHost = createWatchCompilerHostOfFilesAndCompilerOptions({ rootFiles, options, watchOptions, system });
        return createWatchProgram(compilerHost);
    }

    const elapsedRegex = /^Elapsed:: \d+(?:\.\d+)?ms/;
    const buildVerboseLogRegEx = /^.+ \- /;
    export enum HostOutputKind {
        Log,
        Diagnostic,
        WatchDiagnostic
    }

    export interface HostOutputLog {
        kind: HostOutputKind.Log;
        expected: string;
        caption?: string;
    }

    export interface HostOutputDiagnostic {
        kind: HostOutputKind.Diagnostic;
        diagnostic: Diagnostic | string;
    }

    export interface HostOutputWatchDiagnostic {
        kind: HostOutputKind.WatchDiagnostic;
        diagnostic: Diagnostic | string;
    }

    export type HostOutput = HostOutputLog | HostOutputDiagnostic | HostOutputWatchDiagnostic;

    export function checkOutputErrors(
        host: WatchedSystem,
        expected: readonly HostOutput[],
        disableConsoleClears?: boolean | undefined
    ) {
        let screenClears = 0;
        const outputs = host.getOutput();
        assert.equal(outputs.length, expected.length, JSON.stringify(outputs));
        let index = 0;
        forEach(expected, expected => {
            switch (expected.kind) {
                case HostOutputKind.Log:
                    return assertLog(expected);
                case HostOutputKind.Diagnostic:
                    return assertDiagnostic(expected);
                case HostOutputKind.WatchDiagnostic:
                    return assertWatchDiagnostic(expected);
                default:
                    return Debug.assertNever(expected);
            }
        });
        assert.equal(host.screenClears.length, screenClears, "Expected number of screen clears");
        host.clearOutput();

        function isDiagnostic(diagnostic: Diagnostic | string): diagnostic is Diagnostic {
            return !!(diagnostic as Diagnostic).messageText;
        }

        function assertDiagnostic({ diagnostic }: HostOutputDiagnostic) {
            const expected = isDiagnostic(diagnostic) ? formatDiagnostic(diagnostic, host) : diagnostic;
            assert.equal(outputs[index], expected, getOutputAtFailedMessage("Diagnostic", expected));
            index++;
        }

        function getCleanLogString(log: string) {
            return log.replace(elapsedRegex, "").replace(buildVerboseLogRegEx, "");
        }

        function assertLog({ caption, expected }: HostOutputLog) {
            const actual = outputs[index];
            assert.equal(getCleanLogString(actual), getCleanLogString(expected), getOutputAtFailedMessage(caption || "Log", expected));
            index++;
        }

        function assertWatchDiagnostic({ diagnostic }: HostOutputWatchDiagnostic) {
            if (isString(diagnostic)) {
                assert.equal(outputs[index], diagnostic, getOutputAtFailedMessage("Diagnostic", diagnostic));
            }
            else {
                const expected = getWatchDiagnosticWithoutDate(diagnostic);
                if (!disableConsoleClears && contains(screenStartingMessageCodes, diagnostic.code)) {
                    assert.equal(host.screenClears[screenClears], index, `Expected screen clear at this diagnostic: ${expected}`);
                    screenClears++;
                }
                assert.isTrue(endsWith(outputs[index], expected), getOutputAtFailedMessage("Watch diagnostic", expected));
            }
            index++;
        }

        function getOutputAtFailedMessage(caption: string, expectedOutput: string) {
            return `Expected ${caption}: ${JSON.stringify(expectedOutput)} at ${index} in ${JSON.stringify(outputs)}`;
        }

        function getWatchDiagnosticWithoutDate(diagnostic: Diagnostic) {
            const newLines = contains(screenStartingMessageCodes, diagnostic.code)
                ? `${host.newLine}${host.newLine}`
                : host.newLine;
            return ` - ${flattenDiagnosticMessageText(diagnostic.messageText, host.newLine)}${newLines}`;
        }
    }

    export function hostOutputLog(expected: string, caption?: string): HostOutputLog {
        return { kind: HostOutputKind.Log, expected, caption };
    }
    export function hostOutputDiagnostic(diagnostic: Diagnostic | string): HostOutputDiagnostic {
        return { kind: HostOutputKind.Diagnostic, diagnostic };
    }
    export function hostOutputWatchDiagnostic(diagnostic: Diagnostic | string): HostOutputWatchDiagnostic {
        return { kind: HostOutputKind.WatchDiagnostic, diagnostic };
    }

    export function startingCompilationInWatchMode() {
        return hostOutputWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Starting_compilation_in_watch_mode));
    }
    export function foundErrorsWatching(errors: readonly any[]) {
        return hostOutputWatchDiagnostic(errors.length === 1 ?
            createCompilerDiagnostic(Diagnostics.Found_1_error_Watching_for_file_changes) :
            createCompilerDiagnostic(Diagnostics.Found_0_errors_Watching_for_file_changes, errors.length)
        );
    }
    export function fileChangeDetected() {
        return hostOutputWatchDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation));
    }

    export function checkOutputErrorsInitial(host: WatchedSystem, errors: readonly Diagnostic[] | readonly string[], disableConsoleClears?: boolean, logsBeforeErrors?: string[]) {
        checkOutputErrors(
            host,
            [
                startingCompilationInWatchMode(),
                ...map(logsBeforeErrors || emptyArray, expected => hostOutputLog(expected, "logBeforeError")),
                ...map(errors, hostOutputDiagnostic),
                foundErrorsWatching(errors)
            ],
            disableConsoleClears
        );
    }

    export function checkOutputErrorsIncremental(host: WatchedSystem, errors: readonly Diagnostic[] | readonly string[], disableConsoleClears?: boolean, logsBeforeWatchDiagnostic?: string[], logsBeforeErrors?: string[]) {
        checkOutputErrors(
            host,
            [
                ...map(logsBeforeWatchDiagnostic || emptyArray, expected => hostOutputLog(expected, "logsBeforeWatchDiagnostic")),
                fileChangeDetected(),
                ...map(logsBeforeErrors || emptyArray, expected => hostOutputLog(expected, "logBeforeError")),
                ...map(errors, hostOutputDiagnostic),
                foundErrorsWatching(errors)
            ],
            disableConsoleClears
        );
    }

    export function checkOutputErrorsIncrementalWithExit(host: WatchedSystem, errors: readonly Diagnostic[] | readonly string[], expectedExitCode: ExitStatus, disableConsoleClears?: boolean, logsBeforeWatchDiagnostic?: string[], logsBeforeErrors?: string[]) {
        checkOutputErrors(
            host,
            [
                ...map(logsBeforeWatchDiagnostic || emptyArray, expected => hostOutputLog(expected, "logsBeforeWatchDiagnostic")),
                fileChangeDetected(),
                ...map(logsBeforeErrors || emptyArray, expected => hostOutputLog(expected, "logBeforeError")),
                ...map(errors, hostOutputDiagnostic),
            ],
            disableConsoleClears
        );
        assert.equal(host.exitCode, expectedExitCode);
    }

    export function checkNormalBuildErrors(host: WatchedSystem, errors: readonly Diagnostic[] | readonly string[], reportErrorSummary?: boolean) {
        checkOutputErrors(
            host,
            [
                ...map(errors, hostOutputDiagnostic),
                ...reportErrorSummary ?
                    [hostOutputWatchDiagnostic(getErrorSummaryText(errors.length, host.newLine))] :
                    emptyArray
            ]
        );
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

    export interface TscWatchCompileChange {
        caption: string;
        change: (sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles) => void;
        timeouts: (
            sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles,
            programs: readonly CommandLineProgram[],
            watchOrSolution: ReturnType<typeof executeCommandLine>
        ) => void;
    }
    export interface TscWatchCheckOptions {
        baselineSourceMap?: boolean;
        baselineDependencies?: boolean;
    }
    export interface TscWatchCompileBase extends TscWatchCheckOptions {
        scenario: string;
        subScenario: string;
        commandLineArgs: readonly string[];
        changes: readonly TscWatchCompileChange[];
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

    export interface Baseline {
        baseline: string[];
        sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles;
        oldSnap: SystemSnap;
    }

    export function createBaseline(system: WatchedSystem): Baseline {
        const sys = TestFSWithWatch.changeToHostTrackingWrittenFiles(
            fakes.patchHostForBuildInfoReadWrite(system)
        );
        const baseline: string[] = [];
        baseline.push("Input::");
        sys.diff(baseline);
        return { sys, baseline, oldSnap: sys.snap() };
    }

    export function applyChange(sys: Baseline["sys"], baseline: Baseline["baseline"], change: TscWatchCompileChange["change"], caption?: TscWatchCompileChange["caption"]) {
        const oldSnap = sys.snap();
        baseline.push(`Change::${caption ? " " + caption : ""}`, "");
        change(sys);
        baseline.push("Input::");
        sys.diff(baseline, oldSnap);
        return sys.snap();
    }

    export interface RunWatchBaseline extends Baseline, TscWatchCompileBase {
        sys: TestFSWithWatch.TestServerHostTrackingWrittenFiles;
        getPrograms: () => readonly CommandLineProgram[];
        watchOrSolution: ReturnType<typeof executeCommandLine>;
    }
    export function runWatchBaseline({
        scenario, subScenario, commandLineArgs,
        getPrograms, sys, baseline, oldSnap,
        baselineSourceMap, baselineDependencies,
        changes, watchOrSolution
    }: RunWatchBaseline) {
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
        Harness.Baseline.runBaseline(`${isBuild(commandLineArgs) ?
            isWatch(commandLineArgs) ? "tsbuild/watchMode" : "tsbuild" :
            isWatch(commandLineArgs) ? "tscWatch" : "tsc"}/${scenario}/${subScenario.split(" ").join("-")}.js`, baseline.join("\r\n"));
    }

    function isWatch(commandLineArgs: readonly string[]) {
        return forEach(commandLineArgs, arg => {
            if (arg.charCodeAt(0) !== CharacterCodes.minus) return false;
            const option = arg.slice(arg.charCodeAt(1) === CharacterCodes.minus ? 2 : 1).toLowerCase();
            return option === "watch" || option === "w";
        });
    }

    export interface WatchBaseline extends Baseline, TscWatchCheckOptions {
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
        return fakes.withTemporaryPatchingForBuildinfoReadWrite(
            createWatchedSystem(files, params),
            sys => {
                const solutionBuilder = createSolutionBuilder(TestFSWithWatch.changeToHostTrackingWrittenFiles(sys), solutionRoots, {});
                solutionBuilder.build();
            }
        );
    }
}
