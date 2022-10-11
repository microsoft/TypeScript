import * as ts from "./_namespaces/ts";

const sysFormatDiagnosticsHost: ts.FormatDiagnosticsHost | undefined = ts.sys ? {
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    getNewLine: () => ts.sys.newLine,
    getCanonicalFileName: ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)
} : undefined;

/** @internal */
/**
 * Create a function that reports error by writing to the system and handles the formatting of the diagnostic
 */
export function createDiagnosticReporter(system: ts.System, pretty?: boolean): ts.DiagnosticReporter {
    const host: ts.FormatDiagnosticsHost = system === ts.sys && sysFormatDiagnosticsHost ? sysFormatDiagnosticsHost : {
        getCurrentDirectory: () => system.getCurrentDirectory(),
        getNewLine: () => system.newLine,
        getCanonicalFileName: ts.createGetCanonicalFileName(system.useCaseSensitiveFileNames),
    };
    if (!pretty) {
        return diagnostic => system.write(ts.formatDiagnostic(diagnostic, host));
    }

    const diagnostics: ts.Diagnostic[] = new Array(1);
    return diagnostic => {
        diagnostics[0] = diagnostic;
        system.write(ts.formatDiagnosticsWithColorAndContext(diagnostics, host) + host.getNewLine());
        diagnostics[0] = undefined!; // TODO: GH#18217
    };
}

/**
 * @returns Whether the screen was cleared.
 */
function clearScreenIfNotWatchingForFileChanges(system: ts.System, diagnostic: ts.Diagnostic, options: ts.CompilerOptions): boolean {
    if (system.clearScreen &&
        !options.preserveWatchOutput &&
        !options.extendedDiagnostics &&
        !options.diagnostics &&
        ts.contains(screenStartingMessageCodes, diagnostic.code)) {
        system.clearScreen();
        return true;
    }

    return false;
}

/** @internal */
export const screenStartingMessageCodes: number[] = [
    ts.Diagnostics.Starting_compilation_in_watch_mode.code,
    ts.Diagnostics.File_change_detected_Starting_incremental_compilation.code,
];

function getPlainDiagnosticFollowingNewLines(diagnostic: ts.Diagnostic, newLine: string): string {
    return ts.contains(screenStartingMessageCodes, diagnostic.code)
        ? newLine + newLine
        : newLine;
}

/** @internal */
/**
 * Get locale specific time based on whether we are in test mode
 */
export function getLocaleTimeString(system: ts.System) {
    return !system.now ?
        new Date().toLocaleTimeString() :
        system.now().toLocaleTimeString("en-US", { timeZone: "UTC" });
}

/** @internal */
/**
 * Create a function that reports watch status by writing to the system and handles the formatting of the diagnostic
 */
export function createWatchStatusReporter(system: ts.System, pretty?: boolean): ts.WatchStatusReporter {
    return pretty ?
        (diagnostic, newLine, options) => {
            clearScreenIfNotWatchingForFileChanges(system, diagnostic, options);
            let output = `[${ts.formatColorAndReset(getLocaleTimeString(system), ts.ForegroundColorEscapeSequences.Grey)}] `;
            output += `${ts.flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${newLine + newLine}`;
            system.write(output);
        } :
        (diagnostic, newLine, options) => {
            let output = "";

            if (!clearScreenIfNotWatchingForFileChanges(system, diagnostic, options)) {
                output += newLine;
            }

            output += `${getLocaleTimeString(system)} - `;
            output += `${ts.flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${getPlainDiagnosticFollowingNewLines(diagnostic, newLine)}`;

            system.write(output);
        };
}

/** @internal */
/** Parses config file using System interface */
export function parseConfigFileWithSystem(configFileName: string, optionsToExtend: ts.CompilerOptions, extendedConfigCache: ts.Map<ts.ExtendedConfigCacheEntry> | undefined, watchOptionsToExtend: ts.WatchOptions | undefined, system: ts.System, reportDiagnostic: ts.DiagnosticReporter) {
    const host: ts.ParseConfigFileHost = system as any;
    host.onUnRecoverableConfigFileDiagnostic = diagnostic => reportUnrecoverableDiagnostic(system, reportDiagnostic, diagnostic);
    const result = ts.getParsedCommandLineOfConfigFile(configFileName, optionsToExtend, host, extendedConfigCache, watchOptionsToExtend);
    host.onUnRecoverableConfigFileDiagnostic = undefined!; // TODO: GH#18217
    return result;
}

/** @internal */
export function getErrorCountForSummary(diagnostics: readonly ts.Diagnostic[]) {
    return ts.countWhere(diagnostics, diagnostic => diagnostic.category === ts.DiagnosticCategory.Error);
}

