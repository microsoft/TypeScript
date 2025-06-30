import {
    __String,
    addInternalEmitFlags,
    addRange,
    addRelatedInfo,
    append,
    arrayIsEqualTo,
    AsExpression,
    BuilderProgram,
    CancellationToken,
    canHaveDecorators,
    canHaveIllegalDecorators,
    chainDiagnosticMessages,
    changeExtension,
    changesAffectingProgramStructure,
    changesAffectModuleResolution,
    combinePaths,
    commandLineOptionOfCustomType,
    CommentDirective,
    CommentDirectivesMap,
    compareDataObjects,
    comparePaths,
    compareValues,
    Comparison,
    CompilerHost,
    CompilerOptions,
    computeLineAndCharacterOfPosition,
    concatenate,
    contains,
    containsIgnoredPath,
    containsPath,
    convertToRelativePath,
    createCommentDirectivesMap,
    createCompilerDiagnostic,
    createCompilerDiagnosticFromMessageChain,
    createDiagnosticForNodeFromMessageChain,
    createDiagnosticForNodeInSourceFile,
    createDiagnosticForRange,
    createFileDiagnostic,
    createGetCanonicalFileName,
    createModeAwareCache,
    createModeAwareCacheKey,
    createModuleResolutionCache,
    createMultiMap,
    createProgramDiagnostics,
    CreateProgramOptions,
    createSourceFile,
    CreateSourceFileOptions,
    createSymlinkCache,
    createTypeChecker,
    createTypeReferenceDirectiveResolutionCache,
    CustomTransformers,
    Debug,
    DeclarationWithTypeParameterChildren,
    Diagnostic,
    DiagnosticArguments,
    DiagnosticCategory,
    diagnosticCategoryName,
    DiagnosticMessage,
    DiagnosticMessageChain,
    DiagnosticReporter,
    Diagnostics,
    DiagnosticWithLocation,
    directorySeparator,
    DirectoryStructureHost,
    emitFiles,
    EmitHost,
    emitModuleKindIsNonNodeESM,
    EmitOnly,
    emitResolverSkipsTypeChecking,
    EmitResult,
    emptyArray,
    ensureTrailingDirectorySeparator,
    equateStringsCaseInsensitive,
    equateStringsCaseSensitive,
    exclusivelyPrefixedNodeCoreModules,
    ExportAssignment,
    ExportDeclaration,
    Extension,
    extensionFromPath,
    externalHelpersModuleNameText,
    factory,
    fileExtensionIs,
    fileExtensionIsOneOf,
    FileIncludeKind,
    FileIncludeReason,
    FilePreprocessingDiagnosticsKind,
    FileReference,
    filter,
    find,
    findIndex,
    firstDefinedIterator,
    flatMap,
    flatten,
    forEach,
    forEachAncestorDirectory,
    forEachChildRecursively,
    forEachDynamicImportOrRequireCall,
    forEachEmittedFile,
    forEachEntry,
    forEachKey,
    forEachOptionsSyntaxByName,
    forEachProjectReference,
    forEachPropertyAssignment,
    forEachResolvedProjectReference as ts_forEachResolvedProjectReference,
    forEachTsConfigPropArray,
    FunctionLikeDeclaration,
    getAllowJSCompilerOption,
    getAutomaticTypeDirectiveNames,
    getBaseFileName,
    GetCanonicalFileName,
    getCommonSourceDirectory as ts_getCommonSourceDirectory,
    getCommonSourceDirectoryOfConfig,
    getDeclarationDiagnostics as ts_getDeclarationDiagnostics,
    getDefaultLibFileName,
    getDirectoryPath,
    getEmitDeclarations,
    getEmitModuleKind,
    getEmitModuleResolutionKind,
    getEmitScriptTarget,
    getErrorSpanForNode,
    getExternalModuleName,
    getIsolatedModules,
    getJSXImplicitImportBase,
    getJSXRuntimeImport,
    getLibFileNameFromLibReference,
    getLineAndCharacterOfPosition,
    getLineStarts,
    getNewLineCharacter,
    getNormalizedAbsolutePath,
    getNormalizedAbsolutePathWithoutRoot,
    getNormalizedPathComponents,
    getOutputDeclarationFileName,
    getPackageScopeForPath,
    getPathFromPathComponents,
    getPositionOfLineAndCharacter,
    getResolvedModuleFromResolution,
    getResolvedTypeReferenceDirectiveFromResolution,
    getResolveJsonModule,
    getRootLength,
    getSetExternalModuleIndicator,
    getSourceFileOfNode,
    getStrictOptionValue,
    getSupportedExtensions,
    getSupportedExtensionsWithJsonIfResolveJsonModule,
    getTemporaryModuleResolutionState,
    getTextOfIdentifierOrLiteral,
    getTransformers,
    getTsBuildInfoEmitOutputFilePath,
    getTsConfigObjectLiteralExpression,
    getTypesPackageName,
    HasChangedAutomaticTypeDirectiveNames,
    hasChangesInResolutions,
    hasExtension,
    HasInvalidatedLibResolutions,
    HasInvalidatedResolutions,
    hasJSFileExtension,
    hasJsonModuleEmitEnabled,
    hasProperty,
    hasSyntacticModifier,
    hasZeroOrOneAsteriskCharacter,
    HeritageClause,
    Identifier,
    identity,
    ImportAttributes,
    ImportClause,
    ImportDeclaration,
    ImportOrExportSpecifier,
    importSyntaxAffectsModuleResolution,
    InternalEmitFlags,
    inverseJsxOptionMap,
    isAmbientModule,
    isAnyImportOrReExport,
    isArray,
    isArrayLiteralExpression,
    isBuildInfoFile,
    isCheckJsEnabledForFile,
    isClassDeclaration,
    isDeclarationFileName,
    isDecorator,
    isDefaultModifier,
    isExportDeclaration,
    isExportModifier,
    isExternalModule,
    isExternalModuleNameRelative,
    isIdentifierText,
    isImportCall,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isImportSpecifier,
    isImportTypeNode,
    isInJSFile,
    isJSDocImportTag,
    isModifier,
    isModuleDeclaration,
    isObjectLiteralExpression,
    isParameter,
    isPlainJsFile,
    isRequireCall,
    isRootedDiskPath,
    isSourceFileJS,
    isString,
    isStringLiteral,
    isStringLiteralLike,
    isTraceEnabled,
    JSDocImportTag,
    JsonSourceFile,
    JsxEmit,
    length,
    LibResolution,
    libs,
    mapDefined,
    maybeBind,
    memoize,
    MethodDeclaration,
    ModeAwareCache,
    ModeAwareCacheKey,
    ModifierFlags,
    ModifierLike,
    ModuleBlock,
    ModuleDeclaration,
    ModuleKind,
    ModuleResolutionCache,
    ModuleResolutionHost,
    moduleResolutionIsEqualTo,
    ModuleResolutionKind,
    moduleResolutionSupportsPackageJsonExportsAndImports,
    Mutable,
    Node,
    NodeArray,
    NodeFlags,
    nodeModulesPathPart,
    NodeWithTypeArguments,
    noop,
    normalizePath,
    notImplementedResolver,
    noTransformers,
    ObjectLiteralExpression,
    OperationCanceledException,
    optionDeclarations,
    optionsHaveChanges,
    PackageId,
    packageIdToPackageName,
    packageIdToString,
    PackageJsonInfoCache,
    ParameterDeclaration,
    ParseConfigFileHost,
    ParsedCommandLine,
    parseIsolatedEntityName,
    parseJsonSourceFileConfigFileContent,
    parseNodeFactory,
    Path,
    pathContainsNodeModules,
    pathIsAbsolute,
    pathIsRelative,
    Program,
    ProgramHost,
    ProjectReference,
    ProjectReferenceFile,
    projectReferenceIsEqualTo,
    PropertyAssignment,
    PropertyDeclaration,
    ReferencedFile,
    removeFileExtension,
    removePrefix,
    removeSuffix,
    resolutionExtensionIsTSOrJson,
    ResolutionMode,
    ResolutionWithFailedLookupLocations,
    resolveConfigFileProjectName,
    ResolvedConfigFileName,
    ResolvedModuleFull,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedProjectReference,
    ResolvedRefAndOutputDts,
    ResolvedRefAndSource,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    resolveLibrary,
    resolveModuleName,
    resolveTypeReferenceDirective,
    returnFalse,
    returnUndefined,
    SatisfiesExpression,
    ScriptKind,
    ScriptTarget,
    setParent,
    setParentRecursive,
    skipTrivia,
    skipTypeChecking,
    some,
    sortAndDeduplicateDiagnostics,
    SortedReadonlyArray,
    SourceFile,
    sourceFileAffectingCompilerOptions,
    sourceFileMayBeEmitted,
    startsWith,
    Statement,
    StringLiteral,
    StringLiteralLike,
    StructureIsReused,
    supportedJSExtensionsFlat,
    SymlinkCache,
    SyntaxKind,
    sys,
    System,
    toFileNameLowerCase,
    tokenToString,
    toPath as ts_toPath,
    toSorted,
    trace,
    tracing,
    tryCast,
    TypeChecker,
    typeDirectiveIsEqualTo,
    TypeReferenceDirectiveResolutionCache,
    unprefixedNodeCoreModules,
    VariableDeclaration,
    VariableStatement,
    Version,
    versionMajorMinor,
    walkUpParenthesizedExpressions,
    WriteFileCallback,
    WriteFileCallbackData,
    writeFileEnsuringDirectories,
} from "./_namespaces/ts.js";
import * as performance from "./_namespaces/ts.performance.js";

export function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName = "tsconfig.json"): string | undefined {
    return forEachAncestorDirectory(searchPath, ancestor => {
        const fileName = combinePaths(ancestor, configName);
        return fileExists(fileName) ? fileName : undefined;
    });
}

export function resolveTripleslashReference(moduleName: string, containingFile: string): string {
    const basePath = getDirectoryPath(containingFile);
    const referencedFileName = isRootedDiskPath(moduleName) ? moduleName : combinePaths(basePath, moduleName);
    return normalizePath(referencedFileName);
}

/** @internal */
export function computeCommonSourceDirectoryOfFilenames(fileNames: readonly string[], currentDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    let commonPathComponents: string[] | undefined;
    const failed = forEach(fileNames, sourceFile => {
        // Each file contributes into common source file path
        const sourcePathComponents = getNormalizedPathComponents(sourceFile, currentDirectory);
        sourcePathComponents.pop(); // The base file name is not part of the common directory path

        if (!commonPathComponents) {
            // first file
            commonPathComponents = sourcePathComponents;
            return;
        }

        const n = Math.min(commonPathComponents.length, sourcePathComponents.length);
        for (let i = 0; i < n; i++) {
            if (getCanonicalFileName(commonPathComponents[i]) !== getCanonicalFileName(sourcePathComponents[i])) {
                if (i === 0) {
                    // Failed to find any common path component
                    return true;
                }

                // New common path found that is 0 -> i-1
                commonPathComponents.length = i;
                break;
            }
        }

        // If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
        if (sourcePathComponents.length < commonPathComponents.length) {
            commonPathComponents.length = sourcePathComponents.length;
        }
    });

    // A common path can not be found when paths span multiple drives on windows, for example
    if (failed) {
        return "";
    }

    if (!commonPathComponents) { // Can happen when all input files are .d.ts files
        return currentDirectory;
    }

    return getPathFromPathComponents(commonPathComponents);
}

export function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost {
    return createCompilerHostWorker(options, setParentNodes);
}

/** @internal */
export function createGetSourceFile(
    readFile: ProgramHost<any>["readFile"],
    setParentNodes: boolean | undefined,
): CompilerHost["getSourceFile"] {
    return (fileName, languageVersionOrOptions, onError) => {
        let text: string | undefined;
        try {
            performance.mark("beforeIORead");
            text = readFile(fileName);
            performance.mark("afterIORead");
            performance.measure("I/O Read", "beforeIORead", "afterIORead");
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }
            text = "";
        }
        return text !== undefined ? createSourceFile(fileName, text, languageVersionOrOptions, setParentNodes) : undefined;
    };
}

/** @internal */
export function createWriteFileMeasuringIO(
    actualWriteFile: (path: string, data: string, writeByteOrderMark: boolean) => void,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean,
): CompilerHost["writeFile"] {
    return (fileName, data, writeByteOrderMark, onError) => {
        try {
            performance.mark("beforeIOWrite");

            // NOTE: If patchWriteFileEnsuringDirectory has been called,
            // the system.writeFile will do its own directory creation and
            // the ensureDirectoriesExist call will always be redundant.
            writeFileEnsuringDirectories(
                fileName,
                data,
                writeByteOrderMark,
                actualWriteFile,
                createDirectory,
                directoryExists,
            );

            performance.mark("afterIOWrite");
            performance.measure("I/O Write", "beforeIOWrite", "afterIOWrite");
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }
        }
    };
}

/** @internal */
export function createCompilerHostWorker(
    options: CompilerOptions,
    setParentNodes?: boolean,
    system: System = sys,
): CompilerHost {
    const existingDirectories = new Map<string, boolean>();
    const getCanonicalFileName = createGetCanonicalFileName(system.useCaseSensitiveFileNames);
    function directoryExists(directoryPath: string): boolean {
        if (existingDirectories.has(directoryPath)) {
            return true;
        }
        if ((compilerHost.directoryExists || system.directoryExists)(directoryPath)) {
            existingDirectories.set(directoryPath, true);
            return true;
        }
        return false;
    }

    function getDefaultLibLocation(): string {
        return getDirectoryPath(normalizePath(system.getExecutingFilePath()));
    }

    const newLine = getNewLineCharacter(options);
    const realpath = system.realpath && ((path: string) => system.realpath!(path));
    const compilerHost: CompilerHost = {
        getSourceFile: createGetSourceFile(fileName => compilerHost.readFile(fileName), setParentNodes),
        getDefaultLibLocation,
        getDefaultLibFileName: options => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
        writeFile: createWriteFileMeasuringIO(
            (path, data, writeByteOrderMark) => system.writeFile(path, data, writeByteOrderMark),
            path => (compilerHost.createDirectory || system.createDirectory)(path),
            path => directoryExists(path),
        ),
        getCurrentDirectory: memoize(() => system.getCurrentDirectory()),
        useCaseSensitiveFileNames: () => system.useCaseSensitiveFileNames,
        getCanonicalFileName,
        getNewLine: () => newLine,
        fileExists: fileName => system.fileExists(fileName),
        readFile: fileName => system.readFile(fileName),
        trace: (s: string) => system.write(s + newLine),
        directoryExists: directoryName => system.directoryExists(directoryName),
        getEnvironmentVariable: name => system.getEnvironmentVariable ? system.getEnvironmentVariable(name) : "",
        getDirectories: (path: string) => system.getDirectories(path),
        realpath,
        readDirectory: (path, extensions, include, exclude, depth) => system.readDirectory(path, extensions, include, exclude, depth),
        createDirectory: d => system.createDirectory(d),
        createHash: maybeBind(system, system.createHash),
    };
    return compilerHost;
}

/** @internal */
export interface CompilerHostLikeForCache {
    fileExists(fileName: string): boolean;
    readFile(fileName: string, encoding?: string): string | undefined;
    directoryExists?(directory: string): boolean;
    createDirectory?(directory: string): void;
    writeFile?: WriteFileCallback;
}

/** @internal */
export interface CompilerHostLikeWithCache {
    originalReadFile: (fileName: string, encoding?: string) => string | undefined;
    originalFileExists: (fileName: string) => boolean;
    originalDirectoryExists: ((directory: string) => boolean) | undefined;
    originalCreateDirectory: ((directory: string) => void) | undefined;
    originalWriteFile: WriteFileCallback | undefined;
    getSourceFileWithCache: ((fileName: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean) => SourceFile | undefined) | undefined;
    readFileWithCache: (fileName: string) => string | undefined;
}

/** @internal */
export function changeCompilerHostLikeToUseCache(
    host: CompilerHostLikeForCache,
    toPath: (fileName: string) => Path,
    getSourceFile?: CompilerHost["getSourceFile"],
): CompilerHostLikeWithCache {
    const originalReadFile = host.readFile;
    const originalFileExists = host.fileExists;
    const originalDirectoryExists = host.directoryExists;
    const originalCreateDirectory = host.createDirectory;
    const originalWriteFile = host.writeFile;
    const readFileCache = new Map<Path, string | false>();
    const fileExistsCache = new Map<Path, boolean>();
    const directoryExistsCache = new Map<Path, boolean>();
    const sourceFileCache = new Map<ResolutionMode, Map<Path, SourceFile>>();

    const readFileWithCache = (fileName: string): string | undefined => {
        const key = toPath(fileName);
        const value = readFileCache.get(key);
        if (value !== undefined) return value !== false ? value : undefined;
        return setReadFileCache(key, fileName);
    };
    const setReadFileCache = (key: Path, fileName: string) => {
        const newValue = originalReadFile.call(host, fileName);
        readFileCache.set(key, newValue !== undefined ? newValue : false);
        return newValue;
    };
    host.readFile = fileName => {
        const key = toPath(fileName);
        const value = readFileCache.get(key);
        if (value !== undefined) return value !== false ? value : undefined; // could be .d.ts from output
        // Cache json or buildInfo
        if (!fileExtensionIs(fileName, Extension.Json) && !isBuildInfoFile(fileName)) {
            return originalReadFile.call(host, fileName);
        }

        return setReadFileCache(key, fileName);
    };

    const getSourceFileWithCache: CompilerHost["getSourceFile"] | undefined = getSourceFile ? (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
        const key = toPath(fileName);
        const impliedNodeFormat: ResolutionMode = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions.impliedNodeFormat : undefined;
        const forImpliedNodeFormat = sourceFileCache.get(impliedNodeFormat);
        const value = forImpliedNodeFormat?.get(key);
        if (value) return value;

        const sourceFile = getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
        if (sourceFile && (isDeclarationFileName(fileName) || fileExtensionIs(fileName, Extension.Json))) {
            sourceFileCache.set(impliedNodeFormat, (forImpliedNodeFormat || new Map()).set(key, sourceFile));
        }
        return sourceFile;
    } : undefined;

    // fileExists for any kind of extension
    host.fileExists = fileName => {
        const key = toPath(fileName);
        const value = fileExistsCache.get(key);
        if (value !== undefined) return value;
        const newValue = originalFileExists.call(host, fileName);
        fileExistsCache.set(key, !!newValue);
        return newValue;
    };
    if (originalWriteFile) {
        host.writeFile = (fileName, data, ...rest) => {
            const key = toPath(fileName);
            fileExistsCache.delete(key);

            const value = readFileCache.get(key);
            if (value !== undefined && value !== data) {
                readFileCache.delete(key);
                sourceFileCache.forEach(map => map.delete(key));
            }
            else if (getSourceFileWithCache) {
                sourceFileCache.forEach(map => {
                    const sourceFile = map.get(key);
                    if (sourceFile && sourceFile.text !== data) {
                        map.delete(key);
                    }
                });
            }
            originalWriteFile.call(host, fileName, data, ...rest);
        };
    }

    // directoryExists
    if (originalDirectoryExists) {
        host.directoryExists = directory => {
            const key = toPath(directory);
            const value = directoryExistsCache.get(key);
            if (value !== undefined) return value;
            const newValue = originalDirectoryExists.call(host, directory);
            directoryExistsCache.set(key, !!newValue);
            return newValue;
        };

        if (originalCreateDirectory) {
            host.createDirectory = directory => {
                const key = toPath(directory);
                directoryExistsCache.delete(key);
                originalCreateDirectory.call(host, directory);
            };
        }
    }

    return {
        originalReadFile,
        originalFileExists,
        originalDirectoryExists,
        originalCreateDirectory,
        originalWriteFile,
        getSourceFileWithCache,
        readFileWithCache,
    };
}

export function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
/** @internal */ export function getPreEmitDiagnostics(program: BuilderProgram, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[]; // eslint-disable-line @typescript-eslint/unified-signatures
export function getPreEmitDiagnostics(program: Program | BuilderProgram, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
    let diagnostics: Diagnostic[] | undefined;
    diagnostics = addRange(diagnostics, program.getConfigFileParsingDiagnostics());
    diagnostics = addRange(diagnostics, program.getOptionsDiagnostics(cancellationToken));
    diagnostics = addRange(diagnostics, program.getSyntacticDiagnostics(sourceFile, cancellationToken));
    diagnostics = addRange(diagnostics, program.getGlobalDiagnostics(cancellationToken));
    diagnostics = addRange(diagnostics, program.getSemanticDiagnostics(sourceFile, cancellationToken));

    if (getEmitDeclarations(program.getCompilerOptions())) {
        diagnostics = addRange(diagnostics, program.getDeclarationDiagnostics(sourceFile, cancellationToken));
    }

    return sortAndDeduplicateDiagnostics(diagnostics || emptyArray);
}

export interface FormatDiagnosticsHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    getNewLine(): string;
}

export function formatDiagnostics(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string {
    let output = "";

    for (const diagnostic of diagnostics) {
        output += formatDiagnostic(diagnostic, host);
    }
    return output;
}

export function formatDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHost): string {
    const errorMessage = `${diagnosticCategoryName(diagnostic)} TS${diagnostic.code}: ${flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine())}${host.getNewLine()}`;

    if (diagnostic.file) {
        const { line, character } = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!); // TODO: GH#18217
        const fileName = diagnostic.file.fileName;
        const relativeFileName = convertToRelativePath(fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName));
        return `${relativeFileName}(${line + 1},${character + 1}): ` + errorMessage;
    }

    return errorMessage;
}

/** @internal */
export enum ForegroundColorEscapeSequences {
    Grey = "\u001b[90m",
    Red = "\u001b[91m",
    Yellow = "\u001b[93m",
    Blue = "\u001b[94m",
    Cyan = "\u001b[96m",
}
const gutterStyleSequence = "\u001b[7m";
const gutterSeparator = " ";
const resetEscapeSequence = "\u001b[0m";
const ellipsis = "...";
const halfIndent = "  ";
const indent = "    ";
function getCategoryFormat(category: DiagnosticCategory): ForegroundColorEscapeSequences {
    switch (category) {
        case DiagnosticCategory.Error:
            return ForegroundColorEscapeSequences.Red;
        case DiagnosticCategory.Warning:
            return ForegroundColorEscapeSequences.Yellow;
        case DiagnosticCategory.Suggestion:
            return Debug.fail("Should never get an Info diagnostic on the command line.");
        case DiagnosticCategory.Message:
            return ForegroundColorEscapeSequences.Blue;
    }
}

/** @internal */
export function formatColorAndReset(text: string, formatStyle: string): string {
    return formatStyle + text + resetEscapeSequence;
}

function formatCodeSpan(file: SourceFile, start: number, length: number, indent: string, squiggleColor: ForegroundColorEscapeSequences, host: FormatDiagnosticsHost) {
    const { line: firstLine, character: firstLineChar } = getLineAndCharacterOfPosition(file, start);
    const { line: lastLine, character: lastLineChar } = getLineAndCharacterOfPosition(file, start + length);
    const lastLineInFile = getLineAndCharacterOfPosition(file, file.text.length).line;

    const hasMoreThanFiveLines = (lastLine - firstLine) >= 4;
    let gutterWidth = (lastLine + 1 + "").length;
    if (hasMoreThanFiveLines) {
        gutterWidth = Math.max(ellipsis.length, gutterWidth);
    }

    let context = "";
    for (let i = firstLine; i <= lastLine; i++) {
        context += host.getNewLine();
        // If the error spans over 5 lines, we'll only show the first 2 and last 2 lines,
        // so we'll skip ahead to the second-to-last line.
        if (hasMoreThanFiveLines && firstLine + 1 < i && i < lastLine - 1) {
            context += indent + formatColorAndReset(ellipsis.padStart(gutterWidth), gutterStyleSequence) + gutterSeparator + host.getNewLine();
            i = lastLine - 1;
        }

        const lineStart = getPositionOfLineAndCharacter(file, i, 0);
        const lineEnd = i < lastLineInFile ? getPositionOfLineAndCharacter(file, i + 1, 0) : file.text.length;
        let lineContent = file.text.slice(lineStart, lineEnd);
        lineContent = lineContent.trimEnd(); // trim from end
        lineContent = lineContent.replace(/\t/g, " "); // convert tabs to single spaces

        // Output the gutter and the actual contents of the line.
        context += indent + formatColorAndReset((i + 1 + "").padStart(gutterWidth), gutterStyleSequence) + gutterSeparator;
        context += lineContent + host.getNewLine();

        // Output the gutter and the error span for the line using tildes.
        context += indent + formatColorAndReset("".padStart(gutterWidth), gutterStyleSequence) + gutterSeparator;
        context += squiggleColor;
        if (i === firstLine) {
            // If we're on the last line, then limit it to the last character of the last line.
            // Otherwise, we'll just squiggle the rest of the line, giving 'slice' no end position.
            const lastCharForLine = i === lastLine ? lastLineChar : undefined;

            context += lineContent.slice(0, firstLineChar).replace(/\S/g, " ");
            context += lineContent.slice(firstLineChar, lastCharForLine).replace(/./g, "~");
        }
        else if (i === lastLine) {
            context += lineContent.slice(0, lastLineChar).replace(/./g, "~");
        }
        else {
            // Squiggle the entire line.
            context += lineContent.replace(/./g, "~");
        }
        context += resetEscapeSequence;
    }
    return context;
}

/** @internal */
export function formatLocation(file: SourceFile, start: number, host: FormatDiagnosticsHost, color: typeof formatColorAndReset = formatColorAndReset): string {
    const { line: firstLine, character: firstLineChar } = getLineAndCharacterOfPosition(file, start); // TODO: GH#18217
    const relativeFileName = host ? convertToRelativePath(file.fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName)) : file.fileName;

    let output = "";
    output += color(relativeFileName, ForegroundColorEscapeSequences.Cyan);
    output += ":";
    output += color(`${firstLine + 1}`, ForegroundColorEscapeSequences.Yellow);
    output += ":";
    output += color(`${firstLineChar + 1}`, ForegroundColorEscapeSequences.Yellow);
    return output;
}

export function formatDiagnosticsWithColorAndContext(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string {
    let output = "";
    for (const diagnostic of diagnostics) {
        if (diagnostic.file) {
            const { file, start } = diagnostic;
            output += formatLocation(file, start!, host); // TODO: GH#18217
            output += " - ";
        }

        output += formatColorAndReset(diagnosticCategoryName(diagnostic), getCategoryFormat(diagnostic.category));
        output += formatColorAndReset(` TS${diagnostic.code}: `, ForegroundColorEscapeSequences.Grey);
        output += flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine());

        if (diagnostic.file && diagnostic.code !== Diagnostics.File_appears_to_be_binary.code) {
            output += host.getNewLine();
            output += formatCodeSpan(diagnostic.file, diagnostic.start!, diagnostic.length!, "", getCategoryFormat(diagnostic.category), host); // TODO: GH#18217
        }
        if (diagnostic.relatedInformation) {
            output += host.getNewLine();
            for (const { file, start, length, messageText } of diagnostic.relatedInformation) {
                if (file) {
                    output += host.getNewLine();
                    output += halfIndent + formatLocation(file, start!, host); // TODO: GH#18217
                    output += formatCodeSpan(file, start!, length!, indent, ForegroundColorEscapeSequences.Cyan, host); // TODO: GH#18217
                }
                output += host.getNewLine();
                output += indent + flattenDiagnosticMessageText(messageText, host.getNewLine());
            }
        }
        output += host.getNewLine();
    }
    return output;
}

