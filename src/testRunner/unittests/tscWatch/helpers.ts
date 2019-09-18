namespace ts.tscWatch {
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

    export interface Watch {
        (): Program;
        getBuilderProgram(): EmitAndSemanticDiagnosticsBuilderProgram;
        close(): void;
    }

    export function createWatchOfConfigFile(configFileName: string, host: WatchedSystem, optionsToExtend?: CompilerOptions, maxNumberOfFilesToIterateForInvalidation?: number) {
        const compilerHost = createWatchCompilerHostOfConfigFile(configFileName, optionsToExtend || {}, host);
        compilerHost.maxNumberOfFilesToIterateForInvalidation = maxNumberOfFilesToIterateForInvalidation;
        const watch = createWatchProgram(compilerHost);
        const result = (() => watch.getCurrentProgram().getProgram()) as Watch;
        result.getBuilderProgram = () => watch.getCurrentProgram();
        result.close = () => watch.close();
        return result;
    }

    export function createWatchOfFilesAndCompilerOptions(rootFiles: string[], host: WatchedSystem, options: CompilerOptions = {}, maxNumberOfFilesToIterateForInvalidation?: number) {
        const compilerHost = createWatchCompilerHostOfFilesAndCompilerOptions(rootFiles, options, host);
        compilerHost.maxNumberOfFilesToIterateForInvalidation = maxNumberOfFilesToIterateForInvalidation;
        const watch = createWatchProgram(compilerHost);
        return () => watch.getCurrentProgram().getProgram();
    }

    const elapsedRegex = /^Elapsed:: [0-9]+ms/;
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

    function isDiagnosticMessageChain(message: DiagnosticMessage | DiagnosticMessageChain): message is DiagnosticMessageChain {
        return !!(message as DiagnosticMessageChain).messageText;
    }

    export function getDiagnosticOfFileFrom(file: SourceFile | undefined, start: number | undefined, length: number | undefined, message: DiagnosticMessage | DiagnosticMessageChain, ..._args: (string | number)[]): Diagnostic {
        let text: DiagnosticMessageChain | string;
        if (isDiagnosticMessageChain(message)) {
            text = message;
        }
        else {
            text = getLocaleSpecificMessage(message);
            if (arguments.length > 4) {
                text = formatStringFromArgs(text, arguments, 4);
            }
        }
        return {
            file,
            start,
            length,

            messageText: text,
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

    export function getDiagnosticModuleNotFoundOfFile(program: Program, file: File, moduleName: string) {
        const quotedModuleName = `"${moduleName}"`;
        return getDiagnosticOfFileFromProgram(program, file.path, file.content.indexOf(quotedModuleName), quotedModuleName.length, Diagnostics.Cannot_find_module_0, moduleName);
    }
}