/** @internal */
export function getFilesInErrorForSummary(diagnostics: readonly ts.Diagnostic[]): (ts.ReportFileInError | undefined)[] {
    const filesInError =
        ts.filter(diagnostics, diagnostic => diagnostic.category === ts.DiagnosticCategory.Error)
        .map(
            errorDiagnostic => {
                if(errorDiagnostic.file === undefined) return;
                return `${errorDiagnostic.file.fileName}`;
        });
    return filesInError.map((fileName: string) => {
        const diagnosticForFileName = ts.find(diagnostics, diagnostic =>
            diagnostic.file !== undefined && diagnostic.file.fileName === fileName
        );

        if(diagnosticForFileName !== undefined) {
            const { line } = ts.getLineAndCharacterOfPosition(diagnosticForFileName.file!, diagnosticForFileName.start!);
            return {
                fileName,
                line: line + 1,
            };
        }
    });
}

/** @internal */
export function getWatchErrorSummaryDiagnosticMessage(errorCount: number) {
    return errorCount === 1 ?
        ts.Diagnostics.Found_1_error_Watching_for_file_changes :
        ts.Diagnostics.Found_0_errors_Watching_for_file_changes;
}

function prettyPathForFileError(error: ts.ReportFileInError, cwd: string) {
    const line = ts.formatColorAndReset(":" + error.line, ts.ForegroundColorEscapeSequences.Grey);
    if (ts.pathIsAbsolute(error.fileName) && ts.pathIsAbsolute(cwd)) {
        return ts.getRelativePathFromDirectory(cwd, error.fileName, /* ignoreCase */ false) + line;
    }

    return error.fileName + line;
}

/** @internal */
export function getErrorSummaryText(
    errorCount: number,
    filesInError: readonly (ts.ReportFileInError | undefined)[],
    newLine: string,
    host: ts.HasCurrentDirectory
) {
    if (errorCount === 0) return "";
    const nonNilFiles = filesInError.filter(fileInError => fileInError !== undefined);
    const distinctFileNamesWithLines = nonNilFiles.map(fileInError => `${fileInError!.fileName}:${fileInError!.line}`)
        .filter((value, index, self) => self.indexOf(value) === index);

    const firstFileReference = nonNilFiles[0] && prettyPathForFileError(nonNilFiles[0], host.getCurrentDirectory());

    const d = errorCount === 1 ?
        ts.createCompilerDiagnostic(
            filesInError[0] !== undefined ?
                ts.Diagnostics.Found_1_error_in_1 :
                ts.Diagnostics.Found_1_error,
            errorCount,
            firstFileReference) :
        ts.createCompilerDiagnostic(
            distinctFileNamesWithLines.length === 0 ?
                ts.Diagnostics.Found_0_errors :
                distinctFileNamesWithLines.length === 1 ?
                    ts.Diagnostics.Found_0_errors_in_the_same_file_starting_at_Colon_1 :
                    ts.Diagnostics.Found_0_errors_in_1_files,
            errorCount,
            distinctFileNamesWithLines.length === 1 ? firstFileReference : distinctFileNamesWithLines.length);

    const suffix = distinctFileNamesWithLines.length > 1 ? createTabularErrorsDisplay(nonNilFiles, host) : "";
    return `${newLine}${ts.flattenDiagnosticMessageText(d.messageText, newLine)}${newLine}${newLine}${suffix}`;
}

function createTabularErrorsDisplay(filesInError: (ts.ReportFileInError | undefined)[], host: ts.HasCurrentDirectory) {
    const distinctFiles = filesInError.filter((value, index, self) => index === self.findIndex(file => file?.fileName === value?.fileName));
    if (distinctFiles.length === 0) return "";

    const numberLength = (num: number) => Math.log(num) * Math.LOG10E + 1;
    const fileToErrorCount = distinctFiles.map(file => ([file, ts.countWhere(filesInError, fileInError => fileInError!.fileName === file!.fileName)] as const));
    const maxErrors = fileToErrorCount.reduce((acc, value) => Math.max(acc, value[1] || 0), 0);

    const headerRow = ts.Diagnostics.Errors_Files.message;
    const leftColumnHeadingLength = headerRow.split(" ")[0].length;
    const leftPaddingGoal = Math.max(leftColumnHeadingLength, numberLength(maxErrors));
    const headerPadding = Math.max(numberLength(maxErrors) - leftColumnHeadingLength, 0);

    let tabularData = "";
    tabularData += " ".repeat(headerPadding) + headerRow + "\n";
    fileToErrorCount.forEach((row) => {
        const [file, errorCount] = row;
        const errorCountDigitsLength = Math.log(errorCount) * Math.LOG10E + 1 | 0;
        const leftPadding = errorCountDigitsLength < leftPaddingGoal ?
            " ".repeat(leftPaddingGoal - errorCountDigitsLength)
            : "";

        const fileRef = prettyPathForFileError(file!, host.getCurrentDirectory());
        tabularData += `${leftPadding}${errorCount}  ${fileRef}\n`;
    });

    return tabularData;
}

/** @internal */
export function isBuilderProgram(program: ts.Program | ts.BuilderProgram): program is ts.BuilderProgram {
    return !!(program as ts.BuilderProgram).getState;
}

/** @internal */
export function listFiles<T extends ts.BuilderProgram>(program: ts.Program | T, write: (s: string) => void) {
    const options = program.getCompilerOptions();
    if (options.explainFiles) {
        explainFiles(isBuilderProgram(program) ? program.getProgram() : program, write);
    }
    else if (options.listFiles || options.listFilesOnly) {
        ts.forEach(program.getSourceFiles(), file => {
            write(file.fileName);
        });
    }
}