export function flattenDiagnosticMessageText(diag: string | DiagnosticMessageChain | undefined, newLine: string, indent = 0): string {
    if (isString(diag)) {
        return diag;
    }
    else if (diag === undefined) {
        return "";
    }
    let result = "";
    if (indent) {
        result += newLine;

        for (let i = 0; i < indent; i++) {
            result += "  ";
        }
    }
    result += diag.messageText;
    indent++;
    if (diag.next) {
        for (const kid of diag.next) {
            result += flattenDiagnosticMessageText(kid, newLine, indent);
        }
    }
    return result;
}

/**
 * Subset of a SourceFile used to calculate index-based resolutions
 * This includes some internal fields, so unless you have very good reason,
 * (and are willing to use some less stable internals) you should probably just pass a SourceFile.
 *
 * @internal
 */
export interface SourceFileImportsList {
    imports: SourceFile["imports"];
    moduleAugmentations: SourceFile["moduleAugmentations"];
    impliedNodeFormat?: ResolutionMode;
    fileName: string;
    packageJsonScope?: SourceFile["packageJsonScope"];
}

/**
 * Calculates the resulting resolution mode for some reference in some file - this is generally the explicitly
 * provided resolution mode in the reference, unless one is not present, in which case it is the mode of the containing file.
 */
export function getModeForFileReference(ref: FileReference | string, containingFileMode: ResolutionMode): ResolutionMode {
    return (isString(ref) ? containingFileMode : ref.resolutionMode) || containingFileMode;
}

/**
 * Use `program.getModeForResolutionAtIndex`, which retrieves the correct `compilerOptions`, instead of this function whenever possible.
 * Calculates the final resolution mode for an import at some index within a file's `imports` list. This is the resolution mode
 * explicitly provided via import attributes, if present, or the syntax the usage would have if emitted to JavaScript. In
 * `--module node16` or `nodenext`, this may depend on the file's `impliedNodeFormat`. In `--module preserve`, it depends only on the
 * input syntax of the reference. In other `module` modes, when overriding import attributes are not provided, this function returns
 * `undefined`, as the result would have no impact on module resolution, emit, or type checking.
 * @param file File to fetch the resolution mode within
 * @param index Index into the file's complete resolution list to get the resolution of - this is a concatenation of the file's imports and module augmentations
 * @param compilerOptions The compiler options for the program that owns the file. If the file belongs to a referenced project, the compiler options
 * should be the options of the referenced project, not the referencing project.
 */
export function getModeForResolutionAtIndex(file: SourceFile, index: number, compilerOptions: CompilerOptions): ResolutionMode;
/** @internal @knipignore */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function getModeForResolutionAtIndex(file: SourceFileImportsList, index: number, compilerOptions: CompilerOptions): ResolutionMode;
export function getModeForResolutionAtIndex(file: SourceFileImportsList, index: number, compilerOptions?: CompilerOptions): ResolutionMode {
    // we ensure all elements of file.imports and file.moduleAugmentations have the relevant parent pointers set during program setup,
    // so it's safe to use them even pre-bind
    return getModeForUsageLocationWorker(file, getModuleNameStringLiteralAt(file, index), compilerOptions);
}

/** @internal */
export function isExclusivelyTypeOnlyImportOrExport(decl: ImportDeclaration | ExportDeclaration | JSDocImportTag): boolean {
    if (isExportDeclaration(decl)) {
        return decl.isTypeOnly;
    }
    if (decl.importClause?.isTypeOnly) {
        return true;
    }
    return false;
}

/**
 * Use `program.getModeForUsageLocation`, which retrieves the correct `compilerOptions`, instead of this function whenever possible.
 * Calculates the final resolution mode for a given module reference node. This function only returns a result when module resolution
 * settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided via import attributes,
 * which cause an `import` or `require` condition to be used during resolution regardless of module resolution settings. In absence of
 * overriding attributes, and in modes that support differing resolution, the result indicates the syntax the usage would emit to JavaScript.
 * Some examples:
 *
 * ```ts
 * // tsc foo.mts --module nodenext
 * import {} from "mod";
 * // Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension
 *
 * // tsc foo.cts --module nodenext
 * import {} from "mod";
 * // Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension
 *
 * // tsc foo.ts --module preserve --moduleResolution bundler
 * import {} from "mod";
 * // Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
 * // supports conditional imports/exports
 *
 * // tsc foo.ts --module preserve --moduleResolution node10
 * import {} from "mod";
 * // Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
 * // does not support conditional imports/exports
 *
 * // tsc foo.ts --module commonjs --moduleResolution node10
 * import type {} from "mod" with { "resolution-mode": "import" };
 * // Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
 * ```
 *
 * @param file The file the import or import-like reference is contained within
 * @param usage The module reference string
 * @param compilerOptions The compiler options for the program that owns the file. If the file belongs to a referenced project, the compiler options
 * should be the options of the referenced project, not the referencing project.
 * @returns The final resolution mode of the import
 */
export function getModeForUsageLocation(file: SourceFile, usage: StringLiteralLike, compilerOptions: CompilerOptions): ResolutionMode {
    return getModeForUsageLocationWorker(file, usage, compilerOptions);
}

function getModeForUsageLocationWorker(file: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, usage: StringLiteralLike, compilerOptions?: CompilerOptions) {
    if (isImportDeclaration(usage.parent) || isExportDeclaration(usage.parent) || isJSDocImportTag(usage.parent)) {
        const isTypeOnly = isExclusivelyTypeOnlyImportOrExport(usage.parent);
        if (isTypeOnly) {
            const override = getResolutionModeOverride(usage.parent.attributes);
            if (override) {
                return override;
            }
        }
    }
    if (usage.parent.parent && isImportTypeNode(usage.parent.parent)) {
        const override = getResolutionModeOverride(usage.parent.parent.attributes);
        if (override) {
            return override;
        }
    }

    if (compilerOptions && importSyntaxAffectsModuleResolution(compilerOptions)) {
        return getEmitSyntaxForUsageLocationWorker(file, usage, compilerOptions);
    }
}

function getEmitSyntaxForUsageLocationWorker(file: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, usage: StringLiteralLike, compilerOptions?: CompilerOptions): ResolutionMode {
    if (!compilerOptions) {
        // This should always be provided, but we try to fail somewhat
        // gracefully to allow projects like ts-node time to update.
        return undefined;
    }
    const exprParentParent = walkUpParenthesizedExpressions(usage.parent)?.parent;
    if (exprParentParent && isImportEqualsDeclaration(exprParentParent) || isRequireCall(usage.parent, /*requireStringLiteralLikeArgument*/ false)) {
        return ModuleKind.CommonJS;
    }
    if (isImportCall(walkUpParenthesizedExpressions(usage.parent))) {
        return shouldTransformImportCallWorker(file, compilerOptions) ? ModuleKind.CommonJS : ModuleKind.ESNext;
    }
    // If we're in --module preserve on an input file, we know that an import
    // is an import. But if this is a declaration file, we'd prefer to use the
    // impliedNodeFormat. Since we want things to be consistent between the two,
    // we need to issue errors when the user writes ESM syntax in a definitely-CJS
    // file, until/unless declaration emit can indicate a true ESM import. On the
    // other hand, writing CJS syntax in a definitely-ESM file is fine, since declaration
    // emit preserves the CJS syntax.
    const fileEmitMode = getEmitModuleFormatOfFileWorker(file, compilerOptions);
    return fileEmitMode === ModuleKind.CommonJS ? ModuleKind.CommonJS :
        emitModuleKindIsNonNodeESM(fileEmitMode) || fileEmitMode === ModuleKind.Preserve ? ModuleKind.ESNext :
        undefined;
}

/** @internal */
export function getResolutionModeOverride(node: ImportAttributes | undefined, grammarErrorOnNode?: (node: Node, diagnostic: DiagnosticMessage) => void): ResolutionMode | undefined {
    if (!node) return undefined;
    if (length(node.elements) !== 1) {
        grammarErrorOnNode?.(
            node,
            node.token === SyntaxKind.WithKeyword
                ? Diagnostics.Type_import_attributes_should_have_exactly_one_key_resolution_mode_with_value_import_or_require
                : Diagnostics.Type_import_assertions_should_have_exactly_one_key_resolution_mode_with_value_import_or_require,
        );
        return undefined;
    }
    const elem = node.elements[0];
    if (!isStringLiteralLike(elem.name)) return undefined;
    if (elem.name.text !== "resolution-mode") {
        grammarErrorOnNode?.(
            elem.name,
            node.token === SyntaxKind.WithKeyword
                ? Diagnostics.resolution_mode_is_the_only_valid_key_for_type_import_attributes
                : Diagnostics.resolution_mode_is_the_only_valid_key_for_type_import_assertions,
        );
        return undefined;
    }
    if (!isStringLiteralLike(elem.value)) return undefined;
    if (elem.value.text !== "import" && elem.value.text !== "require") {
        grammarErrorOnNode?.(elem.value, Diagnostics.resolution_mode_should_be_either_require_or_import);
        return undefined;
    }
    return elem.value.text === "import" ? ModuleKind.ESNext : ModuleKind.CommonJS;
}

const emptyResolution: ResolvedModuleWithFailedLookupLocations & ResolvedTypeReferenceDirectiveWithFailedLookupLocations = {
    resolvedModule: undefined,
    resolvedTypeReferenceDirective: undefined,
};

/** @internal */
export interface ResolutionWithResolvedFileName {
    resolvedFileName: string | undefined;
    packageId?: PackageId;
}

/** @internal */
export interface ResolutionNameAndModeGetter<Entry, SourceFile> {
    getName(entry: Entry): string;
    getMode(entry: Entry, file: SourceFile, compilerOptions: CompilerOptions): ResolutionMode;
}

/** @internal */
export interface ResolutionLoader<Entry, Resolution, SourceFile> {
    nameAndMode: ResolutionNameAndModeGetter<Entry, SourceFile>;
    resolve(name: string, mode: ResolutionMode): Resolution;
}

function getModuleResolutionName(literal: StringLiteralLike) {
    return literal.text;
}

/** @internal */
export const moduleResolutionNameAndModeGetter: ResolutionNameAndModeGetter<StringLiteralLike, SourceFile> = {
    getName: getModuleResolutionName,
    getMode: (entry, file, compilerOptions) => getModeForUsageLocation(file, entry, compilerOptions),
};

/** @internal */
export function createModuleResolutionLoader(
    containingFile: string,
    redirectedReference: ResolvedProjectReference | undefined,
    options: CompilerOptions,
    host: ModuleResolutionHost,
    cache: ModuleResolutionCache | undefined,
): ResolutionLoader<StringLiteralLike, ResolvedModuleWithFailedLookupLocations, SourceFile> {
    return {
        nameAndMode: moduleResolutionNameAndModeGetter,
        resolve: (moduleName, resolutionMode) =>
            resolveModuleName(
                moduleName,
                containingFile,
                options,
                host,
                cache,
                redirectedReference,
                resolutionMode,
            ),
    };
}

function getTypeReferenceResolutionName<T extends FileReference | string>(entry: T) {
    return !isString(entry) ? entry.fileName : entry;
}

const typeReferenceResolutionNameAndModeGetter: ResolutionNameAndModeGetter<FileReference | string, SourceFile | undefined> = {
    getName: getTypeReferenceResolutionName,
    getMode: (entry, file, compilerOptions) => getModeForFileReference(entry, file && getDefaultResolutionModeForFileWorker(file, compilerOptions)),
};

/** @internal */
export function createTypeReferenceResolutionLoader<T extends FileReference | string>(
    containingFile: string,
    redirectedReference: ResolvedProjectReference | undefined,
    options: CompilerOptions,
    host: ModuleResolutionHost,
    cache: TypeReferenceDirectiveResolutionCache | undefined,
): ResolutionLoader<T, ResolvedTypeReferenceDirectiveWithFailedLookupLocations, SourceFile | undefined> {
    return {
        nameAndMode: typeReferenceResolutionNameAndModeGetter,
        resolve: (typeRef, resoluionMode) =>
            resolveTypeReferenceDirective(
                typeRef,
                containingFile,
                options,
                host,
                redirectedReference,
                cache,
                resoluionMode,
            ),
    };
}

/** @internal */
export function loadWithModeAwareCache<Entry, SourceFile, ResolutionCache, Resolution>(
    entries: readonly Entry[],
    containingFile: string,
    redirectedReference: ResolvedProjectReference | undefined,
    options: CompilerOptions,
    containingSourceFile: SourceFile,
    host: ModuleResolutionHost,
    resolutionCache: ResolutionCache | undefined,
    createLoader: (
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        host: ModuleResolutionHost,
        resolutionCache: ResolutionCache | undefined,
    ) => ResolutionLoader<Entry, Resolution, SourceFile>,
): readonly Resolution[] {
    if (entries.length === 0) return emptyArray;
    const resolutions: Resolution[] = [];
    const cache = new Map<ModeAwareCacheKey, Resolution>();
    const loader = createLoader(containingFile, redirectedReference, options, host, resolutionCache);
    for (const entry of entries) {
        const name = loader.nameAndMode.getName(entry);
        const mode = loader.nameAndMode.getMode(entry, containingSourceFile, redirectedReference?.commandLine.options || options);
        const key = createModeAwareCacheKey(name, mode);
        let result = cache.get(key);
        if (!result) {
            cache.set(key, result = loader.resolve(name, mode));
        }
        resolutions.push(result);
    }
    return resolutions;
}

/** @internal */
export const inferredTypesContainingFile = "__inferred type names__.ts";

/** @internal */
export function getInferredLibraryNameResolveFrom(options: CompilerOptions, currentDirectory: string, libFileName: string): string {
    const containingDirectory = options.configFilePath ? getDirectoryPath(options.configFilePath) : currentDirectory;
    return combinePaths(containingDirectory, `__lib_node_modules_lookup_${libFileName}__.ts`);
}

/** @internal */
export function getLibraryNameFromLibFileName(libFileName: string): string {
    // Support resolving to lib.dom.d.ts -> @typescript/lib-dom, and
    //                      lib.dom.iterable.d.ts -> @typescript/lib-dom/iterable
    //                      lib.es2015.symbol.wellknown.d.ts -> @typescript/lib-es2015/symbol-wellknown
    const components = libFileName.split(".");
    let path = components[1];
    let i = 2;
    while (components[i] && components[i] !== "d") {
        path += (i === 2 ? "/" : "-") + components[i];
        i++;
    }
    return "@typescript/lib-" + path;
}

/** @internal */
export function isReferencedFile(reason: FileIncludeReason | undefined): reason is ReferencedFile {
    switch (reason?.kind) {
        case FileIncludeKind.Import:
        case FileIncludeKind.ReferenceFile:
        case FileIncludeKind.TypeReferenceDirective:
        case FileIncludeKind.LibReferenceDirective:
            return true;
        default:
            return false;
    }
}

/** @internal */
export interface ReferenceFileLocation {
    file: SourceFile;
    pos: number;
    end: number;
    packageId: PackageId | undefined;
}

/** @internal */
export interface SyntheticReferenceFileLocation {
    file: SourceFile;
    packageId: PackageId | undefined;
    text: string;
}

/** @internal */
export function isReferenceFileLocation(location: ReferenceFileLocation | SyntheticReferenceFileLocation): location is ReferenceFileLocation {
    return (location as ReferenceFileLocation).pos !== undefined;
}

/** @internal */
export function getReferencedFileLocation(program: Program, ref: ReferencedFile): ReferenceFileLocation | SyntheticReferenceFileLocation {
    const file = Debug.checkDefined(program.getSourceFileByPath(ref.file));
    const { kind, index } = ref;
    let pos: number | undefined, end: number | undefined, packageId: PackageId | undefined;
    switch (kind) {
        case FileIncludeKind.Import:
            const importLiteral = getModuleNameStringLiteralAt(file, index);
            packageId = program.getResolvedModuleFromModuleSpecifier(importLiteral, file)?.resolvedModule?.packageId;
            if (importLiteral.pos === -1) return { file, packageId, text: importLiteral.text };
            pos = skipTrivia(file.text, importLiteral.pos);
            end = importLiteral.end;
            break;
        case FileIncludeKind.ReferenceFile:
            ({ pos, end } = file.referencedFiles[index]);
            break;
        case FileIncludeKind.TypeReferenceDirective:
            ({ pos, end } = file.typeReferenceDirectives[index]);
            packageId = program.getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(file.typeReferenceDirectives[index], file)?.resolvedTypeReferenceDirective?.packageId;
            break;
        case FileIncludeKind.LibReferenceDirective:
            ({ pos, end } = file.libReferenceDirectives[index]);
            break;
        default:
            return Debug.assertNever(kind);
    }
    return { file, pos, end, packageId };
}

/**
 * Determines if program structure is upto date or needs to be recreated
 *
 * @internal
 */
export function isProgramUptoDate(
    program: Program | undefined,
    rootFileNames: string[],
    newOptions: CompilerOptions,
    getSourceVersion: (path: Path, fileName: string) => string | undefined,
    fileExists: (fileName: string) => boolean,
    hasInvalidatedResolutions: HasInvalidatedResolutions,
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions,
    hasChangedAutomaticTypeDirectiveNames: HasChangedAutomaticTypeDirectiveNames | undefined,
    getParsedCommandLine: (fileName: string) => ParsedCommandLine | undefined,
    projectReferences: readonly ProjectReference[] | undefined,
): boolean {
    // If we haven't created a program yet or have changed automatic type directives, then it is not up-to-date
    if (!program || hasChangedAutomaticTypeDirectiveNames?.()) return false;

    // If root file names don't match
    if (!arrayIsEqualTo(program.getRootFileNames(), rootFileNames)) return false;

    let seenResolvedRefs: ResolvedProjectReference[] | undefined;

    // If project references don't match
    if (!arrayIsEqualTo(program.getProjectReferences(), projectReferences, projectReferenceUptoDate)) return false;

    // If any file is not up-to-date, then the whole program is not up-to-date
    if (program.getSourceFiles().some(sourceFileNotUptoDate)) return false;

    // If any of the missing file paths are now created
    const missingPaths = program.getMissingFilePaths();
    if (missingPaths && forEachEntry(missingPaths, fileExists)) return false;

    const currentOptions = program.getCompilerOptions();
    // If the compilation settings do no match, then the program is not up-to-date
    if (!compareDataObjects(currentOptions, newOptions)) return false;

    // If library resolution is invalidated, then the program is not up-to-date
    if (program.resolvedLibReferences && forEachEntry(program.resolvedLibReferences, (_value, libFileName) => hasInvalidatedLibResolutions(libFileName))) return false;

    // If everything matches but the text of config file is changed,
    // error locations can change for program options, so update the program
    if (currentOptions.configFile && newOptions.configFile) return currentOptions.configFile.text === newOptions.configFile.text;

    return true;

    function sourceFileNotUptoDate(sourceFile: SourceFile) {
        return !sourceFileVersionUptoDate(sourceFile) ||
            hasInvalidatedResolutions(sourceFile.path);
    }

    function sourceFileVersionUptoDate(sourceFile: SourceFile) {
        return sourceFile.version === getSourceVersion(sourceFile.resolvedPath, sourceFile.fileName);
    }

    function projectReferenceUptoDate(oldRef: ProjectReference, newRef: ProjectReference, index: number) {
        return projectReferenceIsEqualTo(oldRef, newRef) &&
            resolvedProjectReferenceUptoDate(program!.getResolvedProjectReferences()![index], oldRef);
    }

    function resolvedProjectReferenceUptoDate(oldResolvedRef: ResolvedProjectReference | undefined, oldRef: ProjectReference): boolean {
        if (oldResolvedRef) {
            // Assume true
            if (contains(seenResolvedRefs, oldResolvedRef)) return true;

            const refPath = resolveProjectReferencePath(oldRef);
            const newParsedCommandLine = getParsedCommandLine(refPath);

            // Check if config file exists
            if (!newParsedCommandLine) return false;

            // If change in source file
            if (oldResolvedRef.commandLine.options.configFile !== newParsedCommandLine.options.configFile) return false;

            // check file names
            if (!arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newParsedCommandLine.fileNames)) return false;

            // Add to seen before checking the referenced paths of this config file
            (seenResolvedRefs || (seenResolvedRefs = [])).push(oldResolvedRef);

            // If child project references are upto date, this project reference is uptodate
            return !forEach(
                oldResolvedRef.references,
                (childResolvedRef, index) =>
                    !resolvedProjectReferenceUptoDate(
                        childResolvedRef,
                        oldResolvedRef.commandLine.projectReferences![index],
                    ),
            );
        }

        // In old program, not able to resolve project reference path,
        // so if config file doesnt exist, it is uptodate.
        const refPath = resolveProjectReferencePath(oldRef);
        return !getParsedCommandLine(refPath);
    }
}

export function getConfigFileParsingDiagnostics(configFileParseResult: ParsedCommandLine): readonly Diagnostic[] {
    return configFileParseResult.options.configFile ?
        [...configFileParseResult.options.configFile.parseDiagnostics, ...configFileParseResult.errors] :
        configFileParseResult.errors;
}

/**
 * A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
 * `options` parameter.
 *
 * @param fileName The file name to check the format of (it need not exist on disk)
 * @param [packageJsonInfoCache] A cache for package file lookups - it's best to have a cache when this function is called often
 * @param host The ModuleResolutionHost which can perform the filesystem lookups for package json data
 * @param options The compiler options to perform the analysis under - relevant options are `moduleResolution` and `traceResolution`
 * @returns `undefined` if the path has no relevant implied format, `ModuleKind.ESNext` for esm format, and `ModuleKind.CommonJS` for cjs format
 */
export function getImpliedNodeFormatForFile(fileName: string, packageJsonInfoCache: PackageJsonInfoCache | undefined, host: ModuleResolutionHost, options: CompilerOptions): ResolutionMode {
    const result = getImpliedNodeFormatForFileWorker(fileName, packageJsonInfoCache, host, options);
    return typeof result === "object" ? result.impliedNodeFormat : result;
}

/** @internal */
export function getImpliedNodeFormatForFileWorker(
    fileName: string,
    packageJsonInfoCache: PackageJsonInfoCache | undefined,
    host: ModuleResolutionHost,
    options: CompilerOptions,
): ResolutionMode | Partial<CreateSourceFileOptions> | undefined {
    const moduleResolution = getEmitModuleResolutionKind(options);
    const shouldLookupFromPackageJson = ModuleResolutionKind.Node16 <= moduleResolution && moduleResolution <= ModuleResolutionKind.NodeNext
        || pathContainsNodeModules(fileName);
    return fileExtensionIsOneOf(fileName, [Extension.Dmts, Extension.Mts, Extension.Mjs]) ? ModuleKind.ESNext :
        fileExtensionIsOneOf(fileName, [Extension.Dcts, Extension.Cts, Extension.Cjs]) ? ModuleKind.CommonJS :
        shouldLookupFromPackageJson && fileExtensionIsOneOf(fileName, [Extension.Dts, Extension.Ts, Extension.Tsx, Extension.Js, Extension.Jsx]) ? lookupFromPackageJson() :
        undefined; // other extensions, like `json` or `tsbuildinfo`, are set as `undefined` here but they should never be fed through the transformer pipeline

    function lookupFromPackageJson(): Partial<CreateSourceFileOptions> {
        const state = getTemporaryModuleResolutionState(packageJsonInfoCache, host, options);
        const packageJsonLocations: string[] = [];
        state.failedLookupLocations = packageJsonLocations;
        state.affectingLocations = packageJsonLocations;
        const packageJsonScope = getPackageScopeForPath(getDirectoryPath(fileName), state);
        const impliedNodeFormat = packageJsonScope?.contents.packageJsonContent.type === "module" ? ModuleKind.ESNext : ModuleKind.CommonJS;
        return { impliedNodeFormat, packageJsonLocations, packageJsonScope };
    }
}

const plainJSErrors = new Set<number>([
    // binder errors
    Diagnostics.Cannot_redeclare_block_scoped_variable_0.code,
    Diagnostics.A_module_cannot_have_multiple_default_exports.code,
    Diagnostics.Another_export_default_is_here.code,
    Diagnostics.The_first_export_default_is_here.code,
    Diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module.code,
    Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode.code,
    Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here.code,
    Diagnostics.constructor_is_a_reserved_word.code,
    Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode.code,
    Diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode.code,
    Diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode.code,
    Diagnostics.Invalid_use_of_0_in_strict_mode.code,
    Diagnostics.A_label_is_not_allowed_here.code,
    Diagnostics.with_statements_are_not_allowed_in_strict_mode.code,
    // grammar errors
    Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement.code,
    Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement.code,
    Diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name.code,
    Diagnostics.A_class_member_cannot_have_the_0_keyword.code,
    Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name.code,
    Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement.code,
    Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement.code,
    Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement.code,
    Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement.code,
    Diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration.code,
    Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context.code,
    Diagnostics.A_destructuring_declaration_must_have_an_initializer.code,
    Diagnostics.A_get_accessor_cannot_have_parameters.code,
    Diagnostics.A_rest_element_cannot_contain_a_binding_pattern.code,
    Diagnostics.A_rest_element_cannot_have_a_property_name.code,
    Diagnostics.A_rest_element_cannot_have_an_initializer.code,
    Diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern.code,
    Diagnostics.A_rest_parameter_cannot_have_an_initializer.code,
    Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list.code,
    Diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma.code,
    Diagnostics.A_return_statement_cannot_be_used_inside_a_class_static_block.code,
    Diagnostics.A_set_accessor_cannot_have_rest_parameter.code,
    Diagnostics.A_set_accessor_must_have_exactly_one_parameter.code,
    Diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module.code,
    Diagnostics.An_export_declaration_cannot_have_modifiers.code,
    Diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module.code,
    Diagnostics.An_import_declaration_cannot_have_modifiers.code,
    Diagnostics.An_object_member_cannot_be_declared_optional.code,
    Diagnostics.Argument_of_dynamic_import_cannot_be_spread_element.code,
    Diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable.code,
    Diagnostics.Cannot_redeclare_identifier_0_in_catch_clause.code,
    Diagnostics.Catch_clause_variable_cannot_have_an_initializer.code,
    Diagnostics.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator.code,
    Diagnostics.Classes_can_only_extend_a_single_class.code,
    Diagnostics.Classes_may_not_have_a_field_named_constructor.code,
    Diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.code,
    Diagnostics.Duplicate_label_0.code,
    Diagnostics.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_set_of_attributes_as_arguments.code,
    Diagnostics.for_await_loops_cannot_be_used_inside_a_class_static_block.code,
    Diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression.code,
    Diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name.code,
    Diagnostics.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array.code,
    Diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names.code,
    Diagnostics.Jump_target_cannot_cross_function_boundary.code,
    Diagnostics.Line_terminator_not_permitted_before_arrow.code,
    Diagnostics.Modifiers_cannot_appear_here.code,
    Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement.code,
    Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement.code,
    Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies.code,
    Diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression.code,
    Diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier.code,
    Diagnostics.Tagged_template_expressions_are_not_permitted_in_an_optional_chain.code,
    Diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async.code,
    Diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer.code,
    Diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer.code,
    Diagnostics.Trailing_comma_not_allowed.code,
    Diagnostics.Variable_declaration_list_cannot_be_empty.code,
    Diagnostics._0_and_1_operations_cannot_be_mixed_without_parentheses.code,
    Diagnostics._0_expected.code,
    Diagnostics._0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2.code,
    Diagnostics._0_list_cannot_be_empty.code,
    Diagnostics._0_modifier_already_seen.code,
    Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration.code,
    Diagnostics._0_modifier_cannot_appear_on_a_module_or_namespace_element.code,
    Diagnostics._0_modifier_cannot_appear_on_a_parameter.code,
    Diagnostics._0_modifier_cannot_appear_on_class_elements_of_this_kind.code,
    Diagnostics._0_modifier_cannot_be_used_here.code,
    Diagnostics._0_modifier_must_precede_1_modifier.code,
    Diagnostics._0_declarations_can_only_be_declared_inside_a_block.code,
    Diagnostics._0_declarations_must_be_initialized.code,
    Diagnostics.extends_clause_already_seen.code,
    Diagnostics.let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations.code,
    Diagnostics.Class_constructor_may_not_be_a_generator.code,
    Diagnostics.Class_constructor_may_not_be_an_accessor.code,
    Diagnostics.await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.code,
    Diagnostics.await_using_statements_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.code,
    Diagnostics.Private_field_0_must_be_declared_in_an_enclosing_class.code,
    // Type errors
    Diagnostics.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value.code,
]);

