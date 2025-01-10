import {
    append,
    chainDiagnosticMessages,
    createCompilerDiagnosticFromMessageChain,
    createDiagnosticCollection,
    createDiagnosticForNodeInSourceFile,
    createFileDiagnostic,
    createFileDiagnosticFromMessageChain,
    createMultiMap,
    Debug,
    Diagnostic,
    DiagnosticArguments,
    DiagnosticCollection,
    DiagnosticMessage,
    DiagnosticMessageChain,
    Diagnostics,
    DiagnosticWithLocation,
    emptyArray,
    explainIfFileIsRedirectAndImpliedFormat,
    FileIncludeKind,
    FileIncludeReason,
    fileIncludeReasonToDiagnostics,
    FilePreprocessingDiagnostics,
    FilePreprocessingDiagnosticsKind,
    FilePreprocessingLibReferenceDiagnostic,
    forEachProjectReference,
    forEachTsConfigPropArray,
    getEmitScriptTarget,
    getLibNameFromLibReference,
    getMatchedFileSpec,
    getMatchedIncludeSpec,
    getNameOfScriptTarget,
    getNormalizedAbsolutePath,
    getOptionsSyntaxByArrayElementValue,
    getOptionsSyntaxByValue,
    getReferencedFileLocation,
    getSpellingSuggestion,
    getTsConfigPropArrayElementValue,
    identity,
    isArrayLiteralExpression,
    isReferencedFile,
    isReferenceFileLocation,
    isString,
    libs,
    MultiMap,
    Node,
    ObjectLiteralExpression,
    Path,
    Program,
    ReferenceFileLocation,
    removePrefix,
    removeSuffix,
    SourceFile,
    TsConfigSourceFile,
} from "./_namespaces/ts.js";

interface FileReasonToChainCache {
    fileIncludeReasonDetails: DiagnosticMessageChain | undefined;
    redirectInfo: DiagnosticMessageChain[] | undefined;
    details?: DiagnosticMessageChain[];
}

/** @internal */
export interface LazyConfigDiagnostic {
    file: SourceFile;
    diagnostic: DiagnosticMessage;
    args: DiagnosticArguments;
}

/** @internal */
export interface ProgramDiagnostics {
    addConfigDiagnostic(diag: Diagnostic): void;
    addLazyConfigDiagnostic(file: SourceFile, message: DiagnosticMessage, ...args: DiagnosticArguments): void;
    addFileProcessingDiagnostic(diag: FilePreprocessingDiagnostics): void;
    setCommonSourceDirectory(directory: string): void;

    reuseStateFromOldProgram(oldProgramDiagnostics: ProgramDiagnostics, isConfigIdentical: boolean): void;

    getFileProcessingDiagnostics(): FilePreprocessingDiagnostics[] | undefined;
    getFileReasons(): MultiMap<Path, FileIncludeReason>;
    getConfigDiagnostics(): DiagnosticCollection | undefined;
    getLazyConfigDiagnostics(): LazyConfigDiagnostic[] | undefined;
    getCommonSourceDirectory(): string | undefined;
    getCombinedDiagnostics(program: Program): DiagnosticCollection;
}