/** @internal */
export function explainFiles(program: ts.Program, write: (s: string) => void) {
    const reasons = program.getFileIncludeReasons();
    const getCanonicalFileName = ts.createGetCanonicalFileName(program.useCaseSensitiveFileNames());
    const relativeFileName = (fileName: string) => ts.convertToRelativePath(fileName, program.getCurrentDirectory(), getCanonicalFileName);
    for (const file of program.getSourceFiles()) {
        write(`${toFileName(file, relativeFileName)}`);
        reasons.get(file.path)?.forEach(reason => write(`  ${fileIncludeReasonToDiagnostics(program, reason, relativeFileName).messageText}`));
        explainIfFileIsRedirectAndImpliedFormat(file, relativeFileName)?.forEach(d => write(`  ${d.messageText}`));
    }
}

/** @internal */
export function explainIfFileIsRedirectAndImpliedFormat(
    file: ts.SourceFile,
    fileNameConvertor?: (fileName: string) => string,
): ts.DiagnosticMessageChain[] | undefined {
    let result: ts.DiagnosticMessageChain[] | undefined;
    if (file.path !== file.resolvedPath) {
        (result ??= []).push(ts.chainDiagnosticMessages(
            /*details*/ undefined,
            ts.Diagnostics.File_is_output_of_project_reference_source_0,
            toFileName(file.originalFileName, fileNameConvertor)
        ));
    }
    if (file.redirectInfo) {
        (result ??= []).push(ts.chainDiagnosticMessages(
            /*details*/ undefined,
            ts.Diagnostics.File_redirects_to_file_0,
            toFileName(file.redirectInfo.redirectTarget, fileNameConvertor)
        ));
    }
    if (ts.isExternalOrCommonJsModule(file)) {
        switch (file.impliedNodeFormat) {
            case ts.ModuleKind.ESNext:
                if (file.packageJsonScope) {
                    (result ??= []).push(ts.chainDiagnosticMessages(
                        /*details*/ undefined,
                        ts.Diagnostics.File_is_ECMAScript_module_because_0_has_field_type_with_value_module,
                        toFileName(ts.last(file.packageJsonLocations!), fileNameConvertor)
                    ));
                }
                break;
            case ts.ModuleKind.CommonJS:
                if (file.packageJsonScope) {
                    (result ??= []).push(ts.chainDiagnosticMessages(
                        /*details*/ undefined,
                        file.packageJsonScope.contents.packageJsonContent.type ?
                            ts.Diagnostics.File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module :
                            ts.Diagnostics.File_is_CommonJS_module_because_0_does_not_have_field_type,
                        toFileName(ts.last(file.packageJsonLocations!), fileNameConvertor)
                    ));
                }
                else if (file.packageJsonLocations?.length) {
                    (result ??= []).push(ts.chainDiagnosticMessages(
                        /*details*/ undefined,
                        ts.Diagnostics.File_is_CommonJS_module_because_package_json_was_not_found,
                    ));
                }
                break;
        }
    }
    return result;
}

/** @internal */
export function getMatchedFileSpec(program: ts.Program, fileName: string) {
    const configFile = program.getCompilerOptions().configFile;
    if (!configFile?.configFileSpecs?.validatedFilesSpec) return undefined;

    const getCanonicalFileName = ts.createGetCanonicalFileName(program.useCaseSensitiveFileNames());
    const filePath = getCanonicalFileName(fileName);
    const basePath = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(configFile.fileName, program.getCurrentDirectory()));
    return ts.find(configFile.configFileSpecs.validatedFilesSpec, fileSpec => getCanonicalFileName(ts.getNormalizedAbsolutePath(fileSpec, basePath)) === filePath);
}

/** @internal */
export function getMatchedIncludeSpec(program: ts.Program, fileName: string) {
    const configFile = program.getCompilerOptions().configFile;
    if (!configFile?.configFileSpecs?.validatedIncludeSpecs) return undefined;

    // Return true if its default include spec
    if (configFile.configFileSpecs.isDefaultIncludeSpec) return true;

    const isJsonFile = ts.fileExtensionIs(fileName, ts.Extension.Json);
    const basePath = ts.getDirectoryPath(ts.getNormalizedAbsolutePath(configFile.fileName, program.getCurrentDirectory()));
    const useCaseSensitiveFileNames = program.useCaseSensitiveFileNames();
    return ts.find(configFile?.configFileSpecs?.validatedIncludeSpecs, includeSpec => {
        if (isJsonFile && !ts.endsWith(includeSpec, ts.Extension.Json)) return false;
        const pattern = ts.getPatternFromSpec(includeSpec, basePath, "files");
        return !!pattern && ts.getRegexFromPattern(`(${pattern})$`, useCaseSensitiveFileNames).test(fileName);
    });
}