/**
 * Determine if source file needs to be re-created even if its text hasn't changed
 */
function shouldProgramCreateNewSourceFiles(program: Program | undefined, newOptions: CompilerOptions): boolean {
    if (!program) return false;
    // If any compiler options change, we can't reuse old source file even if version match
    // The change in options like these could result in change in syntax tree or `sourceFile.bindDiagnostics`.
    return optionsHaveChanges(program.getCompilerOptions(), newOptions, sourceFileAffectingCompilerOptions);
}

function createCreateProgramOptions(rootNames: readonly string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program, configFileParsingDiagnostics?: readonly Diagnostic[], typeScriptVersion?: string): CreateProgramOptions {
    return {
        rootNames,
        options,
        host,
        oldProgram,
        configFileParsingDiagnostics,
        typeScriptVersion,
    };
}

/**
 * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
 * that represent a compilation unit.
 *
 * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
 * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
 *
 * @param createProgramOptions - The options for creating a program.
 * @returns A 'Program' object.
 */
export function createProgram(createProgramOptions: CreateProgramOptions): Program;
/**
 * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
 * that represent a compilation unit.
 *
 * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
 * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
 *
 * @param rootNames - A set of root files.
 * @param options - The compiler options which should be used.
 * @param host - The host interacts with the underlying file system.
 * @param oldProgram - Reuses an old program structure.
 * @param configFileParsingDiagnostics - error during config file parsing
 * @returns A 'Program' object.
 */