/** @internal */
export function createProgramDiagnostics(getCompilerOptionsObjectLiteralSyntax: () => ObjectLiteralExpression | undefined): ProgramDiagnostics {
    // Only valid for a single program. The individual components can be reused under certain
    // circumstances (described below), but during `getCombinedDiagnostics`, position information
    // is applied to the diagnostics, so they cannot be shared between programs.
    let computedDiagnostics: DiagnosticCollection | undefined;

    // Valid between programs if `StructureIsReused.Completely`.
    let fileReasons = createMultiMap<Path, FileIncludeReason>();
    let fileProcessingDiagnostics: FilePreprocessingDiagnostics[] | undefined;

    // Valid between programs if `StructureIsReused.Completely` and config file is identical.
    let commonSourceDirectory: string | undefined;
    let configDiagnostics: DiagnosticCollection | undefined;
    let lazyConfigDiagnostics: LazyConfigDiagnostic[] | undefined;

    // Local state, only used during getDiagnostics
    let fileReasonsToChain: Map<Path, FileReasonToChainCache> | undefined;
    let reasonToRelatedInfo: Map<FileIncludeReason, DiagnosticWithLocation | false> | undefined;

    return {
        addConfigDiagnostic(diag) {
            Debug.assert(computedDiagnostics === undefined, "Cannot modify program diagnostic state after requesting combined diagnostics");
            (configDiagnostics ??= createDiagnosticCollection()).add(diag);
        },
        addLazyConfigDiagnostic(file, message, ...args) {
            Debug.assert(computedDiagnostics === undefined, "Cannot modify program diagnostic state after requesting combined diagnostics");
            (lazyConfigDiagnostics ??= []).push({ file, diagnostic: message, args });
        },
        addFileProcessingDiagnostic(diag) {
            Debug.assert(computedDiagnostics === undefined, "Cannot modify program diagnostic state after requesting combined diagnostics");
            (fileProcessingDiagnostics ??= []).push(diag);
        },
        setCommonSourceDirectory(directory) {
            commonSourceDirectory = directory;
        },

        reuseStateFromOldProgram(oldProgramDiagnostics, isConfigIdentical) {
            fileReasons = oldProgramDiagnostics.getFileReasons();
            fileProcessingDiagnostics = oldProgramDiagnostics.getFileProcessingDiagnostics();
            if (isConfigIdentical) {
                commonSourceDirectory = oldProgramDiagnostics.getCommonSourceDirectory();
                configDiagnostics = oldProgramDiagnostics.getConfigDiagnostics();
                lazyConfigDiagnostics = oldProgramDiagnostics.getLazyConfigDiagnostics();
            }
        },

        getFileProcessingDiagnostics() {
            return fileProcessingDiagnostics;
        },
        getFileReasons() {
            return fileReasons;
        },
        getCommonSourceDirectory() {
            return commonSourceDirectory;
        },
        getConfigDiagnostics() {
            return configDiagnostics;
        },
        getLazyConfigDiagnostics() {
            return lazyConfigDiagnostics;
        },
        getCombinedDiagnostics(program: Program) {
            if (computedDiagnostics) {
                return computedDiagnostics;
            }

            computedDiagnostics = createDiagnosticCollection();

            configDiagnostics?.getDiagnostics().forEach(d => computedDiagnostics!.add(d));

            fileProcessingDiagnostics?.forEach(diagnostic => {
                switch (diagnostic.kind) {
                    case FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic:
                        return computedDiagnostics!.add(
                            createDiagnosticExplainingFile(
                                program,
                                diagnostic.file && program.getSourceFileByPath(diagnostic.file),
                                diagnostic.fileProcessingReason,
                                diagnostic.diagnostic,
                                diagnostic.args || emptyArray,
                            ),
                        );
                    case FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic:
                        return computedDiagnostics!.add(filePreprocessingLibreferenceDiagnostic(program, diagnostic));
                    case FilePreprocessingDiagnosticsKind.ResolutionDiagnostics:
                        return diagnostic.diagnostics.forEach(d => computedDiagnostics!.add(d));
                    default:
                        Debug.assertNever(diagnostic);
                }
            });
            lazyConfigDiagnostics?.forEach(({ file, diagnostic, args }) =>
                computedDiagnostics!.add(
                    createDiagnosticExplainingFile(program, file, /*fileProcessingReason*/ undefined, diagnostic, args),
                )
            );
            fileReasonsToChain = undefined;
            reasonToRelatedInfo = undefined;
            return computedDiagnostics;
        },
    };

    function filePreprocessingLibreferenceDiagnostic(program: Program, { reason }: FilePreprocessingLibReferenceDiagnostic) {
        const { file, pos, end } = getReferencedFileLocation(program, reason) as ReferenceFileLocation;
        const libReference = file.libReferenceDirectives[reason.index];
        const libName = getLibNameFromLibReference(libReference);
        const unqualifiedLibName = removeSuffix(removePrefix(libName, "lib."), ".d.ts");
        const suggestion = getSpellingSuggestion(unqualifiedLibName, libs, identity);
        return createFileDiagnostic(
            file,
            Debug.checkDefined(pos),
            Debug.checkDefined(end) - pos,
            suggestion ? Diagnostics.Cannot_find_lib_definition_for_0_Did_you_mean_1 : Diagnostics.Cannot_find_lib_definition_for_0,
            libName,
            suggestion!,
        );
    }

    function createDiagnosticExplainingFile(program: Program, file: SourceFile | undefined, fileProcessingReason: FileIncludeReason | undefined, diagnostic: DiagnosticMessage, args: DiagnosticArguments): Diagnostic {
        let seenReasons: Set<FileIncludeReason> | undefined;
        let fileIncludeReasons: DiagnosticMessageChain[] | undefined;
        let relatedInfo: DiagnosticWithLocation[] | undefined;
        let fileIncludeReasonDetails: DiagnosticMessageChain | undefined;
        let redirectInfo: DiagnosticMessageChain[] | undefined;
        let chain: DiagnosticMessageChain | undefined;

        const reasons = file && fileReasons.get(file.path);
        let locationReason = isReferencedFile(fileProcessingReason) ? fileProcessingReason : undefined;
        let cachedChain = file && fileReasonsToChain?.get(file.path);
        if (cachedChain) {
            if (cachedChain.fileIncludeReasonDetails) {
                seenReasons = new Set(reasons);
                reasons?.forEach(populateRelatedInfo);
            }
            else {
                reasons?.forEach(processReason);
            }
            redirectInfo = cachedChain.redirectInfo;
        }
        else {
            reasons?.forEach(processReason);
            redirectInfo = file && explainIfFileIsRedirectAndImpliedFormat(file, program.getCompilerOptionsForFile(file));
        }

        if (fileProcessingReason) processReason(fileProcessingReason);
        const processedExtraReason = seenReasons?.size !== reasons?.length;

        // If we have location and there is only one reason file is in which is the location, dont add details for file include
        if (locationReason && seenReasons?.size === 1) seenReasons = undefined;

        if (seenReasons && cachedChain) {
            if (cachedChain.details && !processedExtraReason) {
                chain = chainDiagnosticMessages(cachedChain.details, diagnostic, ...args ?? emptyArray);
            }
            else if (cachedChain.fileIncludeReasonDetails) {
                if (!processedExtraReason) {
                    if (!cachedFileIncludeDetailsHasProcessedExtraReason()) {
                        fileIncludeReasonDetails = cachedChain.fileIncludeReasonDetails;
                    }
                    else {
                        fileIncludeReasons = cachedChain.fileIncludeReasonDetails.next!.slice(0, reasons!.length);
                    }
                }
                else {
                    if (!cachedFileIncludeDetailsHasProcessedExtraReason()) {
                        fileIncludeReasons = [...cachedChain.fileIncludeReasonDetails.next!, fileIncludeReasons![0]];
                    }
                    else {
                        fileIncludeReasons = append(cachedChain.fileIncludeReasonDetails.next!.slice(0, reasons!.length), fileIncludeReasons![0]);
                    }
                }
            }
        }

        if (!chain) {
            if (!fileIncludeReasonDetails) fileIncludeReasonDetails = seenReasons && chainDiagnosticMessages(fileIncludeReasons, Diagnostics.The_file_is_in_the_program_because_Colon);
            chain = chainDiagnosticMessages(
                redirectInfo ?
                    fileIncludeReasonDetails ? [fileIncludeReasonDetails, ...redirectInfo] : redirectInfo :
                    fileIncludeReasonDetails,
                diagnostic,
                ...args || emptyArray,
            );
        }

        // This is chain's next contains:
        //   - File is in program because:
        //      - Files reasons listed
        //      - extra reason if its not already processed - this happens in case sensitive file system where files differ in casing and we are giving reasons for two files so reason is not in file's reason
        //     fyi above whole secton is ommited if we have single reason and we are reporting at that reason's location
        //   - redirect and additional information about file
        // So cache result if we havent ommited file include reasons
        if (file) {
            if (cachedChain) {
                // Cache new fileIncludeDetails if we have update
                // Or if we had cached with more details than the reasons
                if (!cachedChain.fileIncludeReasonDetails || (!processedExtraReason && fileIncludeReasonDetails)) {
                    cachedChain.fileIncludeReasonDetails = fileIncludeReasonDetails;
                }
            }
            else {
                (fileReasonsToChain ??= new Map()).set(file.path, cachedChain = { fileIncludeReasonDetails, redirectInfo });
            }
            // If we didnt compute extra file include reason , cache the details to use directly
            if (!cachedChain.details && !processedExtraReason) cachedChain.details = chain.next;
        }

        const location = locationReason && getReferencedFileLocation(program, locationReason);
        return location && isReferenceFileLocation(location) ?
            createFileDiagnosticFromMessageChain(location.file, location.pos, location.end - location.pos, chain, relatedInfo) :
            createCompilerDiagnosticFromMessageChain(chain, relatedInfo);

        function processReason(reason: FileIncludeReason) {
            if (seenReasons?.has(reason)) return;
            (seenReasons ??= new Set()).add(reason);
            (fileIncludeReasons ??= []).push(fileIncludeReasonToDiagnostics(program, reason));
            populateRelatedInfo(reason);
        }

        function populateRelatedInfo(reason: FileIncludeReason) {
            if (!locationReason && isReferencedFile(reason)) {
                // Report error at first reference file or file currently in processing and dont report in related information
                locationReason = reason;
            }
            else if (locationReason !== reason) {
                relatedInfo = append(relatedInfo, getFileIncludeReasonToRelatedInformation(program, reason));
            }
        }

        function cachedFileIncludeDetailsHasProcessedExtraReason() {
            return cachedChain!.fileIncludeReasonDetails!.next?.length !== reasons?.length;
        }
    }

    function getFileIncludeReasonToRelatedInformation(program: Program, reason: FileIncludeReason) {
        let relatedInfo = reasonToRelatedInfo?.get(reason);
        if (relatedInfo === undefined) (reasonToRelatedInfo ??= new Map()).set(reason, relatedInfo = fileIncludeReasonToRelatedInformation(program, reason) ?? false);
        return relatedInfo || undefined;
    }

    function fileIncludeReasonToRelatedInformation(program: Program, reason: FileIncludeReason): DiagnosticWithLocation | undefined {
        if (isReferencedFile(reason)) {
            const referenceLocation = getReferencedFileLocation(program, reason);
            let message: DiagnosticMessage;
            switch (reason.kind) {
                case FileIncludeKind.Import:
                    message = Diagnostics.File_is_included_via_import_here;
                    break;
                case FileIncludeKind.ReferenceFile:
                    message = Diagnostics.File_is_included_via_reference_here;
                    break;
                case FileIncludeKind.TypeReferenceDirective:
                    message = Diagnostics.File_is_included_via_type_library_reference_here;
                    break;
                case FileIncludeKind.LibReferenceDirective:
                    message = Diagnostics.File_is_included_via_library_reference_here;
                    break;
                default:
                    Debug.assertNever(reason);
            }
            return isReferenceFileLocation(referenceLocation) ? createFileDiagnostic(
                referenceLocation.file,
                referenceLocation.pos,
                referenceLocation.end - referenceLocation.pos,
                message,
            ) : undefined;
        }

        const currentDirectory = program.getCurrentDirectory();
        const rootNames = program.getRootFileNames();
        const options = program.getCompilerOptions();
        if (!options.configFile) return undefined;
        let configFileNode: Node | undefined;
        let message: DiagnosticMessage;
        switch (reason.kind) {
            case FileIncludeKind.RootFile:
                if (!options.configFile.configFileSpecs) return undefined;
                const fileName = getNormalizedAbsolutePath(rootNames[reason.index], currentDirectory);
                const matchedByFiles = getMatchedFileSpec(program, fileName);
                if (matchedByFiles) {
                    configFileNode = getTsConfigPropArrayElementValue(options.configFile, "files", matchedByFiles);
                    message = Diagnostics.File_is_matched_by_files_list_specified_here;
                    break;
                }
                const matchedByInclude = getMatchedIncludeSpec(program, fileName);
                // Could be additional files specified as roots
                if (!matchedByInclude || !isString(matchedByInclude)) return undefined;
                configFileNode = getTsConfigPropArrayElementValue(options.configFile, "include", matchedByInclude);
                message = Diagnostics.File_is_matched_by_include_pattern_specified_here;
                break;
            case FileIncludeKind.SourceFromProjectReference:
            case FileIncludeKind.OutputFromProjectReference:
                const resolvedProjectReferences = program.getResolvedProjectReferences();
                const projectReferences = program.getProjectReferences();
                const referencedResolvedRef = Debug.checkDefined(resolvedProjectReferences?.[reason.index]);
                const referenceInfo = forEachProjectReference(
                    projectReferences,
                    resolvedProjectReferences,
                    (resolvedRef, parent, index) =>
                        resolvedRef === referencedResolvedRef ?
                            { sourceFile: parent?.sourceFile || options.configFile!, index } :
                            undefined,
                );
                if (!referenceInfo) return undefined;
                const { sourceFile, index } = referenceInfo;
                const referencesSyntax = forEachTsConfigPropArray(sourceFile as TsConfigSourceFile, "references", property => isArrayLiteralExpression(property.initializer) ? property.initializer : undefined);
                return referencesSyntax && referencesSyntax.elements.length > index ?
                    createDiagnosticForNodeInSourceFile(
                        sourceFile,
                        referencesSyntax.elements[index],
                        reason.kind === FileIncludeKind.OutputFromProjectReference ?
                            Diagnostics.File_is_output_from_referenced_project_specified_here :
                            Diagnostics.File_is_source_from_referenced_project_specified_here,
                    ) :
                    undefined;
            case FileIncludeKind.AutomaticTypeDirectiveFile:
                if (!options.types) return undefined;
                configFileNode = getOptionsSyntaxByArrayElementValue(getCompilerOptionsObjectLiteralSyntax(), "types", reason.typeReference);
                message = Diagnostics.File_is_entry_point_of_type_library_specified_here;
                break;
            case FileIncludeKind.LibFile:
                if (reason.index !== undefined) {
                    configFileNode = getOptionsSyntaxByArrayElementValue(getCompilerOptionsObjectLiteralSyntax(), "lib", options.lib![reason.index]);
                    message = Diagnostics.File_is_library_specified_here;
                    break;
                }
                const target = getNameOfScriptTarget(getEmitScriptTarget(options));
                configFileNode = target ? getOptionsSyntaxByValue(getCompilerOptionsObjectLiteralSyntax(), "target", target) : undefined;
                message = Diagnostics.File_is_default_library_for_target_specified_here;
                break;
            default:
                Debug.assertNever(reason);
        }
        return configFileNode && createDiagnosticForNodeInSourceFile(
            options.configFile,
            configFileNode,
            message,
        );
    }
}