/** @internal */
export function fileIncludeReasonToDiagnostics(program: ts.Program, reason: ts.FileIncludeReason, fileNameConvertor?: (fileName: string) => string,): ts.DiagnosticMessageChain {
    const options = program.getCompilerOptions();
    if (ts.isReferencedFile(reason)) {
        const referenceLocation = ts.getReferencedFileLocation(path => program.getSourceFileByPath(path), reason);
        const referenceText = ts.isReferenceFileLocation(referenceLocation) ? referenceLocation.file.text.substring(referenceLocation.pos, referenceLocation.end) : `"${referenceLocation.text}"`;
        let message: ts.DiagnosticMessage;
        ts.Debug.assert(ts.isReferenceFileLocation(referenceLocation) || reason.kind === ts.FileIncludeKind.Import, "Only synthetic references are imports");
        switch (reason.kind) {
            case ts.FileIncludeKind.Import:
                if (ts.isReferenceFileLocation(referenceLocation)) {
                    message = referenceLocation.packageId ?
                        ts.Diagnostics.Imported_via_0_from_file_1_with_packageId_2 :
                        ts.Diagnostics.Imported_via_0_from_file_1;
                }
                else if (referenceLocation.text === ts.externalHelpersModuleNameText) {
                    message = referenceLocation.packageId ?
                        ts.Diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_importHelpers_as_specified_in_compilerOptions :
                        ts.Diagnostics.Imported_via_0_from_file_1_to_import_importHelpers_as_specified_in_compilerOptions;
                }
                else {
                    message = referenceLocation.packageId ?
                        ts.Diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_jsx_and_jsxs_factory_functions :
                        ts.Diagnostics.Imported_via_0_from_file_1_to_import_jsx_and_jsxs_factory_functions;
                }
                break;
            case ts.FileIncludeKind.ReferenceFile:
                ts.Debug.assert(!referenceLocation.packageId);
                message = ts.Diagnostics.Referenced_via_0_from_file_1;
                break;
            case ts.FileIncludeKind.TypeReferenceDirective:
                message = referenceLocation.packageId ?
                    ts.Diagnostics.Type_library_referenced_via_0_from_file_1_with_packageId_2 :
                    ts.Diagnostics.Type_library_referenced_via_0_from_file_1;
                break;
            case ts.FileIncludeKind.LibReferenceDirective:
                ts.Debug.assert(!referenceLocation.packageId);
                message = ts.Diagnostics.Library_referenced_via_0_from_file_1;
                break;
            default:
                ts.Debug.assertNever(reason);
        }
        return ts.chainDiagnosticMessages(
            /*details*/ undefined,
            message,
            referenceText,
            toFileName(referenceLocation.file, fileNameConvertor),
            referenceLocation.packageId && ts.packageIdToString(referenceLocation.packageId)
        );
    }
    switch (reason.kind) {
        case ts.FileIncludeKind.RootFile:
            if (!options.configFile?.configFileSpecs) return ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Root_file_specified_for_compilation);
            const fileName = ts.getNormalizedAbsolutePath(program.getRootFileNames()[reason.index], program.getCurrentDirectory());
            const matchedByFiles = getMatchedFileSpec(program, fileName);
            if (matchedByFiles) return ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Part_of_files_list_in_tsconfig_json);
            const matchedByInclude = getMatchedIncludeSpec(program, fileName);
            return ts.isString(matchedByInclude) ?
                ts.chainDiagnosticMessages(
                    /*details*/ undefined,
                    ts.Diagnostics.Matched_by_include_pattern_0_in_1,
                    matchedByInclude,
                    toFileName(options.configFile, fileNameConvertor)
                ) :
                // Could be additional files specified as roots or matched by default include
                ts.chainDiagnosticMessages(/*details*/ undefined, matchedByInclude ?
                    ts.Diagnostics.Matched_by_default_include_pattern_Asterisk_Asterisk_Slash_Asterisk :
                    ts.Diagnostics.Root_file_specified_for_compilation
                );
        case ts.FileIncludeKind.SourceFromProjectReference:
        case ts.FileIncludeKind.OutputFromProjectReference:
            const isOutput = reason.kind === ts.FileIncludeKind.OutputFromProjectReference;
            const referencedResolvedRef = ts.Debug.checkDefined(program.getResolvedProjectReferences()?.[reason.index]);
            return ts.chainDiagnosticMessages(
                /*details*/ undefined,
                ts.outFile(options) ?
                    isOutput ?
                        ts.Diagnostics.Output_from_referenced_project_0_included_because_1_specified :
                        ts.Diagnostics.Source_from_referenced_project_0_included_because_1_specified :
                    isOutput ?
                        ts.Diagnostics.Output_from_referenced_project_0_included_because_module_is_specified_as_none :
                        ts.Diagnostics.Source_from_referenced_project_0_included_because_module_is_specified_as_none,
                toFileName(referencedResolvedRef.sourceFile.fileName, fileNameConvertor),
                options.outFile ? "--outFile" : "--out",
            );
        case ts.FileIncludeKind.AutomaticTypeDirectiveFile:
            return ts.chainDiagnosticMessages(
                /*details*/ undefined,
                options.types ?
                    reason.packageId ?
                        ts.Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1 :
                        ts.Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions :
                    reason.packageId ?
                        ts.Diagnostics.Entry_point_for_implicit_type_library_0_with_packageId_1 :
                        ts.Diagnostics.Entry_point_for_implicit_type_library_0,
                reason.typeReference,
                reason.packageId && ts.packageIdToString(reason.packageId),
            );
        case ts.FileIncludeKind.LibFile:
            if (reason.index !== undefined) return ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Library_0_specified_in_compilerOptions, options.lib![reason.index]);
            const target = ts.forEachEntry(ts.targetOptionDeclaration.type, (value, key) => value === ts.getEmitScriptTarget(options) ? key : undefined);
            return ts.chainDiagnosticMessages(
                /*details*/ undefined,
                target ?
                    ts.Diagnostics.Default_library_for_target_0 :
                    ts.Diagnostics.Default_library,
                target,
            );
        default:
            ts.Debug.assertNever(reason);
    }
}