export function createProgram(rootNames: readonly string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program, configFileParsingDiagnostics?: readonly Diagnostic[]): Program;
export function createProgram(_rootNamesOrOptions: readonly string[] | CreateProgramOptions, _options?: CompilerOptions, _host?: CompilerHost, _oldProgram?: Program, _configFileParsingDiagnostics?: readonly Diagnostic[]): Program {
    let _createProgramOptions = isArray(_rootNamesOrOptions) ? createCreateProgramOptions(_rootNamesOrOptions, _options!, _host, _oldProgram, _configFileParsingDiagnostics) : _rootNamesOrOptions; // TODO: GH#18217
    const { rootNames, options, configFileParsingDiagnostics, projectReferences, typeScriptVersion, host: createProgramOptionsHost } = _createProgramOptions;
    let { oldProgram } = _createProgramOptions;
    // Stop referencing these objects to ensure GC collects them.
    _createProgramOptions = undefined!;
    _rootNamesOrOptions = undefined!;

    for (const option of commandLineOptionOfCustomType) {
        if (hasProperty(options, option.name)) {
            if (typeof options[option.name] === "string") {
                throw new Error(`${option.name} is a string value; tsconfig JSON must be parsed with parseJsonSourceFileConfigFileContent or getParsedCommandLineOfConfigFile before passing to createProgram`);
            }
        }
    }

    const reportInvalidIgnoreDeprecations = memoize(() => createOptionValueDiagnostic("ignoreDeprecations", Diagnostics.Invalid_value_for_ignoreDeprecations));

    let processingDefaultLibFiles: SourceFile[] | undefined;
    let processingOtherFiles: SourceFile[] | undefined;
    let files: SourceFile[];
    let symlinks: SymlinkCache | undefined;
    let typeChecker: TypeChecker;
    let classifiableNames: Set<__String>;
    let filesWithReferencesProcessed: Set<Path> | undefined;
    let cachedBindAndCheckDiagnosticsForFile: Map<Path, readonly Diagnostic[]> | undefined;
    let cachedDeclarationDiagnosticsForFile: Map<Path, readonly DiagnosticWithLocation[]> | undefined;
    const programDiagnostics = createProgramDiagnostics(getCompilerOptionsObjectLiteralSyntax);

    let automaticTypeDirectiveNames: string[] | undefined;
    let automaticTypeDirectiveResolutions: ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;

    let resolvedLibReferences: Map<string, LibResolution> | undefined;
    let resolvedLibProcessing: Map<string, LibResolution> | undefined;

    let resolvedModules: Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>> | undefined;
    let resolvedModulesProcessing: Map<Path, readonly ResolvedModuleWithFailedLookupLocations[]> | undefined;
    let resolvedTypeReferenceDirectiveNames: Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>> | undefined;
    let resolvedTypeReferenceDirectiveNamesProcessing: Map<Path, readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[]> | undefined;

    let packageMap: Map<string, boolean> | undefined;

    // The below settings are to track if a .js file should be add to the program if loaded via searching under node_modules.
    // This works as imported modules are discovered recursively in a depth first manner, specifically:
    // - For each root file, findSourceFile is called.
    // - This calls processImportedModules for each module imported in the source file.
    // - This calls resolveModuleNames, and then calls findSourceFile for each resolved module.
    // As all these operations happen - and are nested - within the createProgram call, they close over the below variables.
    // The current resolution depth is tracked by incrementing/decrementing as the depth first search progresses.
    const maxNodeModuleJsDepth = typeof options.maxNodeModuleJsDepth === "number" ? options.maxNodeModuleJsDepth : 0;
    let currentNodeModulesDepth = 0;

    // If a module has some of its imports skipped due to being at the depth limit under node_modules, then track
    // this, as it may be imported at a shallower depth later, and then it will need its skipped imports processed.
    const modulesWithElidedImports = new Map<string, boolean>();

    // Track source files that are source files found by searching under node_modules, as these shouldn't be compiled.
    const sourceFilesFoundSearchingNodeModules = new Map<string, boolean>();

    tracing?.push(tracing.Phase.Program, "createProgram", { configFilePath: options.configFilePath, rootDir: options.rootDir }, /*separateBeginAndEnd*/ true);
    performance.mark("beforeProgram");

    const host = createProgramOptionsHost || createCompilerHost(options);
    const configParsingHost = parseConfigHostFromCompilerHostLike(host);

    let skipDefaultLib = options.noLib;
    const getDefaultLibraryFileName = memoize(() => host.getDefaultLibFileName(options));
    const defaultLibraryPath = host.getDefaultLibLocation ? host.getDefaultLibLocation() : getDirectoryPath(getDefaultLibraryFileName());

    let skipVerifyCompilerOptions = false;
    const currentDirectory = host.getCurrentDirectory();
    const supportedExtensions = getSupportedExtensions(options);
    const supportedExtensionsWithJsonIfResolveJsonModule = getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);

    // Map storing if there is emit blocking diagnostics for given input
    const hasEmitBlockingDiagnostics = new Map<string, boolean>();
    let _compilerOptionsObjectLiteralSyntax: ObjectLiteralExpression | false | undefined;
    let _compilerOptionsPropertySyntax: PropertyAssignment | false | undefined;

    let moduleResolutionCache: ModuleResolutionCache | undefined;
    let actualResolveModuleNamesWorker: (
        moduleNames: readonly StringLiteralLike[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteralLike[] | undefined,
    ) => readonly ResolvedModuleWithFailedLookupLocations[];
    const hasInvalidatedResolutions = host.hasInvalidatedResolutions || returnFalse;
    if (host.resolveModuleNameLiterals) {
        actualResolveModuleNamesWorker = host.resolveModuleNameLiterals.bind(host);
        moduleResolutionCache = host.getModuleResolutionCache?.();
    }
    else if (host.resolveModuleNames) {
        actualResolveModuleNamesWorker = (moduleNames, containingFile, redirectedReference, options, containingSourceFile, reusedNames) =>
            host.resolveModuleNames!(
                moduleNames.map(getModuleResolutionName),
                containingFile,
                reusedNames?.map(getModuleResolutionName),
                redirectedReference,
                options,
                containingSourceFile,
            ).map(resolved =>
                resolved ?
                    ((resolved as ResolvedModuleFull).extension !== undefined) ?
                        { resolvedModule: resolved as ResolvedModuleFull } :
                        // An older host may have omitted extension, in which case we should infer it from the file extension of resolvedFileName.
                        { resolvedModule: { ...resolved, extension: extensionFromPath(resolved.resolvedFileName) } } :
                    emptyResolution
            );
        moduleResolutionCache = host.getModuleResolutionCache?.();
    }
    else {
        moduleResolutionCache = createModuleResolutionCache(currentDirectory, getCanonicalFileName, options);
        actualResolveModuleNamesWorker = (moduleNames, containingFile, redirectedReference, options, containingSourceFile) =>
            loadWithModeAwareCache(
                moduleNames,
                containingFile,
                redirectedReference,
                options,
                containingSourceFile,
                host,
                moduleResolutionCache,
                createModuleResolutionLoader,
            );
    }

    let actualResolveTypeReferenceDirectiveNamesWorker: <T extends FileReference | string>(
        typeDirectiveNames: readonly T[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile | undefined,
        reusedNames: readonly T[] | undefined,
    ) => readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    if (host.resolveTypeReferenceDirectiveReferences) {
        actualResolveTypeReferenceDirectiveNamesWorker = host.resolveTypeReferenceDirectiveReferences.bind(host);
    }
    else if (host.resolveTypeReferenceDirectives) {
        actualResolveTypeReferenceDirectiveNamesWorker = (typeDirectiveNames, containingFile, redirectedReference, options, containingSourceFile) =>
            host.resolveTypeReferenceDirectives!(
                typeDirectiveNames.map(getTypeReferenceResolutionName),
                containingFile,
                redirectedReference,
                options,
                containingSourceFile?.impliedNodeFormat,
            ).map(resolvedTypeReferenceDirective => ({ resolvedTypeReferenceDirective }));
    }
    else {
        const typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
            currentDirectory,
            getCanonicalFileName,
            /*options*/ undefined,
            moduleResolutionCache?.getPackageJsonInfoCache(),
            moduleResolutionCache?.optionsToRedirectsKey,
        );
        actualResolveTypeReferenceDirectiveNamesWorker = (typeDirectiveNames, containingFile, redirectedReference, options, containingSourceFile) =>
            loadWithModeAwareCache(
                typeDirectiveNames,
                containingFile,
                redirectedReference,
                options,
                containingSourceFile,
                host,
                typeReferenceDirectiveResolutionCache,
                createTypeReferenceResolutionLoader,
            );
    }

    const hasInvalidatedLibResolutions = host.hasInvalidatedLibResolutions || returnFalse;
    let actualResolveLibrary: (libraryName: string, resolveFrom: string, options: CompilerOptions, libFileName: string) => ResolvedModuleWithFailedLookupLocations;
    if (host.resolveLibrary) {
        actualResolveLibrary = host.resolveLibrary.bind(host);
    }
    else {
        const libraryResolutionCache = createModuleResolutionCache(currentDirectory, getCanonicalFileName, options, moduleResolutionCache?.getPackageJsonInfoCache());
        actualResolveLibrary = (libraryName, resolveFrom, options) => resolveLibrary(libraryName, resolveFrom, options, host, libraryResolutionCache);
    }

    // Map from a stringified PackageId to the source file with that id.
    // Only one source file may have a given packageId. Others become redirects (see createRedirectSourceFile).
    // `packageIdToSourceFile` is only used while building the program, while `sourceFileToPackageName` and `isSourceFileTargetOfRedirect` are kept around.
    const packageIdToSourceFile = new Map<string, SourceFile>();
    // Maps from a SourceFile's `.path` to the name of the package it was imported with.
    let sourceFileToPackageName = new Map<Path, string>();
    // Key is a file name. Value is the (non-empty, or undefined) list of files that redirect to it.
    let redirectTargetsMap = createMultiMap<Path, string>();
    let usesUriStyleNodeCoreModules: boolean | undefined;

    /**
     * map with
     * - SourceFile if present
     * - false if sourceFile missing for source of project reference redirect
     * - undefined otherwise
     */
    const filesByName = new Map<Path, SourceFile | false | undefined>();
    let missingFileNames = new Map<Path, string>();
    // stores 'filename -> file association' ignoring case
    // used to track cases when two file names differ only in casing
    const filesByNameIgnoreCase = host.useCaseSensitiveFileNames() ? new Map<string, SourceFile>() : undefined;

    // A parallel array to projectReferences storing the results of reading in the referenced tsconfig files
    let resolvedProjectReferences: readonly (ResolvedProjectReference | undefined)[] | undefined;
    let projectReferenceRedirects: Map<Path, ResolvedProjectReference | false> | undefined;

    let mapSourceFileToResolvedRef: Map<Path, ResolvedRefAndOutputDts> | undefined;
    let mapOutputFileToResolvedRef: Map<Path, ResolvedRefAndSource> | undefined;

    const useSourceOfProjectReferenceRedirect = !!host.useSourceOfProjectReferenceRedirect?.() &&
        !options.disableSourceOfProjectReferenceRedirect;
    const { onProgramCreateComplete, fileExists, directoryExists } = updateHostForUseSourceOfProjectReferenceRedirect({
        compilerHost: host,
        getSymlinkCache,
        useSourceOfProjectReferenceRedirect,
        toPath,
        getResolvedProjectReferences,
        getRedirectFromOutput,
        forEachResolvedProjectReference,
    });
    const readFile = host.readFile.bind(host) as typeof host.readFile;

    tracing?.push(tracing.Phase.Program, "shouldProgramCreateNewSourceFiles", { hasOldProgram: !!oldProgram });
    const shouldCreateNewSourceFile = shouldProgramCreateNewSourceFiles(oldProgram, options);
    tracing?.pop();
    // We set `structuralIsReused` to `undefined` because `tryReuseStructureFromOldProgram` calls `tryReuseStructureFromOldProgram` which checks
    // `structuralIsReused`, which would be a TDZ violation if it was not set in advance to `undefined`.
    let structureIsReused: StructureIsReused;
    tracing?.push(tracing.Phase.Program, "tryReuseStructureFromOldProgram", {});
    structureIsReused = tryReuseStructureFromOldProgram();
    tracing?.pop();
    if (structureIsReused !== StructureIsReused.Completely) {
        processingDefaultLibFiles = [];
        processingOtherFiles = [];

        if (projectReferences) {
            if (!resolvedProjectReferences) {
                resolvedProjectReferences = projectReferences.map(parseProjectReferenceConfigFile);
            }
            if (rootNames.length) {
                resolvedProjectReferences?.forEach((parsedRef, index) => {
                    if (!parsedRef) return;
                    const out = parsedRef.commandLine.options.outFile;
                    if (useSourceOfProjectReferenceRedirect) {
                        if (out || getEmitModuleKind(parsedRef.commandLine.options) === ModuleKind.None) {
                            for (const fileName of parsedRef.commandLine.fileNames) {
                                processProjectReferenceFile(fileName, { kind: FileIncludeKind.SourceFromProjectReference, index });
                            }
                        }
                    }
                    else {
                        if (out) {
                            processProjectReferenceFile(changeExtension(out, ".d.ts"), { kind: FileIncludeKind.OutputFromProjectReference, index });
                        }
                        else if (getEmitModuleKind(parsedRef.commandLine.options) === ModuleKind.None) {
                            const getCommonSourceDirectory = memoize(() => getCommonSourceDirectoryOfConfig(parsedRef.commandLine, !host.useCaseSensitiveFileNames()));
                            for (const fileName of parsedRef.commandLine.fileNames) {
                                if (!isDeclarationFileName(fileName) && !fileExtensionIs(fileName, Extension.Json)) {
                                    processProjectReferenceFile(getOutputDeclarationFileName(fileName, parsedRef.commandLine, !host.useCaseSensitiveFileNames(), getCommonSourceDirectory), { kind: FileIncludeKind.OutputFromProjectReference, index });
                                }
                            }
                        }
                    }
                });
            }
        }

        tracing?.push(tracing.Phase.Program, "processRootFiles", { count: rootNames.length });
        forEach(rootNames, (name, index) => processRootFile(name, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.RootFile, index }));
        tracing?.pop();

        // load type declarations specified via 'types' argument or implicitly from types/ and node_modules/@types folders
        automaticTypeDirectiveNames ??= rootNames.length ? getAutomaticTypeDirectiveNames(options, host) : emptyArray;
        automaticTypeDirectiveResolutions = createModeAwareCache();
        if (automaticTypeDirectiveNames.length) {
            tracing?.push(tracing.Phase.Program, "processTypeReferences", { count: automaticTypeDirectiveNames.length });
            // This containingFilename needs to match with the one used in managed-side
            const containingDirectory = options.configFilePath ? getDirectoryPath(options.configFilePath) : currentDirectory;
            const containingFilename = combinePaths(containingDirectory, inferredTypesContainingFile);
            const resolutions = resolveTypeReferenceDirectiveNamesReusingOldState(automaticTypeDirectiveNames, containingFilename);
            for (let i = 0; i < automaticTypeDirectiveNames.length; i++) {
                // under node16/nodenext module resolution, load `types`/ata include names as cjs resolution results by passing an `undefined` mode
                automaticTypeDirectiveResolutions.set(automaticTypeDirectiveNames[i], /*mode*/ undefined, resolutions[i]);
                processTypeReferenceDirective(
                    automaticTypeDirectiveNames[i],
                    /*mode*/ undefined,
                    resolutions[i],
                    {
                        kind: FileIncludeKind.AutomaticTypeDirectiveFile,
                        typeReference: automaticTypeDirectiveNames[i],
                        packageId: resolutions[i]?.resolvedTypeReferenceDirective?.packageId,
                    },
                );
            }
            tracing?.pop();
        }

        // Do not process the default library if:
        //  - The '--noLib' flag is used.
        //  - A 'no-default-lib' reference comment is encountered in
        //      processing the root files.
        if (rootNames.length && !skipDefaultLib) {
            // If '--lib' is not specified, include default library file according to '--target'
            // otherwise, using options specified in '--lib' instead of '--target' default library file
            const defaultLibraryFileName = getDefaultLibraryFileName();
            if (!options.lib && defaultLibraryFileName) {
                processRootFile(defaultLibraryFileName, /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.LibFile });
            }
            else {
                forEach(options.lib, (libFileName, index) => {
                    processRootFile(pathForLibFile(libFileName), /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.LibFile, index });
                });
            }
        }

        files = toSorted(processingDefaultLibFiles, compareDefaultLibFiles).concat(processingOtherFiles);
        processingDefaultLibFiles = undefined;
        processingOtherFiles = undefined;
        filesWithReferencesProcessed = undefined;
    }

    // Release any files we have acquired in the old program but are
    // not part of the new program.
    if (oldProgram && host.onReleaseOldSourceFile) {
        const oldSourceFiles = oldProgram.getSourceFiles();
        for (const oldSourceFile of oldSourceFiles) {
            const newFile = getSourceFileByPath(oldSourceFile.resolvedPath);
            if (
                shouldCreateNewSourceFile || !newFile || newFile.impliedNodeFormat !== oldSourceFile.impliedNodeFormat ||
                // old file wasn't redirect but new file is
                (oldSourceFile.resolvedPath === oldSourceFile.path && newFile.resolvedPath !== oldSourceFile.path)
            ) {
                host.onReleaseOldSourceFile(oldSourceFile, oldProgram.getCompilerOptions(), !!getSourceFileByPath(oldSourceFile.path), newFile);
            }
        }
        if (!host.getParsedCommandLine) {
            oldProgram.forEachResolvedProjectReference(resolvedProjectReference => {
                if (!getResolvedProjectReferenceByPath(resolvedProjectReference.sourceFile.path)) {
                    host.onReleaseOldSourceFile!(resolvedProjectReference.sourceFile, oldProgram!.getCompilerOptions(), /*hasSourceFileByPath*/ false, /*newSourceFileByResolvedPath*/ undefined);
                }
            });
        }
    }

    // Release commandlines that new program does not use
    if (oldProgram && host.onReleaseParsedCommandLine) {
        forEachProjectReference(
            oldProgram.getProjectReferences(),
            oldProgram.getResolvedProjectReferences(),
            (oldResolvedRef, parent, index) => {
                const oldReference = parent?.commandLine.projectReferences![index] || oldProgram!.getProjectReferences()![index];
                const oldRefPath = resolveProjectReferencePath(oldReference);
                if (!projectReferenceRedirects?.has(toPath(oldRefPath))) {
                    host.onReleaseParsedCommandLine!(oldRefPath, oldResolvedRef, oldProgram!.getCompilerOptions());
                }
            },
        );
    }

    // unconditionally set oldProgram to undefined to prevent it from being captured in closure
    oldProgram = undefined;
    resolvedLibProcessing = undefined;
    resolvedModulesProcessing = undefined;
    resolvedTypeReferenceDirectiveNamesProcessing = undefined;

    const program: Program = {
        getRootFileNames: () => rootNames,
        getSourceFile,
        getSourceFileByPath,
        getSourceFiles: () => files,
        getMissingFilePaths: () => missingFileNames,
        getModuleResolutionCache: () => moduleResolutionCache,
        getFilesByNameMap: () => filesByName,
        getCompilerOptions: () => options,
        getSyntacticDiagnostics,
        getOptionsDiagnostics,
        getGlobalDiagnostics,
        getSemanticDiagnostics,
        getCachedSemanticDiagnostics,
        getSuggestionDiagnostics,
        getDeclarationDiagnostics,
        getBindAndCheckDiagnostics,
        getProgramDiagnostics,
        getTypeChecker,
        getClassifiableNames,
        getCommonSourceDirectory,
        emit,
        getCurrentDirectory: () => currentDirectory,
        getNodeCount: () => getTypeChecker().getNodeCount(),
        getIdentifierCount: () => getTypeChecker().getIdentifierCount(),
        getSymbolCount: () => getTypeChecker().getSymbolCount(),
        getTypeCount: () => getTypeChecker().getTypeCount(),
        getInstantiationCount: () => getTypeChecker().getInstantiationCount(),
        getRelationCacheSizes: () => getTypeChecker().getRelationCacheSizes(),
        getFileProcessingDiagnostics: () => programDiagnostics.getFileProcessingDiagnostics(),
        getAutomaticTypeDirectiveNames: () => automaticTypeDirectiveNames!,
        getAutomaticTypeDirectiveResolutions: () => automaticTypeDirectiveResolutions,
        isSourceFileFromExternalLibrary,
        isSourceFileDefaultLibrary,
        getModeForUsageLocation,
        getEmitSyntaxForUsageLocation,
        getModeForResolutionAtIndex,
        getSourceFileFromReference,
        getLibFileFromReference,
        sourceFileToPackageName,
        redirectTargetsMap,
        usesUriStyleNodeCoreModules,
        resolvedModules,
        resolvedTypeReferenceDirectiveNames,
        resolvedLibReferences,
        getProgramDiagnosticsContainer: () => programDiagnostics,
        getResolvedModule,
        getResolvedModuleFromModuleSpecifier,
        getResolvedTypeReferenceDirective,
        getResolvedTypeReferenceDirectiveFromTypeReferenceDirective,
        forEachResolvedModule,
        forEachResolvedTypeReferenceDirective,
        getCurrentPackagesMap: () => packageMap,
        typesPackageExists,
        packageBundlesTypes,
        isEmittedFile,
        getConfigFileParsingDiagnostics,
        getProjectReferences,
        getResolvedProjectReferences,
        getRedirectFromSourceFile,
        getResolvedProjectReferenceByPath,
        forEachResolvedProjectReference,
        isSourceOfProjectReferenceRedirect,
        getRedirectFromOutput,
        getCompilerOptionsForFile,
        getDefaultResolutionModeForFile,
        getEmitModuleFormatOfFile,
        getImpliedNodeFormatForEmit,
        shouldTransformImportCall,
        emitBuildInfo,
        fileExists,
        readFile,
        directoryExists,
        getSymlinkCache,
        realpath: host.realpath?.bind(host),
        useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
        getCanonicalFileName,
        getFileIncludeReasons: () => programDiagnostics.getFileReasons(),
        structureIsReused,
        writeFile,
        getGlobalTypingsCacheLocation: maybeBind(host, host.getGlobalTypingsCacheLocation),
    };

    onProgramCreateComplete();

    if (!skipVerifyCompilerOptions) {
        verifyCompilerOptions();
    }
    performance.mark("afterProgram");
    performance.measure("Program", "beforeProgram", "afterProgram");
    tracing?.pop();

    return program;

    function getResolvedModule(file: SourceFile, moduleName: string, mode: ResolutionMode) {
        return resolvedModules?.get(file.path)?.get(moduleName, mode);
    }

    function getResolvedModuleFromModuleSpecifier(moduleSpecifier: StringLiteralLike, sourceFile?: SourceFile): ResolvedModuleWithFailedLookupLocations | undefined {
        sourceFile ??= getSourceFileOfNode(moduleSpecifier);
        Debug.assertIsDefined(sourceFile, "`moduleSpecifier` must have a `SourceFile` ancestor. Use `program.getResolvedModule` instead to provide the containing file and resolution mode.");
        return getResolvedModule(sourceFile, moduleSpecifier.text, getModeForUsageLocation(sourceFile, moduleSpecifier));
    }

    function getResolvedTypeReferenceDirective(file: SourceFile, typeDirectiveName: string, mode: ResolutionMode) {
        return resolvedTypeReferenceDirectiveNames?.get(file.path)?.get(typeDirectiveName, mode);
    }

    function getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeRef: FileReference, sourceFile: SourceFile) {
        return getResolvedTypeReferenceDirective(
            sourceFile,
            typeRef.fileName,
            getModeForTypeReferenceDirectiveInFile(typeRef, sourceFile),
        );
    }

    function forEachResolvedModule(
        callback: (resolution: ResolvedModuleWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        file?: SourceFile,
    ) {
        forEachResolution(resolvedModules, callback, file);
    }

    function forEachResolvedTypeReferenceDirective(
        callback: (resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        file?: SourceFile,
    ): void {
        forEachResolution(resolvedTypeReferenceDirectiveNames, callback, file);
    }

    function forEachResolution<T>(
        resolutionCache: Map<Path, ModeAwareCache<T>> | undefined,
        callback: (resolution: T, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        file: SourceFile | undefined,
    ) {
        if (file) resolutionCache?.get(file.path)?.forEach((resolution, name, mode) => callback(resolution, name, mode, file.path));
        else resolutionCache?.forEach((resolutions, filePath) => resolutions.forEach((resolution, name, mode) => callback(resolution, name, mode, filePath)));
    }

    function getPackagesMap() {
        if (packageMap) return packageMap;
        packageMap = new Map();
        // A package name maps to true when we detect it has .d.ts files.
        // This is useful as an approximation of whether a package bundles its own types.
        // Note: we only look at files already found by module resolution,
        // so there may be files we did not consider.
        forEachResolvedModule(({ resolvedModule }) => {
            if (resolvedModule?.packageId) packageMap!.set(resolvedModule.packageId.name, resolvedModule.extension === Extension.Dts || !!packageMap!.get(resolvedModule.packageId.name));
        });
        return packageMap;
    }

    function typesPackageExists(packageName: string): boolean {
        return getPackagesMap().has(getTypesPackageName(packageName));
    }
    function packageBundlesTypes(packageName: string): boolean {
        return !!getPackagesMap().get(packageName);
    }

    function addResolutionDiagnostics(resolution: ResolvedModuleWithFailedLookupLocations | ResolvedTypeReferenceDirectiveWithFailedLookupLocations) {
        if (!resolution.resolutionDiagnostics?.length) return;
        programDiagnostics.addFileProcessingDiagnostic({
            kind: FilePreprocessingDiagnosticsKind.ResolutionDiagnostics,
            diagnostics: resolution.resolutionDiagnostics,
        });
    }

    function addResolutionDiagnosticsFromResolutionOrCache(containingFile: SourceFile, name: string, resolution: ResolvedModuleWithFailedLookupLocations, mode: ResolutionMode) {
        // diagnostics directly from the resolution
        if (host.resolveModuleNameLiterals || !host.resolveModuleNames) return addResolutionDiagnostics(resolution);
        if (!moduleResolutionCache || isExternalModuleNameRelative(name)) return;
        const containingFileName = getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
        const containingDir = getDirectoryPath(containingFileName);
        const redirectedReference = getRedirectReferenceForResolution(containingFile);
        // only nonrelative names hit the cache, and, at least as of right now, only nonrelative names can issue diagnostics
        // (Since diagnostics are only issued via import or export map lookup)
        // This may totally change if/when the issue of output paths not mapping to input files is fixed in a broader context
        // When it is, how we extract diagnostics from the module name resolver will have the be refined - the current cache
        // APIs wrapping the underlying resolver make it almost impossible to smuggle the diagnostics out in a generalized way
        const fromCache = moduleResolutionCache.getFromNonRelativeNameCache(name, mode, containingDir, redirectedReference);
        if (fromCache) addResolutionDiagnostics(fromCache);
    }

    function resolveModuleNamesWorker(
        moduleNames: readonly StringLiteralLike[],
        containingFile: SourceFile,
        reusedNames: readonly StringLiteralLike[] | undefined,
    ): readonly ResolvedModuleWithFailedLookupLocations[] {
        const containingFileName = getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
        const redirectedReference = getRedirectReferenceForResolution(containingFile);
        tracing?.push(tracing.Phase.Program, "resolveModuleNamesWorker", { containingFileName });
        performance.mark("beforeResolveModule");
        const result = actualResolveModuleNamesWorker(
            moduleNames,
            containingFileName,
            redirectedReference,
            options,
            containingFile,
            reusedNames,
        );
        performance.mark("afterResolveModule");
        performance.measure("ResolveModule", "beforeResolveModule", "afterResolveModule");
        tracing?.pop();
        return result;
    }

    function resolveTypeReferenceDirectiveNamesWorker<T extends FileReference | string>(
        typeDirectiveNames: readonly T[],
        containingFile: string | SourceFile,
        reusedNames: readonly T[] | undefined,
    ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[] {
        const containingSourceFile = !isString(containingFile) ? containingFile : undefined;
        const containingFileName = !isString(containingFile) ? getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory) : containingFile;
        const redirectedReference = containingSourceFile && getRedirectReferenceForResolution(containingSourceFile);
        tracing?.push(tracing.Phase.Program, "resolveTypeReferenceDirectiveNamesWorker", { containingFileName });
        performance.mark("beforeResolveTypeReference");
        const result = actualResolveTypeReferenceDirectiveNamesWorker(
            typeDirectiveNames,
            containingFileName,
            redirectedReference,
            options,
            containingSourceFile,
            reusedNames,
        );
        performance.mark("afterResolveTypeReference");
        performance.measure("ResolveTypeReference", "beforeResolveTypeReference", "afterResolveTypeReference");
        tracing?.pop();
        return result;
    }

    function getRedirectReferenceForResolution(file: SourceFile) {
        const redirect = getRedirectFromSourceFile(file.originalFileName);
        if (redirect || !isDeclarationFileName(file.originalFileName)) return redirect?.resolvedRef;

        // The originalFileName could not be actual source file name if file found was d.ts from referecned project
        // So in this case try to look up if this is output from referenced project, if it is use the redirected project in that case
        const resultFromDts = getRedirectFromOutput(file.path)?.resolvedRef;
        if (resultFromDts) return resultFromDts;

        // If preserveSymlinks is true, module resolution wont jump the symlink
        // but the resolved real path may be the .d.ts from project reference
        // Note:: Currently we try the real path only if the
        // file is from node_modules to avoid having to run real path on all file paths
        if (!host.realpath || !options.preserveSymlinks || !file.originalFileName.includes(nodeModulesPathPart)) return undefined;
        const realDeclarationPath = toPath(host.realpath(file.originalFileName));
        return realDeclarationPath === file.path ? undefined : getRedirectFromOutput(realDeclarationPath)?.resolvedRef;
    }

    function compareDefaultLibFiles(a: SourceFile, b: SourceFile) {
        return compareValues(getDefaultLibFilePriority(a), getDefaultLibFilePriority(b));
    }

    function getDefaultLibFilePriority(a: SourceFile) {
        if (containsPath(defaultLibraryPath, a.fileName, /*ignoreCase*/ false)) {
            const basename = getBaseFileName(a.fileName);
            if (basename === "lib.d.ts" || basename === "lib.es6.d.ts") return 0;
            const name = removeSuffix(removePrefix(basename, "lib."), ".d.ts");
            const index = libs.indexOf(name);
            if (index !== -1) return index + 1;
        }
        return libs.length + 2;
    }

    function toPath(fileName: string): Path {
        return ts_toPath(fileName, currentDirectory, getCanonicalFileName);
    }

    function getCommonSourceDirectory() {
        let commonSourceDirectory = programDiagnostics.getCommonSourceDirectory();
        if (commonSourceDirectory !== undefined) {
            return commonSourceDirectory;
        }
        const emittedFiles = filter(files, file => sourceFileMayBeEmitted(file, program));
        commonSourceDirectory = ts_getCommonSourceDirectory(
            options,
            () => mapDefined(emittedFiles, file => file.isDeclarationFile ? undefined : file.fileName),
            currentDirectory,
            getCanonicalFileName,
            commonSourceDirectory => checkSourceFilesBelongToPath(emittedFiles, commonSourceDirectory),
        );
        programDiagnostics.setCommonSourceDirectory(commonSourceDirectory);
        return commonSourceDirectory;
    }

    function getClassifiableNames() {
        if (!classifiableNames) {
            // Initialize a checker so that all our files are bound.
            getTypeChecker();
            classifiableNames = new Set();

            for (const sourceFile of files) {
                sourceFile.classifiableNames?.forEach(value => classifiableNames.add(value));
            }
        }

        return classifiableNames;
    }

    function resolveModuleNamesReusingOldState(moduleNames: readonly StringLiteralLike[], containingFile: SourceFile): readonly ResolvedModuleWithFailedLookupLocations[] {
        return resolveNamesReusingOldState({
            entries: moduleNames,
            containingFile,
            containingSourceFile: containingFile,
            redirectedReference: getRedirectReferenceForResolution(containingFile),
            nameAndModeGetter: moduleResolutionNameAndModeGetter,
            resolutionWorker: resolveModuleNamesWorker,
            getResolutionFromOldProgram: (name, mode) => oldProgram?.getResolvedModule(containingFile, name, mode),
            getResolved: getResolvedModuleFromResolution,
            canReuseResolutionsInFile: () =>
                containingFile === oldProgram?.getSourceFile(containingFile.fileName) &&
                !hasInvalidatedResolutions(containingFile.path),
            resolveToOwnAmbientModule: true,
        });
    }

    function resolveTypeReferenceDirectiveNamesReusingOldState(typeDirectiveNames: readonly FileReference[], containingFile: SourceFile): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    function resolveTypeReferenceDirectiveNamesReusingOldState(typeDirectiveNames: readonly string[], containingFile: string): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    function resolveTypeReferenceDirectiveNamesReusingOldState<T extends string | FileReference>(typeDirectiveNames: readonly T[], containingFile: string | SourceFile): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[] {
        const containingSourceFile = !isString(containingFile) ? containingFile : undefined;
        return resolveNamesReusingOldState({
            entries: typeDirectiveNames,
            containingFile,
            containingSourceFile,
            redirectedReference: containingSourceFile && getRedirectReferenceForResolution(containingSourceFile),
            nameAndModeGetter: typeReferenceResolutionNameAndModeGetter,
            resolutionWorker: resolveTypeReferenceDirectiveNamesWorker,
            getResolutionFromOldProgram: (name, mode) =>
                containingSourceFile ?
                    oldProgram?.getResolvedTypeReferenceDirective(containingSourceFile, name, mode) :
                    oldProgram?.getAutomaticTypeDirectiveResolutions()?.get(name, mode),
            getResolved: getResolvedTypeReferenceDirectiveFromResolution,
            canReuseResolutionsInFile: () =>
                containingSourceFile ?
                    containingSourceFile === oldProgram?.getSourceFile(containingSourceFile.fileName) && !hasInvalidatedResolutions(containingSourceFile.path) :
                    !hasInvalidatedResolutions(toPath(containingFile as string)),
        });
    }

    interface ResolveNamesReusingOldStateInput<Entry, SourceFileOrString, SourceFileOrUndefined extends SourceFile | undefined, Resolution> {
        entries: readonly Entry[];
        containingFile: SourceFileOrString;
        containingSourceFile: SourceFileOrUndefined;
        redirectedReference: ResolvedProjectReference | undefined;
        nameAndModeGetter: ResolutionNameAndModeGetter<Entry, SourceFileOrUndefined>;
        resolutionWorker: (
            entries: readonly Entry[],
            containingFile: SourceFileOrString,
            reusedNames: readonly Entry[] | undefined,
        ) => readonly Resolution[];
        getResolutionFromOldProgram: (name: string, mode: ResolutionMode) => Resolution | undefined;
        getResolved: (oldResolution: Resolution) => ResolutionWithResolvedFileName | undefined;
        canReuseResolutionsInFile: () => boolean;
        resolveToOwnAmbientModule?: true;
    }

    function resolveNamesReusingOldState<Entry, SourceFileOrString, SourceFileOrUndefined extends SourceFile | undefined, Resolution>({
        entries,
        containingFile,
        containingSourceFile,
        redirectedReference,
        nameAndModeGetter,
        resolutionWorker,
        getResolutionFromOldProgram,
        getResolved,
        canReuseResolutionsInFile,
        resolveToOwnAmbientModule,
    }: ResolveNamesReusingOldStateInput<Entry, SourceFileOrString, SourceFileOrUndefined, Resolution>): readonly Resolution[] {
        if (!entries.length) return emptyArray;
        if (structureIsReused === StructureIsReused.Not && (!resolveToOwnAmbientModule || !containingSourceFile!.ambientModuleNames.length)) {
            // If the old program state does not permit reusing resolutions and `file` does not contain locally defined ambient modules,
            // the best we can do is fallback to the default logic.
            return resolutionWorker(
                entries,
                containingFile,
                /*reusedNames*/ undefined,
            );
        }

        /** An ordered list of module names for which we cannot recover the resolution. */
        let unknownEntries: Entry[] | undefined;
        let unknownEntryIndices: number[] | undefined;
        let result: Resolution[] | undefined;
        let reusedNames: Entry[] | undefined;
        const reuseResolutions = canReuseResolutionsInFile();
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (reuseResolutions) {
                const name = nameAndModeGetter.getName(entry);
                const mode = nameAndModeGetter.getMode(entry, containingSourceFile, redirectedReference?.commandLine.options ?? options);
                const oldResolution = getResolutionFromOldProgram(name, mode);
                const oldResolved = oldResolution && getResolved(oldResolution);
                if (oldResolved) {
                    if (isTraceEnabled(options, host)) {
                        trace(
                            host,
                            resolutionWorker === resolveModuleNamesWorker as unknown ?
                                oldResolved.packageId ?
                                    Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                    Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                                oldResolved.packageId ?
                                Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2,
                            name,
                            containingSourceFile ? getNormalizedAbsolutePath(containingSourceFile.originalFileName, currentDirectory) : containingFile,
                            oldResolved.resolvedFileName,
                            oldResolved.packageId && packageIdToString(oldResolved.packageId),
                        );
                    }
                    (result ??= new Array(entries.length))[i] = oldResolution;
                    (reusedNames ??= []).push(entry);
                    continue;
                }
            }
            if (resolveToOwnAmbientModule) {
                const name = nameAndModeGetter.getName(entry);
                // We know moduleName resolves to an ambient module provided that moduleName:
                // - is in the list of ambient modules locally declared in the current source file.
                if (contains(containingSourceFile!.ambientModuleNames, name)) {
                    if (isTraceEnabled(options, host)) {
                        trace(
                            host,
                            Diagnostics.Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1,
                            name,
                            getNormalizedAbsolutePath(containingSourceFile!.originalFileName, currentDirectory),
                        );
                    }
                    (result ??= new Array(entries.length))[i] = emptyResolution;
                    continue;
                }
            }

            // Resolution failed in the old program, or resolved to an ambient module for which we can't reuse the result.
            (unknownEntries ??= []).push(entry);
            (unknownEntryIndices ??= []).push(i);
        }

        if (!unknownEntries) return result!;
        const resolutions = resolutionWorker(unknownEntries, containingFile, reusedNames);
        if (!result) return resolutions;
        resolutions.forEach((resolution, index) => result[unknownEntryIndices![index]] = resolution);
        return result;
    }

    function canReuseProjectReferences(): boolean {
        return !forEachProjectReference(
            oldProgram!.getProjectReferences(),
            oldProgram!.getResolvedProjectReferences(),
            (oldResolvedRef, parent, index) => {
                const newRef = (parent ? parent.commandLine.projectReferences : projectReferences)![index];
                const newResolvedRef = parseProjectReferenceConfigFile(newRef);
                if (oldResolvedRef) {
                    // Resolved project reference has gone missing or changed
                    return !newResolvedRef ||
                        newResolvedRef.sourceFile !== oldResolvedRef.sourceFile ||
                        !arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newResolvedRef.commandLine.fileNames);
                }
                else {
                    // A previously-unresolved reference may be resolved now
                    return newResolvedRef !== undefined;
                }
            },
            (oldProjectReferences, parent) => {
                // If array of references is changed, we cant resue old program
                const newReferences = parent ? getResolvedProjectReferenceByPath(parent.sourceFile.path)!.commandLine.projectReferences : projectReferences;
                return !arrayIsEqualTo(oldProjectReferences, newReferences, projectReferenceIsEqualTo);
            },
        );
    }

    function tryReuseStructureFromOldProgram(): StructureIsReused {
        if (!oldProgram) {
            return StructureIsReused.Not;
        }

        // check properties that can affect structure of the program or module resolution strategy
        // if any of these properties has changed - structure cannot be reused
        const oldOptions = oldProgram.getCompilerOptions();
        if (changesAffectModuleResolution(oldOptions, options)) {
            return StructureIsReused.Not;
        }

        // there is an old program, check if we can reuse its structure
        const oldRootNames = oldProgram.getRootFileNames();
        if (!arrayIsEqualTo(oldRootNames, rootNames)) {
            return StructureIsReused.Not;
        }

        // Check if any referenced project tsconfig files are different
        if (!canReuseProjectReferences()) {
            return StructureIsReused.Not;
        }
        if (projectReferences) {
            resolvedProjectReferences = projectReferences.map(parseProjectReferenceConfigFile);
        }

        // check if program source files has changed in the way that can affect structure of the program
        const newSourceFiles: SourceFile[] = [];
        const modifiedSourceFiles: SourceFile[] = [];
        structureIsReused = StructureIsReused.Completely;

        // If the missing file paths are now present, it can change the progam structure,
        // and hence cant reuse the structure.
        // This is same as how we dont reuse the structure if one of the file from old program is now missing
        if (forEachEntry(oldProgram.getMissingFilePaths(), missingFileName => host.fileExists(missingFileName))) {
            return StructureIsReused.Not;
        }

        const oldSourceFiles = oldProgram.getSourceFiles();
        const enum SeenPackageName {
            Exists,
            Modified,
        }
        const seenPackageNames = new Map<string, SeenPackageName>();

        for (const oldSourceFile of oldSourceFiles) {
            const sourceFileOptions = getCreateSourceFileOptions(oldSourceFile.fileName, moduleResolutionCache, host, options);
            let newSourceFile = host.getSourceFileByPath
                ? host.getSourceFileByPath(oldSourceFile.fileName, oldSourceFile.resolvedPath, sourceFileOptions, /*onError*/ undefined, shouldCreateNewSourceFile)
                : host.getSourceFile(oldSourceFile.fileName, sourceFileOptions, /*onError*/ undefined, shouldCreateNewSourceFile); // TODO: GH#18217

            if (!newSourceFile) {
                return StructureIsReused.Not;
            }
            newSourceFile.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
            newSourceFile.packageJsonScope = sourceFileOptions.packageJsonScope;

            Debug.assert(!newSourceFile.redirectInfo, "Host should not return a redirect source file from `getSourceFile`");

            let fileChanged: boolean;
            if (oldSourceFile.redirectInfo) {
                // We got `newSourceFile` by path, so it is actually for the unredirected file.
                // This lets us know if the unredirected file has changed. If it has we should break the redirect.
                if (newSourceFile !== oldSourceFile.redirectInfo.unredirected) {
                    // Underlying file has changed. Might not redirect anymore. Must rebuild program.
                    return StructureIsReused.Not;
                }
                fileChanged = false;
                newSourceFile = oldSourceFile; // Use the redirect.
            }
            else if (oldProgram.redirectTargetsMap.has(oldSourceFile.path)) {
                // If a redirected-to source file changes, the redirect may be broken.
                if (newSourceFile !== oldSourceFile) {
                    return StructureIsReused.Not;
                }
                fileChanged = false;
            }
            else {
                fileChanged = newSourceFile !== oldSourceFile;
            }

            // Since the project references havent changed, its right to set originalFileName and resolvedPath here
            newSourceFile.path = oldSourceFile.path;
            newSourceFile.originalFileName = oldSourceFile.originalFileName;
            newSourceFile.resolvedPath = oldSourceFile.resolvedPath;
            newSourceFile.fileName = oldSourceFile.fileName;

            const packageName = oldProgram.sourceFileToPackageName.get(oldSourceFile.path);
            if (packageName !== undefined) {
                // If there are 2 different source files for the same package name and at least one of them changes,
                // they might become redirects. So we must rebuild the program.
                const prevKind = seenPackageNames.get(packageName);
                const newKind = fileChanged ? SeenPackageName.Modified : SeenPackageName.Exists;
                if ((prevKind !== undefined && newKind === SeenPackageName.Modified) || prevKind === SeenPackageName.Modified) {
                    return StructureIsReused.Not;
                }
                seenPackageNames.set(packageName, newKind);
            }

            if (fileChanged) {
                if (oldSourceFile.impliedNodeFormat !== newSourceFile.impliedNodeFormat) {
                    structureIsReused = StructureIsReused.SafeModules;
                }
                // The `newSourceFile` object was created for the new program.
                else if (!arrayIsEqualTo(oldSourceFile.libReferenceDirectives, newSourceFile.libReferenceDirectives, fileReferenceIsEqualTo)) {
                    // 'lib' references has changed. Matches behavior in changesAffectModuleResolution
                    structureIsReused = StructureIsReused.SafeModules;
                }
                else if (oldSourceFile.hasNoDefaultLib !== newSourceFile.hasNoDefaultLib) {
                    // value of no-default-lib has changed
                    // this will affect if default library is injected into the list of files
                    structureIsReused = StructureIsReused.SafeModules;
                }
                // check tripleslash references
                else if (!arrayIsEqualTo(oldSourceFile.referencedFiles, newSourceFile.referencedFiles, fileReferenceIsEqualTo)) {
                    // tripleslash references has changed
                    structureIsReused = StructureIsReused.SafeModules;
                }
                else {
                    // check imports and module augmentations
                    collectExternalModuleReferences(newSourceFile);
                    if (!arrayIsEqualTo(oldSourceFile.imports, newSourceFile.imports, moduleNameIsEqualTo)) {
                        // imports has changed
                        structureIsReused = StructureIsReused.SafeModules;
                    }
                    else if (!arrayIsEqualTo(oldSourceFile.moduleAugmentations, newSourceFile.moduleAugmentations, moduleNameIsEqualTo)) {
                        // moduleAugmentations has changed
                        structureIsReused = StructureIsReused.SafeModules;
                    }
                    else if ((oldSourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags) !== (newSourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags)) {
                        // dynamicImport has changed
                        structureIsReused = StructureIsReused.SafeModules;
                    }
                    else if (!arrayIsEqualTo(oldSourceFile.typeReferenceDirectives, newSourceFile.typeReferenceDirectives, fileReferenceIsEqualTo)) {
                        // 'types' references has changed
                        structureIsReused = StructureIsReused.SafeModules;
                    }
                }

                // tentatively approve the file
                modifiedSourceFiles.push(newSourceFile);
            }
            else if (hasInvalidatedResolutions(oldSourceFile.path)) {
                // 'module/types' references could have changed
                structureIsReused = StructureIsReused.SafeModules;

                // add file to the modified list so that we will resolve it later
                modifiedSourceFiles.push(newSourceFile);
            }

            // if file has passed all checks it should be safe to reuse it
            newSourceFiles.push(newSourceFile);
        }

        if (structureIsReused !== StructureIsReused.Completely) {
            return structureIsReused;
        }

        // try to verify results of module resolution
        for (const newSourceFile of modifiedSourceFiles) {
            const moduleNames = getModuleNames(newSourceFile);
            const resolutions = resolveModuleNamesReusingOldState(moduleNames, newSourceFile);
            (resolvedModulesProcessing ??= new Map()).set(newSourceFile.path, resolutions);
            const optionsForFile = getCompilerOptionsForFile(newSourceFile);
            // ensure that module resolution results are still correct
            const resolutionsChanged = hasChangesInResolutions(
                moduleNames,
                resolutions,
                name => oldProgram.getResolvedModule(newSourceFile, name.text, getModeForUsageLocationWorker(newSourceFile, name, optionsForFile)),
                moduleResolutionIsEqualTo,
            );
            if (resolutionsChanged) structureIsReused = StructureIsReused.SafeModules;
            const typesReferenceDirectives = newSourceFile.typeReferenceDirectives;
            const typeReferenceResolutions = resolveTypeReferenceDirectiveNamesReusingOldState(typesReferenceDirectives, newSourceFile);
            (resolvedTypeReferenceDirectiveNamesProcessing ??= new Map()).set(newSourceFile.path, typeReferenceResolutions);
            // ensure that types resolutions are still correct
            const typeReferenceResolutionsChanged = hasChangesInResolutions(
                typesReferenceDirectives,
                typeReferenceResolutions,
                name =>
                    oldProgram.getResolvedTypeReferenceDirective(
                        newSourceFile,
                        getTypeReferenceResolutionName(name),
                        getModeForTypeReferenceDirectiveInFile(name, newSourceFile),
                    ),
                typeDirectiveIsEqualTo,
            );
            if (typeReferenceResolutionsChanged) structureIsReused = StructureIsReused.SafeModules;
        }

        if (structureIsReused !== StructureIsReused.Completely) {
            return structureIsReused;
        }

        if (changesAffectingProgramStructure(oldOptions, options)) {
            return StructureIsReused.SafeModules;
        }

        if (
            oldProgram.resolvedLibReferences &&
            forEachEntry(oldProgram.resolvedLibReferences, (resolution, libFileName) => pathForLibFileWorker(libFileName).actual !== resolution.actual)
        ) {
            return StructureIsReused.SafeModules;
        }

        if (host.hasChangedAutomaticTypeDirectiveNames) {
            if (host.hasChangedAutomaticTypeDirectiveNames()) return StructureIsReused.SafeModules;
        }
        else {
            automaticTypeDirectiveNames = getAutomaticTypeDirectiveNames(options, host);
            if (!arrayIsEqualTo(oldProgram.getAutomaticTypeDirectiveNames(), automaticTypeDirectiveNames)) return StructureIsReused.SafeModules;
        }
        missingFileNames = oldProgram.getMissingFilePaths();

        // update fileName -> file mapping
        Debug.assert(newSourceFiles.length === oldProgram.getSourceFiles().length);
        for (const newSourceFile of newSourceFiles) {
            filesByName.set(newSourceFile.path, newSourceFile);
        }
        const oldFilesByNameMap = oldProgram.getFilesByNameMap();
        oldFilesByNameMap.forEach((oldFile, path) => {
            if (!oldFile) {
                filesByName.set(path, oldFile);
                return;
            }
            if (oldFile.path === path) {
                // Set the file as found during node modules search if it was found that way in old progra,
                if (oldProgram.isSourceFileFromExternalLibrary(oldFile)) {
                    sourceFilesFoundSearchingNodeModules.set(oldFile.path, true);
                }
                return;
            }
            filesByName.set(path, filesByName.get(oldFile.path));
        });

        const isConfigIdentical = oldOptions.configFile && oldOptions.configFile === options.configFile
            || !oldOptions.configFile && !options.configFile && !optionsHaveChanges(oldOptions, options, optionDeclarations);
        programDiagnostics.reuseStateFromOldProgram(oldProgram.getProgramDiagnosticsContainer(), isConfigIdentical);
        skipVerifyCompilerOptions = isConfigIdentical;

        files = newSourceFiles;
        automaticTypeDirectiveNames = oldProgram.getAutomaticTypeDirectiveNames();
        automaticTypeDirectiveResolutions = oldProgram.getAutomaticTypeDirectiveResolutions();

        sourceFileToPackageName = oldProgram.sourceFileToPackageName;
        redirectTargetsMap = oldProgram.redirectTargetsMap;
        usesUriStyleNodeCoreModules = oldProgram.usesUriStyleNodeCoreModules;
        resolvedModules = oldProgram.resolvedModules;
        resolvedTypeReferenceDirectiveNames = oldProgram.resolvedTypeReferenceDirectiveNames;
        resolvedLibReferences = oldProgram.resolvedLibReferences;
        packageMap = oldProgram.getCurrentPackagesMap();

        return StructureIsReused.Completely;
    }

    function getEmitHost(writeFileCallback?: WriteFileCallback): EmitHost {
        return {
            getCanonicalFileName,
            getCommonSourceDirectory: program.getCommonSourceDirectory,
            getCompilerOptions: program.getCompilerOptions,
            getCurrentDirectory: () => currentDirectory,
            getSourceFile: program.getSourceFile,
            getSourceFileByPath: program.getSourceFileByPath,
            getSourceFiles: program.getSourceFiles,
            isSourceFileFromExternalLibrary,
            getRedirectFromSourceFile,
            isSourceOfProjectReferenceRedirect,
            getSymlinkCache,
            writeFile: writeFileCallback || writeFile,
            isEmitBlocked,
            shouldTransformImportCall,
            getEmitModuleFormatOfFile,
            getDefaultResolutionModeForFile,
            getModeForResolutionAtIndex,
            readFile: f => host.readFile(f),
            fileExists: f => {
                // Use local caches
                const path = toPath(f);
                if (getSourceFileByPath(path)) return true;
                if (missingFileNames.has(path)) return false;
                // Before falling back to the host
                return host.fileExists(f);
            },
            realpath: maybeBind(host, host.realpath),
            useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
            getBuildInfo: () => program.getBuildInfo?.(),
            getSourceFileFromReference: (file, ref) => program.getSourceFileFromReference(file, ref),
            redirectTargetsMap,
            getFileIncludeReasons: program.getFileIncludeReasons,
            createHash: maybeBind(host, host.createHash),
            getModuleResolutionCache: () => program.getModuleResolutionCache(),
            trace: maybeBind(host, host.trace),
            getGlobalTypingsCacheLocation: program.getGlobalTypingsCacheLocation,
        };
    }

    function writeFile(
        fileName: string,
        text: string,
        writeByteOrderMark: boolean,
        onError?: (message: string) => void,
        sourceFiles?: readonly SourceFile[],
        data?: WriteFileCallbackData,
    ) {
        host.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
    }

    function emitBuildInfo(writeFileCallback?: WriteFileCallback): EmitResult {
        tracing?.push(tracing.Phase.Emit, "emitBuildInfo", {}, /*separateBeginAndEnd*/ true);
        performance.mark("beforeEmit");
        const emitResult = emitFiles(
            notImplementedResolver,
            getEmitHost(writeFileCallback),
            /*targetSourceFile*/ undefined,
            /*transformers*/ noTransformers,
            /*emitOnly*/ false,
            /*onlyBuildInfo*/ true,
        );

        performance.mark("afterEmit");
        performance.measure("Emit", "beforeEmit", "afterEmit");
        tracing?.pop();
        return emitResult;
    }

    function getResolvedProjectReferences() {
        return resolvedProjectReferences;
    }

    function getProjectReferences() {
        return projectReferences;
    }

    function isSourceFileFromExternalLibrary(file: SourceFile): boolean {
        return !!sourceFilesFoundSearchingNodeModules.get(file.path);
    }

    function isSourceFileDefaultLibrary(file: SourceFile): boolean {
        if (!file.isDeclarationFile) {
            return false;
        }

        if (file.hasNoDefaultLib) {
            return true;
        }

        if (options.noLib) {
            return false;
        }

        // If '--lib' is not specified, include default library file according to '--target'
        // otherwise, using options specified in '--lib' instead of '--target' default library file
        const equalityComparer = host.useCaseSensitiveFileNames() ? equateStringsCaseSensitive : equateStringsCaseInsensitive;
        if (!options.lib) {
            return equalityComparer(file.fileName, getDefaultLibraryFileName());
        }
        else {
            return some(options.lib, libFileName => {
                // We might not have resolved lib if one of the root file included contained no-default-lib = true
                const resolvedLib = resolvedLibReferences!.get(libFileName);
                return !!resolvedLib && equalityComparer(file.fileName, resolvedLib.actual);
            });
        }
    }

    function getTypeChecker() {
        return typeChecker || (typeChecker = createTypeChecker(program));
    }

    function emit(
        sourceFile?: SourceFile,
        writeFileCallback?: WriteFileCallback,
        cancellationToken?: CancellationToken,
        emitOnly?: boolean | EmitOnly,
        transformers?: CustomTransformers,
        forceDtsEmit?: boolean,
        skipBuildInfo?: boolean,
    ): EmitResult {
        tracing?.push(tracing.Phase.Emit, "emit", { path: sourceFile?.path }, /*separateBeginAndEnd*/ true);
        const result = runWithCancellationToken(() =>
            emitWorker(
                program,
                sourceFile,
                writeFileCallback,
                cancellationToken,
                emitOnly,
                transformers,
                forceDtsEmit,
                skipBuildInfo,
            )
        );
        tracing?.pop();
        return result;
    }

    function isEmitBlocked(emitFileName: string): boolean {
        return hasEmitBlockingDiagnostics.has(toPath(emitFileName));
    }

    function emitWorker(
        program: Program,
        sourceFile: SourceFile | undefined,
        writeFileCallback: WriteFileCallback | undefined,
        cancellationToken: CancellationToken | undefined,
        emitOnly: boolean | EmitOnly | undefined,
        customTransformers: CustomTransformers | undefined,
        forceDtsEmit: boolean | undefined,
        skipBuildInfo: boolean | undefined,
    ): EmitResult {
        if (!forceDtsEmit) {
            const result = handleNoEmitOptions(program, sourceFile, writeFileCallback, cancellationToken);
            if (result) return result;
        }

        // Create the emit resolver outside of the "emitTime" tracking code below.  That way
        // any cost associated with it (like type checking) are appropriate associated with
        // the type-checking counter.
        //
        // If the -out option is specified, we should not pass the source file to getEmitResolver.
        // This is because in the -out scenario all files need to be emitted, and therefore all
        // files need to be type checked. And the way to specify that all files need to be type
        // checked is to not pass the file to getEmitResolver.
        const typeChecker = getTypeChecker();
        const emitResolver = typeChecker.getEmitResolver(
            options.outFile ? undefined : sourceFile,
            cancellationToken,
            emitResolverSkipsTypeChecking(emitOnly, forceDtsEmit),
        );

        performance.mark("beforeEmit");

        const emitResult = typeChecker.runWithCancellationToken(
            cancellationToken,
            () =>
                emitFiles(
                    emitResolver,
                    getEmitHost(writeFileCallback),
                    sourceFile,
                    getTransformers(options, customTransformers, emitOnly),
                    emitOnly,
                    /*onlyBuildInfo*/ false,
                    forceDtsEmit,
                    skipBuildInfo,
                ),
        );

        performance.mark("afterEmit");
        performance.measure("Emit", "beforeEmit", "afterEmit");
        return emitResult;
    }

    function getSourceFile(fileName: string): SourceFile | undefined {
        return getSourceFileByPath(toPath(fileName));
    }

    function getSourceFileByPath(path: Path): SourceFile | undefined {
        return filesByName.get(path) || undefined;
    }

    function getDiagnosticsHelper<T extends Diagnostic>(
        sourceFile: SourceFile | undefined,
        getDiagnostics: (sourceFile: SourceFile, cancellationToken: CancellationToken | undefined) => readonly T[],
        cancellationToken: CancellationToken | undefined,
    ): readonly T[] {
        if (sourceFile) {
            return sortAndDeduplicateDiagnostics(getDiagnostics(sourceFile, cancellationToken));
        }
        return sortAndDeduplicateDiagnostics(flatMap(program.getSourceFiles(), sourceFile => {
            if (cancellationToken) {
                cancellationToken.throwIfCancellationRequested();
            }
            return getDiagnostics(sourceFile, cancellationToken);
        }));
    }

    function getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[] {
        return getDiagnosticsHelper(sourceFile, getSyntacticDiagnosticsForFile, cancellationToken);
    }

    function getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken, nodesToCheck?: Node[]): readonly Diagnostic[] {
        return getDiagnosticsHelper(
            sourceFile,
            (sourceFile, cancellationToken) => getSemanticDiagnosticsForFile(sourceFile, cancellationToken, nodesToCheck),
            cancellationToken,
        );
    }

    function getCachedSemanticDiagnostics(sourceFile: SourceFile): readonly Diagnostic[] | undefined {
        return cachedBindAndCheckDiagnosticsForFile?.get(sourceFile.path);
    }

    function getBindAndCheckDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
        return getBindAndCheckDiagnosticsForFile(sourceFile, cancellationToken, /*nodesToCheck*/ undefined);
    }

    function getProgramDiagnostics(sourceFile: SourceFile): readonly Diagnostic[] {
        if (skipTypeChecking(sourceFile, options, program)) {
            return emptyArray;
        }

        const programDiagnosticsInFile = programDiagnostics.getCombinedDiagnostics(program).getDiagnostics(sourceFile.fileName);
        if (!sourceFile.commentDirectives?.length) {
            return programDiagnosticsInFile;
        }

        return getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, programDiagnosticsInFile).diagnostics;
    }

    function getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[] {
        return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile, cancellationToken);
    }

    function getSyntacticDiagnosticsForFile(sourceFile: SourceFile): readonly DiagnosticWithLocation[] {
        // For JavaScript files, we report semantic errors for using TypeScript-only
        // constructs from within a JavaScript file as syntactic errors.
        if (isSourceFileJS(sourceFile)) {
            if (!sourceFile.additionalSyntacticDiagnostics) {
                sourceFile.additionalSyntacticDiagnostics = getJSSyntacticDiagnosticsForFile(sourceFile);
            }
            return concatenate(sourceFile.additionalSyntacticDiagnostics, sourceFile.parseDiagnostics);
        }
        return sourceFile.parseDiagnostics;
    }

    function runWithCancellationToken<T>(func: () => T): T {
        try {
            return func();
        }
        catch (e) {
            if (e instanceof OperationCanceledException) {
                // We were canceled while performing the operation.  Because our type checker
                // might be a bad state, we need to throw it away.
                typeChecker = undefined!;
            }

            throw e;
        }
    }

    function getSemanticDiagnosticsForFile(
        sourceFile: SourceFile,
        cancellationToken: CancellationToken | undefined,
        nodesToCheck: Node[] | undefined,
    ): readonly Diagnostic[] {
        return concatenate(
            filterSemanticDiagnostics(getBindAndCheckDiagnosticsForFile(sourceFile, cancellationToken, nodesToCheck), options),
            getProgramDiagnostics(sourceFile),
        );
    }

    function getBindAndCheckDiagnosticsForFile(
        sourceFile: SourceFile,
        cancellationToken: CancellationToken | undefined,
        nodesToCheck: Node[] | undefined,
    ): readonly Diagnostic[] {
        if (nodesToCheck) {
            return getBindAndCheckDiagnosticsForFileNoCache(sourceFile, cancellationToken, nodesToCheck);
        }
        let result = cachedBindAndCheckDiagnosticsForFile?.get(sourceFile.path);
        if (!result) {
            (cachedBindAndCheckDiagnosticsForFile ??= new Map()).set(
                sourceFile.path,
                result = getBindAndCheckDiagnosticsForFileNoCache(sourceFile, cancellationToken),
            );
        }
        return result;
    }

    function getBindAndCheckDiagnosticsForFileNoCache(
        sourceFile: SourceFile,
        cancellationToken: CancellationToken | undefined,
        nodesToCheck?: Node[],
    ): readonly Diagnostic[] {
        return runWithCancellationToken(() => {
            if (skipTypeChecking(sourceFile, options, program)) {
                return emptyArray;
            }

            const typeChecker = getTypeChecker();

            Debug.assert(!!sourceFile.bindDiagnostics);

            const isJs = sourceFile.scriptKind === ScriptKind.JS || sourceFile.scriptKind === ScriptKind.JSX;
            const isPlainJs = isPlainJsFile(sourceFile, options.checkJs);
            const isCheckJs = isJs && isCheckJsEnabledForFile(sourceFile, options);

            let bindDiagnostics = sourceFile.bindDiagnostics;
            let checkDiagnostics = typeChecker.getDiagnostics(sourceFile, cancellationToken, nodesToCheck);
            if (isPlainJs) {
                bindDiagnostics = filter(bindDiagnostics, d => plainJSErrors.has(d.code));
                checkDiagnostics = filter(checkDiagnostics, d => plainJSErrors.has(d.code));
            }
            // skip ts-expect-error errors in plain JS files, and skip JSDoc errors except in checked JS
            return getMergedBindAndCheckDiagnostics(
                sourceFile,
                !isPlainJs,
                !!nodesToCheck,
                bindDiagnostics,
                checkDiagnostics,
                isCheckJs ? sourceFile.jsDocDiagnostics : undefined,
            );
        });
    }

    function getMergedBindAndCheckDiagnostics(sourceFile: SourceFile, includeBindAndCheckDiagnostics: boolean, partialCheck: boolean, ...allDiagnostics: (readonly Diagnostic[] | undefined)[]) {
        const flatDiagnostics = flatten(allDiagnostics);
        if (!includeBindAndCheckDiagnostics || !sourceFile.commentDirectives?.length) {
            return flatDiagnostics;
        }

        const { diagnostics, directives } = getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, flatDiagnostics);

        // When doing a partial check, we can't be sure a directive is unused.
        if (partialCheck) {
            return diagnostics;
        }

        for (const errorExpectation of directives.getUnusedExpectations()) {
            diagnostics.push(createDiagnosticForRange(sourceFile, errorExpectation.range, Diagnostics.Unused_ts_expect_error_directive));
        }

        return diagnostics;
    }

    /**
     * Creates a map of comment directives along with the diagnostics immediately preceded by one of them.
     * Comments that match to any of those diagnostics are marked as used.
     */
    function getDiagnosticsWithPrecedingDirectives(sourceFile: SourceFile, commentDirectives: CommentDirective[], flatDiagnostics: Diagnostic[]) {
        // Diagnostics are only reported if there is no comment directive preceding them
        // This will modify the directives map by marking "used" ones with a corresponding diagnostic
        const directives = createCommentDirectivesMap(sourceFile, commentDirectives);
        const diagnostics = flatDiagnostics.filter(diagnostic => markPrecedingCommentDirectiveLine(diagnostic, directives) === -1);

        return { diagnostics, directives };
    }

    function getSuggestionDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): readonly DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            return getTypeChecker().getSuggestionDiagnostics(sourceFile, cancellationToken);
        });
    }

    /**
     * @returns The line index marked as preceding the diagnostic, or -1 if none was.
     */
    function markPrecedingCommentDirectiveLine(diagnostic: Diagnostic, directives: CommentDirectivesMap) {
        const { file, start } = diagnostic;
        if (!file) {
            return -1;
        }

        // Start out with the line just before the text
        const lineStarts = getLineStarts(file);
        let line = computeLineAndCharacterOfPosition(lineStarts, start!).line - 1; // TODO: GH#18217
        while (line >= 0) {
            // As soon as that line is known to have a comment directive, use that
            if (directives.markUsed(line)) {
                return line;
            }

            // Stop searching if the line is not empty and not a comment
            const lineText = file.text.slice(lineStarts[line], lineStarts[line + 1]).trim();
            if (lineText !== "" && !/^\s*\/\/.*$/.test(lineText)) {
                return -1;
            }

            line--;
        }

        return -1;
    }

    function getJSSyntacticDiagnosticsForFile(sourceFile: SourceFile): DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            const diagnostics: DiagnosticWithLocation[] = [];
            walk(sourceFile, sourceFile);
            forEachChildRecursively(sourceFile, walk, walkArray);

            return diagnostics;

            function walk(node: Node, parent: Node) {
                // Return directly from the case if the given node doesnt want to visit each child
                // Otherwise break to visit each child

                switch (parent.kind) {
                    case SyntaxKind.Parameter:
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.MethodDeclaration:
                        if ((parent as ParameterDeclaration | PropertyDeclaration | MethodDeclaration).questionToken === node) {
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, "?"));
                            return "skip";
                        }
                    // falls through
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.VariableDeclaration:
                        // type annotation
                        if ((parent as FunctionLikeDeclaration | VariableDeclaration | ParameterDeclaration | PropertyDeclaration).type === node) {
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.Type_annotations_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                }

                switch (node.kind) {
                    case SyntaxKind.ImportClause:
                        if ((node as ImportClause).isTypeOnly) {
                            diagnostics.push(createDiagnosticForNode(parent, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, "import type"));
                            return "skip";
                        }
                        break;
                    case SyntaxKind.ExportDeclaration:
                        if ((node as ExportDeclaration).isTypeOnly) {
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, "export type"));
                            return "skip";
                        }
                        break;
                    case SyntaxKind.ImportSpecifier:
                    case SyntaxKind.ExportSpecifier:
                        if ((node as ImportOrExportSpecifier).isTypeOnly) {
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, isImportSpecifier(node) ? "import...type" : "export...type"));
                            return "skip";
                        }
                        break;
                    case SyntaxKind.ImportEqualsDeclaration:
                        diagnostics.push(createDiagnosticForNode(node, Diagnostics.import_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case SyntaxKind.ExportAssignment:
                        if ((node as ExportAssignment).isExportEquals) {
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.export_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                    case SyntaxKind.HeritageClause:
                        const heritageClause = node as HeritageClause;
                        if (heritageClause.token === SyntaxKind.ImplementsKeyword) {
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.implements_clauses_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                    case SyntaxKind.InterfaceDeclaration:
                        const interfaceKeyword = tokenToString(SyntaxKind.InterfaceKeyword);
                        Debug.assertIsDefined(interfaceKeyword);
                        diagnostics.push(createDiagnosticForNode(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, interfaceKeyword));
                        return "skip";
                    case SyntaxKind.ModuleDeclaration:
                        const moduleKeyword = node.flags & NodeFlags.Namespace ? tokenToString(SyntaxKind.NamespaceKeyword) : tokenToString(SyntaxKind.ModuleKeyword);
                        Debug.assertIsDefined(moduleKeyword);
                        diagnostics.push(createDiagnosticForNode(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, moduleKeyword));
                        return "skip";
                    case SyntaxKind.TypeAliasDeclaration:
                        diagnostics.push(createDiagnosticForNode(node, Diagnostics.Type_aliases_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case SyntaxKind.Constructor:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                        if (!(node as FunctionLikeDeclaration).body) {
                            diagnostics.push(createDiagnosticForNode(node, Diagnostics.Signature_declarations_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        return;
                    case SyntaxKind.EnumDeclaration:
                        const enumKeyword = Debug.checkDefined(tokenToString(SyntaxKind.EnumKeyword));
                        diagnostics.push(createDiagnosticForNode(node, Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, enumKeyword));
                        return "skip";
                    case SyntaxKind.NonNullExpression:
                        diagnostics.push(createDiagnosticForNode(node, Diagnostics.Non_null_assertions_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case SyntaxKind.AsExpression:
                        diagnostics.push(createDiagnosticForNode((node as AsExpression).type, Diagnostics.Type_assertion_expressions_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case SyntaxKind.SatisfiesExpression:
                        diagnostics.push(createDiagnosticForNode((node as SatisfiesExpression).type, Diagnostics.Type_satisfaction_expressions_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case SyntaxKind.TypeAssertionExpression:
                        Debug.fail(); // Won't parse these in a JS file anyway, as they are interpreted as JSX.
                }
            }

            function walkArray(nodes: NodeArray<Node>, parent: Node) {
                if (canHaveIllegalDecorators(parent)) {
                    const decorator = find(parent.modifiers, isDecorator);
                    if (decorator) {
                        // report illegal decorator
                        diagnostics.push(createDiagnosticForNode(decorator, Diagnostics.Decorators_are_not_valid_here));
                    }
                }
                else if (canHaveDecorators(parent) && parent.modifiers) {
                    const decoratorIndex = findIndex(parent.modifiers, isDecorator);
                    if (decoratorIndex >= 0) {
                        if (isParameter(parent) && !options.experimentalDecorators) {
                            // report illegall decorator on parameter
                            diagnostics.push(createDiagnosticForNode(parent.modifiers[decoratorIndex], Diagnostics.Decorators_are_not_valid_here));
                        }
                        else if (isClassDeclaration(parent)) {
                            const exportIndex = findIndex(parent.modifiers, isExportModifier);
                            if (exportIndex >= 0) {
                                const defaultIndex = findIndex(parent.modifiers, isDefaultModifier);
                                if (decoratorIndex > exportIndex && defaultIndex >= 0 && decoratorIndex < defaultIndex) {
                                    // report illegal decorator between `export` and `default`
                                    diagnostics.push(createDiagnosticForNode(parent.modifiers[decoratorIndex], Diagnostics.Decorators_are_not_valid_here));
                                }
                                else if (exportIndex >= 0 && decoratorIndex < exportIndex) {
                                    const trailingDecoratorIndex = findIndex(parent.modifiers, isDecorator, exportIndex);
                                    if (trailingDecoratorIndex >= 0) {
                                        diagnostics.push(addRelatedInfo(
                                            createDiagnosticForNode(parent.modifiers[trailingDecoratorIndex], Diagnostics.Decorators_may_not_appear_after_export_or_export_default_if_they_also_appear_before_export),
                                            createDiagnosticForNode(parent.modifiers[decoratorIndex], Diagnostics.Decorator_used_before_export_here),
                                        ));
                                    }
                                }
                            }
                        }
                    }
                }

                switch (parent.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ArrowFunction:
                        // Check type parameters
                        if (nodes === (parent as DeclarationWithTypeParameterChildren).typeParameters) {
                            diagnostics.push(createDiagnosticForNodeArray(nodes, Diagnostics.Type_parameter_declarations_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                    // falls through

                    case SyntaxKind.VariableStatement:
                        // Check modifiers
                        if (nodes === (parent as VariableStatement).modifiers) {
                            checkModifiers((parent as VariableStatement).modifiers!, parent.kind === SyntaxKind.VariableStatement);
                            return "skip";
                        }
                        break;
                    case SyntaxKind.PropertyDeclaration:
                        // Check modifiers of property declaration
                        if (nodes === (parent as PropertyDeclaration).modifiers) {
                            for (const modifier of nodes as NodeArray<ModifierLike>) {
                                if (
                                    isModifier(modifier)
                                    && modifier.kind !== SyntaxKind.StaticKeyword
                                    && modifier.kind !== SyntaxKind.AccessorKeyword
                                ) {
                                    diagnostics.push(createDiagnosticForNode(modifier, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, tokenToString(modifier.kind)));
                                }
                            }
                            return "skip";
                        }
                        break;
                    case SyntaxKind.Parameter:
                        // Check modifiers of parameter declaration
                        if (nodes === (parent as ParameterDeclaration).modifiers && some(nodes, isModifier)) {
                            diagnostics.push(createDiagnosticForNodeArray(nodes, Diagnostics.Parameter_modifiers_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.ExpressionWithTypeArguments:
                    case SyntaxKind.JsxSelfClosingElement:
                    case SyntaxKind.JsxOpeningElement:
                    case SyntaxKind.TaggedTemplateExpression:
                        // Check type arguments
                        if (nodes === (parent as NodeWithTypeArguments).typeArguments) {
                            diagnostics.push(createDiagnosticForNodeArray(nodes, Diagnostics.Type_arguments_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                }
            }

            function checkModifiers(modifiers: NodeArray<ModifierLike>, isConstValid: boolean) {
                for (const modifier of modifiers) {
                    switch (modifier.kind) {
                        case SyntaxKind.ConstKeyword:
                            if (isConstValid) {
                                continue;
                            }
                        // to report error,
                        // falls through
                        case SyntaxKind.PublicKeyword:
                        case SyntaxKind.PrivateKeyword:
                        case SyntaxKind.ProtectedKeyword:
                        case SyntaxKind.ReadonlyKeyword:
                        case SyntaxKind.DeclareKeyword:
                        case SyntaxKind.AbstractKeyword:
                        case SyntaxKind.OverrideKeyword:
                        case SyntaxKind.InKeyword:
                        case SyntaxKind.OutKeyword:
                            diagnostics.push(createDiagnosticForNode(modifier, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, tokenToString(modifier.kind)));
                            break;

                        // These are all legal modifiers.
                        case SyntaxKind.StaticKeyword:
                        case SyntaxKind.ExportKeyword:
                        case SyntaxKind.DefaultKeyword:
                        case SyntaxKind.AccessorKeyword:
                    }
                }
            }

            function createDiagnosticForNodeArray(nodes: NodeArray<Node>, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
                const start = nodes.pos;
                return createFileDiagnostic(sourceFile, start, nodes.end - start, message, ...args);
            }

            // Since these are syntactic diagnostics, parent might not have been set
            // this means the sourceFile cannot be infered from the node
            function createDiagnosticForNode(node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
                return createDiagnosticForNodeInSourceFile(sourceFile, node, message, ...args);
            }
        });
    }

    function getDeclarationDiagnosticsWorker(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly DiagnosticWithLocation[] {
        let result = cachedDeclarationDiagnosticsForFile?.get(sourceFile.path);
        if (!result) {
            (cachedDeclarationDiagnosticsForFile ??= new Map()).set(
                sourceFile.path,
                result = getDeclarationDiagnosticsForFileNoCache(sourceFile, cancellationToken),
            );
        }
        return result;
    }

    function getDeclarationDiagnosticsForFileNoCache(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            const resolver = getTypeChecker().getEmitResolver(sourceFile, cancellationToken);
            // Don't actually write any files since we're just getting diagnostics.
            return ts_getDeclarationDiagnostics(getEmitHost(noop), resolver, sourceFile) || emptyArray;
        });
    }

    function getDeclarationDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly DiagnosticWithLocation[] {
        return sourceFile.isDeclarationFile ? emptyArray : getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
    }

    function getOptionsDiagnostics(): SortedReadonlyArray<Diagnostic> {
        return sortAndDeduplicateDiagnostics(concatenate(
            programDiagnostics.getCombinedDiagnostics(program).getGlobalDiagnostics(),
            getOptionsDiagnosticsOfConfigFile(),
        ));
    }

    function getOptionsDiagnosticsOfConfigFile() {
        if (!options.configFile) return emptyArray;
        let diagnostics = programDiagnostics.getCombinedDiagnostics(program).getDiagnostics(options.configFile.fileName);
        forEachResolvedProjectReference(resolvedRef => {
            diagnostics = concatenate(diagnostics, programDiagnostics.getCombinedDiagnostics(program).getDiagnostics(resolvedRef.sourceFile.fileName));
        });
        return diagnostics;
    }

    function getGlobalDiagnostics(): SortedReadonlyArray<Diagnostic> {
        return rootNames.length ? sortAndDeduplicateDiagnostics(getTypeChecker().getGlobalDiagnostics().slice()) : emptyArray as any as SortedReadonlyArray<Diagnostic>;
    }

    function getConfigFileParsingDiagnostics(): readonly Diagnostic[] {
        return configFileParsingDiagnostics || emptyArray;
    }

    function processRootFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: FileIncludeReason) {
        processSourceFile(normalizePath(fileName), isDefaultLib, ignoreNoDefaultLib, /*packageId*/ undefined, reason);
    }

    function fileReferenceIsEqualTo(a: FileReference, b: FileReference): boolean {
        return a.fileName === b.fileName;
    }

    function moduleNameIsEqualTo(a: StringLiteralLike | Identifier, b: StringLiteralLike | Identifier): boolean {
        return a.kind === SyntaxKind.Identifier
            ? b.kind === SyntaxKind.Identifier && a.escapedText === b.escapedText
            : b.kind === SyntaxKind.StringLiteral && a.text === b.text;
    }

    function createSyntheticImport(text: string, file: SourceFile) {
        const externalHelpersModuleReference = factory.createStringLiteral(text);
        const importDecl = factory.createImportDeclaration(/*modifiers*/ undefined, /*importClause*/ undefined, externalHelpersModuleReference);
        addInternalEmitFlags(importDecl, InternalEmitFlags.NeverApplyImportHelper);
        setParent(externalHelpersModuleReference, importDecl);
        setParent(importDecl, file);
        // explicitly unset the synthesized flag on these declarations so the checker API will answer questions about them
        // (which is required to build the dependency graph for incremental emit)
        (externalHelpersModuleReference as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
        (importDecl as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
        return externalHelpersModuleReference;
    }

    function collectExternalModuleReferences(file: SourceFile): void {
        if (file.imports) {
            return;
        }

        const isJavaScriptFile = isSourceFileJS(file);
        const isExternalModuleFile = isExternalModule(file);

        // file.imports may not be undefined if there exists dynamic import
        let imports: StringLiteralLike[] | undefined;
        let moduleAugmentations: (StringLiteral | Identifier)[] | undefined;
        let ambientModules: string[] | undefined;

        // If we are importing helpers, we need to add a synthetic reference to resolve the
        // helpers library. (A JavaScript file without `externalModuleIndicator` set might be
        // a CommonJS module; `commonJsModuleIndicator` doesn't get set until the binder has
        // run. We synthesize a helpers import for it just in case; it will never be used if
        // the binder doesn't find and set a `commonJsModuleIndicator`.)
        if (isJavaScriptFile || (!file.isDeclarationFile && (getIsolatedModules(options) || isExternalModule(file)))) {
            if (options.importHelpers) {
                // synthesize 'import "tslib"' declaration
                imports = [createSyntheticImport(externalHelpersModuleNameText, file)];
            }
            const jsxImport = getJSXRuntimeImport(getJSXImplicitImportBase(options, file), options);
            if (jsxImport) {
                // synthesize `import "base/jsx-runtime"` declaration
                (imports ||= []).push(createSyntheticImport(jsxImport, file));
            }
        }

        for (const node of file.statements) {
            collectModuleReferences(node, /*inAmbientModule*/ false);
        }

        if ((file.flags & NodeFlags.PossiblyContainsDynamicImport) || isJavaScriptFile) {
            forEachDynamicImportOrRequireCall(file, /*includeTypeSpaceImports*/ true, /*requireStringLiteralLikeArgument*/ true, (node, moduleSpecifier) => {
                setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
                imports = append(imports, moduleSpecifier);
            });
        }

        file.imports = imports || emptyArray;
        file.moduleAugmentations = moduleAugmentations || emptyArray;
        file.ambientModuleNames = ambientModules || emptyArray;

        return;

        function collectModuleReferences(node: Statement, inAmbientModule: boolean): void {
            if (isAnyImportOrReExport(node)) {
                const moduleNameExpr = getExternalModuleName(node);
                // TypeScript 1.0 spec (April 2014): 12.1.6
                // An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference other external modules
                // only through top - level external module names. Relative external module names are not permitted.
                if (moduleNameExpr && isStringLiteral(moduleNameExpr) && moduleNameExpr.text && (!inAmbientModule || !isExternalModuleNameRelative(moduleNameExpr.text))) {
                    setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
                    imports = append(imports, moduleNameExpr);
                    if (!usesUriStyleNodeCoreModules && currentNodeModulesDepth === 0 && !file.isDeclarationFile) {
                        if (startsWith(moduleNameExpr.text, "node:") && !exclusivelyPrefixedNodeCoreModules.has(moduleNameExpr.text)) {
                            // Presence of `node:` prefix takes precedence over unprefixed node core modules
                            usesUriStyleNodeCoreModules = true;
                        }
                        else if (usesUriStyleNodeCoreModules === undefined && unprefixedNodeCoreModules.has(moduleNameExpr.text)) {
                            // Avoid `unprefixedNodeCoreModules.has` for every import
                            usesUriStyleNodeCoreModules = false;
                        }
                    }
                }
            }
            else if (isModuleDeclaration(node)) {
                if (isAmbientModule(node) && (inAmbientModule || hasSyntacticModifier(node, ModifierFlags.Ambient) || file.isDeclarationFile)) {
                    (node.name as Mutable<Node>).parent = node;
                    const nameText = getTextOfIdentifierOrLiteral(node.name);
                    // Ambient module declarations can be interpreted as augmentations for some existing external modules.
                    // This will happen in two cases:
                    // - if current file is external module then module augmentation is a ambient module declaration defined in the top level scope
                    // - if current file is not external module then module augmentation is an ambient module declaration with non-relative module name
                    //   immediately nested in top level ambient module declaration .
                    if (isExternalModuleFile || (inAmbientModule && !isExternalModuleNameRelative(nameText))) {
                        (moduleAugmentations || (moduleAugmentations = [])).push(node.name);
                    }
                    else if (!inAmbientModule) {
                        if (file.isDeclarationFile) {
                            // for global .d.ts files record name of ambient module
                            (ambientModules || (ambientModules = [])).push(nameText);
                        }
                        // An AmbientExternalModuleDeclaration declares an external module.
                        // This type of declaration is permitted only in the global module.
                        // The StringLiteral must specify a top - level external module name.
                        // Relative external module names are not permitted

                        // NOTE: body of ambient module is always a module block, if it exists
                        const body = (node as ModuleDeclaration).body as ModuleBlock;
                        if (body) {
                            for (const statement of body.statements) {
                                collectModuleReferences(statement, /*inAmbientModule*/ true);
                            }
                        }
                    }
                }
            }
        }
    }

    function getLibFileFromReference(ref: FileReference) {
        const libFileName = getLibFileNameFromLibReference(ref);
        const actualFileName = libFileName && resolvedLibReferences?.get(libFileName)?.actual;
        return actualFileName !== undefined ? getSourceFile(actualFileName) : undefined;
    }

    /** This should have similar behavior to 'processSourceFile' without diagnostics or mutation. */
    function getSourceFileFromReference(referencingFile: SourceFile, ref: FileReference): SourceFile | undefined {
        return getSourceFileFromReferenceWorker(resolveTripleslashReference(ref.fileName, referencingFile.fileName), getSourceFile);
    }

    function getSourceFileFromReferenceWorker(
        fileName: string,
        getSourceFile: (fileName: string) => SourceFile | undefined,
        fail?: (diagnostic: DiagnosticMessage, ...argument: string[]) => void,
        reason?: FileIncludeReason,
    ): SourceFile | undefined {
        if (hasExtension(fileName)) {
            const canonicalFileName = host.getCanonicalFileName(fileName);
            if (!options.allowNonTsExtensions && !forEach(flatten(supportedExtensionsWithJsonIfResolveJsonModule), extension => fileExtensionIs(canonicalFileName, extension))) {
                if (fail) {
                    if (hasJSFileExtension(canonicalFileName)) {
                        fail(Diagnostics.File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option, fileName);
                    }
                    else {
                        fail(Diagnostics.File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1, fileName, "'" + flatten(supportedExtensions).join("', '") + "'");
                    }
                }
                return undefined;
            }

            const sourceFile = getSourceFile(fileName);
            if (fail) {
                if (!sourceFile) {
                    const redirect = getRedirectFromSourceFile(fileName);
                    if (redirect?.outputDts) {
                        fail(Diagnostics.Output_file_0_has_not_been_built_from_source_file_1, redirect.outputDts, fileName);
                    }
                    else {
                        fail(Diagnostics.File_0_not_found, fileName);
                    }
                }
                else if (isReferencedFile(reason) && canonicalFileName === host.getCanonicalFileName(getSourceFileByPath(reason.file)!.fileName)) {
                    fail(Diagnostics.A_file_cannot_have_a_reference_to_itself);
                }
            }
            return sourceFile;
        }
        else {
            const sourceFileNoExtension = options.allowNonTsExtensions && getSourceFile(fileName);
            if (sourceFileNoExtension) return sourceFileNoExtension;

            if (fail && options.allowNonTsExtensions) {
                fail(Diagnostics.File_0_not_found, fileName);
                return undefined;
            }

            // Only try adding extensions from the first supported group (which should be .ts/.tsx/.d.ts)
            const sourceFileWithAddedExtension = forEach(supportedExtensions[0], extension => getSourceFile(fileName + extension));
            if (fail && !sourceFileWithAddedExtension) fail(Diagnostics.Could_not_resolve_the_path_0_with_the_extensions_Colon_1, fileName, "'" + flatten(supportedExtensions).join("', '") + "'");
            return sourceFileWithAddedExtension;
        }
    }

    /** This has side effects through `findSourceFile`. */
    function processSourceFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, packageId: PackageId | undefined, reason: FileIncludeReason): void {
        getSourceFileFromReferenceWorker(
            fileName,
            fileName => findSourceFile(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId), // TODO: GH#18217
            (diagnostic, ...args) => addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, diagnostic, args),
            reason,
        );
    }

    function processProjectReferenceFile(fileName: string, reason: ProjectReferenceFile) {
        return processSourceFile(fileName, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, /*packageId*/ undefined, reason);
    }

    function reportFileNamesDifferOnlyInCasingError(fileName: string, existingFile: SourceFile, reason: FileIncludeReason): void {
        const hasExistingReasonToReportErrorOn = !isReferencedFile(reason) && some(programDiagnostics.getFileReasons().get(existingFile.path), isReferencedFile);
        if (hasExistingReasonToReportErrorOn) {
            addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, Diagnostics.Already_included_file_name_0_differs_from_file_name_1_only_in_casing, [existingFile.fileName, fileName]);
        }
        else {
            addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, [fileName, existingFile.fileName]);
        }
    }

    function createRedirectedSourceFile(redirectTarget: SourceFile, unredirected: SourceFile, fileName: string, path: Path, resolvedPath: Path, originalFileName: string, sourceFileOptions: CreateSourceFileOptions): SourceFile {
        const redirect = parseNodeFactory.createRedirectedSourceFile({ redirectTarget, unredirected });
        redirect.fileName = fileName;
        redirect.path = path;
        redirect.resolvedPath = resolvedPath;
        redirect.originalFileName = originalFileName;
        redirect.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
        redirect.packageJsonScope = sourceFileOptions.packageJsonScope;
        sourceFilesFoundSearchingNodeModules.set(path, currentNodeModulesDepth > 0);
        return redirect;
    }

    // Get source file from normalized fileName
    function findSourceFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: FileIncludeReason, packageId: PackageId | undefined): SourceFile | undefined {
        tracing?.push(tracing.Phase.Program, "findSourceFile", {
            fileName,
            isDefaultLib: isDefaultLib || undefined,
            fileIncludeKind: (FileIncludeKind as any)[reason.kind],
        });
        const result = findSourceFileWorker(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId);
        tracing?.pop();
        return result;
    }

    function getCreateSourceFileOptions(fileName: string, moduleResolutionCache: ModuleResolutionCache | undefined, host: CompilerHost, options: CompilerOptions): CreateSourceFileOptions {
        // It's a _little odd_ that we can't set `impliedNodeFormat` until the program step - but it's the first and only time we have a resolution cache
        // and a freshly made source file node on hand at the same time, and we need both to set the field. Persisting the resolution cache all the way
        // to the check and emit steps would be bad - so we much prefer detecting and storing the format information on the source file node upfront.
        const result = getImpliedNodeFormatForFileWorker(getNormalizedAbsolutePath(fileName, currentDirectory), moduleResolutionCache?.getPackageJsonInfoCache(), host, options);
        const languageVersion = getEmitScriptTarget(options);
        const setExternalModuleIndicator = getSetExternalModuleIndicator(options);
        return typeof result === "object" ?
            { ...result, languageVersion, setExternalModuleIndicator, jsDocParsingMode: host.jsDocParsingMode } :
            { languageVersion, impliedNodeFormat: result, setExternalModuleIndicator, jsDocParsingMode: host.jsDocParsingMode };
    }

    function findSourceFileWorker(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: FileIncludeReason, packageId: PackageId | undefined): SourceFile | undefined {
        const path = toPath(fileName);
        if (useSourceOfProjectReferenceRedirect) {
            let source = getRedirectFromOutput(path);
            // If preserveSymlinks is true, module resolution wont jump the symlink
            // but the resolved real path may be the .d.ts from project reference
            // Note:: Currently we try the real path only if the
            // file is from node_modules to avoid having to run real path on all file paths
            if (
                !source &&
                host.realpath &&
                options.preserveSymlinks &&
                isDeclarationFileName(fileName) &&
                fileName.includes(nodeModulesPathPart)
            ) {
                const realPath = toPath(host.realpath(fileName));
                if (realPath !== path) source = getRedirectFromOutput(realPath);
            }
            if (source?.source) {
                const file = findSourceFile(source.source, isDefaultLib, ignoreNoDefaultLib, reason, packageId);
                if (file) addFileToFilesByName(file, path, fileName, /*redirectedPath*/ undefined);
                return file;
            }
        }
        const originalFileName = fileName;
        if (filesByName.has(path)) {
            const file = filesByName.get(path);
            const addedReason = addFileIncludeReason(file || undefined, reason, /*checkExisting*/ true);
            // try to check if we've already seen this file but with a different casing in path
            // NOTE: this only makes sense for case-insensitive file systems, and only on files which are not redirected
            if (file && addedReason && !(options.forceConsistentCasingInFileNames === false)) {
                const checkedName = file.fileName;
                const isRedirect = toPath(checkedName) !== toPath(fileName);
                if (isRedirect) {
                    fileName = getRedirectFromSourceFile(fileName)?.outputDts || fileName;
                }
                // Check if it differs only in drive letters its ok to ignore that error:
                const checkedAbsolutePath = getNormalizedAbsolutePathWithoutRoot(checkedName, currentDirectory);
                const inputAbsolutePath = getNormalizedAbsolutePathWithoutRoot(fileName, currentDirectory);
                if (checkedAbsolutePath !== inputAbsolutePath) {
                    reportFileNamesDifferOnlyInCasingError(fileName, file, reason);
                }
            }

            // If the file was previously found via a node_modules search, but is now being processed as a root file,
            // then everything it sucks in may also be marked incorrectly, and needs to be checked again.
            if (file && sourceFilesFoundSearchingNodeModules.get(file.path) && currentNodeModulesDepth === 0) {
                sourceFilesFoundSearchingNodeModules.set(file.path, false);
                if (!options.noResolve) {
                    processReferencedFiles(file, isDefaultLib);
                    processTypeReferenceDirectives(file);
                }
                if (!options.noLib) {
                    processLibReferenceDirectives(file);
                }

                modulesWithElidedImports.set(file.path, false);
                processImportedModules(file);
            }
            // See if we need to reprocess the imports due to prior skipped imports
            else if (file && modulesWithElidedImports.get(file.path)) {
                if (currentNodeModulesDepth < maxNodeModuleJsDepth) {
                    modulesWithElidedImports.set(file.path, false);
                    processImportedModules(file);
                }
            }

            return file || undefined;
        }

        let redirectedPath: Path | undefined;
        if (!useSourceOfProjectReferenceRedirect) {
            const redirectProject = getRedirectFromSourceFile(fileName);
            if (redirectProject?.outputDts) {
                if (redirectProject.resolvedRef.commandLine.options.outFile) {
                    // Shouldnt create many to 1 mapping file in --out scenario
                    return undefined;
                }
                fileName = redirectProject.outputDts;
                // Once we start redirecting to a file, we can potentially come back to it
                // via a back-reference from another file in the .d.ts folder. If that happens we'll
                // end up trying to add it to the program *again* because we were tracking it via its
                // original (un-redirected) name. So we have to map both the original path and the redirected path
                // to the source file we're about to find/create
                redirectedPath = toPath(redirectProject.outputDts);
            }
        }

        // We haven't looked for this file, do so now and cache result
        const sourceFileOptions = getCreateSourceFileOptions(fileName, moduleResolutionCache, host, options);
        const file = host.getSourceFile(
            fileName,
            sourceFileOptions,
            hostErrorMessage => addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, Diagnostics.Cannot_read_file_0_Colon_1, [fileName, hostErrorMessage]),
            shouldCreateNewSourceFile,
        );

        if (packageId) {
            const packageIdKey = packageIdToString(packageId);
            const fileFromPackageId = packageIdToSourceFile.get(packageIdKey);
            if (fileFromPackageId) {
                // Some other SourceFile already exists with this package name and version.
                // Instead of creating a duplicate, just redirect to the existing one.
                const dupFile = createRedirectedSourceFile(fileFromPackageId, file!, fileName, path, toPath(fileName), originalFileName, sourceFileOptions);
                redirectTargetsMap.add(fileFromPackageId.path, fileName);
                addFileToFilesByName(dupFile, path, fileName, redirectedPath);
                addFileIncludeReason(dupFile, reason, /*checkExisting*/ false);
                sourceFileToPackageName.set(path, packageIdToPackageName(packageId));
                processingOtherFiles!.push(dupFile);
                return dupFile;
            }
            else if (file) {
                // This is the first source file to have this packageId.
                packageIdToSourceFile.set(packageIdKey, file);
                sourceFileToPackageName.set(path, packageIdToPackageName(packageId));
            }
        }
        addFileToFilesByName(file, path, fileName, redirectedPath);

        if (file) {
            sourceFilesFoundSearchingNodeModules.set(path, currentNodeModulesDepth > 0);
            file.fileName = fileName; // Ensure that source file has same name as what we were looking for
            file.path = path;
            file.resolvedPath = toPath(fileName);
            file.originalFileName = originalFileName;
            file.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
            file.packageJsonScope = sourceFileOptions.packageJsonScope;
            addFileIncludeReason(file, reason, /*checkExisting*/ false);

            if (host.useCaseSensitiveFileNames()) {
                const pathLowerCase = toFileNameLowerCase(path);
                // for case-sensitive file systems check if we've already seen some file with similar filename ignoring case
                const existingFile = filesByNameIgnoreCase!.get(pathLowerCase);
                if (existingFile) {
                    reportFileNamesDifferOnlyInCasingError(fileName, existingFile, reason);
                }
                else {
                    filesByNameIgnoreCase!.set(pathLowerCase, file);
                }
            }

            skipDefaultLib = skipDefaultLib || (file.hasNoDefaultLib && !ignoreNoDefaultLib);

            if (!options.noResolve) {
                processReferencedFiles(file, isDefaultLib);
                processTypeReferenceDirectives(file);
            }
            if (!options.noLib) {
                processLibReferenceDirectives(file);
            }

            // always process imported modules to record module name resolutions
            processImportedModules(file);

            if (isDefaultLib) {
                processingDefaultLibFiles!.push(file);
            }
            else {
                processingOtherFiles!.push(file);
            }
            (filesWithReferencesProcessed ??= new Set()).add(file.path);
        }
        return file;
    }

    function addFileIncludeReason(file: SourceFile | undefined, reason: FileIncludeReason, checkExisting: boolean) {
        if (file && (!checkExisting || !isReferencedFile(reason) || !filesWithReferencesProcessed?.has(reason.file))) {
            programDiagnostics.getFileReasons().add(file.path, reason);
            return true;
        }
        return false;
    }

    function addFileToFilesByName(file: SourceFile | undefined, path: Path, fileName: string, redirectedPath: Path | undefined) {
        if (redirectedPath) {
            updateFilesByNameMap(fileName, redirectedPath, file);
            updateFilesByNameMap(fileName, path, file || false);
        }
        else {
            updateFilesByNameMap(fileName, path, file);
        }
    }
    function updateFilesByNameMap(fileName: string, path: Path, file: SourceFile | false | undefined) {
        filesByName.set(path, file);
        if (file !== undefined) missingFileNames.delete(path);
        else missingFileNames.set(path, fileName);
    }

    /**
     * Get the referenced project if the file is input file from that reference project
     */
    function getRedirectFromSourceFile(fileName: string) {
        return mapSourceFileToResolvedRef?.get(toPath(fileName));
    }

    function forEachResolvedProjectReference<T>(
        cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined,
    ): T | undefined {
        return ts_forEachResolvedProjectReference(resolvedProjectReferences, cb);
    }

    function getRedirectFromOutput(path: Path) {
        return mapOutputFileToResolvedRef?.get(path);
    }

    function isSourceOfProjectReferenceRedirect(fileName: string) {
        return useSourceOfProjectReferenceRedirect && !!getRedirectFromSourceFile(fileName);
    }

    function getResolvedProjectReferenceByPath(projectReferencePath: Path): ResolvedProjectReference | undefined {
        if (!projectReferenceRedirects) {
            return undefined;
        }

        return projectReferenceRedirects.get(projectReferencePath) || undefined;
    }

    function processReferencedFiles(file: SourceFile, isDefaultLib: boolean) {
        forEach(file.referencedFiles, (ref, index) => {
            processSourceFile(
                resolveTripleslashReference(ref.fileName, file.fileName),
                isDefaultLib,
                /*ignoreNoDefaultLib*/ false,
                /*packageId*/ undefined,
                { kind: FileIncludeKind.ReferenceFile, file: file.path, index },
            );
        });
    }

    function processTypeReferenceDirectives(file: SourceFile) {
        const typeDirectives = file.typeReferenceDirectives;
        if (!typeDirectives.length) return;

        const resolutions = resolvedTypeReferenceDirectiveNamesProcessing?.get(file.path) ||
            resolveTypeReferenceDirectiveNamesReusingOldState(typeDirectives, file);
        const resolutionsInFile = createModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>();
        (resolvedTypeReferenceDirectiveNames ??= new Map()).set(file.path, resolutionsInFile);
        for (let index = 0; index < typeDirectives.length; index++) {
            const ref = file.typeReferenceDirectives[index];
            const resolvedTypeReferenceDirective = resolutions[index];
            // store resolved type directive on the file
            const fileName = ref.fileName;
            const mode = getModeForTypeReferenceDirectiveInFile(ref, file);
            resolutionsInFile.set(fileName, mode, resolvedTypeReferenceDirective);
            processTypeReferenceDirective(fileName, mode, resolvedTypeReferenceDirective, { kind: FileIncludeKind.TypeReferenceDirective, file: file.path, index });
        }
    }

    function getCompilerOptionsForFile(file: SourceFile): CompilerOptions {
        return getRedirectReferenceForResolution(file)?.commandLine.options || options;
    }

    function processTypeReferenceDirective(
        typeReferenceDirective: string,
        mode: ResolutionMode,
        resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
        reason: FileIncludeReason,
    ): void {
        tracing?.push(tracing.Phase.Program, "processTypeReferenceDirective", { directive: typeReferenceDirective, hasResolved: !!resolution.resolvedTypeReferenceDirective, refKind: reason.kind, refPath: isReferencedFile(reason) ? reason.file : undefined });
        processTypeReferenceDirectiveWorker(typeReferenceDirective, mode, resolution, reason);
        tracing?.pop();
    }

    function processTypeReferenceDirectiveWorker(
        typeReferenceDirective: string,
        mode: ResolutionMode,
        resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
        reason: FileIncludeReason,
    ): void {
        addResolutionDiagnostics(resolution);
        const { resolvedTypeReferenceDirective } = resolution;
        if (resolvedTypeReferenceDirective) {
            if (resolvedTypeReferenceDirective.isExternalLibraryImport) currentNodeModulesDepth++;

            // resolved from the primary path
            processSourceFile(resolvedTypeReferenceDirective.resolvedFileName!, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, resolvedTypeReferenceDirective.packageId, reason); // TODO: GH#18217

            if (resolvedTypeReferenceDirective.isExternalLibraryImport) currentNodeModulesDepth--;
        }
        else {
            addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, Diagnostics.Cannot_find_type_definition_file_for_0, [typeReferenceDirective]);
        }
    }

    function pathForLibFile(libFileName: string): string {
        const existing = resolvedLibReferences?.get(libFileName);
        if (existing) return existing.actual;
        const result = pathForLibFileWorker(libFileName);
        (resolvedLibReferences ??= new Map()).set(libFileName, result);
        return result.actual;
    }

    function pathForLibFileWorker(libFileName: string): LibResolution {
        const existing = resolvedLibProcessing?.get(libFileName);
        if (existing) return existing;

        if (options.libReplacement === false) {
            const result: LibResolution = {
                resolution: {
                    resolvedModule: undefined,
                },
                actual: combinePaths(defaultLibraryPath, libFileName),
            };
            (resolvedLibProcessing ??= new Map()).set(libFileName, result);
            return result;
        }

        if (structureIsReused !== StructureIsReused.Not && oldProgram && !hasInvalidatedLibResolutions(libFileName)) {
            const oldResolution = oldProgram.resolvedLibReferences?.get(libFileName);
            if (oldResolution) {
                if (oldResolution.resolution && isTraceEnabled(options, host)) {
                    const libraryName = getLibraryNameFromLibFileName(libFileName);
                    const resolveFrom = getInferredLibraryNameResolveFrom(options, currentDirectory, libFileName);
                    trace(
                        host,
                        oldResolution.resolution.resolvedModule ?
                            oldResolution.resolution.resolvedModule.packageId ?
                                Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                            Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved,
                        libraryName,
                        getNormalizedAbsolutePath(resolveFrom, currentDirectory),
                        oldResolution.resolution.resolvedModule?.resolvedFileName,
                        oldResolution.resolution.resolvedModule?.packageId && packageIdToString(oldResolution.resolution.resolvedModule.packageId),
                    );
                }
                (resolvedLibProcessing ??= new Map()).set(libFileName, oldResolution);
                return oldResolution;
            }
        }

        const libraryName = getLibraryNameFromLibFileName(libFileName);
        const resolveFrom = getInferredLibraryNameResolveFrom(options, currentDirectory, libFileName);
        tracing?.push(tracing.Phase.Program, "resolveLibrary", { resolveFrom });
        performance.mark("beforeResolveLibrary");
        const resolution = actualResolveLibrary(libraryName, resolveFrom, options, libFileName);
        performance.mark("afterResolveLibrary");
        performance.measure("ResolveLibrary", "beforeResolveLibrary", "afterResolveLibrary");
        tracing?.pop();
        const result: LibResolution = {
            resolution,
            actual: resolution.resolvedModule ?
                resolution.resolvedModule.resolvedFileName :
                combinePaths(defaultLibraryPath, libFileName),
        };
        (resolvedLibProcessing ??= new Map()).set(libFileName, result);
        return result;
    }

    function processLibReferenceDirectives(file: SourceFile) {
        forEach(file.libReferenceDirectives, (libReference, index) => {
            const libFileName = getLibFileNameFromLibReference(libReference);
            if (libFileName) {
                // we ignore any 'no-default-lib' reference set on this file.
                processRootFile(pathForLibFile(libFileName), /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ true, { kind: FileIncludeKind.LibReferenceDirective, file: file.path, index });
            }
            else {
                programDiagnostics.addFileProcessingDiagnostic({
                    kind: FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic,
                    reason: { kind: FileIncludeKind.LibReferenceDirective, file: file.path, index },
                });
            }
        });
    }

    function getCanonicalFileName(fileName: string): string {
        return host.getCanonicalFileName(fileName);
    }

    function processImportedModules(file: SourceFile) {
        collectExternalModuleReferences(file);
        if (file.imports.length || file.moduleAugmentations.length) {
            // Because global augmentation doesn't have string literal name, we can check for global augmentation as such.
            const moduleNames = getModuleNames(file);
            const resolutions = resolvedModulesProcessing?.get(file.path) ||
                resolveModuleNamesReusingOldState(moduleNames, file);
            Debug.assert(resolutions.length === moduleNames.length);
            const optionsForFile = getCompilerOptionsForFile(file);
            const resolutionsInFile = createModeAwareCache<ResolutionWithFailedLookupLocations>();
            (resolvedModules ??= new Map()).set(file.path, resolutionsInFile);
            for (let index = 0; index < moduleNames.length; index++) {
                const resolution = resolutions[index].resolvedModule;
                const moduleName = moduleNames[index].text;
                const mode = getModeForUsageLocationWorker(file, moduleNames[index], optionsForFile);
                resolutionsInFile.set(moduleName, mode, resolutions[index]);
                addResolutionDiagnosticsFromResolutionOrCache(file, moduleName, resolutions[index], mode);

                if (!resolution) {
                    continue;
                }

                const isFromNodeModulesSearch = resolution.isExternalLibraryImport;
                // If this is js file source of project reference, dont treat it as js file but as d.ts
                const isJsFile = !resolutionExtensionIsTSOrJson(resolution.extension) && !getRedirectFromSourceFile(resolution.resolvedFileName);
                const isJsFileFromNodeModules = isFromNodeModulesSearch && isJsFile && (!resolution.originalPath || pathContainsNodeModules(resolution.resolvedFileName));
                const resolvedFileName = resolution.resolvedFileName;

                if (isFromNodeModulesSearch) {
                    currentNodeModulesDepth++;
                }

                // add file to program only if:
                // - resolution was successful
                // - noResolve is falsy
                // - module name comes from the list of imports
                // - it's not a top level JavaScript module that exceeded the search max
                const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;
                // Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
                // This may still end up being an untyped module -- the file won't be included but imports will be allowed.
                const shouldAddFile = resolvedFileName
                    && !getResolutionDiagnostic(optionsForFile, resolution, file)
                    && !optionsForFile.noResolve
                    && index < file.imports.length
                    && !elideImport
                    && !(isJsFile && !getAllowJSCompilerOption(optionsForFile))
                    && (isInJSFile(file.imports[index]) || !(file.imports[index].flags & NodeFlags.JSDoc));

                if (elideImport) {
                    modulesWithElidedImports.set(file.path, true);
                }
                else if (shouldAddFile) {
                    findSourceFile(
                        resolvedFileName,
                        /*isDefaultLib*/ false,
                        /*ignoreNoDefaultLib*/ false,
                        { kind: FileIncludeKind.Import, file: file.path, index },
                        resolution.packageId,
                    );
                }

                if (isFromNodeModulesSearch) {
                    currentNodeModulesDepth--;
                }
            }
        }
    }

    function checkSourceFilesBelongToPath(sourceFiles: readonly SourceFile[], rootDirectory: string): boolean {
        let allFilesBelongToPath = true;
        const absoluteRootDirectoryPath = host.getCanonicalFileName(getNormalizedAbsolutePath(rootDirectory, currentDirectory));
        for (const sourceFile of sourceFiles) {
            if (!sourceFile.isDeclarationFile) {
                const absoluteSourceFilePath = host.getCanonicalFileName(getNormalizedAbsolutePath(sourceFile.fileName, currentDirectory));
                if (absoluteSourceFilePath.indexOf(absoluteRootDirectoryPath) !== 0) {
                    programDiagnostics.addLazyConfigDiagnostic(
                        sourceFile,
                        Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files,
                        sourceFile.fileName,
                        rootDirectory,
                    );
                    allFilesBelongToPath = false;
                }
            }
        }

        return allFilesBelongToPath;
    }

    function parseProjectReferenceConfigFile(ref: ProjectReference): ResolvedProjectReference | undefined {
        if (!projectReferenceRedirects) {
            projectReferenceRedirects = new Map();
        }

        // The actual filename (i.e. add "/tsconfig.json" if necessary)
        const refPath = resolveProjectReferencePath(ref);
        const sourceFilePath = toPath(refPath);
        const fromCache = projectReferenceRedirects.get(sourceFilePath);
        if (fromCache !== undefined) {
            return fromCache || undefined;
        }

        let commandLine: ParsedCommandLine | undefined;
        let sourceFile: JsonSourceFile | undefined;
        if (host.getParsedCommandLine) {
            commandLine = host.getParsedCommandLine(refPath);
            if (!commandLine) {
                addFileToFilesByName(/*file*/ undefined, sourceFilePath, refPath, /*redirectedPath*/ undefined);
                projectReferenceRedirects.set(sourceFilePath, false);
                return undefined;
            }
            sourceFile = Debug.checkDefined(commandLine.options.configFile);
            Debug.assert(!sourceFile.path || sourceFile.path === sourceFilePath);
            addFileToFilesByName(sourceFile, sourceFilePath, refPath, /*redirectedPath*/ undefined);
        }
        else {
            // An absolute path pointing to the containing directory of the config file
            const basePath = getNormalizedAbsolutePath(getDirectoryPath(refPath), currentDirectory);
            sourceFile = host.getSourceFile(refPath, ScriptTarget.JSON) as JsonSourceFile | undefined;
            addFileToFilesByName(sourceFile, sourceFilePath, refPath, /*redirectedPath*/ undefined);
            if (sourceFile === undefined) {
                projectReferenceRedirects.set(sourceFilePath, false);
                return undefined;
            }
            commandLine = parseJsonSourceFileConfigFileContent(sourceFile, configParsingHost, basePath, /*existingOptions*/ undefined, refPath);
        }
        sourceFile.fileName = refPath;
        sourceFile.path = sourceFilePath;
        sourceFile.resolvedPath = sourceFilePath;
        sourceFile.originalFileName = refPath;

        const resolvedRef: ResolvedProjectReference = { commandLine, sourceFile };
        projectReferenceRedirects.set(sourceFilePath, resolvedRef);
        if (options.configFile !== sourceFile) {
            mapSourceFileToResolvedRef ??= new Map();
            mapOutputFileToResolvedRef ??= new Map();
            let outDts: string;
            if (commandLine.options.outFile) {
                outDts = changeExtension(commandLine.options.outFile, Extension.Dts);
                mapOutputFileToResolvedRef?.set(toPath(outDts), { resolvedRef });
            }
            const getCommonSourceDirectory = memoize(() => getCommonSourceDirectoryOfConfig(resolvedRef.commandLine, !host.useCaseSensitiveFileNames()));
            commandLine.fileNames.forEach(fileName => {
                if (isDeclarationFileName(fileName)) return;
                const path = toPath(fileName);
                let outputDts;
                if (!fileExtensionIs(fileName, Extension.Json)) {
                    if (!commandLine.options.outFile) {
                        outputDts = getOutputDeclarationFileName(fileName, resolvedRef.commandLine, !host.useCaseSensitiveFileNames(), getCommonSourceDirectory);
                        mapOutputFileToResolvedRef!.set(toPath(outputDts), { resolvedRef, source: fileName });
                    }
                    else {
                        outputDts = outDts;
                    }
                }
                mapSourceFileToResolvedRef!.set(path, { resolvedRef, outputDts });
            });
        }

        if (commandLine.projectReferences) {
            resolvedRef.references = commandLine.projectReferences.map(parseProjectReferenceConfigFile);
        }

        return resolvedRef;
    }

    function verifyCompilerOptions() {
        if (options.strictPropertyInitialization && !getStrictOptionValue(options, "strictNullChecks")) {
            createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "strictPropertyInitialization", "strictNullChecks");
        }
        if (options.exactOptionalPropertyTypes && !getStrictOptionValue(options, "strictNullChecks")) {
            createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "exactOptionalPropertyTypes", "strictNullChecks");
        }

        if (options.isolatedModules || options.verbatimModuleSyntax) {
            if (options.outFile) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "outFile", options.verbatimModuleSyntax ? "verbatimModuleSyntax" : "isolatedModules");
            }
        }

        if (options.isolatedDeclarations) {
            if (getAllowJSCompilerOption(options)) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "isolatedDeclarations");
            }
            if (!getEmitDeclarations(options)) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "isolatedDeclarations", "declaration", "composite");
            }
        }

        if (options.inlineSourceMap) {
            if (options.sourceMap) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap");
            }
            if (options.mapRoot) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap");
            }
        }

        if (options.composite) {
            if (options.declaration === false) {
                createDiagnosticForOptionName(Diagnostics.Composite_projects_may_not_disable_declaration_emit, "declaration");
            }
            if (options.incremental === false) {
                createDiagnosticForOptionName(Diagnostics.Composite_projects_may_not_disable_incremental_compilation, "declaration");
            }
        }

        const outputFile = options.outFile;
        if (!options.tsBuildInfoFile && options.incremental && !outputFile && !options.configFilePath) {
            programDiagnostics.addConfigDiagnostic(createCompilerDiagnostic(Diagnostics.Option_incremental_can_only_be_specified_using_tsconfig_emitting_to_single_file_or_when_option_tsBuildInfoFile_is_specified));
        }

        verifyDeprecatedCompilerOptions();
        verifyProjectReferences();

        // List of collected files is complete; validate exhautiveness if this is a project with a file list
        if (options.composite) {
            const rootPaths = new Set(rootNames.map(toPath));
            for (const file of files) {
                // Ignore file that is not emitted
                if (sourceFileMayBeEmitted(file, program) && !rootPaths.has(file.path)) {
                    programDiagnostics.addLazyConfigDiagnostic(
                        file,
                        Diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern,
                        file.fileName,
                        options.configFilePath || "",
                    );
                }
            }
        }

        if (options.paths) {
            for (const key in options.paths) {
                if (!hasProperty(options.paths, key)) {
                    continue;
                }
                if (!hasZeroOrOneAsteriskCharacter(key)) {
                    createDiagnosticForOptionPaths(/*onKey*/ true, key, Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, key);
                }
                if (isArray(options.paths[key])) {
                    const len = options.paths[key].length;
                    if (len === 0) {
                        createDiagnosticForOptionPaths(/*onKey*/ false, key, Diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array, key);
                    }
                    for (let i = 0; i < len; i++) {
                        const subst = options.paths[key][i];
                        const typeOfSubst = typeof subst;
                        if (typeOfSubst === "string") {
                            if (!hasZeroOrOneAsteriskCharacter(subst)) {
                                createDiagnosticForOptionPathKeyValue(key, i, Diagnostics.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character, subst, key);
                            }
                            if (!options.baseUrl && !pathIsRelative(subst) && !pathIsAbsolute(subst)) {
                                createDiagnosticForOptionPathKeyValue(key, i, Diagnostics.Non_relative_paths_are_not_allowed_when_baseUrl_is_not_set_Did_you_forget_a_leading_Slash);
                            }
                        }
                        else {
                            createDiagnosticForOptionPathKeyValue(key, i, Diagnostics.Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2, subst, key, typeOfSubst);
                        }
                    }
                }
                else {
                    createDiagnosticForOptionPaths(/*onKey*/ false, key, Diagnostics.Substitutions_for_pattern_0_should_be_an_array, key);
                }
            }
        }

        if (!options.sourceMap && !options.inlineSourceMap) {
            if (options.inlineSources) {
                createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "inlineSources");
            }
            if (options.sourceRoot) {
                createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "sourceRoot");
            }
        }

        if (options.mapRoot && !(options.sourceMap || options.declarationMap)) {
            // Error to specify --mapRoot without --sourcemap
            createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "mapRoot", "sourceMap", "declarationMap");
        }

        if (options.declarationDir) {
            if (!getEmitDeclarations(options)) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationDir", "declaration", "composite");
            }
            if (outputFile) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "declarationDir", "outFile");
            }
        }

        if (options.declarationMap && !getEmitDeclarations(options)) {
            createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationMap", "declaration", "composite");
        }

        if (options.lib && options.noLib) {
            createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "lib", "noLib");
        }

        const languageVersion = getEmitScriptTarget(options);

        const firstNonAmbientExternalModuleSourceFile = find(files, f => isExternalModule(f) && !f.isDeclarationFile);
        if (options.isolatedModules || options.verbatimModuleSyntax) {
            if (options.module === ModuleKind.None && languageVersion < ScriptTarget.ES2015 && options.isolatedModules) {
                createDiagnosticForOptionName(Diagnostics.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher, "isolatedModules", "target");
            }

            if (options.preserveConstEnums === false) {
                createDiagnosticForOptionName(Diagnostics.Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled, options.verbatimModuleSyntax ? "verbatimModuleSyntax" : "isolatedModules", "preserveConstEnums");
            }
        }
        else if (firstNonAmbientExternalModuleSourceFile && languageVersion < ScriptTarget.ES2015 && options.module === ModuleKind.None) {
            // We cannot use createDiagnosticFromNode because nodes do not have parents yet
            const span = getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, typeof firstNonAmbientExternalModuleSourceFile.externalModuleIndicator === "boolean" ? firstNonAmbientExternalModuleSourceFile : firstNonAmbientExternalModuleSourceFile.externalModuleIndicator!);
            programDiagnostics.addConfigDiagnostic(createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_use_imports_exports_or_module_augmentations_when_module_is_none));
        }

        // Cannot specify module gen that isn't amd or system with --out
        if (outputFile && !options.emitDeclarationOnly) {
            if (options.module && !(options.module === ModuleKind.AMD || options.module === ModuleKind.System)) {
                createDiagnosticForOptionName(Diagnostics.Only_amd_and_system_modules_are_supported_alongside_0, "outFile", "module");
            }
            else if (options.module === undefined && firstNonAmbientExternalModuleSourceFile) {
                const span = getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, typeof firstNonAmbientExternalModuleSourceFile.externalModuleIndicator === "boolean" ? firstNonAmbientExternalModuleSourceFile : firstNonAmbientExternalModuleSourceFile.externalModuleIndicator!);
                programDiagnostics.addConfigDiagnostic(createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system, "outFile"));
            }
        }

        if (getResolveJsonModule(options)) {
            if (getEmitModuleResolutionKind(options) === ModuleResolutionKind.Classic) {
                createDiagnosticForOptionName(Diagnostics.Option_resolveJsonModule_cannot_be_specified_when_moduleResolution_is_set_to_classic, "resolveJsonModule");
            }
            else if (!hasJsonModuleEmitEnabled(options)) {
                createDiagnosticForOptionName(Diagnostics.Option_resolveJsonModule_cannot_be_specified_when_module_is_set_to_none_system_or_umd, "resolveJsonModule", "module");
            }
        }

        // there has to be common source directory if user specified --outdir || --rootDir || --sourceRoot
        // if user specified --mapRoot, there needs to be common source directory if there would be multiple files being emitted
        if (
            options.outDir || // there is --outDir specified
            options.rootDir || // there is --rootDir specified
            options.sourceRoot || // there is --sourceRoot specified
            options.mapRoot || // there is --mapRoot specified
            (getEmitDeclarations(options) && options.declarationDir) // there is --declarationDir specified
        ) {
            // Precalculate and cache the common source directory
            const dir = getCommonSourceDirectory();

            // If we failed to find a good common directory, but outDir is specified and at least one of our files is on a windows drive/URL/other resource, add a failure
            if (options.outDir && dir === "" && files.some(file => getRootLength(file.fileName) > 1)) {
                createDiagnosticForOptionName(Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files, "outDir");
            }
        }

        if (options.checkJs && !getAllowJSCompilerOption(options)) {
            createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "checkJs", "allowJs");
        }

        if (options.emitDeclarationOnly) {
            if (!getEmitDeclarations(options)) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "emitDeclarationOnly", "declaration", "composite");
            }
        }

        if (
            options.emitDecoratorMetadata &&
            !options.experimentalDecorators
        ) {
            createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators");
        }

        if (options.jsxFactory) {
            if (options.reactNamespace) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_with_option_1, "reactNamespace", "jsxFactory");
            }
            if (options.jsx === JsxEmit.ReactJSX || options.jsx === JsxEmit.ReactJSXDev) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFactory", inverseJsxOptionMap.get("" + options.jsx));
            }
            if (!parseIsolatedEntityName(options.jsxFactory, languageVersion)) {
                createOptionValueDiagnostic("jsxFactory", Diagnostics.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name, options.jsxFactory);
            }
        }
        else if (options.reactNamespace && !isIdentifierText(options.reactNamespace, languageVersion)) {
            createOptionValueDiagnostic("reactNamespace", Diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier, options.reactNamespace);
        }

        if (options.jsxFragmentFactory) {
            if (!options.jsxFactory) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "jsxFragmentFactory", "jsxFactory");
            }
            if (options.jsx === JsxEmit.ReactJSX || options.jsx === JsxEmit.ReactJSXDev) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFragmentFactory", inverseJsxOptionMap.get("" + options.jsx));
            }
            if (!parseIsolatedEntityName(options.jsxFragmentFactory, languageVersion)) {
                createOptionValueDiagnostic("jsxFragmentFactory", Diagnostics.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name, options.jsxFragmentFactory);
            }
        }

        if (options.reactNamespace) {
            if (options.jsx === JsxEmit.ReactJSX || options.jsx === JsxEmit.ReactJSXDev) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "reactNamespace", inverseJsxOptionMap.get("" + options.jsx));
            }
        }

        if (options.jsxImportSource) {
            if (options.jsx === JsxEmit.React) {
                createDiagnosticForOptionName(Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxImportSource", inverseJsxOptionMap.get("" + options.jsx));
            }
        }

        const moduleKind = getEmitModuleKind(options);
        if (options.verbatimModuleSyntax) {
            if (moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.UMD || moduleKind === ModuleKind.System) {
                createDiagnosticForOptionName(Diagnostics.Option_verbatimModuleSyntax_cannot_be_used_when_module_is_set_to_UMD_AMD_or_System, "verbatimModuleSyntax");
            }
        }

        if (options.allowImportingTsExtensions && !(options.noEmit || options.emitDeclarationOnly || options.rewriteRelativeImportExtensions)) {
            createOptionValueDiagnostic("allowImportingTsExtensions", Diagnostics.Option_allowImportingTsExtensions_can_only_be_used_when_either_noEmit_or_emitDeclarationOnly_is_set);
        }

        const moduleResolution = getEmitModuleResolutionKind(options);
        if (options.resolvePackageJsonExports && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
            createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonExports");
        }
        if (options.resolvePackageJsonImports && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
            createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonImports");
        }
        if (options.customConditions && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
            createDiagnosticForOptionName(Diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "customConditions");
        }

        if (moduleResolution === ModuleResolutionKind.Bundler && !emitModuleKindIsNonNodeESM(moduleKind) && moduleKind !== ModuleKind.Preserve) {
            createOptionValueDiagnostic("moduleResolution", Diagnostics.Option_0_can_only_be_used_when_module_is_set_to_preserve_or_to_es2015_or_later, "bundler");
        }

        if (
            ModuleKind[moduleKind] &&
            (ModuleKind.Node16 <= moduleKind && moduleKind <= ModuleKind.NodeNext) &&
            !(ModuleResolutionKind.Node16 <= moduleResolution && moduleResolution <= ModuleResolutionKind.NodeNext)
        ) {
            const moduleKindName = ModuleKind[moduleKind];
            const moduleResolutionName = ModuleResolutionKind[moduleKindName as any] ? moduleKindName : "Node16";
            createOptionValueDiagnostic("moduleResolution", Diagnostics.Option_moduleResolution_must_be_set_to_0_or_left_unspecified_when_option_module_is_set_to_1, moduleResolutionName, moduleKindName);
        }
        else if (
            ModuleResolutionKind[moduleResolution] &&
            (ModuleResolutionKind.Node16 <= moduleResolution && moduleResolution <= ModuleResolutionKind.NodeNext) &&
            !(ModuleKind.Node16 <= moduleKind && moduleKind <= ModuleKind.NodeNext)
        ) {
            const moduleResolutionName = ModuleResolutionKind[moduleResolution];
            createOptionValueDiagnostic("module", Diagnostics.Option_module_must_be_set_to_0_when_option_moduleResolution_is_set_to_1, moduleResolutionName, moduleResolutionName);
        }

        // If the emit is enabled make sure that every output file is unique and not overwriting any of the input files
        if (!options.noEmit && !options.suppressOutputPathCheck) {
            const emitHost = getEmitHost();
            const emitFilesSeen = new Set<string>();
            forEachEmittedFile(emitHost, emitFileNames => {
                if (!options.emitDeclarationOnly) {
                    verifyEmitFilePath(emitFileNames.jsFilePath, emitFilesSeen);
                }
                verifyEmitFilePath(emitFileNames.declarationFilePath, emitFilesSeen);
            });
        }

        // Verify that all the emit files are unique and don't overwrite input files
        function verifyEmitFilePath(emitFileName: string | undefined, emitFilesSeen: Set<string>) {
            if (emitFileName) {
                const emitFilePath = toPath(emitFileName);
                // Report error if the output overwrites input file
                if (filesByName.has(emitFilePath)) {
                    let chain: DiagnosticMessageChain | undefined;
                    if (!options.configFilePath) {
                        // The program is from either an inferred project or an external project
                        chain = chainDiagnosticMessages(/*details*/ undefined, Diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig);
                    }
                    chain = chainDiagnosticMessages(chain, Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, emitFileName);
                    blockEmittingOfFile(emitFileName, createCompilerDiagnosticFromMessageChain(chain));
                }

                const emitFileKey = !host.useCaseSensitiveFileNames() ? toFileNameLowerCase(emitFilePath) : emitFilePath;
                // Report error if multiple files write into same file
                if (emitFilesSeen.has(emitFileKey)) {
                    // Already seen the same emit file - report error
                    blockEmittingOfFile(emitFileName, createCompilerDiagnostic(Diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, emitFileName));
                }
                else {
                    emitFilesSeen.add(emitFileKey);
                }
            }
        }
    }

    function getIgnoreDeprecationsVersion(): Version {
        const ignoreDeprecations = options.ignoreDeprecations;
        if (ignoreDeprecations) {
            // While we could do Version.tryParse here to support any version,
            // for now, only allow "5.0". We aren't planning on deprecating anything
            // until 6.0.
            if (ignoreDeprecations === "5.0") {
                return new Version(ignoreDeprecations);
            }
            reportInvalidIgnoreDeprecations();
        }
        return Version.zero;
    }

    function checkDeprecations(
        deprecatedIn: string,
        removedIn: string,
        createDiagnostic: (name: string, value: string | undefined, useInstead: string | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments) => void,
        fn: (createDeprecatedDiagnostic: (name: string, value?: string, useInstead?: string) => void) => void,
    ) {
        const deprecatedInVersion = new Version(deprecatedIn);
        const removedInVersion = new Version(removedIn);
        const typescriptVersion = new Version(typeScriptVersion || versionMajorMinor);
        const ignoreDeprecationsVersion = getIgnoreDeprecationsVersion();

        const mustBeRemoved = !(removedInVersion.compareTo(typescriptVersion) === Comparison.GreaterThan);
        const canBeSilenced = !mustBeRemoved && ignoreDeprecationsVersion.compareTo(deprecatedInVersion) === Comparison.LessThan;

        if (mustBeRemoved || canBeSilenced) {
            fn((name, value, useInstead) => {
                if (mustBeRemoved) {
                    if (value === undefined) {
                        createDiagnostic(name, value, useInstead, Diagnostics.Option_0_has_been_removed_Please_remove_it_from_your_configuration, name);
                    }
                    else {
                        createDiagnostic(name, value, useInstead, Diagnostics.Option_0_1_has_been_removed_Please_remove_it_from_your_configuration, name, value);
                    }
                }
                else {
                    if (value === undefined) {
                        createDiagnostic(name, value, useInstead, Diagnostics.Option_0_is_deprecated_and_will_stop_functioning_in_TypeScript_1_Specify_compilerOption_ignoreDeprecations_Colon_2_to_silence_this_error, name, removedIn, deprecatedIn);
                    }
                    else {
                        createDiagnostic(name, value, useInstead, Diagnostics.Option_0_1_is_deprecated_and_will_stop_functioning_in_TypeScript_2_Specify_compilerOption_ignoreDeprecations_Colon_3_to_silence_this_error, name, value, removedIn, deprecatedIn);
                    }
                }
            });
        }
    }

    function verifyDeprecatedCompilerOptions() {
        function createDiagnostic(name: string, value: string | undefined, useInstead: string | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments) {
            if (useInstead) {
                const details = chainDiagnosticMessages(/*details*/ undefined, Diagnostics.Use_0_instead, useInstead);
                const chain = chainDiagnosticMessages(details, message, ...args);
                createDiagnosticForOption(/*onKey*/ !value, name, /*option2*/ undefined, chain);
            }
            else {
                createDiagnosticForOption(/*onKey*/ !value, name, /*option2*/ undefined, message, ...args);
            }
        }

        checkDeprecations("5.0", "5.5", createDiagnostic, createDeprecatedDiagnostic => {
            if (options.target === ScriptTarget.ES3) {
                createDeprecatedDiagnostic("target", "ES3");
            }
            if (options.noImplicitUseStrict) {
                createDeprecatedDiagnostic("noImplicitUseStrict");
            }
            if (options.keyofStringsOnly) {
                createDeprecatedDiagnostic("keyofStringsOnly");
            }
            if (options.suppressExcessPropertyErrors) {
                createDeprecatedDiagnostic("suppressExcessPropertyErrors");
            }
            if (options.suppressImplicitAnyIndexErrors) {
                createDeprecatedDiagnostic("suppressImplicitAnyIndexErrors");
            }
            if (options.noStrictGenericChecks) {
                createDeprecatedDiagnostic("noStrictGenericChecks");
            }
            if (options.charset) {
                createDeprecatedDiagnostic("charset");
            }
            if (options.out) {
                createDeprecatedDiagnostic("out", /*value*/ undefined, "outFile");
            }
            if (options.importsNotUsedAsValues) {
                createDeprecatedDiagnostic("importsNotUsedAsValues", /*value*/ undefined, "verbatimModuleSyntax");
            }
            if (options.preserveValueImports) {
                createDeprecatedDiagnostic("preserveValueImports", /*value*/ undefined, "verbatimModuleSyntax");
            }
        });
    }

    function verifyDeprecatedProjectReference(ref: ProjectReference, parentFile: JsonSourceFile | undefined, index: number) {
        function createDiagnostic(_name: string, _value: string | undefined, _useInstead: string | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments) {
            createDiagnosticForReference(parentFile, index, message, ...args);
        }

        checkDeprecations("5.0", "5.5", createDiagnostic, createDeprecatedDiagnostic => {
            if (ref.prepend) {
                createDeprecatedDiagnostic("prepend");
            }
        });
    }

    function addFilePreprocessingFileExplainingDiagnostic(file: SourceFile | undefined, fileProcessingReason: FileIncludeReason, diagnostic: DiagnosticMessage, args: DiagnosticArguments) {
        programDiagnostics.addFileProcessingDiagnostic({
            kind: FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic,
            file: file && file.path,
            fileProcessingReason,
            diagnostic,
            args,
        });
    }

    function verifyProjectReferences() {
        const buildInfoPath = !options.suppressOutputPathCheck ? getTsBuildInfoEmitOutputFilePath(options) : undefined;
        forEachProjectReference(
            projectReferences,
            resolvedProjectReferences,
            (resolvedRef, parent, index) => {
                const ref = (parent ? parent.commandLine.projectReferences : projectReferences)![index];
                const parentFile = parent && parent.sourceFile as JsonSourceFile;
                verifyDeprecatedProjectReference(ref, parentFile, index);
                if (!resolvedRef) {
                    createDiagnosticForReference(parentFile, index, Diagnostics.File_0_not_found, ref.path);
                    return;
                }
                const options = resolvedRef.commandLine.options;
                if (!options.composite || options.noEmit) {
                    // ok to not have composite if the current program is container only
                    const inputs = parent ? parent.commandLine.fileNames : rootNames;
                    if (inputs.length) {
                        if (!options.composite) createDiagnosticForReference(parentFile, index, Diagnostics.Referenced_project_0_must_have_setting_composite_Colon_true, ref.path);
                        if (options.noEmit) createDiagnosticForReference(parentFile, index, Diagnostics.Referenced_project_0_may_not_disable_emit, ref.path);
                    }
                }
                if (!parent && buildInfoPath && buildInfoPath === getTsBuildInfoEmitOutputFilePath(options)) {
                    createDiagnosticForReference(parentFile, index, Diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, buildInfoPath, ref.path);
                    hasEmitBlockingDiagnostics.set(toPath(buildInfoPath), true);
                }
            },
        );
    }

    function createDiagnosticForOptionPathKeyValue(key: string, valueIndex: number, message: DiagnosticMessage, ...args: DiagnosticArguments) {
        let needCompilerDiagnostic = true;
        forEachOptionPathsSyntax(pathProp => {
            if (isObjectLiteralExpression(pathProp.initializer)) {
                forEachPropertyAssignment(pathProp.initializer, key, keyProps => {
                    const initializer = keyProps.initializer;
                    if (isArrayLiteralExpression(initializer) && initializer.elements.length > valueIndex) {
                        programDiagnostics.addConfigDiagnostic(createDiagnosticForNodeInSourceFile(options.configFile!, initializer.elements[valueIndex], message, ...args));
                        needCompilerDiagnostic = false;
                    }
                });
            }
        });
        if (needCompilerDiagnostic) {
            createCompilerOptionsDiagnostic(message, ...args);
        }
    }

    function createDiagnosticForOptionPaths(onKey: boolean, key: string, message: DiagnosticMessage, ...args: DiagnosticArguments) {
        let needCompilerDiagnostic = true;
        forEachOptionPathsSyntax(pathProp => {
            if (
                isObjectLiteralExpression(pathProp.initializer) &&
                createOptionDiagnosticInObjectLiteralSyntax(
                    pathProp.initializer,
                    onKey,
                    key,
                    /*key2*/ undefined,
                    message,
                    ...args,
                )
            ) {
                needCompilerDiagnostic = false;
            }
        });
        if (needCompilerDiagnostic) {
            createCompilerOptionsDiagnostic(message, ...args);
        }
    }

    function forEachOptionPathsSyntax<T>(callback: (prop: PropertyAssignment) => T | undefined) {
        return forEachOptionsSyntaxByName(getCompilerOptionsObjectLiteralSyntax(), "paths", callback);
    }

    function createDiagnosticForOptionName(message: DiagnosticMessage, option1: string, option2?: string, option3?: string) {
        // TODO(jakebailey): this code makes assumptions about the format of the diagnostic messages.
        createDiagnosticForOption(/*onKey*/ true, option1, option2, message, option1, option2!, option3!);
    }

    function createOptionValueDiagnostic(option1: string, message: DiagnosticMessage, ...args: DiagnosticArguments) {
        createDiagnosticForOption(/*onKey*/ false, option1, /*option2*/ undefined, message, ...args);
    }

    function createDiagnosticForReference(sourceFile: JsonSourceFile | undefined, index: number, message: DiagnosticMessage, ...args: DiagnosticArguments) {
        const referencesSyntax = forEachTsConfigPropArray(sourceFile || options.configFile, "references", property => isArrayLiteralExpression(property.initializer) ? property.initializer : undefined);
        if (referencesSyntax && referencesSyntax.elements.length > index) {
            programDiagnostics.addConfigDiagnostic(createDiagnosticForNodeInSourceFile(sourceFile || options.configFile!, referencesSyntax.elements[index], message, ...args));
        }
        else {
            programDiagnostics.addConfigDiagnostic(createCompilerDiagnostic(message, ...args));
        }
    }

    function createDiagnosticForOption(onKey: boolean, option1: string, option2: string | undefined, message: DiagnosticMessageChain): void;
    function createDiagnosticForOption(onKey: boolean, option1: string, option2: string | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments): void;
    function createDiagnosticForOption(onKey: boolean, option1: string, option2: string | undefined, message: DiagnosticMessage | DiagnosticMessageChain, ...args: DiagnosticArguments): void {
        const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
        const needCompilerDiagnostic = !compilerOptionsObjectLiteralSyntax ||
            !createOptionDiagnosticInObjectLiteralSyntax(compilerOptionsObjectLiteralSyntax, onKey, option1, option2, message, ...args);

        if (needCompilerDiagnostic) {
            createCompilerOptionsDiagnostic(message, ...args);
        }
    }

    function createCompilerOptionsDiagnostic(message: DiagnosticMessageChain): void;
    function createCompilerOptionsDiagnostic(message: DiagnosticMessage, ...args: DiagnosticArguments): void;
    function createCompilerOptionsDiagnostic(message: DiagnosticMessage | DiagnosticMessageChain, ...args: DiagnosticArguments): void;
    function createCompilerOptionsDiagnostic(message: DiagnosticMessage | DiagnosticMessageChain, ...args: DiagnosticArguments): void {
        const compilerOptionsProperty = getCompilerOptionsPropertySyntax();
        if (compilerOptionsProperty) {
            // eslint-disable-next-line local/no-in-operator
            if ("messageText" in message) {
                programDiagnostics.addConfigDiagnostic(createDiagnosticForNodeFromMessageChain(options.configFile!, compilerOptionsProperty.name, message));
            }
            else {
                programDiagnostics.addConfigDiagnostic(createDiagnosticForNodeInSourceFile(options.configFile!, compilerOptionsProperty.name, message, ...args));
            }
        }
        // eslint-disable-next-line local/no-in-operator
        else if ("messageText" in message) {
            programDiagnostics.addConfigDiagnostic(createCompilerDiagnosticFromMessageChain(message));
        }
        else {
            programDiagnostics.addConfigDiagnostic(createCompilerDiagnostic(message, ...args));
        }
    }

    function getCompilerOptionsObjectLiteralSyntax() {
        if (_compilerOptionsObjectLiteralSyntax === undefined) {
            const compilerOptionsProperty = getCompilerOptionsPropertySyntax();
            _compilerOptionsObjectLiteralSyntax = compilerOptionsProperty ? tryCast(compilerOptionsProperty.initializer, isObjectLiteralExpression) || false : false;
        }
        return _compilerOptionsObjectLiteralSyntax || undefined;
    }

    function getCompilerOptionsPropertySyntax() {
        if (_compilerOptionsPropertySyntax === undefined) {
            _compilerOptionsPropertySyntax = forEachPropertyAssignment(
                getTsConfigObjectLiteralExpression(options.configFile),
                "compilerOptions",
                identity,
            ) || false;
        }
        return _compilerOptionsPropertySyntax || undefined;
    }

    function createOptionDiagnosticInObjectLiteralSyntax(objectLiteral: ObjectLiteralExpression, onKey: boolean, key1: string, key2: string | undefined, messageChain: DiagnosticMessageChain): boolean;
    function createOptionDiagnosticInObjectLiteralSyntax(objectLiteral: ObjectLiteralExpression, onKey: boolean, key1: string, key2: string | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments): boolean;
    function createOptionDiagnosticInObjectLiteralSyntax(objectLiteral: ObjectLiteralExpression, onKey: boolean, key1: string, key2: string | undefined, message: DiagnosticMessage | DiagnosticMessageChain, ...args: DiagnosticArguments): boolean;
    function createOptionDiagnosticInObjectLiteralSyntax(objectLiteral: ObjectLiteralExpression, onKey: boolean, key1: string, key2: string | undefined, message: DiagnosticMessage | DiagnosticMessageChain, ...args: DiagnosticArguments): boolean {
        let needsCompilerDiagnostic = false;
        forEachPropertyAssignment(objectLiteral, key1, prop => {
            // eslint-disable-next-line local/no-in-operator
            if ("messageText" in message) {
                programDiagnostics.addConfigDiagnostic(createDiagnosticForNodeFromMessageChain(options.configFile!, onKey ? prop.name : prop.initializer, message));
            }
            else {
                programDiagnostics.addConfigDiagnostic(createDiagnosticForNodeInSourceFile(options.configFile!, onKey ? prop.name : prop.initializer, message, ...args));
            }
            needsCompilerDiagnostic = true;
        }, key2);
        return needsCompilerDiagnostic;
    }

    function blockEmittingOfFile(emitFileName: string, diag: Diagnostic) {
        hasEmitBlockingDiagnostics.set(toPath(emitFileName), true);
        programDiagnostics.addConfigDiagnostic(diag);
    }

    function isEmittedFile(file: string): boolean {
        if (options.noEmit) {
            return false;
        }

        // If this is source file, its not emitted file
        const filePath = toPath(file);
        if (getSourceFileByPath(filePath)) {
            return false;
        }

        // If options have --outFile or --out just check that
        const out = options.outFile;
        if (out) {
            return isSameFile(filePath, out) || isSameFile(filePath, removeFileExtension(out) + Extension.Dts);
        }

        // If declarationDir is specified, return if its a file in that directory
        if (options.declarationDir && containsPath(options.declarationDir, filePath, currentDirectory, !host.useCaseSensitiveFileNames())) {
            return true;
        }

        // If --outDir, check if file is in that directory
        if (options.outDir) {
            return containsPath(options.outDir, filePath, currentDirectory, !host.useCaseSensitiveFileNames());
        }

        if (fileExtensionIsOneOf(filePath, supportedJSExtensionsFlat) || isDeclarationFileName(filePath)) {
            // Otherwise just check if sourceFile with the name exists
            const filePathWithoutExtension = removeFileExtension(filePath);
            return !!getSourceFileByPath((filePathWithoutExtension + Extension.Ts) as Path) ||
                !!getSourceFileByPath((filePathWithoutExtension + Extension.Tsx) as Path);
        }
        return false;
    }

    function isSameFile(file1: string, file2: string) {
        return comparePaths(file1, file2, currentDirectory, !host.useCaseSensitiveFileNames()) === Comparison.EqualTo;
    }

    function getSymlinkCache(): SymlinkCache {
        if (host.getSymlinkCache) {
            return host.getSymlinkCache();
        }
        if (!symlinks) {
            symlinks = createSymlinkCache(currentDirectory, getCanonicalFileName);
        }
        if (files && !symlinks.hasProcessedResolutions()) {
            symlinks.setSymlinksFromResolutions(forEachResolvedModule, forEachResolvedTypeReferenceDirective, automaticTypeDirectiveResolutions);
        }
        return symlinks;
    }

    function getModeForUsageLocation(file: SourceFile, usage: StringLiteralLike): ResolutionMode {
        return getModeForUsageLocationWorker(file, usage, getCompilerOptionsForFile(file));
    }

    function getEmitSyntaxForUsageLocation(file: SourceFile, usage: StringLiteralLike): ResolutionMode {
        return getEmitSyntaxForUsageLocationWorker(file, usage, getCompilerOptionsForFile(file));
    }

    function getModeForResolutionAtIndex(file: SourceFile, index: number): ResolutionMode {
        return getModeForUsageLocation(file, getModuleNameStringLiteralAt(file, index));
    }

    function getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode {
        return getDefaultResolutionModeForFileWorker(sourceFile, getCompilerOptionsForFile(sourceFile));
    }

    function getImpliedNodeFormatForEmit(sourceFile: SourceFile): ResolutionMode {
        return getImpliedNodeFormatForEmitWorker(sourceFile, getCompilerOptionsForFile(sourceFile));
    }

    function getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind {
        return getEmitModuleFormatOfFileWorker(sourceFile, getCompilerOptionsForFile(sourceFile));
    }

    function shouldTransformImportCall(sourceFile: SourceFile): boolean {
        return shouldTransformImportCallWorker(sourceFile, getCompilerOptionsForFile(sourceFile));
    }

    function getModeForTypeReferenceDirectiveInFile(ref: FileReference, sourceFile: SourceFile) {
        return ref.resolutionMode || getDefaultResolutionModeForFile(sourceFile);
    }
}

function shouldTransformImportCallWorker(sourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, options: CompilerOptions): boolean {
    const moduleKind = getEmitModuleKind(options);
    if (ModuleKind.Node16 <= moduleKind && moduleKind <= ModuleKind.NodeNext || moduleKind === ModuleKind.Preserve) {
        return false;
    }
    return getEmitModuleFormatOfFileWorker(sourceFile, options) < ModuleKind.ES2015;
}
/** @internal Prefer `program.getEmitModuleFormatOfFile` when possible. */
export function getEmitModuleFormatOfFileWorker(sourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, options: CompilerOptions): ModuleKind {
    return getImpliedNodeFormatForEmitWorker(sourceFile, options) ?? getEmitModuleKind(options);
}
/** @internal Prefer `program.getImpliedNodeFormatForEmit` when possible. */
export function getImpliedNodeFormatForEmitWorker(sourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, options: CompilerOptions): ResolutionMode {
    const moduleKind = getEmitModuleKind(options);
    if (ModuleKind.Node16 <= moduleKind && moduleKind <= ModuleKind.NodeNext) {
        return sourceFile.impliedNodeFormat;
    }
    if (
        sourceFile.impliedNodeFormat === ModuleKind.CommonJS
        && (sourceFile.packageJsonScope?.contents.packageJsonContent.type === "commonjs"
            || fileExtensionIsOneOf(sourceFile.fileName, [Extension.Cjs, Extension.Cts]))
    ) {
        return ModuleKind.CommonJS;
    }
    if (
        sourceFile.impliedNodeFormat === ModuleKind.ESNext
        && (sourceFile.packageJsonScope?.contents.packageJsonContent.type === "module"
            || fileExtensionIsOneOf(sourceFile.fileName, [Extension.Mjs, Extension.Mts]))
    ) {
        return ModuleKind.ESNext;
    }
    return undefined;
}
/** @internal Prefer `program.getDefaultResolutionModeForFile` when possible. */
export function getDefaultResolutionModeForFileWorker(sourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, options: CompilerOptions): ResolutionMode {
    return importSyntaxAffectsModuleResolution(options) ? getImpliedNodeFormatForEmitWorker(sourceFile, options) : undefined;
}