function toFileName(file: ts.SourceFile | string, fileNameConvertor?: (fileName: string) => string) {
    const fileName = ts.isString(file) ? file : file.fileName;
    return fileNameConvertor ? fileNameConvertor(fileName) : fileName;
}

/** @internal */
/**
 * Helper that emit files, report diagnostics and lists emitted and/or source files depending on compiler options
 */
export function emitFilesAndReportErrors<T extends ts.BuilderProgram>(
    program: ts.Program | T,
    reportDiagnostic: ts.DiagnosticReporter,
    write?: (s: string) => void,
    reportSummary?: ts.ReportEmitErrorSummary,
    writeFile?: ts.WriteFileCallback,
    cancellationToken?: ts.CancellationToken,
    emitOnlyDtsFiles?: boolean,
    customTransformers?: ts.CustomTransformers
) {
    const isListFilesOnly = !!program.getCompilerOptions().listFilesOnly;

    // First get and report any syntactic errors.
    const allDiagnostics = program.getConfigFileParsingDiagnostics().slice();
    const configFileParsingDiagnosticsLength = allDiagnostics.length;
    ts.addRange(allDiagnostics, program.getSyntacticDiagnostics(/*sourceFile*/ undefined, cancellationToken));

    // If we didn't have any syntactic errors, then also try getting the global and
    // semantic errors.
    if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
        ts.addRange(allDiagnostics, program.getOptionsDiagnostics(cancellationToken));

        if (!isListFilesOnly) {
            ts.addRange(allDiagnostics, program.getGlobalDiagnostics(cancellationToken));

            if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
                ts.addRange(allDiagnostics, program.getSemanticDiagnostics(/*sourceFile*/ undefined, cancellationToken));
            }
        }
    }

    // Emit and report any errors we ran into.
    const emitResult = isListFilesOnly
        ? { emitSkipped: true, diagnostics: ts.emptyArray }
        : program.emit(/*targetSourceFile*/ undefined, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
    const { emittedFiles, diagnostics: emitDiagnostics } = emitResult;
    ts.addRange(allDiagnostics, emitDiagnostics);

    const diagnostics = ts.sortAndDeduplicateDiagnostics(allDiagnostics);
    diagnostics.forEach(reportDiagnostic);
    if (write) {
        const currentDir = program.getCurrentDirectory();
        ts.forEach(emittedFiles, file => {
            const filepath = ts.getNormalizedAbsolutePath(file, currentDir);
            write(`TSFILE: ${filepath}`);
        });
        listFiles(program, write);
    }

    if (reportSummary) {
        reportSummary(getErrorCountForSummary(diagnostics), getFilesInErrorForSummary(diagnostics));
    }

    return {
        emitResult,
        diagnostics,
    };
}

/** @internal */
export function emitFilesAndReportErrorsAndGetExitStatus<T extends ts.BuilderProgram>(
    program: ts.Program | T,
    reportDiagnostic: ts.DiagnosticReporter,
    write?: (s: string) => void,
    reportSummary?: ts.ReportEmitErrorSummary,
    writeFile?: ts.WriteFileCallback,
    cancellationToken?: ts.CancellationToken,
    emitOnlyDtsFiles?: boolean,
    customTransformers?: ts.CustomTransformers
) {
    const { emitResult, diagnostics } = emitFilesAndReportErrors(
        program,
        reportDiagnostic,
        write,
        reportSummary,
        writeFile,
        cancellationToken,
        emitOnlyDtsFiles,
        customTransformers
    );

    if (emitResult.emitSkipped && diagnostics.length > 0) {
        // If the emitter didn't emit anything, then pass that value along.
        return ts.ExitStatus.DiagnosticsPresent_OutputsSkipped;
    }
    else if (diagnostics.length > 0) {
        // The emitter emitted something, inform the caller if that happened in the presence
        // of diagnostics or not.
        return ts.ExitStatus.DiagnosticsPresent_OutputsGenerated;
    }
    return ts.ExitStatus.Success;
}

/** @internal */
export const noopFileWatcher: ts.FileWatcher = { close: ts.noop };
/** @internal */
export const returnNoopFileWatcher = () => noopFileWatcher;