interface HostForUseSourceOfProjectReferenceRedirect {
    compilerHost: CompilerHost;
    getSymlinkCache: () => SymlinkCache;
    useSourceOfProjectReferenceRedirect: boolean;
    toPath(fileName: string): Path;
    getResolvedProjectReferences(): readonly (ResolvedProjectReference | undefined)[] | undefined;
    getRedirectFromOutput(path: Path): ResolvedRefAndSource | undefined;
    forEachResolvedProjectReference<T>(cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined): T | undefined;
}

function updateHostForUseSourceOfProjectReferenceRedirect(host: HostForUseSourceOfProjectReferenceRedirect) {
    let setOfDeclarationDirectories: Set<Path> | undefined;
    const originalFileExists = host.compilerHost.fileExists;
    const originalDirectoryExists = host.compilerHost.directoryExists;
    const originalGetDirectories = host.compilerHost.getDirectories;
    const originalRealpath = host.compilerHost.realpath;

    if (!host.useSourceOfProjectReferenceRedirect) return { onProgramCreateComplete: noop, fileExists };

    host.compilerHost.fileExists = fileExists;

    let directoryExists;
    if (originalDirectoryExists) {
        // This implementation of directoryExists checks if the directory being requested is
        // directory of .d.ts file for the referenced Project.
        // If it is it returns true irrespective of whether that directory exists on host
        directoryExists = host.compilerHost.directoryExists = path => {
            if (originalDirectoryExists.call(host.compilerHost, path)) {
                handleDirectoryCouldBeSymlink(path);
                return true;
            }

            if (!host.getResolvedProjectReferences()) return false;

            if (!setOfDeclarationDirectories) {
                setOfDeclarationDirectories = new Set();
                host.forEachResolvedProjectReference(ref => {
                    const out = ref.commandLine.options.outFile;
                    if (out) {
                        setOfDeclarationDirectories!.add(getDirectoryPath(host.toPath(out)));
                    }
                    else {
                        // Set declaration's in different locations only, if they are next to source the directory present doesnt change
                        const declarationDir = ref.commandLine.options.declarationDir || ref.commandLine.options.outDir;
                        if (declarationDir) {
                            setOfDeclarationDirectories!.add(host.toPath(declarationDir));
                        }
                    }
                });
            }

            return fileOrDirectoryExistsUsingSource(path, /*isFile*/ false);
        };
    }

    if (originalGetDirectories) {
        // Call getDirectories only if directory actually present on the host
        // This is needed to ensure that we arent getting directories that we fake about presence for
        host.compilerHost.getDirectories = path =>
            !host.getResolvedProjectReferences() || (originalDirectoryExists && originalDirectoryExists.call(host.compilerHost, path)) ?
                originalGetDirectories.call(host.compilerHost, path) :
                [];
    }

    // This is something we keep for life time of the host
    if (originalRealpath) {
        host.compilerHost.realpath = s =>
            host.getSymlinkCache().getSymlinkedFiles()?.get(host.toPath(s)) ||
            originalRealpath.call(host.compilerHost, s);
    }

    return { onProgramCreateComplete, fileExists, directoryExists };

    function onProgramCreateComplete() {
        host.compilerHost.fileExists = originalFileExists;
        host.compilerHost.directoryExists = originalDirectoryExists;
        host.compilerHost.getDirectories = originalGetDirectories;
        // DO not revert realpath as it could be used later
    }

    // This implementation of fileExists checks if the file being requested is
    // .d.ts file for the referenced Project.
    // If it is it returns true irrespective of whether that file exists on host
    function fileExists(file: string) {
        if (originalFileExists.call(host.compilerHost, file)) return true;
        if (!host.getResolvedProjectReferences()) return false;
        if (!isDeclarationFileName(file)) return false;

        // Project references go to source file instead of .d.ts file
        return fileOrDirectoryExistsUsingSource(file, /*isFile*/ true);
    }

    function fileExistsIfProjectReferenceDts(file: string) {
        const source = host.getRedirectFromOutput(host.toPath(file));
        return source !== undefined ?
            isString(source.source) ? originalFileExists.call(host.compilerHost, source.source) as boolean : true :
            undefined;
    }

    function directoryExistsIfProjectReferenceDeclDir(dir: string) {
        const dirPath = host.toPath(dir);
        const dirPathWithTrailingDirectorySeparator = `${dirPath}${directorySeparator}`;
        return forEachKey(
            setOfDeclarationDirectories!,
            declDirPath =>
                dirPath === declDirPath ||
                // Any parent directory of declaration dir
                startsWith(declDirPath, dirPathWithTrailingDirectorySeparator) ||
                // Any directory inside declaration dir
                startsWith(dirPath, `${declDirPath}/`),
        );
    }

    function handleDirectoryCouldBeSymlink(directory: string) {
        if (!host.getResolvedProjectReferences() || containsIgnoredPath(directory)) return;

        // Because we already watch node_modules, handle symlinks in there
        if (!originalRealpath || !directory.includes(nodeModulesPathPart)) return;
        const symlinkCache = host.getSymlinkCache();
        const directoryPath = ensureTrailingDirectorySeparator(host.toPath(directory));
        if (symlinkCache.getSymlinkedDirectories()?.has(directoryPath)) return;

        const real = normalizePath(originalRealpath.call(host.compilerHost, directory));
        let realPath: Path;
        if (
            real === directory ||
            (realPath = ensureTrailingDirectorySeparator(host.toPath(real))) === directoryPath
        ) {
            // not symlinked
            symlinkCache.setSymlinkedDirectory(directoryPath, false);
            return;
        }

        symlinkCache.setSymlinkedDirectory(directory, {
            real: ensureTrailingDirectorySeparator(real),
            realPath,
        });
    }

    function fileOrDirectoryExistsUsingSource(fileOrDirectory: string, isFile: boolean): boolean {
        const fileOrDirectoryExistsUsingSource = isFile ?
            fileExistsIfProjectReferenceDts :
            directoryExistsIfProjectReferenceDeclDir;
        // Check current directory or file
        const result = fileOrDirectoryExistsUsingSource(fileOrDirectory);
        if (result !== undefined) return result;

        const symlinkCache = host.getSymlinkCache();
        const symlinkedDirectories = symlinkCache.getSymlinkedDirectories();
        if (!symlinkedDirectories) return false;
        const fileOrDirectoryPath = host.toPath(fileOrDirectory);
        if (!fileOrDirectoryPath.includes(nodeModulesPathPart)) return false;
        if (isFile && symlinkCache.getSymlinkedFiles()?.has(fileOrDirectoryPath)) return true;

        // If it contains node_modules check if its one of the symlinked path we know of
        return firstDefinedIterator(
            symlinkedDirectories.entries(),
            ([directoryPath, symlinkedDirectory]) => {
                if (!symlinkedDirectory || !startsWith(fileOrDirectoryPath, directoryPath)) return undefined;
                const result = fileOrDirectoryExistsUsingSource(fileOrDirectoryPath.replace(directoryPath, symlinkedDirectory.realPath));
                if (isFile && result) {
                    // Store the real path for the file'
                    const absolutePath = getNormalizedAbsolutePath(fileOrDirectory, host.compilerHost.getCurrentDirectory());
                    symlinkCache.setSymlinkedFile(
                        fileOrDirectoryPath,
                        `${symlinkedDirectory.real}${absolutePath.replace(new RegExp(directoryPath, "i"), "")}`,
                    );
                }
                return result;
            },
        ) || false;
    }
}

/** @internal */
export const emitSkippedWithNoDiagnostics: EmitResult = { diagnostics: emptyArray, sourceMaps: undefined, emittedFiles: undefined, emitSkipped: true };

/** @internal */
export function handleNoEmitOptions<T extends BuilderProgram>(
    program: Program | T,
    sourceFile: SourceFile | undefined,
    writeFile: WriteFileCallback | undefined,
    cancellationToken: CancellationToken | undefined,
): EmitResult | undefined {
    const options = program.getCompilerOptions();
    if (options.noEmit) {
        return sourceFile ?
            emitSkippedWithNoDiagnostics :
            program.emitBuildInfo(writeFile, cancellationToken);
    }

    // If the noEmitOnError flag is set, then check if we have any errors so far.  If so,
    // immediately bail out.  Note that we pass 'undefined' for 'sourceFile' so that we
    // get any preEmit diagnostics, not just the ones
    if (!options.noEmitOnError) return undefined;
    let diagnostics: readonly Diagnostic[] = [
        ...program.getOptionsDiagnostics(cancellationToken),
        ...program.getSyntacticDiagnostics(sourceFile, cancellationToken),
        ...program.getGlobalDiagnostics(cancellationToken),
        ...program.getSemanticDiagnostics(sourceFile, cancellationToken),
    ];

    if (diagnostics.length === 0 && getEmitDeclarations(program.getCompilerOptions())) {
        diagnostics = program.getDeclarationDiagnostics(/*sourceFile*/ undefined, cancellationToken);
    }

    if (!diagnostics.length) return undefined;
    let emittedFiles: string[] | undefined;
    if (!sourceFile) {
        const emitResult = program.emitBuildInfo(writeFile, cancellationToken);
        if (emitResult.diagnostics) diagnostics = [...diagnostics, ...emitResult.diagnostics];
        emittedFiles = emitResult.emittedFiles;
    }
    return { diagnostics, sourceMaps: undefined, emittedFiles, emitSkipped: true };
}