/** @internal */
export function createWatchHost(system = ts.sys, reportWatchStatus?: ts.WatchStatusReporter): ts.WatchHost {
    const onWatchStatusChange = reportWatchStatus || createWatchStatusReporter(system);
    return {
        onWatchStatusChange,
        watchFile: ts.maybeBind(system, system.watchFile) || returnNoopFileWatcher,
        watchDirectory: ts.maybeBind(system, system.watchDirectory) || returnNoopFileWatcher,
        setTimeout: ts.maybeBind(system, system.setTimeout) || ts.noop,
        clearTimeout: ts.maybeBind(system, system.clearTimeout) || ts.noop
    };
}

/** @internal */
export type WatchType = WatchTypeRegistry[keyof WatchTypeRegistry];
/** @internal */
export const WatchType: WatchTypeRegistry = {
    ConfigFile: "Config file",
    ExtendedConfigFile: "Extended config file",
    SourceFile: "Source file",
    MissingFile: "Missing file",
    WildcardDirectory: "Wild card directory",
    FailedLookupLocations: "Failed Lookup Locations",
    AffectingFileLocation: "File location affecting resolution",
    TypeRoots: "Type roots",
    ConfigFileOfReferencedProject: "Config file of referened project",
    ExtendedConfigOfReferencedProject: "Extended config file of referenced project",
    WildcardDirectoryOfReferencedProject: "Wild card directory of referenced project",
    PackageJson: "package.json file",
    ClosedScriptInfo: "Closed Script info",
    ConfigFileForInferredRoot: "Config file for the inferred project root",
    NodeModules: "node_modules for closed script infos and package.jsons affecting module specifier cache",
    MissingSourceMapFile: "Missing source map file",
    NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root",
    MissingGeneratedFile: "Missing generated file",
    NodeModulesForModuleSpecifierCache: "node_modules for module specifier cache invalidation",
};

/** @internal */
export interface WatchTypeRegistry {
    ConfigFile: "Config file",
    ExtendedConfigFile: "Extended config file",
    SourceFile: "Source file",
    MissingFile: "Missing file",
    WildcardDirectory: "Wild card directory",
    FailedLookupLocations: "Failed Lookup Locations",
    AffectingFileLocation: "File location affecting resolution",
    TypeRoots: "Type roots",
    ConfigFileOfReferencedProject: "Config file of referened project",
    ExtendedConfigOfReferencedProject: "Extended config file of referenced project",
    WildcardDirectoryOfReferencedProject: "Wild card directory of referenced project",
    PackageJson: "package.json file",

    // Additional tsserver specific watch information
    ClosedScriptInfo: "Closed Script info",
    ConfigFileForInferredRoot: "Config file for the inferred project root",
    NodeModules: "node_modules for closed script infos and package.jsons affecting module specifier cache",
    MissingSourceMapFile: "Missing source map file",
    NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root",
    MissingGeneratedFile: "Missing generated file",
    NodeModulesForModuleSpecifierCache: "node_modules for module specifier cache invalidation",
}

interface WatchFactory<X, Y = undefined> extends ts.WatchFactory<X, Y> {
    writeLog: (s: string) => void;
}

/** @internal */
export function createWatchFactory<Y = undefined>(host: ts.WatchFactoryHost & { trace?(s: string): void; }, options: { extendedDiagnostics?: boolean; diagnostics?: boolean; }) {
    const watchLogLevel = host.trace ? options.extendedDiagnostics ? ts.WatchLogLevel.Verbose : options.diagnostics ? ts.WatchLogLevel.TriggerOnly : ts.WatchLogLevel.None : ts.WatchLogLevel.None;
    const writeLog: (s: string) => void = watchLogLevel !== ts.WatchLogLevel.None ? (s => host.trace!(s)) : ts.noop;
    const result = ts.getWatchFactory<WatchType, Y>(host, watchLogLevel, writeLog) as WatchFactory<WatchType, Y>;
    result.writeLog = writeLog;
    return result;
}