/** @internal */
export function filterSemanticDiagnostics(diagnostic: readonly Diagnostic[], option: CompilerOptions): readonly Diagnostic[] {
    return filter(diagnostic, d => !d.skippedOn || !option[d.skippedOn]);
}

/** @internal */
export function parseConfigHostFromCompilerHostLike<T extends BuilderProgram>(
    host: (CompilerHost | ProgramHost<T>) & { onUnRecoverableConfigFileDiagnostic?: DiagnosticReporter; },
    directoryStructureHost: DirectoryStructureHost = host,
): ParseConfigFileHost {
    return {
        fileExists: f => directoryStructureHost.fileExists(f),
        readDirectory(root, extensions, excludes, includes, depth) {
            Debug.assertIsDefined(directoryStructureHost.readDirectory, "'CompilerHost.readDirectory' must be implemented to correctly process 'projectReferences'");
            return directoryStructureHost.readDirectory(root, extensions, excludes, includes, depth);
        },
        readFile: f => directoryStructureHost.readFile(f),
        directoryExists: maybeBind(directoryStructureHost, directoryStructureHost.directoryExists),
        getDirectories: maybeBind(directoryStructureHost, directoryStructureHost.getDirectories),
        realpath: maybeBind(directoryStructureHost, directoryStructureHost.realpath),
        useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
        getCurrentDirectory: () => host.getCurrentDirectory(),
        onUnRecoverableConfigFileDiagnostic: host.onUnRecoverableConfigFileDiagnostic || returnUndefined,
        trace: host.trace ? s => host.trace!(s) : undefined,
    };
}

/**
 * Returns the target config filename of a project reference.
 * Note: The file might not exist.
 */
export function resolveProjectReferencePath(ref: ProjectReference): ResolvedConfigFileName {
    return resolveConfigFileProjectName(ref.path);
}

/**
 * Returns a DiagnosticMessage if we won't include a resolved module due to its extension.
 * The DiagnosticMessage's parameters are the imported module name, and the filename it resolved to.
 * This returns a diagnostic even if the module will be an untyped module.
 *
 * @internal
 */
export function getResolutionDiagnostic(options: CompilerOptions, { extension }: ResolvedModuleFull, { isDeclarationFile }: { isDeclarationFile: SourceFile["isDeclarationFile"]; }): DiagnosticMessage | undefined {
    switch (extension) {
        case Extension.Ts:
        case Extension.Dts:
        case Extension.Mts:
        case Extension.Dmts:
        case Extension.Cts:
        case Extension.Dcts:
            // These are always allowed.
            return undefined;
        case Extension.Tsx:
            return needJsx();
        case Extension.Jsx:
            return needJsx() || needAllowJs();
        case Extension.Js:
        case Extension.Mjs:
        case Extension.Cjs:
            return needAllowJs();
        case Extension.Json:
            return needResolveJsonModule();
        default:
            return needAllowArbitraryExtensions();
    }

    function needJsx() {
        return options.jsx ? undefined : Diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set;
    }
    function needAllowJs() {
        return getAllowJSCompilerOption(options) || !getStrictOptionValue(options, "noImplicitAny") ? undefined : Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type;
    }
    function needResolveJsonModule() {
        return getResolveJsonModule(options) ? undefined : Diagnostics.Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used;
    }
    function needAllowArbitraryExtensions() {
        // But don't report the allowArbitraryExtensions error from declaration files (no reason to report it, since the import doesn't have a runtime component)
        return isDeclarationFile || options.allowArbitraryExtensions ? undefined : Diagnostics.Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set;
    }
}

function getModuleNames({ imports, moduleAugmentations }: SourceFile): StringLiteralLike[] {
    const res = imports.map(i => i);
    for (const aug of moduleAugmentations) {
        if (aug.kind === SyntaxKind.StringLiteral) {
            res.push(aug);
        }
        // Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
    }
    return res;
}

/** @internal */
export function getModuleNameStringLiteralAt({ imports, moduleAugmentations }: SourceFileImportsList, index: number): StringLiteralLike {
    if (index < imports.length) return imports[index];
    let augIndex = imports.length;
    for (const aug of moduleAugmentations) {
        if (aug.kind === SyntaxKind.StringLiteral) {
            if (index === augIndex) return aug;
            augIndex++;
        }
        // Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
    }
    Debug.fail("should never ask for module name at index higher than possible module name");
}