/** @internal */
export function createCompilerHostFromProgramHost(host: ts.ProgramHost<any>, getCompilerOptions: () => ts.CompilerOptions, directoryStructureHost: ts.DirectoryStructureHost = host): ts.CompilerHost {
    const useCaseSensitiveFileNames = host.useCaseSensitiveFileNames();
    const hostGetNewLine = ts.memoize(() => host.getNewLine());
    return {
        getSourceFile: (fileName, languageVersionOrOptions, onError) => {
            let text: string | undefined;
            try {
                ts.performance.mark("beforeIORead");
                text = host.readFile(fileName, getCompilerOptions().charset);
                ts.performance.mark("afterIORead");
                ts.performance.measure("I/O Read", "beforeIORead", "afterIORead");
            }
            catch (e) {
                if (onError) {
                    onError(e.message);
                }
                text = "";
            }

            return text !== undefined ? ts.createSourceFile(fileName, text, languageVersionOrOptions) : undefined;
        },
        getDefaultLibLocation: ts.maybeBind(host, host.getDefaultLibLocation),
        getDefaultLibFileName: options => host.getDefaultLibFileName(options),
        writeFile,
        getCurrentDirectory: ts.memoize(() => host.getCurrentDirectory()),
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        getCanonicalFileName: ts.createGetCanonicalFileName(useCaseSensitiveFileNames),
        getNewLine: () => ts.getNewLineCharacter(getCompilerOptions(), hostGetNewLine),
        fileExists: f => host.fileExists(f),
        readFile: f => host.readFile(f),
        trace: ts.maybeBind(host, host.trace),
        directoryExists: ts.maybeBind(directoryStructureHost, directoryStructureHost.directoryExists),
        getDirectories: ts.maybeBind(directoryStructureHost, directoryStructureHost.getDirectories),
        realpath: ts.maybeBind(host, host.realpath),
        getEnvironmentVariable: ts.maybeBind(host, host.getEnvironmentVariable) || (() => ""),
        createHash: ts.maybeBind(host, host.createHash),
        readDirectory: ts.maybeBind(host, host.readDirectory),
        disableUseFileVersionAsSignature: host.disableUseFileVersionAsSignature,
        storeFilesChangingSignatureDuringEmit: host.storeFilesChangingSignatureDuringEmit,
    };

    function writeFile(fileName: string, text: string, writeByteOrderMark: boolean, onError: (message: string) => void) {
        try {
            ts.performance.mark("beforeIOWrite");

            // NOTE: If patchWriteFileEnsuringDirectory has been called,
            // the host.writeFile will do its own directory creation and
            // the ensureDirectoriesExist call will always be redundant.
            ts.writeFileEnsuringDirectories(
                fileName,
                text,
                writeByteOrderMark,
                (path, data, writeByteOrderMark) => host.writeFile!(path, data, writeByteOrderMark),
                path => host.createDirectory!(path),
                path => host.directoryExists!(path));

            ts.performance.mark("afterIOWrite");
            ts.performance.measure("I/O Write", "beforeIOWrite", "afterIOWrite");
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }
        }
    }
}

/** @internal */
export function setGetSourceFileAsHashVersioned(compilerHost: ts.CompilerHost, host: { createHash?(data: string): string; }) {
    const originalGetSourceFile = compilerHost.getSourceFile;
    const computeHash = ts.maybeBind(host, host.createHash) || ts.generateDjb2Hash;
    compilerHost.getSourceFile = (...args) => {
        const result = originalGetSourceFile.call(compilerHost, ...args);
        if (result) {
            result.version = computeHash(result.text);
        }
        return result;
    };
}

/** @internal */
/**
 * Creates the watch compiler host that can be extended with config file or root file names and options host
 */
export function createProgramHost<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(system: ts.System, createProgram: ts.CreateProgram<T> | undefined): ts.ProgramHost<T> {
    const getDefaultLibLocation = ts.memoize(() => ts.getDirectoryPath(ts.normalizePath(system.getExecutingFilePath())));
    return {
        useCaseSensitiveFileNames: () => system.useCaseSensitiveFileNames,
        getNewLine: () => system.newLine,
        getCurrentDirectory: ts.memoize(() => system.getCurrentDirectory()),
        getDefaultLibLocation,
        getDefaultLibFileName: options => ts.combinePaths(getDefaultLibLocation(), ts.getDefaultLibFileName(options)),
        fileExists: path => system.fileExists(path),
        readFile: (path, encoding) => system.readFile(path, encoding),
        directoryExists: path => system.directoryExists(path),
        getDirectories: path => system.getDirectories(path),
        readDirectory: (path, extensions, exclude, include, depth) => system.readDirectory(path, extensions, exclude, include, depth),
        realpath: ts.maybeBind(system, system.realpath),
        getEnvironmentVariable: ts.maybeBind(system, system.getEnvironmentVariable),
        trace: s => system.write(s + system.newLine),
        createDirectory: path => system.createDirectory(path),
        writeFile: (path, data, writeByteOrderMark) => system.writeFile(path, data, writeByteOrderMark),
        createHash: ts.maybeBind(system, system.createHash),
        createProgram: createProgram || ts.createEmitAndSemanticDiagnosticsBuilderProgram as any as ts.CreateProgram<T>,
        disableUseFileVersionAsSignature: system.disableUseFileVersionAsSignature,
        storeFilesChangingSignatureDuringEmit: system.storeFilesChangingSignatureDuringEmit,
        now: ts.maybeBind(system, system.now),
    };
}

/**
 * Creates the watch compiler host that can be extended with config file or root file names and options host
 */
function createWatchCompilerHost<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(system = ts.sys, createProgram: ts.CreateProgram<T> | undefined, reportDiagnostic: ts.DiagnosticReporter, reportWatchStatus?: ts.WatchStatusReporter): ts.WatchCompilerHost<T> {
    const write = (s: string) => system.write(s + system.newLine);
    const result = createProgramHost(system, createProgram) as ts.WatchCompilerHost<T>;
    ts.copyProperties(result, createWatchHost(system, reportWatchStatus));
    result.afterProgramCreate = builderProgram => {
        const compilerOptions = builderProgram.getCompilerOptions();
        const newLine = ts.getNewLineCharacter(compilerOptions, () => system.newLine);

        emitFilesAndReportErrors(
            builderProgram,
            reportDiagnostic,
            write,
            errorCount => result.onWatchStatusChange!(
                ts.createCompilerDiagnostic(getWatchErrorSummaryDiagnosticMessage(errorCount), errorCount),
                newLine,
                compilerOptions,
                errorCount
            )
        );
    };
    return result;
}

/**
 * Report error and exit
 */
function reportUnrecoverableDiagnostic(system: ts.System, reportDiagnostic: ts.DiagnosticReporter, diagnostic: ts.Diagnostic) {
    reportDiagnostic(diagnostic);
    system.exit(ts.ExitStatus.DiagnosticsPresent_OutputsSkipped);
}

/** @internal */
export interface CreateWatchCompilerHostInput<T extends ts.BuilderProgram> {
    system: ts.System;
    createProgram?: ts.CreateProgram<T>;
    reportDiagnostic?: ts.DiagnosticReporter;
    reportWatchStatus?: ts.WatchStatusReporter;
}

/** @internal */
export interface CreateWatchCompilerHostOfConfigFileInput<T extends ts.BuilderProgram> extends CreateWatchCompilerHostInput<T> {
    configFileName: string;
    optionsToExtend?: ts.CompilerOptions;
    watchOptionsToExtend?: ts.WatchOptions;
    extraFileExtensions?: readonly ts.FileExtensionInfo[];
}
/** @internal */
/**
 * Creates the watch compiler host from system for config file in watch mode
 */
export function createWatchCompilerHostOfConfigFile<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>({
    configFileName, optionsToExtend, watchOptionsToExtend, extraFileExtensions,
    system, createProgram, reportDiagnostic, reportWatchStatus
}: CreateWatchCompilerHostOfConfigFileInput<T>): ts.WatchCompilerHostOfConfigFile<T> {
    const diagnosticReporter = reportDiagnostic || createDiagnosticReporter(system);
    const host = createWatchCompilerHost(system, createProgram, diagnosticReporter, reportWatchStatus) as ts.WatchCompilerHostOfConfigFile<T>;
    host.onUnRecoverableConfigFileDiagnostic = diagnostic => reportUnrecoverableDiagnostic(system, diagnosticReporter, diagnostic);
    host.configFileName = configFileName;
    host.optionsToExtend = optionsToExtend;
    host.watchOptionsToExtend = watchOptionsToExtend;
    host.extraFileExtensions = extraFileExtensions;
    return host;
}

/** @internal */
export interface CreateWatchCompilerHostOfFilesAndCompilerOptionsInput<T extends ts.BuilderProgram> extends CreateWatchCompilerHostInput<T> {
    rootFiles: string[];
    options: ts.CompilerOptions;
    watchOptions: ts.WatchOptions | undefined;
    projectReferences?: readonly ts.ProjectReference[];
}
/** @internal */
/**
 * Creates the watch compiler host from system for compiling root files and options in watch mode
 */
export function createWatchCompilerHostOfFilesAndCompilerOptions<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>({
    rootFiles, options, watchOptions, projectReferences,
    system, createProgram, reportDiagnostic, reportWatchStatus
}: CreateWatchCompilerHostOfFilesAndCompilerOptionsInput<T>): ts.WatchCompilerHostOfFilesAndCompilerOptions<T> {
    const host = createWatchCompilerHost(system, createProgram, reportDiagnostic || createDiagnosticReporter(system), reportWatchStatus) as ts.WatchCompilerHostOfFilesAndCompilerOptions<T>;
    host.rootFiles = rootFiles;
    host.options = options;
    host.watchOptions = watchOptions;
    host.projectReferences = projectReferences;
    return host;
}

/** @internal */
export interface IncrementalCompilationOptions {
    rootNames: readonly string[];
    options: ts.CompilerOptions;
    configFileParsingDiagnostics?: readonly ts.Diagnostic[];
    projectReferences?: readonly ts.ProjectReference[];
    host?: ts.CompilerHost;
    reportDiagnostic?: ts.DiagnosticReporter;
    reportErrorSummary?: ts.ReportEmitErrorSummary;
    afterProgramEmitAndDiagnostics?(program: ts.EmitAndSemanticDiagnosticsBuilderProgram): void;
    system?: ts.System;
}
/** @internal */
export function performIncrementalCompilation(input: IncrementalCompilationOptions) {
    const system = input.system || ts.sys;
    const host = input.host || (input.host = ts.createIncrementalCompilerHost(input.options, system));
    const builderProgram = ts.createIncrementalProgram(input);
    const exitStatus = emitFilesAndReportErrorsAndGetExitStatus(
        builderProgram,
        input.reportDiagnostic || createDiagnosticReporter(system),
        s => host.trace && host.trace(s),
        input.reportErrorSummary || input.options.pretty ? (errorCount, filesInError) => system.write(getErrorSummaryText(errorCount, filesInError, system.newLine, host)) : undefined
    );
    if (input.afterProgramEmitAndDiagnostics) input.afterProgramEmitAndDiagnostics(builderProgram);
    return exitStatus;
}
