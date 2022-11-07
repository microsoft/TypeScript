namespace ts {
export function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName = "tsconfig.json"): string | undefined {
    return ts.forEachAncestorDirectory(searchPath, ancestor => {
        const fileName = ts.combinePaths(ancestor, configName);
        return fileExists(fileName) ? fileName : undefined;
    });
}

export function resolveTripleslashReference(moduleName: string, containingFile: string): string {
    const basePath = ts.getDirectoryPath(containingFile);
    const referencedFileName = ts.isRootedDiskPath(moduleName) ? moduleName : ts.combinePaths(basePath, moduleName);
    return ts.normalizePath(referencedFileName);
}

/* @internal */
export function computeCommonSourceDirectoryOfFilenames(fileNames: readonly string[], currentDirectory: string, getCanonicalFileName: ts.GetCanonicalFileName): string {
    let commonPathComponents: string[] | undefined;
    const failed = ts.forEach(fileNames, sourceFile => {
        // Each file contributes into common source file path
        const sourcePathComponents = ts.getNormalizedPathComponents(sourceFile, currentDirectory);
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

    return ts.getPathFromPathComponents(commonPathComponents);
}

export function createCompilerHost(options: ts.CompilerOptions, setParentNodes?: boolean): ts.CompilerHost {
    return createCompilerHostWorker(options, setParentNodes);
}

/*@internal*/
export function createGetSourceFile(
    readFile: ts.ProgramHost<any>["readFile"],
    getCompilerOptions: () => ts.CompilerOptions,
    setParentNodes: boolean | undefined
): ts.CompilerHost["getSourceFile"] {
    return (fileName, languageVersionOrOptions, onError) => {
        let text: string | undefined;
        try {
            ts.performance.mark("beforeIORead");
            text = readFile(fileName, getCompilerOptions().charset);
            ts.performance.mark("afterIORead");
            ts.performance.measure("I/O Read", "beforeIORead", "afterIORead");
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }
            text = "";
        }
        return text !== undefined ? ts.createSourceFile(fileName, text, languageVersionOrOptions, setParentNodes) : undefined;
    };
}

/*@internal*/
export function createWriteFileMeasuringIO(
    actualWriteFile: (path: string, data: string, writeByteOrderMark: boolean) => void,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean
): ts.CompilerHost["writeFile"] {
    return (fileName, data, writeByteOrderMark, onError) => {
        try {
            ts.performance.mark("beforeIOWrite");

            // NOTE: If patchWriteFileEnsuringDirectory has been called,
            // the system.writeFile will do its own directory creation and
            // the ensureDirectoriesExist call will always be redundant.
            ts.writeFileEnsuringDirectories(
                fileName,
                data,
                writeByteOrderMark,
                actualWriteFile,
                createDirectory,
                directoryExists
            );

            ts.performance.mark("afterIOWrite");
            ts.performance.measure("I/O Write", "beforeIOWrite", "afterIOWrite");
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }
        }
    };
}

/*@internal*/
export function createCompilerHostWorker(options: ts.CompilerOptions, setParentNodes?: boolean, system = ts.sys): ts.CompilerHost {
    const existingDirectories = new ts.Map<string, boolean>();
    const getCanonicalFileName = ts.createGetCanonicalFileName(system.useCaseSensitiveFileNames);
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
        return ts.getDirectoryPath(ts.normalizePath(system.getExecutingFilePath()));
    }

    const newLine = ts.getNewLineCharacter(options, () => system.newLine);
    const realpath = system.realpath && ((path: string) => system.realpath!(path));
    const compilerHost: ts.CompilerHost = {
        getSourceFile: createGetSourceFile(fileName => compilerHost.readFile(fileName), () => options, setParentNodes),
        getDefaultLibLocation,
        getDefaultLibFileName: options => ts.combinePaths(getDefaultLibLocation(), ts.getDefaultLibFileName(options)),
        writeFile: createWriteFileMeasuringIO(
            (path, data, writeByteOrderMark) => system.writeFile(path, data, writeByteOrderMark),
            path => (compilerHost.createDirectory || system.createDirectory)(path),
            path => directoryExists(path),
        ),
        getCurrentDirectory: ts.memoize(() => system.getCurrentDirectory()),
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
        createHash: ts.maybeBind(system, system.createHash)
    };
    return compilerHost;
}

/*@internal*/
interface CompilerHostLikeForCache {
    fileExists(fileName: string): boolean;
    readFile(fileName: string, encoding?: string): string | undefined;
    directoryExists?(directory: string): boolean;
    createDirectory?(directory: string): void;
    writeFile?: ts.WriteFileCallback;
}

/*@internal*/
export function changeCompilerHostLikeToUseCache(
    host: CompilerHostLikeForCache,
    toPath: (fileName: string) => ts.Path,
    getSourceFile?: ts.CompilerHost["getSourceFile"]
) {
    const originalReadFile = host.readFile;
    const originalFileExists = host.fileExists;
    const originalDirectoryExists = host.directoryExists;
    const originalCreateDirectory = host.createDirectory;
    const originalWriteFile = host.writeFile;
    const readFileCache = new ts.Map<ts.Path, string | false>();
    const fileExistsCache = new ts.Map<ts.Path, boolean>();
    const directoryExistsCache = new ts.Map<ts.Path, boolean>();
    const sourceFileCache = new ts.Map<ts.SourceFile["impliedNodeFormat"], ts.ESMap<ts.Path, ts.SourceFile>>();

    const readFileWithCache = (fileName: string): string | undefined => {
        const key = toPath(fileName);
        const value = readFileCache.get(key);
        if (value !== undefined) return value !== false ? value : undefined;
        return setReadFileCache(key, fileName);
    };
    const setReadFileCache = (key: ts.Path, fileName: string) => {
        const newValue = originalReadFile.call(host, fileName);
        readFileCache.set(key, newValue !== undefined ? newValue : false);
        return newValue;
    };
    host.readFile = fileName => {
        const key = toPath(fileName);
        const value = readFileCache.get(key);
        if (value !== undefined) return value !== false ? value : undefined; // could be .d.ts from output
        // Cache json or buildInfo
        if (!ts.fileExtensionIs(fileName, ts.Extension.Json) && !ts.isBuildInfoFile(fileName)) {
            return originalReadFile.call(host, fileName);
        }

        return setReadFileCache(key, fileName);
    };

    const getSourceFileWithCache: ts.CompilerHost["getSourceFile"] | undefined = getSourceFile ? (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
        const key = toPath(fileName);
        const impliedNodeFormat: ts.SourceFile["impliedNodeFormat"] = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions.impliedNodeFormat : undefined;
        const forImpliedNodeFormat = sourceFileCache.get(impliedNodeFormat);
        const value = forImpliedNodeFormat?.get(key);
        if (value) return value;

        const sourceFile = getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
        if (sourceFile && (ts.isDeclarationFileName(fileName) || ts.fileExtensionIs(fileName, ts.Extension.Json))) {
            sourceFileCache.set(impliedNodeFormat, (forImpliedNodeFormat || new ts.Map()).set(key, sourceFile));
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
        readFileWithCache
    };
}

export function getPreEmitDiagnostics(program: ts.Program, sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
/*@internal*/ export function getPreEmitDiagnostics(program: ts.BuilderProgram, sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[]; // eslint-disable-line @typescript-eslint/unified-signatures
export function getPreEmitDiagnostics(program: ts.Program | ts.BuilderProgram, sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
    let diagnostics: ts.Diagnostic[] | undefined;
    diagnostics = ts.addRange(diagnostics, program.getConfigFileParsingDiagnostics());
    diagnostics = ts.addRange(diagnostics, program.getOptionsDiagnostics(cancellationToken));
    diagnostics = ts.addRange(diagnostics, program.getSyntacticDiagnostics(sourceFile, cancellationToken));
    diagnostics = ts.addRange(diagnostics, program.getGlobalDiagnostics(cancellationToken));
    diagnostics = ts.addRange(diagnostics, program.getSemanticDiagnostics(sourceFile, cancellationToken));

    if (ts.getEmitDeclarations(program.getCompilerOptions())) {
        diagnostics = ts.addRange(diagnostics, program.getDeclarationDiagnostics(sourceFile, cancellationToken));
    }

    return ts.sortAndDeduplicateDiagnostics(diagnostics || ts.emptyArray);
}

export interface FormatDiagnosticsHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    getNewLine(): string;
}

export function formatDiagnostics(diagnostics: readonly ts.Diagnostic[], host: FormatDiagnosticsHost): string {
    let output = "";

    for (const diagnostic of diagnostics) {
        output += formatDiagnostic(diagnostic, host);
    }
    return output;
}

export function formatDiagnostic(diagnostic: ts.Diagnostic, host: FormatDiagnosticsHost): string {
    const errorMessage = `${ts.diagnosticCategoryName(diagnostic)} TS${diagnostic.code}: ${flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine())}${host.getNewLine()}`;

    if (diagnostic.file) {
        const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!); // TODO: GH#18217
        const fileName = diagnostic.file.fileName;
        const relativeFileName = ts.convertToRelativePath(fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName));
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
    Cyan = "\u001b[96m"
}
const gutterStyleSequence = "\u001b[7m";
const gutterSeparator = " ";
const resetEscapeSequence = "\u001b[0m";
const ellipsis = "...";
const halfIndent = "  ";
const indent = "    ";
function getCategoryFormat(category: ts.DiagnosticCategory): ForegroundColorEscapeSequences {
    switch (category) {
        case ts.DiagnosticCategory.Error: return ForegroundColorEscapeSequences.Red;
        case ts.DiagnosticCategory.Warning: return ForegroundColorEscapeSequences.Yellow;
        case ts.DiagnosticCategory.Suggestion: return ts.Debug.fail("Should never get an Info diagnostic on the command line.");
        case ts.DiagnosticCategory.Message: return ForegroundColorEscapeSequences.Blue;
    }
}

/** @internal */
export function formatColorAndReset(text: string, formatStyle: string) {
    return formatStyle + text + resetEscapeSequence;
}

function formatCodeSpan(file: ts.SourceFile, start: number, length: number, indent: string, squiggleColor: ForegroundColorEscapeSequences, host: FormatDiagnosticsHost) {
    const { line: firstLine, character: firstLineChar } = ts.getLineAndCharacterOfPosition(file, start);
    const { line: lastLine, character: lastLineChar } = ts.getLineAndCharacterOfPosition(file, start + length);
    const lastLineInFile = ts.getLineAndCharacterOfPosition(file, file.text.length).line;

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
            context += indent + formatColorAndReset(ts.padLeft(ellipsis, gutterWidth), gutterStyleSequence) + gutterSeparator + host.getNewLine();
            i = lastLine - 1;
        }

        const lineStart = ts.getPositionOfLineAndCharacter(file, i, 0);
        const lineEnd = i < lastLineInFile ? ts.getPositionOfLineAndCharacter(file, i + 1, 0) : file.text.length;
        let lineContent = file.text.slice(lineStart, lineEnd);
        lineContent = ts.trimStringEnd(lineContent);  // trim from end
        lineContent = lineContent.replace(/\t/g, " ");   // convert tabs to single spaces

        // Output the gutter and the actual contents of the line.
        context += indent + formatColorAndReset(ts.padLeft(i + 1 + "", gutterWidth), gutterStyleSequence) + gutterSeparator;
        context += lineContent + host.getNewLine();

        // Output the gutter and the error span for the line using tildes.
        context += indent + formatColorAndReset(ts.padLeft("", gutterWidth), gutterStyleSequence) + gutterSeparator;
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

/* @internal */
export function formatLocation(file: ts.SourceFile, start: number, host: FormatDiagnosticsHost, color = formatColorAndReset) {
    const { line: firstLine, character: firstLineChar } = ts.getLineAndCharacterOfPosition(file, start); // TODO: GH#18217
    const relativeFileName = host ? ts.convertToRelativePath(file.fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName)) : file.fileName;

    let output = "";
    output += color(relativeFileName, ForegroundColorEscapeSequences.Cyan);
    output += ":";
    output += color(`${firstLine + 1}`, ForegroundColorEscapeSequences.Yellow);
    output += ":";
    output += color(`${firstLineChar + 1}`, ForegroundColorEscapeSequences.Yellow);
    return output;
}

export function formatDiagnosticsWithColorAndContext(diagnostics: readonly ts.Diagnostic[], host: FormatDiagnosticsHost): string {
    let output = "";
    for (const diagnostic of diagnostics) {
        if (diagnostic.file) {
            const { file, start } = diagnostic;
            output += formatLocation(file, start!, host); // TODO: GH#18217
            output += " - ";
        }

        output += formatColorAndReset(ts.diagnosticCategoryName(diagnostic), getCategoryFormat(diagnostic.category));
        output += formatColorAndReset(` TS${diagnostic.code}: `, ForegroundColorEscapeSequences.Grey);
        output += flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine());

        if (diagnostic.file) {
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

export function flattenDiagnosticMessageText(diag: string | ts.DiagnosticMessageChain | undefined, newLine: string, indent = 0): string {
    if (ts.isString(diag)) {
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

/* @internal */
export function loadWithTypeDirectiveCache<T>(names: string[] | readonly ts.FileReference[], containingFile: string, redirectedReference: ts.ResolvedProjectReference | undefined, containingFileMode: ts.SourceFile["impliedNodeFormat"], loader: (name: string, containingFile: string, redirectedReference: ts.ResolvedProjectReference | undefined, resolutionMode: ts.SourceFile["impliedNodeFormat"]) => T): T[] {
    if (names.length === 0) {
        return [];
    }
    const resolutions: T[] = [];
    const cache = new ts.Map<string, T>();
    for (const name of names) {
        let result: T;
        const mode = getModeForFileReference(name, containingFileMode);
        // We lower-case all type references because npm automatically lowercases all packages. See GH#9824.
        const strName = ts.isString(name) ? name : name.fileName.toLowerCase();
        const cacheKey = mode !== undefined ? `${mode}|${strName}` : strName;
        if (cache.has(cacheKey)) {
            result = cache.get(cacheKey)!;
        }
        else {
            cache.set(cacheKey, result = loader(strName, containingFile, redirectedReference, mode));
        }
        resolutions.push(result);
    }
    return resolutions;
}

/**
 * Subset of a SourceFile used to calculate index-based resolutions
 * This includes some internal fields, so unless you have very good reason,
 * (and are willing to use some less stable internals) you should probably just pass a SourceFile.
 *
 * @internal
 */
export interface SourceFileImportsList {
    /* @internal */ imports: ts.SourceFile["imports"];
    /* @internal */ moduleAugmentations: ts.SourceFile["moduleAugmentations"];
    impliedNodeFormat?: ts.SourceFile["impliedNodeFormat"];
}

/**
 * Calculates the resulting resolution mode for some reference in some file - this is generally the explicitly
 * provided resolution mode in the reference, unless one is not present, in which case it is the mode of the containing file.
 */
export function getModeForFileReference(ref: ts.FileReference | string, containingFileMode: ts.SourceFile["impliedNodeFormat"]) {
    return (ts.isString(ref) ? containingFileMode : ref.resolutionMode) || containingFileMode;
}

/**
 * Calculates the final resolution mode for an import at some index within a file's imports list. This is generally the explicitly
 * defined mode of the import if provided, or, if not, the mode of the containing file (with some exceptions: import=require is always commonjs, dynamic import is always esm).
 * If you have an actual import node, prefer using getModeForUsageLocation on the reference string node.
 * @param file File to fetch the resolution mode within
 * @param index Index into the file's complete resolution list to get the resolution of - this is a concatenation of the file's imports and module augmentations
 */
export function getModeForResolutionAtIndex(file: ts.SourceFile, index: number): ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined;
/** @internal */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function getModeForResolutionAtIndex(file: SourceFileImportsList, index: number): ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined;
export function getModeForResolutionAtIndex(file: SourceFileImportsList, index: number): ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined {
    if (file.impliedNodeFormat === undefined) return undefined;
    // we ensure all elements of file.imports and file.moduleAugmentations have the relevant parent pointers set during program setup,
    // so it's safe to use them even pre-bind
    return getModeForUsageLocation(file, getModuleNameStringLiteralAt(file, index));
}

/* @internal */
export function isExclusivelyTypeOnlyImportOrExport(decl: ts.ImportDeclaration | ts.ExportDeclaration) {
    if (ts.isExportDeclaration(decl)) {
        return decl.isTypeOnly;
    }
    if (decl.importClause?.isTypeOnly) {
        return true;
    }
    return false;
}

/**
 * Calculates the final resolution mode for a given module reference node. This is generally the explicitly provided resolution mode, if
 * one exists, or the mode of the containing source file. (Excepting import=require, which is always commonjs, and dynamic import, which is always esm).
 * Notably, this function always returns `undefined` if the containing file has an `undefined` `impliedNodeFormat` - this field is only set when
 * `moduleResolution` is `node16`+.
 * @param file The file the import or import-like reference is contained within
 * @param usage The module reference string
 * @returns The final resolution mode of the import
 */
export function getModeForUsageLocation(file: {impliedNodeFormat?: ts.SourceFile["impliedNodeFormat"]}, usage: ts.StringLiteralLike) {
    if (file.impliedNodeFormat === undefined) return undefined;
    if ((ts.isImportDeclaration(usage.parent) || ts.isExportDeclaration(usage.parent))) {
        const isTypeOnly = isExclusivelyTypeOnlyImportOrExport(usage.parent);
        if (isTypeOnly) {
            const override = getResolutionModeOverrideForClause(usage.parent.assertClause);
            if (override) {
                return override;
            }
        }
    }
    if (usage.parent.parent && ts.isImportTypeNode(usage.parent.parent)) {
        const override = getResolutionModeOverrideForClause(usage.parent.parent.assertions?.assertClause);
        if (override) {
            return override;
        }
    }
    if (file.impliedNodeFormat !== ts.ModuleKind.ESNext) {
        // in cjs files, import call expressions are esm format, otherwise everything is cjs
        return ts.isImportCall(ts.walkUpParenthesizedExpressions(usage.parent)) ? ts.ModuleKind.ESNext : ts.ModuleKind.CommonJS;
    }
    // in esm files, import=require statements are cjs format, otherwise everything is esm
    // imports are only parent'd up to their containing declaration/expression, so access farther parents with care
    const exprParentParent = ts.walkUpParenthesizedExpressions(usage.parent)?.parent;
    return exprParentParent && ts.isImportEqualsDeclaration(exprParentParent) ? ts.ModuleKind.CommonJS : ts.ModuleKind.ESNext;
}

/* @internal */
export function getResolutionModeOverrideForClause(clause: ts.AssertClause | undefined, grammarErrorOnNode?: (node: ts.Node, diagnostic: ts.DiagnosticMessage) => void) {
    if (!clause) return undefined;
    if (ts.length(clause.elements) !== 1) {
        grammarErrorOnNode?.(clause, ts.Diagnostics.Type_import_assertions_should_have_exactly_one_key_resolution_mode_with_value_import_or_require);
        return undefined;
    }
    const elem = clause.elements[0];
    if (!ts.isStringLiteralLike(elem.name)) return undefined;
    if (elem.name.text !== "resolution-mode") {
        grammarErrorOnNode?.(elem.name, ts.Diagnostics.resolution_mode_is_the_only_valid_key_for_type_import_assertions);
        return undefined;
    }
    if (!ts.isStringLiteralLike(elem.value)) return undefined;
    if (elem.value.text !== "import" && elem.value.text !== "require") {
        grammarErrorOnNode?.(elem.value, ts.Diagnostics.resolution_mode_should_be_either_require_or_import);
        return undefined;
    }
    return elem.value.text === "import" ? ts.ModuleKind.ESNext : ts.ModuleKind.CommonJS;
}

/* @internal */
export function loadWithModeAwareCache<T>(names: readonly ts.StringLiteralLike[] | readonly string[], containingFile: ts.SourceFile, containingFileName: string, redirectedReference: ts.ResolvedProjectReference | undefined, resolutionInfo: ts.ModuleResolutionInfo | undefined, loader: (name: string, resolverMode: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined, containingFileName: string, redirectedReference: ts.ResolvedProjectReference | undefined) => T): T[] {
    if (names.length === 0) {
        return [];
    }
    const resolutions: T[] = [];
    const cache = new ts.Map<string, T>();
    let i = 0;
    for (const entry of resolutionInfo ? resolutionInfo.names : names) {
        let result: T;
        const mode = !ts.isString(entry) ?
            getModeForUsageLocation(containingFile, entry) :
            getModeForResolutionAtIndex(containingFile, i);
        i++;
        const name = ts.isString(entry) ? entry : entry.text;
        const cacheKey = mode !== undefined ? `${mode}|${name}` : name;
        if (cache.has(cacheKey)) {
            result = cache.get(cacheKey)!;
        }
        else {
            cache.set(cacheKey, result = loader(name, mode, containingFileName, redirectedReference));
        }
        resolutions.push(result);
    }
    return resolutions;
}

/* @internal */
export function forEachResolvedProjectReference<T>(
    resolvedProjectReferences: readonly (ts.ResolvedProjectReference | undefined)[] | undefined,
    cb: (resolvedProjectReference: ts.ResolvedProjectReference, parent: ts.ResolvedProjectReference | undefined) => T | undefined
): T | undefined {
    return forEachProjectReference(/*projectReferences*/ undefined, resolvedProjectReferences, (resolvedRef, parent) => resolvedRef && cb(resolvedRef, parent));
}

function forEachProjectReference<T>(
    projectReferences: readonly ts.ProjectReference[] | undefined,
    resolvedProjectReferences: readonly (ts.ResolvedProjectReference | undefined)[] | undefined,
    cbResolvedRef: (resolvedRef: ts.ResolvedProjectReference | undefined, parent: ts.ResolvedProjectReference | undefined, index: number) => T | undefined,
    cbRef?: (projectReferences: readonly ts.ProjectReference[] | undefined, parent: ts.ResolvedProjectReference | undefined) => T | undefined
): T | undefined {
    let seenResolvedRefs: ts.Set<ts.Path> | undefined;

    return worker(projectReferences, resolvedProjectReferences, /*parent*/ undefined);

    function worker(
        projectReferences: readonly ts.ProjectReference[] | undefined,
        resolvedProjectReferences: readonly (ts.ResolvedProjectReference | undefined)[] | undefined,
        parent: ts.ResolvedProjectReference | undefined,
    ): T | undefined {

        // Visit project references first
        if (cbRef) {
            const result = cbRef(projectReferences, parent);
            if (result) return result;
        }

        return ts.forEach(resolvedProjectReferences, (resolvedRef, index) => {
            if (resolvedRef && seenResolvedRefs?.has(resolvedRef.sourceFile.path)) {
                // ignore recursives
                return undefined;
            }

            const result = cbResolvedRef(resolvedRef, parent, index);
            if (result || !resolvedRef) return result;

            (seenResolvedRefs ||= new ts.Set()).add(resolvedRef.sourceFile.path);
            return worker(resolvedRef.commandLine.projectReferences, resolvedRef.references, resolvedRef);
        });
    }
}

/* @internal */
export const inferredTypesContainingFile = "__inferred type names__.ts";

interface DiagnosticCache<T extends ts.Diagnostic> {
    perFile?: ts.ESMap<ts.Path, readonly T[]>;
    allDiagnostics?: readonly T[];
}

/*@internal*/
export function isReferencedFile(reason: ts.FileIncludeReason | undefined): reason is ts.ReferencedFile {
    switch (reason?.kind) {
        case ts.FileIncludeKind.Import:
        case ts.FileIncludeKind.ReferenceFile:
        case ts.FileIncludeKind.TypeReferenceDirective:
        case ts.FileIncludeKind.LibReferenceDirective:
            return true;
        default:
            return false;
    }
}

/*@internal*/
export interface ReferenceFileLocation {
    file: ts.SourceFile;
    pos: number;
    end: number;
    packageId: ts.PackageId | undefined;
}

/*@internal*/
export interface SyntheticReferenceFileLocation {
    file: ts.SourceFile;
    packageId: ts.PackageId | undefined;
    text: string;
}

/*@internal*/
export function isReferenceFileLocation(location: ReferenceFileLocation | SyntheticReferenceFileLocation): location is ReferenceFileLocation {
    return (location as ReferenceFileLocation).pos !== undefined;
}

/*@internal*/
export function getReferencedFileLocation(getSourceFileByPath: (path: ts.Path) => ts.SourceFile | undefined, ref: ts.ReferencedFile): ReferenceFileLocation | SyntheticReferenceFileLocation {
    const file = ts.Debug.checkDefined(getSourceFileByPath(ref.file));
    const { kind, index } = ref;
    let pos: number | undefined, end: number | undefined, packageId: ts.PackageId | undefined, resolutionMode: ts.FileReference["resolutionMode"] | undefined;
    switch (kind) {
        case ts.FileIncludeKind.Import:
            const importLiteral = getModuleNameStringLiteralAt(file, index);
            packageId = file.resolvedModules?.get(importLiteral.text, getModeForResolutionAtIndex(file, index))?.packageId;
            if (importLiteral.pos === -1) return { file, packageId, text: importLiteral.text };
            pos = ts.skipTrivia(file.text, importLiteral.pos);
            end = importLiteral.end;
            break;
        case ts.FileIncludeKind.ReferenceFile:
            ({ pos, end } = file.referencedFiles[index]);
            break;
        case ts.FileIncludeKind.TypeReferenceDirective:
            ({ pos, end, resolutionMode } = file.typeReferenceDirectives[index]);
            packageId = file.resolvedTypeReferenceDirectiveNames?.get(ts.toFileNameLowerCase(file.typeReferenceDirectives[index].fileName), resolutionMode || file.impliedNodeFormat)?.packageId;
            break;
        case ts.FileIncludeKind.LibReferenceDirective:
            ({ pos, end } = file.libReferenceDirectives[index]);
            break;
        default:
            return ts.Debug.assertNever(kind);
    }
    return { file, pos, end, packageId };
}

/**
 * Determines if program structure is upto date or needs to be recreated
 */
/* @internal */
export function isProgramUptoDate(
    program: ts.Program | undefined,
    rootFileNames: string[],
    newOptions: ts.CompilerOptions,
    getSourceVersion: (path: ts.Path, fileName: string) => string | undefined,
    fileExists: (fileName: string) => boolean,
    hasInvalidatedResolutions: ts.HasInvalidatedResolutions,
    hasChangedAutomaticTypeDirectiveNames: ts.HasChangedAutomaticTypeDirectiveNames | undefined,
    getParsedCommandLine: (fileName: string) => ts.ParsedCommandLine | undefined,
    projectReferences: readonly ts.ProjectReference[] | undefined
): boolean {
    // If we haven't created a program yet or have changed automatic type directives, then it is not up-to-date
    if (!program || hasChangedAutomaticTypeDirectiveNames?.()) return false;

    // If root file names don't match
    if (!ts.arrayIsEqualTo(program.getRootFileNames(), rootFileNames)) return false;

    let seenResolvedRefs: ts.ResolvedProjectReference[] | undefined;

    // If project references don't match
    if (!ts.arrayIsEqualTo(program.getProjectReferences(), projectReferences, projectReferenceUptoDate)) return false;

    // If any file is not up-to-date, then the whole program is not up-to-date
    if (program.getSourceFiles().some(sourceFileNotUptoDate)) return false;

    // If any of the missing file paths are now created
    if (program.getMissingFilePaths().some(fileExists)) return false;

    const currentOptions = program.getCompilerOptions();
    // If the compilation settings do no match, then the program is not up-to-date
    if (!ts.compareDataObjects(currentOptions, newOptions)) return false;

    // If everything matches but the text of config file is changed,
    // error locations can change for program options, so update the program
    if (currentOptions.configFile && newOptions.configFile) return currentOptions.configFile.text === newOptions.configFile.text;

    return true;

    function sourceFileNotUptoDate(sourceFile: ts.SourceFile) {
        return !sourceFileVersionUptoDate(sourceFile) ||
            hasInvalidatedResolutions(sourceFile.path);
    }

    function sourceFileVersionUptoDate(sourceFile: ts.SourceFile) {
        return sourceFile.version === getSourceVersion(sourceFile.resolvedPath, sourceFile.fileName);
    }

    function projectReferenceUptoDate(oldRef: ts.ProjectReference, newRef: ts.ProjectReference, index: number) {
        return ts.projectReferenceIsEqualTo(oldRef, newRef) &&
            resolvedProjectReferenceUptoDate(program!.getResolvedProjectReferences()![index], oldRef);
    }

    function resolvedProjectReferenceUptoDate(oldResolvedRef: ts.ResolvedProjectReference | undefined, oldRef: ts.ProjectReference): boolean {
        if (oldResolvedRef) {
                // Assume true
            if (ts.contains(seenResolvedRefs, oldResolvedRef)) return true;

            const refPath = resolveProjectReferencePath(oldRef);
            const newParsedCommandLine = getParsedCommandLine(refPath);

            // Check if config file exists
            if (!newParsedCommandLine) return false;

            // If change in source file
            if (oldResolvedRef.commandLine.options.configFile !== newParsedCommandLine.options.configFile) return false;

            // check file names
            if (!ts.arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newParsedCommandLine.fileNames)) return false;

            // Add to seen before checking the referenced paths of this config file
            (seenResolvedRefs || (seenResolvedRefs = [])).push(oldResolvedRef);

            // If child project references are upto date, this project reference is uptodate
            return !ts.forEach(oldResolvedRef.references, (childResolvedRef, index) =>
                !resolvedProjectReferenceUptoDate(childResolvedRef, oldResolvedRef.commandLine.projectReferences![index]));
        }

        // In old program, not able to resolve project reference path,
        // so if config file doesnt exist, it is uptodate.
        const refPath = resolveProjectReferencePath(oldRef);
        return !getParsedCommandLine(refPath);
    }
}

export function getConfigFileParsingDiagnostics(configFileParseResult: ts.ParsedCommandLine): readonly ts.Diagnostic[] {
    return configFileParseResult.options.configFile ?
        [...configFileParseResult.options.configFile.parseDiagnostics, ...configFileParseResult.errors] :
        configFileParseResult.errors;
}

/**
 * A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
 * `options` parameter.
 *
 * @param fileName The normalized absolute path to check the format of (it need not exist on disk)
 * @param [packageJsonInfoCache] A cache for package file lookups - it's best to have a cache when this function is called often
 * @param host The ModuleResolutionHost which can perform the filesystem lookups for package json data
 * @param options The compiler options to perform the analysis under - relevant options are `moduleResolution` and `traceResolution`
 * @returns `undefined` if the path has no relevant implied format, `ModuleKind.ESNext` for esm format, and `ModuleKind.CommonJS` for cjs format
 */
export function getImpliedNodeFormatForFile(fileName: ts.Path, packageJsonInfoCache: ts.PackageJsonInfoCache | undefined, host: ts.ModuleResolutionHost, options: ts.CompilerOptions): ts.ModuleKind.ESNext | ts.ModuleKind.CommonJS | undefined {
    const result = getImpliedNodeFormatForFileWorker(fileName, packageJsonInfoCache, host, options);
    return typeof result === "object" ? result.impliedNodeFormat : result;
}

/*@internal*/
export function getImpliedNodeFormatForFileWorker(
    fileName: string,
    packageJsonInfoCache: ts.PackageJsonInfoCache | undefined,
    host: ts.ModuleResolutionHost,
    options: ts.CompilerOptions,
) {
    switch (ts.getEmitModuleResolutionKind(options)) {
        case ts.ModuleResolutionKind.Node16:
        case ts.ModuleResolutionKind.NodeNext:
            return ts.fileExtensionIsOneOf(fileName, [ts.Extension.Dmts, ts.Extension.Mts, ts.Extension.Mjs]) ? ts.ModuleKind.ESNext :
                ts.fileExtensionIsOneOf(fileName, [ts.Extension.Dcts, ts.Extension.Cts, ts.Extension.Cjs]) ? ts.ModuleKind.CommonJS :
                ts.fileExtensionIsOneOf(fileName, [ts.Extension.Dts, ts.Extension.Ts, ts.Extension.Tsx, ts.Extension.Js, ts.Extension.Jsx]) ? lookupFromPackageJson() :
                undefined; // other extensions, like `json` or `tsbuildinfo`, are set as `undefined` here but they should never be fed through the transformer pipeline
        default:
            return undefined;
    }
    function lookupFromPackageJson(): Partial<ts.CreateSourceFileOptions> {
        const state = ts.getTemporaryModuleResolutionState(packageJsonInfoCache, host, options);
        const packageJsonLocations: string[] = [];
        state.failedLookupLocations = packageJsonLocations;
        state.affectingLocations = packageJsonLocations;
        const packageJsonScope = ts.getPackageScopeForPath(fileName, state);
        const impliedNodeFormat = packageJsonScope?.contents.packageJsonContent.type === "module" ? ts.ModuleKind.ESNext : ts.ModuleKind.CommonJS;
        return { impliedNodeFormat, packageJsonLocations, packageJsonScope };
    }
}

/** @internal */
export const plainJSErrors: ts.Set<number> = new ts.Set([
    // binder errors
    ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0.code,
    ts.Diagnostics.A_module_cannot_have_multiple_default_exports.code,
    ts.Diagnostics.Another_export_default_is_here.code,
    ts.Diagnostics.The_first_export_default_is_here.code,
    ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module.code,
    ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode.code,
    ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here.code,
    ts.Diagnostics.constructor_is_a_reserved_word.code,
    ts.Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode.code,
    ts.Diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode.code,
    ts.Diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode.code,
    ts.Diagnostics.Invalid_use_of_0_in_strict_mode.code,
    ts.Diagnostics.A_label_is_not_allowed_here.code,
    ts.Diagnostics.Octal_literals_are_not_allowed_in_strict_mode.code,
    ts.Diagnostics.with_statements_are_not_allowed_in_strict_mode.code,
    // grammar errors
    ts.Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement.code,
    ts.Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement.code,
    ts.Diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name.code,
    ts.Diagnostics.A_class_member_cannot_have_the_0_keyword.code,
    ts.Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name.code,
    ts.Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement.code,
    ts.Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement.code,
    ts.Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement.code,
    ts.Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement.code,
    ts.Diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration.code,
    ts.Diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context.code,
    ts.Diagnostics.A_destructuring_declaration_must_have_an_initializer.code,
    ts.Diagnostics.A_get_accessor_cannot_have_parameters.code,
    ts.Diagnostics.A_rest_element_cannot_contain_a_binding_pattern.code,
    ts.Diagnostics.A_rest_element_cannot_have_a_property_name.code,
    ts.Diagnostics.A_rest_element_cannot_have_an_initializer.code,
    ts.Diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern.code,
    ts.Diagnostics.A_rest_parameter_cannot_have_an_initializer.code,
    ts.Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list.code,
    ts.Diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma.code,
    ts.Diagnostics.A_return_statement_cannot_be_used_inside_a_class_static_block.code,
    ts.Diagnostics.A_set_accessor_cannot_have_rest_parameter.code,
    ts.Diagnostics.A_set_accessor_must_have_exactly_one_parameter.code,
    ts.Diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module.code,
    ts.Diagnostics.An_export_declaration_cannot_have_modifiers.code,
    ts.Diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module.code,
    ts.Diagnostics.An_import_declaration_cannot_have_modifiers.code,
    ts.Diagnostics.An_object_member_cannot_be_declared_optional.code,
    ts.Diagnostics.Argument_of_dynamic_import_cannot_be_spread_element.code,
    ts.Diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable.code,
    ts.Diagnostics.Cannot_redeclare_identifier_0_in_catch_clause.code,
    ts.Diagnostics.Catch_clause_variable_cannot_have_an_initializer.code,
    ts.Diagnostics.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator.code,
    ts.Diagnostics.Classes_can_only_extend_a_single_class.code,
    ts.Diagnostics.Classes_may_not_have_a_field_named_constructor.code,
    ts.Diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.code,
    ts.Diagnostics.Duplicate_label_0.code,
    ts.Diagnostics.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_assertion_as_arguments.code,
    ts.Diagnostics.For_await_loops_cannot_be_used_inside_a_class_static_block.code,
    ts.Diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression.code,
    ts.Diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name.code,
    ts.Diagnostics.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array.code,
    ts.Diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names.code,
    ts.Diagnostics.Jump_target_cannot_cross_function_boundary.code,
    ts.Diagnostics.Line_terminator_not_permitted_before_arrow.code,
    ts.Diagnostics.Modifiers_cannot_appear_here.code,
    ts.Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement.code,
    ts.Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement.code,
    ts.Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies.code,
    ts.Diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression.code,
    ts.Diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier.code,
    ts.Diagnostics.Tagged_template_expressions_are_not_permitted_in_an_optional_chain.code,
    ts.Diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async.code,
    ts.Diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer.code,
    ts.Diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer.code,
    ts.Diagnostics.Trailing_comma_not_allowed.code,
    ts.Diagnostics.Variable_declaration_list_cannot_be_empty.code,
    ts.Diagnostics._0_and_1_operations_cannot_be_mixed_without_parentheses.code,
    ts.Diagnostics._0_expected.code,
    ts.Diagnostics._0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2.code,
    ts.Diagnostics._0_list_cannot_be_empty.code,
    ts.Diagnostics._0_modifier_already_seen.code,
    ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration.code,
    ts.Diagnostics._0_modifier_cannot_appear_on_a_module_or_namespace_element.code,
    ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter.code,
    ts.Diagnostics._0_modifier_cannot_appear_on_class_elements_of_this_kind.code,
    ts.Diagnostics._0_modifier_cannot_be_used_here.code,
    ts.Diagnostics._0_modifier_must_precede_1_modifier.code,
    ts.Diagnostics.const_declarations_can_only_be_declared_inside_a_block.code,
    ts.Diagnostics.const_declarations_must_be_initialized.code,
    ts.Diagnostics.extends_clause_already_seen.code,
    ts.Diagnostics.let_declarations_can_only_be_declared_inside_a_block.code,
    ts.Diagnostics.let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations.code,
    ts.Diagnostics.Class_constructor_may_not_be_a_generator.code,
    ts.Diagnostics.Class_constructor_may_not_be_an_accessor.code,
    ts.Diagnostics.await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.code,
]);

/**
 * Determine if source file needs to be re-created even if its text hasn't changed
 */
function shouldProgramCreateNewSourceFiles(program: ts.Program | undefined, newOptions: ts.CompilerOptions): boolean {
    if (!program) return false;
    // If any compiler options change, we can't reuse old source file even if version match
    // The change in options like these could result in change in syntax tree or `sourceFile.bindDiagnostics`.
    return ts.optionsHaveChanges(program.getCompilerOptions(), newOptions, ts.sourceFileAffectingCompilerOptions);
}

function createCreateProgramOptions(rootNames: readonly string[], options: ts.CompilerOptions, host?: ts.CompilerHost, oldProgram?: ts.Program, configFileParsingDiagnostics?: readonly ts.Diagnostic[]): ts.CreateProgramOptions {
    return {
        rootNames,
        options,
        host,
        oldProgram,
        configFileParsingDiagnostics
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
export function createProgram(createProgramOptions: ts.CreateProgramOptions): ts.Program;
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
export function createProgram(rootNames: readonly string[], options: ts.CompilerOptions, host?: ts.CompilerHost, oldProgram?: ts.Program, configFileParsingDiagnostics?: readonly ts.Diagnostic[]): ts.Program;
export function createProgram(rootNamesOrOptions: readonly string[] | ts.CreateProgramOptions, _options?: ts.CompilerOptions, _host?: ts.CompilerHost, _oldProgram?: ts.Program, _configFileParsingDiagnostics?: readonly ts.Diagnostic[]): ts.Program {
    const createProgramOptions = ts.isArray(rootNamesOrOptions) ? createCreateProgramOptions(rootNamesOrOptions, _options!, _host, _oldProgram, _configFileParsingDiagnostics) : rootNamesOrOptions; // TODO: GH#18217
    const { rootNames, options, configFileParsingDiagnostics, projectReferences } = createProgramOptions;
    let { oldProgram } = createProgramOptions;

    let processingDefaultLibFiles: ts.SourceFile[] | undefined;
    let processingOtherFiles: ts.SourceFile[] | undefined;
    let files: ts.SourceFile[];
    let symlinks: ts.SymlinkCache | undefined;
    let commonSourceDirectory: string;
    let typeChecker: ts.TypeChecker;
    let classifiableNames: ts.Set<ts.__String>;
    const ambientModuleNameToUnmodifiedFileName = new ts.Map<string, string>();
    let fileReasons = ts.createMultiMap<ts.Path, ts.FileIncludeReason>();
    const cachedBindAndCheckDiagnosticsForFile: DiagnosticCache<ts.Diagnostic> = {};
    const cachedDeclarationDiagnosticsForFile: DiagnosticCache<ts.DiagnosticWithLocation> = {};

    let resolvedTypeReferenceDirectives = ts.createModeAwareCache<ts.ResolvedTypeReferenceDirective | undefined>();
    let fileProcessingDiagnostics: ts.FilePreprocessingDiagnostics[] | undefined;

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
    const modulesWithElidedImports = new ts.Map<string, boolean>();

    // Track source files that are source files found by searching under node_modules, as these shouldn't be compiled.
    const sourceFilesFoundSearchingNodeModules = new ts.Map<string, boolean>();

    ts.tracing?.push(ts.tracing.Phase.Program, "createProgram", { configFilePath: options.configFilePath, rootDir: options.rootDir }, /*separateBeginAndEnd*/ true);
    ts.performance.mark("beforeProgram");

    const host = createProgramOptions.host || createCompilerHost(options);
    const configParsingHost = parseConfigHostFromCompilerHostLike(host);

    let skipDefaultLib = options.noLib;
    const getDefaultLibraryFileName = ts.memoize(() => host.getDefaultLibFileName(options));
    const defaultLibraryPath = host.getDefaultLibLocation ? host.getDefaultLibLocation() : ts.getDirectoryPath(getDefaultLibraryFileName());
    const programDiagnostics = ts.createDiagnosticCollection();
    const currentDirectory = host.getCurrentDirectory();
    const supportedExtensions = ts.getSupportedExtensions(options);
    const supportedExtensionsWithJsonIfResolveJsonModule = ts.getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);

    // Map storing if there is emit blocking diagnostics for given input
    const hasEmitBlockingDiagnostics = new ts.Map<string, boolean>();
    let _compilerOptionsObjectLiteralSyntax: ts.ObjectLiteralExpression | false | undefined;

    let moduleResolutionCache: ts.ModuleResolutionCache | undefined;
    let typeReferenceDirectiveResolutionCache: ts.TypeReferenceDirectiveResolutionCache | undefined;
    let actualResolveModuleNamesWorker: (
        moduleNames: readonly ts.StringLiteralLike[],
        containingFile: ts.SourceFile,
        containingFileName: string,
        redirectedReference: ts.ResolvedProjectReference | undefined,
        resolutionInfo: ts.ModuleResolutionInfo | undefined,
    ) => (ts.ResolvedModuleFull | undefined)[];
    const hasInvalidatedResolutions = host.hasInvalidatedResolutions || ts.returnFalse;
    if (host.resolveModuleNames) {
        actualResolveModuleNamesWorker = (moduleNames, containingFile, containingFileName, redirectedReference, resolutionInfo) =>
            host.resolveModuleNames!(
                moduleNames.map(literal => literal.text),
                containingFileName,
                resolutionInfo?.reusedNames?.map(literal => literal.text),
                redirectedReference,
                options,
                containingFile,
                resolutionInfo,
            ).map(resolved => {
                // An older host may have omitted extension, in which case we should infer it from the file extension of resolvedFileName.
                if (!resolved || (resolved as ts.ResolvedModuleFull).extension !== undefined) {
                    return resolved as ts.ResolvedModuleFull;
                }
                const withExtension = ts.clone(resolved) as ts.ResolvedModuleFull;
                withExtension.extension = ts.extensionFromPath(resolved.resolvedFileName);
                return withExtension;
            });
        moduleResolutionCache = host.getModuleResolutionCache?.();
    }
    else {
        moduleResolutionCache = ts.createModuleResolutionCache(currentDirectory, getCanonicalFileName, options);
        const loader = (moduleName: string, resolverMode: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined, containingFileName: string, redirectedReference: ts.ResolvedProjectReference | undefined) =>
            ts.resolveModuleName(moduleName, containingFileName, options, host, moduleResolutionCache, redirectedReference, resolverMode).resolvedModule;
        actualResolveModuleNamesWorker = (moduleNames, containingFile, containingFileName, redirectedReference, resolutionInfo) =>
            loadWithModeAwareCache(moduleNames, containingFile, containingFileName, redirectedReference, resolutionInfo, loader);
    }

    let actualResolveTypeReferenceDirectiveNamesWorker: (typeDirectiveNames: string[] | readonly ts.FileReference[], containingFile: string, redirectedReference?: ts.ResolvedProjectReference, containingFileMode?: ts.SourceFile["impliedNodeFormat"] | undefined) => (ts.ResolvedTypeReferenceDirective | undefined)[];
    if (host.resolveTypeReferenceDirectives) {
        actualResolveTypeReferenceDirectiveNamesWorker = (typeDirectiveNames, containingFile, redirectedReference, containingFileMode) => host.resolveTypeReferenceDirectives!(ts.Debug.checkEachDefined(typeDirectiveNames), containingFile, redirectedReference, options, containingFileMode);
    }
    else {
        typeReferenceDirectiveResolutionCache = ts.createTypeReferenceDirectiveResolutionCache(currentDirectory, getCanonicalFileName, /*options*/ undefined, moduleResolutionCache?.getPackageJsonInfoCache());
        const loader = (typesRef: string, containingFile: string, redirectedReference: ts.ResolvedProjectReference | undefined, resolutionMode: ts.SourceFile["impliedNodeFormat"] | undefined) => ts.resolveTypeReferenceDirective(
            typesRef,
            containingFile,
            options,
            host,
            redirectedReference,
            typeReferenceDirectiveResolutionCache,
            resolutionMode,
        ).resolvedTypeReferenceDirective!; // TODO: GH#18217
        actualResolveTypeReferenceDirectiveNamesWorker = (typeReferenceDirectiveNames, containingFile, redirectedReference, containingFileMode) => loadWithTypeDirectiveCache<ts.ResolvedTypeReferenceDirective>(ts.Debug.checkEachDefined(typeReferenceDirectiveNames), containingFile, redirectedReference, containingFileMode, loader);
    }

    // Map from a stringified PackageId to the source file with that id.
    // Only one source file may have a given packageId. Others become redirects (see createRedirectSourceFile).
    // `packageIdToSourceFile` is only used while building the program, while `sourceFileToPackageName` and `isSourceFileTargetOfRedirect` are kept around.
    const packageIdToSourceFile = new ts.Map<string, ts.SourceFile>();
    // Maps from a SourceFile's `.path` to the name of the package it was imported with.
    let sourceFileToPackageName = new ts.Map<ts.Path, string>();
    // Key is a file name. Value is the (non-empty, or undefined) list of files that redirect to it.
    let redirectTargetsMap = ts.createMultiMap<ts.Path, string>();
    let usesUriStyleNodeCoreModules = false;

    /**
     * map with
     * - SourceFile if present
     * - false if sourceFile missing for source of project reference redirect
     * - undefined otherwise
     */
    const filesByName = new ts.Map<string, ts.SourceFile | false | undefined>();
    let missingFilePaths: readonly ts.Path[] | undefined;
    // stores 'filename -> file association' ignoring case
    // used to track cases when two file names differ only in casing
    const filesByNameIgnoreCase = host.useCaseSensitiveFileNames() ? new ts.Map<string, ts.SourceFile>() : undefined;

    // A parallel array to projectReferences storing the results of reading in the referenced tsconfig files
    let resolvedProjectReferences: readonly (ts.ResolvedProjectReference | undefined)[] | undefined;
    let projectReferenceRedirects: ts.ESMap<ts.Path, ts.ResolvedProjectReference | false> | undefined;
    let mapFromFileToProjectReferenceRedirects: ts.ESMap<ts.Path, ts.Path> | undefined;
    let mapFromToProjectReferenceRedirectSource: ts.ESMap<ts.Path, ts.SourceOfProjectReferenceRedirect> | undefined;

    const useSourceOfProjectReferenceRedirect = !!host.useSourceOfProjectReferenceRedirect?.() &&
        !options.disableSourceOfProjectReferenceRedirect;
    const { onProgramCreateComplete, fileExists, directoryExists } = updateHostForUseSourceOfProjectReferenceRedirect({
        compilerHost: host,
        getSymlinkCache,
        useSourceOfProjectReferenceRedirect,
        toPath,
        getResolvedProjectReferences,
        getSourceOfProjectReferenceRedirect,
        forEachResolvedProjectReference
    });
    const readFile = host.readFile.bind(host) as typeof host.readFile;

    ts.tracing?.push(ts.tracing.Phase.Program, "shouldProgramCreateNewSourceFiles", { hasOldProgram: !!oldProgram });
    const shouldCreateNewSourceFile = shouldProgramCreateNewSourceFiles(oldProgram, options);
    ts.tracing?.pop();
    // We set `structuralIsReused` to `undefined` because `tryReuseStructureFromOldProgram` calls `tryReuseStructureFromOldProgram` which checks
    // `structuralIsReused`, which would be a TDZ violation if it was not set in advance to `undefined`.
    let structureIsReused: ts.StructureIsReused;
    ts.tracing?.push(ts.tracing.Phase.Program, "tryReuseStructureFromOldProgram", {});
    structureIsReused = tryReuseStructureFromOldProgram(); // eslint-disable-line prefer-const
    ts.tracing?.pop();
    if (structureIsReused !== ts.StructureIsReused.Completely) {
        processingDefaultLibFiles = [];
        processingOtherFiles = [];

        if (projectReferences) {
            if (!resolvedProjectReferences) {
                resolvedProjectReferences = projectReferences.map(parseProjectReferenceConfigFile);
            }
            if (rootNames.length) {
                resolvedProjectReferences?.forEach((parsedRef, index) => {
                    if (!parsedRef) return;
                    const out = ts.outFile(parsedRef.commandLine.options);
                    if (useSourceOfProjectReferenceRedirect) {
                        if (out || ts.getEmitModuleKind(parsedRef.commandLine.options) === ts.ModuleKind.None) {
                            for (const fileName of parsedRef.commandLine.fileNames) {
                                processProjectReferenceFile(fileName, { kind: ts.FileIncludeKind.SourceFromProjectReference, index });
                            }
                        }
                    }
                    else {
                        if (out) {
                            processProjectReferenceFile(ts.changeExtension(out, ".d.ts"), { kind: ts.FileIncludeKind.OutputFromProjectReference, index });
                        }
                        else if (ts.getEmitModuleKind(parsedRef.commandLine.options) === ts.ModuleKind.None) {
                            const getCommonSourceDirectory = ts.memoize(() => ts.getCommonSourceDirectoryOfConfig(parsedRef.commandLine, !host.useCaseSensitiveFileNames()));
                            for (const fileName of parsedRef.commandLine.fileNames) {
                                if (!ts.isDeclarationFileName(fileName) && !ts.fileExtensionIs(fileName, ts.Extension.Json)) {
                                    processProjectReferenceFile(ts.getOutputDeclarationFileName(fileName, parsedRef.commandLine, !host.useCaseSensitiveFileNames(), getCommonSourceDirectory), { kind: ts.FileIncludeKind.OutputFromProjectReference, index });
                                }
                            }
                        }
                    }
                });
            }
        }

        ts.tracing?.push(ts.tracing.Phase.Program, "processRootFiles", { count: rootNames.length });
        ts.forEach(rootNames, (name, index) => processRootFile(name, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, { kind: ts.FileIncludeKind.RootFile, index }));
        ts.tracing?.pop();

        // load type declarations specified via 'types' argument or implicitly from types/ and node_modules/@types folders
        const typeReferences: string[] = rootNames.length ? ts.getAutomaticTypeDirectiveNames(options, host) : ts.emptyArray;

        if (typeReferences.length) {
            ts.tracing?.push(ts.tracing.Phase.Program, "processTypeReferences", { count: typeReferences.length });
            // This containingFilename needs to match with the one used in managed-side
            const containingDirectory = options.configFilePath ? ts.getDirectoryPath(options.configFilePath) : host.getCurrentDirectory();
            const containingFilename = ts.combinePaths(containingDirectory, inferredTypesContainingFile);
            const resolutions = resolveTypeReferenceDirectiveNamesWorker(typeReferences, containingFilename);
            for (let i = 0; i < typeReferences.length; i++) {
                // under node16/nodenext module resolution, load `types`/ata include names as cjs resolution results by passing an `undefined` mode
                processTypeReferenceDirective(typeReferences[i], /*mode*/ undefined, resolutions[i], { kind: ts.FileIncludeKind.AutomaticTypeDirectiveFile, typeReference: typeReferences[i], packageId: resolutions[i]?.packageId });
            }
            ts.tracing?.pop();
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
                processRootFile(defaultLibraryFileName, /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ false, { kind: ts.FileIncludeKind.LibFile });
            }
            else {
                ts.forEach(options.lib, (libFileName, index) => {
                    processRootFile(pathForLibFile(libFileName), /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ false, { kind: ts.FileIncludeKind.LibFile, index });
                });
            }
        }

        missingFilePaths = ts.arrayFrom(ts.mapDefinedIterator(filesByName.entries(), ([path, file]) => file === undefined ? path as ts.Path : undefined));
        files = ts.stableSort(processingDefaultLibFiles, compareDefaultLibFiles).concat(processingOtherFiles);
        processingDefaultLibFiles = undefined;
        processingOtherFiles = undefined;
    }

    ts.Debug.assert(!!missingFilePaths);

    // Release any files we have acquired in the old program but are
    // not part of the new program.
    if (oldProgram && host.onReleaseOldSourceFile) {
        const oldSourceFiles = oldProgram.getSourceFiles();
        for (const oldSourceFile of oldSourceFiles) {
            const newFile = getSourceFileByPath(oldSourceFile.resolvedPath);
            if (shouldCreateNewSourceFile || !newFile || newFile.impliedNodeFormat !== oldSourceFile.impliedNodeFormat ||
                // old file wasn't redirect but new file is
                (oldSourceFile.resolvedPath === oldSourceFile.path && newFile.resolvedPath !== oldSourceFile.path)) {
                host.onReleaseOldSourceFile(oldSourceFile, oldProgram.getCompilerOptions(), !!getSourceFileByPath(oldSourceFile.path));
            }
        }
        if (!host.getParsedCommandLine) {
            oldProgram.forEachResolvedProjectReference(resolvedProjectReference => {
                if (!getResolvedProjectReferenceByPath(resolvedProjectReference.sourceFile.path)) {
                    host.onReleaseOldSourceFile!(resolvedProjectReference.sourceFile, oldProgram!.getCompilerOptions(), /*hasSourceFileByPath*/ false);
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
            }
        );
    }

    typeReferenceDirectiveResolutionCache = undefined;

    // unconditionally set oldProgram to undefined to prevent it from being captured in closure
    oldProgram = undefined;

    const program: ts.Program = {
        getRootFileNames: () => rootNames,
        getSourceFile,
        getSourceFileByPath,
        getSourceFiles: () => files,
        getMissingFilePaths: () => missingFilePaths!, // TODO: GH#18217
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
        getFileProcessingDiagnostics: () => fileProcessingDiagnostics,
        getResolvedTypeReferenceDirectives: () => resolvedTypeReferenceDirectives,
        isSourceFileFromExternalLibrary,
        isSourceFileDefaultLibrary,
        getSourceFileFromReference,
        getLibFileFromReference,
        sourceFileToPackageName,
        redirectTargetsMap,
        usesUriStyleNodeCoreModules,
        isEmittedFile,
        getConfigFileParsingDiagnostics,
        getResolvedModuleWithFailedLookupLocationsFromCache,
        getProjectReferences,
        getResolvedProjectReferences,
        getProjectReferenceRedirect,
        getResolvedProjectReferenceToRedirect,
        getResolvedProjectReferenceByPath,
        forEachResolvedProjectReference,
        isSourceOfProjectReferenceRedirect,
        emitBuildInfo,
        fileExists,
        readFile,
        directoryExists,
        getSymlinkCache,
        realpath: host.realpath?.bind(host),
        useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
        getFileIncludeReasons: () => fileReasons,
        structureIsReused,
        writeFile,
    };

    onProgramCreateComplete();

    // Add file processingDiagnostics
    fileProcessingDiagnostics?.forEach(diagnostic => {
        switch (diagnostic.kind) {
            case ts.FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic:
                return programDiagnostics.add(createDiagnosticExplainingFile(diagnostic.file && getSourceFileByPath(diagnostic.file), diagnostic.fileProcessingReason, diagnostic.diagnostic, diagnostic.args || ts.emptyArray));
            case ts.FilePreprocessingDiagnosticsKind.FilePreprocessingReferencedDiagnostic:
                const { file, pos, end } = getReferencedFileLocation(getSourceFileByPath, diagnostic.reason) as ReferenceFileLocation;
                return programDiagnostics.add(ts.createFileDiagnostic(file, ts.Debug.checkDefined(pos), ts.Debug.checkDefined(end) - pos, diagnostic.diagnostic, ...diagnostic.args || ts.emptyArray));
            default:
                ts.Debug.assertNever(diagnostic);
        }
    });

    verifyCompilerOptions();
    ts.performance.mark("afterProgram");
    ts.performance.measure("Program", "beforeProgram", "afterProgram");
    ts.tracing?.pop();

    return program;

    function addResolutionDiagnostics(list: ts.Diagnostic[] | undefined) {
        if (!list) return;
        for (const elem of list) {
            programDiagnostics.add(elem);
        }
    }

    function pullDiagnosticsFromCache(names: readonly ts.StringLiteralLike[] | readonly ts.FileReference[], containingFile: ts.SourceFile) {
        if (!moduleResolutionCache) return;
        const containingFileName = ts.getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
        const containingDir = ts.getDirectoryPath(containingFileName);
        const redirectedReference = getRedirectReferenceForResolution(containingFile);
        for (const n of names) {
            // mimics logic done in the resolution cache, should be resilient to upgrading it to use `FileReference`s for non-type-reference modal lookups to make it rely on the index in the list less
            const mode = ts.getResolutionMode(n, containingFile);
            const name = ts.getResolutionName(n);
            // only nonrelative names hit the cache, and, at least as of right now, only nonrelative names can issue diagnostics
            // (Since diagnostics are only issued via import or export map lookup)
            // This may totally change if/when the issue of output paths not mapping to input files is fixed in a broader context
            // When it is, how we extract diagnostics from the module name resolver will have the be refined - the current cache
            // APIs wrapping the underlying resolver make it almost impossible to smuggle the diagnostics out in a generalized way
            if (ts.isExternalModuleNameRelative(name)) continue;
            const diags = moduleResolutionCache.getOrCreateCacheForModuleName(name, mode, redirectedReference).get(containingDir)?.resolutionDiagnostics;
            addResolutionDiagnostics(diags);
        }
    }

    function resolveModuleNamesWorker(moduleNames: readonly ts.StringLiteralLike[], containingFile: ts.SourceFile, resolutionInfo: ts.ModuleResolutionInfo | undefined): readonly (ts.ResolvedModuleFull | undefined)[] {
        if (!moduleNames.length) return ts.emptyArray;
        const containingFileName = ts.getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
        const redirectedReference = getRedirectReferenceForResolution(containingFile);
        ts.tracing?.push(ts.tracing.Phase.Program, "resolveModuleNamesWorker", { containingFileName });
        ts.performance.mark("beforeResolveModule");
        const result = actualResolveModuleNamesWorker(moduleNames, containingFile, containingFileName, redirectedReference, resolutionInfo);
        ts.performance.mark("afterResolveModule");
        ts.performance.measure("ResolveModule", "beforeResolveModule", "afterResolveModule");
        ts.tracing?.pop();
        pullDiagnosticsFromCache(moduleNames, containingFile);
        return result;
    }

    function resolveTypeReferenceDirectiveNamesWorker(typeDirectiveNames: string[] | readonly ts.FileReference[], containingFile: string | ts.SourceFile): readonly (ts.ResolvedTypeReferenceDirective | undefined)[] {
        if (!typeDirectiveNames.length) return [];
        const containingFileName = !ts.isString(containingFile) ? ts.getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory) : containingFile;
        const redirectedReference = !ts.isString(containingFile) ? getRedirectReferenceForResolution(containingFile) : undefined;
        const containingFileMode = !ts.isString(containingFile) ? containingFile.impliedNodeFormat : undefined;
        ts.tracing?.push(ts.tracing.Phase.Program, "resolveTypeReferenceDirectiveNamesWorker", { containingFileName });
        ts.performance.mark("beforeResolveTypeReference");
        const result = actualResolveTypeReferenceDirectiveNamesWorker(typeDirectiveNames, containingFileName, redirectedReference, containingFileMode);
        ts.performance.mark("afterResolveTypeReference");
        ts.performance.measure("ResolveTypeReference", "beforeResolveTypeReference", "afterResolveTypeReference");
        ts.tracing?.pop();
        return result;
    }

    function getRedirectReferenceForResolution(file: ts.SourceFile) {
        const redirect = getResolvedProjectReferenceToRedirect(file.originalFileName);
        if (redirect || !ts.isDeclarationFileName(file.originalFileName)) return redirect;

        // The originalFileName could not be actual source file name if file found was d.ts from referecned project
        // So in this case try to look up if this is output from referenced project, if it is use the redirected project in that case
        const resultFromDts = getRedirectReferenceForResolutionFromSourceOfProject(file.path);
        if (resultFromDts) return resultFromDts;

        // If preserveSymlinks is true, module resolution wont jump the symlink
        // but the resolved real path may be the .d.ts from project reference
        // Note:: Currently we try the real path only if the
        // file is from node_modules to avoid having to run real path on all file paths
        if (!host.realpath || !options.preserveSymlinks || !ts.stringContains(file.originalFileName, ts.nodeModulesPathPart)) return undefined;
        const realDeclarationPath = toPath(host.realpath(file.originalFileName));
        return realDeclarationPath === file.path ? undefined : getRedirectReferenceForResolutionFromSourceOfProject(realDeclarationPath);
    }

    function getRedirectReferenceForResolutionFromSourceOfProject(filePath: ts.Path) {
        const source = getSourceOfProjectReferenceRedirect(filePath);
        if (ts.isString(source)) return getResolvedProjectReferenceToRedirect(source);
        if (!source) return undefined;
        // Output of .d.ts file so return resolved ref that matches the out file name
        return forEachResolvedProjectReference(resolvedRef => {
            const out = ts.outFile(resolvedRef.commandLine.options);
            if (!out) return undefined;
            return toPath(out) === filePath ? resolvedRef : undefined;
        });
    }

    function compareDefaultLibFiles(a: ts.SourceFile, b: ts.SourceFile) {
        return ts.compareValues(getDefaultLibFilePriority(a), getDefaultLibFilePriority(b));
    }

    function getDefaultLibFilePriority(a: ts.SourceFile) {
        if (ts.containsPath(defaultLibraryPath, a.fileName, /*ignoreCase*/ false)) {
            const basename = ts.getBaseFileName(a.fileName);
            if (basename === "lib.d.ts" || basename === "lib.es6.d.ts") return 0;
            const name = ts.removeSuffix(ts.removePrefix(basename, "lib."), ".d.ts");
            const index = ts.libs.indexOf(name);
            if (index !== -1) return index + 1;
        }
        return ts.libs.length + 2;
    }

    function getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string, mode?: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext): ts.ResolvedModuleWithFailedLookupLocations | undefined {
        return moduleResolutionCache && ts.resolveModuleNameFromCache(moduleName, containingFile, moduleResolutionCache, mode);
    }

    function toPath(fileName: string): ts.Path {
        return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
    }

    function getCommonSourceDirectory() {
        if (commonSourceDirectory === undefined) {
            const emittedFiles = ts.filter(files, file => ts.sourceFileMayBeEmitted(file, program));
            commonSourceDirectory = ts.getCommonSourceDirectory(
                options,
                () => ts.mapDefined(emittedFiles, file => file.isDeclarationFile ? undefined : file.fileName),
                currentDirectory,
                getCanonicalFileName,
                commonSourceDirectory => checkSourceFilesBelongToPath(emittedFiles, commonSourceDirectory)
            );
        }
        return commonSourceDirectory;
    }

    function getClassifiableNames() {
        if (!classifiableNames) {
            // Initialize a checker so that all our files are bound.
            getTypeChecker();
            classifiableNames = new ts.Set();

            for (const sourceFile of files) {
                sourceFile.classifiableNames?.forEach(value => classifiableNames.add(value));
            }
        }

        return classifiableNames;
    }

    function resolveModuleNamesReusingOldState(moduleNames: readonly ts.StringLiteralLike[], file: ts.SourceFile): readonly (ts.ResolvedModuleFull | undefined)[] {
        if (structureIsReused === ts.StructureIsReused.Not && !file.ambientModuleNames.length) {
            // If the old program state does not permit reusing resolutions and `file` does not contain locally defined ambient modules,
            // the best we can do is fallback to the default logic.
            return resolveModuleNamesWorker(moduleNames, file, /*resolutionInfo*/ undefined);
        }

        const oldSourceFile = oldProgram && oldProgram.getSourceFile(file.fileName);
        if (oldSourceFile !== file && file.resolvedModules) {
            // `file` was created for the new program.
            //
            // We only set `file.resolvedModules` via work from the current function,
            // so it is defined iff we already called the current function on `file`.
            // That call happened no later than the creation of the `file` object,
            // which per above occurred during the current program creation.
            // Since we assume the filesystem does not change during program creation,
            // it is safe to reuse resolutions from the earlier call.
            const result: (ts.ResolvedModuleFull | undefined)[] = [];
            for (const moduleName of moduleNames) {
                const resolvedModule = file.resolvedModules.get(moduleName.text, getModeForUsageLocation(file, moduleName));
                result.push(resolvedModule);
            }
            return result;
        }
        // At this point, we know at least one of the following hold:
        // - file has local declarations for ambient modules
        // - old program state is available
        // With this information, we can infer some module resolutions without performing resolution.

        /** An ordered list of module names for which we cannot recover the resolution. */
        let unknownModuleNames: ts.StringLiteralLike[] | undefined;
        /**
         * The indexing of elements in this list matches that of `moduleNames`.
         *
         * Before combining results, result[i] is in one of the following states:
         * * undefined: needs to be recomputed,
         * * predictedToResolveToAmbientModuleMarker: known to be an ambient module.
         * Needs to be reset to undefined before returning,
         * * ResolvedModuleFull instance: can be reused.
         */
        let result: (ts.ResolvedModuleFull | undefined)[] | undefined;
        let reusedNames: ts.StringLiteralLike[] | undefined;
        /** A transient placeholder used to mark predicted resolution in the result list. */
        const predictedToResolveToAmbientModuleMarker: ts.ResolvedModuleFull = {} as any;

        for (let i = 0; i < moduleNames.length; i++) {
            const moduleName = moduleNames[i];
            // If the source file is unchanged and doesnt have invalidated resolution, reuse the module resolutions
            if (file === oldSourceFile && !hasInvalidatedResolutions(oldSourceFile.path)) {
                const mode = getModeForUsageLocation(file, moduleName);
                const oldResolvedModule = ts.getResolvedModule(oldSourceFile, moduleName.text, mode);
                if (oldResolvedModule) {
                    if (ts.isTraceEnabled(options, host)) {
                        ts.trace(host,
                            oldResolvedModule.packageId ?
                                ts.Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                ts.Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2,
                            moduleName.text,
                            ts.getNormalizedAbsolutePath(file.originalFileName, currentDirectory),
                            oldResolvedModule.resolvedFileName,
                            oldResolvedModule.packageId && ts.packageIdToString(oldResolvedModule.packageId)
                        );
                    }
                    (result ??= new Array(moduleNames.length))[i] = oldResolvedModule;
                    (reusedNames ??= []).push(moduleName);
                    continue;
                }
            }
            // We know moduleName resolves to an ambient module provided that moduleName:
            // - is in the list of ambient modules locally declared in the current source file.
            // - resolved to an ambient module in the old program whose declaration is in an unmodified file
            //   (so the same module declaration will land in the new program)
            let resolvesToAmbientModuleInNonModifiedFile = false;
            if (ts.contains(file.ambientModuleNames, moduleName.text)) {
                resolvesToAmbientModuleInNonModifiedFile = true;
                if (ts.isTraceEnabled(options, host)) {
                    ts.trace(host, ts.Diagnostics.Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1, moduleName.text, ts.getNormalizedAbsolutePath(file.originalFileName, currentDirectory));
                }
            }
            else {
                resolvesToAmbientModuleInNonModifiedFile = moduleNameResolvesToAmbientModuleInNonModifiedFile(moduleName);
            }

            if (resolvesToAmbientModuleInNonModifiedFile) {
                (result || (result = new Array(moduleNames.length)))[i] = predictedToResolveToAmbientModuleMarker;
            }
            else {
                // Resolution failed in the old program, or resolved to an ambient module for which we can't reuse the result.
                (unknownModuleNames ??= []).push(moduleName);
            }
        }

        const resolutions = unknownModuleNames && unknownModuleNames.length
            ? resolveModuleNamesWorker(unknownModuleNames, file, { names: unknownModuleNames, reusedNames })
            : ts.emptyArray;

        // Combine results of resolutions and predicted results
        if (!result) {
            // There were no unresolved/ambient resolutions.
            ts.Debug.assert(resolutions.length === moduleNames.length);
            return resolutions;
        }

        let j = 0;
        for (let i = 0; i < result.length; i++) {
            if (result[i]) {
                // `result[i]` is either a `ResolvedModuleFull` or a marker.
                // If it is the former, we can leave it as is.
                if (result[i] === predictedToResolveToAmbientModuleMarker) {
                    result[i] = undefined;
                }
            }
            else {
                result[i] = resolutions[j];
                j++;
            }
        }
        ts.Debug.assert(j === resolutions.length);

        return result;

        // If we change our policy of rechecking failed lookups on each program create,
        // we should adjust the value returned here.
        function moduleNameResolvesToAmbientModuleInNonModifiedFile(moduleName: ts.StringLiteralLike): boolean {
            const resolutionToFile = ts.getResolvedModule(oldSourceFile, moduleName.text, getModeForUsageLocation(file, moduleName));
            const resolvedFile = resolutionToFile && oldProgram!.getSourceFile(resolutionToFile.resolvedFileName);
            if (resolutionToFile && resolvedFile) {
                // In the old program, we resolved to an ambient module that was in the same
                //   place as we expected to find an actual module file.
                // We actually need to return 'false' here even though this seems like a 'true' case
                //   because the normal module resolution algorithm will find this anyway.
                return false;
            }

            // at least one of declarations should come from non-modified source file
            const unmodifiedFile = ambientModuleNameToUnmodifiedFileName.get(moduleName.text);

            if (!unmodifiedFile) {
                return false;
            }

            if (ts.isTraceEnabled(options, host)) {
                ts.trace(host, ts.Diagnostics.Module_0_was_resolved_as_ambient_module_declared_in_1_since_this_file_was_not_modified, moduleName.text, unmodifiedFile);
            }
            return true;
        }
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
                        !ts.arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newResolvedRef.commandLine.fileNames);
                }
                else {
                    // A previously-unresolved reference may be resolved now
                    return newResolvedRef !== undefined;
                }
            },
            (oldProjectReferences, parent) => {
                // If array of references is changed, we cant resue old program
                const newReferences = parent ? getResolvedProjectReferenceByPath(parent.sourceFile.path)!.commandLine.projectReferences : projectReferences;
                return !ts.arrayIsEqualTo(oldProjectReferences, newReferences, ts.projectReferenceIsEqualTo);
            }
        );
    }

    function tryReuseStructureFromOldProgram(): ts.StructureIsReused {
        if (!oldProgram) {
            return ts.StructureIsReused.Not;
        }

        // check properties that can affect structure of the program or module resolution strategy
        // if any of these properties has changed - structure cannot be reused
        const oldOptions = oldProgram.getCompilerOptions();
        if (ts.changesAffectModuleResolution(oldOptions, options)) {
            return ts.StructureIsReused.Not;
        }

        // there is an old program, check if we can reuse its structure
        const oldRootNames = oldProgram.getRootFileNames();
        if (!ts.arrayIsEqualTo(oldRootNames, rootNames)) {
            return ts.StructureIsReused.Not;
        }

        // Check if any referenced project tsconfig files are different
        if (!canReuseProjectReferences()) {
            return ts.StructureIsReused.Not;
        }
        if (projectReferences) {
            resolvedProjectReferences = projectReferences.map(parseProjectReferenceConfigFile);
        }

        // check if program source files has changed in the way that can affect structure of the program
        const newSourceFiles: ts.SourceFile[] = [];
        const modifiedSourceFiles: { oldFile: ts.SourceFile, newFile: ts.SourceFile }[] = [];
        structureIsReused = ts.StructureIsReused.Completely;

        // If the missing file paths are now present, it can change the progam structure,
        // and hence cant reuse the structure.
        // This is same as how we dont reuse the structure if one of the file from old program is now missing
        if (oldProgram.getMissingFilePaths().some(missingFilePath => host.fileExists(missingFilePath))) {
            return ts.StructureIsReused.Not;
        }

        const oldSourceFiles = oldProgram.getSourceFiles();
        const enum SeenPackageName { Exists, Modified }
        const seenPackageNames = new ts.Map<string, SeenPackageName>();

        for (const oldSourceFile of oldSourceFiles) {
            const sourceFileOptions = getCreateSourceFileOptions(oldSourceFile.fileName, moduleResolutionCache, host, options);
            let newSourceFile = host.getSourceFileByPath
                ? host.getSourceFileByPath(oldSourceFile.fileName, oldSourceFile.resolvedPath, sourceFileOptions, /*onError*/ undefined, shouldCreateNewSourceFile || sourceFileOptions.impliedNodeFormat !== oldSourceFile.impliedNodeFormat)
                : host.getSourceFile(oldSourceFile.fileName, sourceFileOptions, /*onError*/ undefined, shouldCreateNewSourceFile || sourceFileOptions.impliedNodeFormat !== oldSourceFile.impliedNodeFormat); // TODO: GH#18217

            if (!newSourceFile) {
                return ts.StructureIsReused.Not;
            }
            newSourceFile.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
            newSourceFile.packageJsonScope = sourceFileOptions.packageJsonScope;

            ts.Debug.assert(!newSourceFile.redirectInfo, "Host should not return a redirect source file from `getSourceFile`");

            let fileChanged: boolean;
            if (oldSourceFile.redirectInfo) {
                // We got `newSourceFile` by path, so it is actually for the unredirected file.
                // This lets us know if the unredirected file has changed. If it has we should break the redirect.
                if (newSourceFile !== oldSourceFile.redirectInfo.unredirected) {
                    // Underlying file has changed. Might not redirect anymore. Must rebuild program.
                    return ts.StructureIsReused.Not;
                }
                fileChanged = false;
                newSourceFile = oldSourceFile; // Use the redirect.
            }
            else if (oldProgram.redirectTargetsMap.has(oldSourceFile.path)) {
                // If a redirected-to source file changes, the redirect may be broken.
                if (newSourceFile !== oldSourceFile) {
                    return ts.StructureIsReused.Not;
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
                    return ts.StructureIsReused.Not;
                }
                seenPackageNames.set(packageName, newKind);
            }

            if (fileChanged) {
                if (oldSourceFile.impliedNodeFormat !== newSourceFile.impliedNodeFormat) {
                    structureIsReused = ts.StructureIsReused.SafeModules;
                }
                // The `newSourceFile` object was created for the new program.
                else if (!ts.arrayIsEqualTo(oldSourceFile.libReferenceDirectives, newSourceFile.libReferenceDirectives, fileReferenceIsEqualTo)) {
                    // 'lib' references has changed. Matches behavior in changesAffectModuleResolution
                    structureIsReused = ts.StructureIsReused.SafeModules;
                }
                else if (oldSourceFile.hasNoDefaultLib !== newSourceFile.hasNoDefaultLib) {
                    // value of no-default-lib has changed
                    // this will affect if default library is injected into the list of files
                    structureIsReused = ts.StructureIsReused.SafeModules;
                }
                // check tripleslash references
                else if (!ts.arrayIsEqualTo(oldSourceFile.referencedFiles, newSourceFile.referencedFiles, fileReferenceIsEqualTo)) {
                    // tripleslash references has changed
                    structureIsReused = ts.StructureIsReused.SafeModules;
                }
                else {
                    // check imports and module augmentations
                    collectExternalModuleReferences(newSourceFile);
                    if (!ts.arrayIsEqualTo(oldSourceFile.imports, newSourceFile.imports, moduleNameIsEqualTo)) {
                        // imports has changed
                        structureIsReused = ts.StructureIsReused.SafeModules;
                    }
                    else if (!ts.arrayIsEqualTo(oldSourceFile.moduleAugmentations, newSourceFile.moduleAugmentations, moduleNameIsEqualTo)) {
                        // moduleAugmentations has changed
                        structureIsReused = ts.StructureIsReused.SafeModules;
                    }
                    else if ((oldSourceFile.flags & ts.NodeFlags.PermanentlySetIncrementalFlags) !== (newSourceFile.flags & ts.NodeFlags.PermanentlySetIncrementalFlags)) {
                        // dynamicImport has changed
                        structureIsReused = ts.StructureIsReused.SafeModules;
                    }
                    else if (!ts.arrayIsEqualTo(oldSourceFile.typeReferenceDirectives, newSourceFile.typeReferenceDirectives, fileReferenceIsEqualTo)) {
                        // 'types' references has changed
                        structureIsReused = ts.StructureIsReused.SafeModules;
                    }
                }

                // tentatively approve the file
                modifiedSourceFiles.push({ oldFile: oldSourceFile, newFile: newSourceFile });
            }
            else if (hasInvalidatedResolutions(oldSourceFile.path)) {
                // 'module/types' references could have changed
                structureIsReused = ts.StructureIsReused.SafeModules;

                // add file to the modified list so that we will resolve it later
                modifiedSourceFiles.push({ oldFile: oldSourceFile, newFile: newSourceFile });
            }

            // if file has passed all checks it should be safe to reuse it
            newSourceFiles.push(newSourceFile);
        }

        if (structureIsReused !== ts.StructureIsReused.Completely) {
            return structureIsReused;
        }

        const modifiedFiles = modifiedSourceFiles.map(f => f.oldFile);
        for (const oldFile of oldSourceFiles) {
            if (!ts.contains(modifiedFiles, oldFile)) {
                for (const moduleName of oldFile.ambientModuleNames) {
                    ambientModuleNameToUnmodifiedFileName.set(moduleName, oldFile.fileName);
                }
            }
        }
        // try to verify results of module resolution
        for (const { oldFile: oldSourceFile, newFile: newSourceFile } of modifiedSourceFiles) {
            const moduleNames = getModuleNames(newSourceFile);
            const resolutions = resolveModuleNamesReusingOldState(moduleNames, newSourceFile);
            // ensure that module resolution results are still correct
            const resolutionsChanged = ts.hasChangesInResolutions(moduleNames, newSourceFile, resolutions, oldSourceFile.resolvedModules, ts.moduleResolutionIsEqualTo);
            if (resolutionsChanged) {
                structureIsReused = ts.StructureIsReused.SafeModules;
                newSourceFile.resolvedModules = ts.zipToModeAwareCache(newSourceFile, moduleNames, resolutions);
            }
            else {
                newSourceFile.resolvedModules = oldSourceFile.resolvedModules;
            }
            const typesReferenceDirectives = newSourceFile.typeReferenceDirectives;
            const typeReferenceResolutions = resolveTypeReferenceDirectiveNamesWorker(typesReferenceDirectives, newSourceFile);
            // ensure that types resolutions are still correct
            const typeReferenceResolutionsChanged = ts.hasChangesInResolutions(typesReferenceDirectives, newSourceFile, typeReferenceResolutions, oldSourceFile.resolvedTypeReferenceDirectiveNames, ts.typeDirectiveIsEqualTo);
            if (typeReferenceResolutionsChanged) {
                structureIsReused = ts.StructureIsReused.SafeModules;
                newSourceFile.resolvedTypeReferenceDirectiveNames = ts.zipToModeAwareCache(newSourceFile, typesReferenceDirectives, typeReferenceResolutions);
            }
            else {
                newSourceFile.resolvedTypeReferenceDirectiveNames = oldSourceFile.resolvedTypeReferenceDirectiveNames;
            }
        }

        if (structureIsReused !== ts.StructureIsReused.Completely) {
            return structureIsReused;
        }

        if (ts.changesAffectingProgramStructure(oldOptions, options) || host.hasChangedAutomaticTypeDirectiveNames?.()) {
            return ts.StructureIsReused.SafeModules;
        }

        missingFilePaths = oldProgram.getMissingFilePaths();

        // update fileName -> file mapping
        ts.Debug.assert(newSourceFiles.length === oldProgram.getSourceFiles().length);
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
                if (oldProgram!.isSourceFileFromExternalLibrary(oldFile)) {
                    sourceFilesFoundSearchingNodeModules.set(oldFile.path, true);
                }
                return;
            }
            filesByName.set(path, filesByName.get(oldFile.path));
        });

        files = newSourceFiles;
        fileReasons = oldProgram.getFileIncludeReasons();
        fileProcessingDiagnostics = oldProgram.getFileProcessingDiagnostics();
        resolvedTypeReferenceDirectives = oldProgram.getResolvedTypeReferenceDirectives();

        sourceFileToPackageName = oldProgram.sourceFileToPackageName;
        redirectTargetsMap = oldProgram.redirectTargetsMap;
        usesUriStyleNodeCoreModules = oldProgram.usesUriStyleNodeCoreModules;

        return ts.StructureIsReused.Completely;
    }

    function getEmitHost(writeFileCallback?: ts.WriteFileCallback): ts.EmitHost {
        return {
            getPrependNodes,
            getCanonicalFileName,
            getCommonSourceDirectory: program.getCommonSourceDirectory,
            getCompilerOptions: program.getCompilerOptions,
            getCurrentDirectory: () => currentDirectory,
            getNewLine: () => host.getNewLine(),
            getSourceFile: program.getSourceFile,
            getSourceFileByPath: program.getSourceFileByPath,
            getSourceFiles: program.getSourceFiles,
            getLibFileFromReference: program.getLibFileFromReference,
            isSourceFileFromExternalLibrary,
            getResolvedProjectReferenceToRedirect,
            getProjectReferenceRedirect,
            isSourceOfProjectReferenceRedirect,
            getSymlinkCache,
            writeFile: writeFileCallback || writeFile,
            isEmitBlocked,
            readFile: f => host.readFile(f),
            fileExists: f => {
                // Use local caches
                const path = toPath(f);
                if (getSourceFileByPath(path)) return true;
                if (ts.contains(missingFilePaths, path)) return false;
                // Before falling back to the host
                return host.fileExists(f);
            },
            useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
            getBuildInfo: bundle => program.getBuildInfo?.(bundle),
            getSourceFileFromReference: (file, ref) => program.getSourceFileFromReference(file, ref),
            redirectTargetsMap,
            getFileIncludeReasons: program.getFileIncludeReasons,
            createHash: ts.maybeBind(host, host.createHash),
        };
    }

    function writeFile(
        fileName: string,
        text: string,
        writeByteOrderMark: boolean,
        onError?: (message: string) => void,
        sourceFiles?: readonly ts.SourceFile[],
        data?: ts.WriteFileCallbackData
    ) {
        host.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
    }

    function emitBuildInfo(writeFileCallback?: ts.WriteFileCallback): ts.EmitResult {
        ts.Debug.assert(!ts.outFile(options));
        ts.tracing?.push(ts.tracing.Phase.Emit, "emitBuildInfo", {}, /*separateBeginAndEnd*/ true);
        ts.performance.mark("beforeEmit");
        const emitResult = ts.emitFiles(
            ts.notImplementedResolver,
            getEmitHost(writeFileCallback),
            /*targetSourceFile*/ undefined,
            /*transformers*/ ts.noTransformers,
            /*emitOnlyDtsFiles*/ false,
            /*onlyBuildInfo*/ true
        );

        ts.performance.mark("afterEmit");
        ts.performance.measure("Emit", "beforeEmit", "afterEmit");
        ts.tracing?.pop();
        return emitResult;
    }

    function getResolvedProjectReferences() {
        return resolvedProjectReferences;
    }

    function getProjectReferences() {
        return projectReferences;
    }

    function getPrependNodes() {
        return createPrependNodes(
            projectReferences,
            (_ref, index) => resolvedProjectReferences![index]?.commandLine,
            fileName => {
                const path = toPath(fileName);
                const sourceFile = getSourceFileByPath(path);
                return sourceFile ? sourceFile.text : filesByName.has(path) ? undefined : host.readFile(path);
            },
            host,
        );
    }

    function isSourceFileFromExternalLibrary(file: ts.SourceFile): boolean {
        return !!sourceFilesFoundSearchingNodeModules.get(file.path);
    }

    function isSourceFileDefaultLibrary(file: ts.SourceFile): boolean {
        if (!file.isDeclarationFile) {
            return false;
        }

        if (file.hasNoDefaultLib) {
            return true;
        }

        if (!options.noLib) {
            return false;
        }

        // If '--lib' is not specified, include default library file according to '--target'
        // otherwise, using options specified in '--lib' instead of '--target' default library file
        const equalityComparer = host.useCaseSensitiveFileNames() ? ts.equateStringsCaseSensitive : ts.equateStringsCaseInsensitive;
        if (!options.lib) {
            return equalityComparer(file.fileName, getDefaultLibraryFileName());
        }
        else {
            return ts.some(options.lib, libFileName => equalityComparer(file.fileName, pathForLibFile(libFileName)));
        }
    }

    function getTypeChecker() {
        return typeChecker || (typeChecker = ts.createTypeChecker(program));
    }

    function emit(sourceFile?: ts.SourceFile, writeFileCallback?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnly?: boolean | ts.EmitOnly, transformers?: ts.CustomTransformers, forceDtsEmit?: boolean): ts.EmitResult {
        ts.tracing?.push(ts.tracing.Phase.Emit, "emit", { path: sourceFile?.path }, /*separateBeginAndEnd*/ true);
        const result = runWithCancellationToken(() => emitWorker(program, sourceFile, writeFileCallback, cancellationToken, emitOnly, transformers, forceDtsEmit));
        ts.tracing?.pop();
        return result;
    }

    function isEmitBlocked(emitFileName: string): boolean {
        return hasEmitBlockingDiagnostics.has(toPath(emitFileName));
    }

    function emitWorker(program: ts.Program, sourceFile: ts.SourceFile | undefined, writeFileCallback: ts.WriteFileCallback | undefined, cancellationToken: ts.CancellationToken | undefined, emitOnly?: boolean | ts.EmitOnly, customTransformers?: ts.CustomTransformers, forceDtsEmit?: boolean): ts.EmitResult {
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
        const emitResolver = getTypeChecker().getEmitResolver(ts.outFile(options) ? undefined : sourceFile, cancellationToken);

        ts.performance.mark("beforeEmit");

        const emitResult = ts.emitFiles(
            emitResolver,
            getEmitHost(writeFileCallback),
            sourceFile,
            ts.getTransformers(options, customTransformers, emitOnly),
            emitOnly,
            /*onlyBuildInfo*/ false,
            forceDtsEmit
        );

        ts.performance.mark("afterEmit");
        ts.performance.measure("Emit", "beforeEmit", "afterEmit");
        return emitResult;
    }

    function getSourceFile(fileName: string): ts.SourceFile | undefined {
        return getSourceFileByPath(toPath(fileName));
    }

    function getSourceFileByPath(path: ts.Path): ts.SourceFile | undefined {
        return filesByName.get(path) || undefined;
    }

    function getDiagnosticsHelper<T extends ts.Diagnostic>(
        sourceFile: ts.SourceFile | undefined,
        getDiagnostics: (sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken | undefined) => readonly T[],
        cancellationToken: ts.CancellationToken | undefined): readonly T[] {
        if (sourceFile) {
            return getDiagnostics(sourceFile, cancellationToken);
        }
        return ts.sortAndDeduplicateDiagnostics(ts.flatMap(program.getSourceFiles(), sourceFile => {
            if (cancellationToken) {
                cancellationToken.throwIfCancellationRequested();
            }
            return getDiagnostics(sourceFile, cancellationToken);
        }));
    }

    function getSyntacticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.DiagnosticWithLocation[] {
        return getDiagnosticsHelper(sourceFile, getSyntacticDiagnosticsForFile, cancellationToken);
    }

    function getSemanticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
        return getDiagnosticsHelper(sourceFile, getSemanticDiagnosticsForFile, cancellationToken);
    }

    function getCachedSemanticDiagnostics(sourceFile?: ts.SourceFile): readonly ts.Diagnostic[] | undefined {
       return sourceFile
            ? cachedBindAndCheckDiagnosticsForFile.perFile?.get(sourceFile.path)
            : cachedBindAndCheckDiagnosticsForFile.allDiagnostics;
    }

    function getBindAndCheckDiagnostics(sourceFile: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[] {
        return getBindAndCheckDiagnosticsForFile(sourceFile, cancellationToken);
    }

    function getProgramDiagnostics(sourceFile: ts.SourceFile): readonly ts.Diagnostic[] {
        if (ts.skipTypeChecking(sourceFile, options, program)) {
            return ts.emptyArray;
        }

        const programDiagnosticsInFile = programDiagnostics.getDiagnostics(sourceFile.fileName);
        if (!sourceFile.commentDirectives?.length) {
            return programDiagnosticsInFile;
        }

        return getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, programDiagnosticsInFile).diagnostics;
    }

    function getDeclarationDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.DiagnosticWithLocation[] {
        const options = program.getCompilerOptions();
        // collect diagnostics from the program only once if either no source file was specified or out/outFile is set (bundled emit)
        if (!sourceFile || ts.outFile(options)) {
            return getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
        }
        else {
            return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile, cancellationToken);
        }
    }

    function getSyntacticDiagnosticsForFile(sourceFile: ts.SourceFile): readonly ts.DiagnosticWithLocation[] {
        // For JavaScript files, we report semantic errors for using TypeScript-only
        // constructs from within a JavaScript file as syntactic errors.
        if (ts.isSourceFileJS(sourceFile)) {
            if (!sourceFile.additionalSyntacticDiagnostics) {
                sourceFile.additionalSyntacticDiagnostics = getJSSyntacticDiagnosticsForFile(sourceFile);
            }
            return ts.concatenate(sourceFile.additionalSyntacticDiagnostics, sourceFile.parseDiagnostics);
        }
        return sourceFile.parseDiagnostics;
    }

    function runWithCancellationToken<T>(func: () => T): T {
        try {
            return func();
        }
        catch (e) {
            if (e instanceof ts.OperationCanceledException) {
                // We were canceled while performing the operation.  Because our type checker
                // might be a bad state, we need to throw it away.
                typeChecker = undefined!;
            }

            throw e;
        }
    }

    function getSemanticDiagnosticsForFile(sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken | undefined): readonly ts.Diagnostic[] {
        return ts.concatenate(
            filterSemanticDiagnostics(getBindAndCheckDiagnosticsForFile(sourceFile, cancellationToken), options),
            getProgramDiagnostics(sourceFile)
        );
    }

    function getBindAndCheckDiagnosticsForFile(sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken | undefined): readonly ts.Diagnostic[] {
        return getAndCacheDiagnostics(sourceFile, cancellationToken, cachedBindAndCheckDiagnosticsForFile, getBindAndCheckDiagnosticsForFileNoCache);
    }

    function getBindAndCheckDiagnosticsForFileNoCache(sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken | undefined): readonly ts.Diagnostic[] {
        return runWithCancellationToken(() => {
            if (ts.skipTypeChecking(sourceFile, options, program)) {
                return ts.emptyArray;
            }

            const typeChecker = getTypeChecker();

            ts.Debug.assert(!!sourceFile.bindDiagnostics);

            const isJs = sourceFile.scriptKind === ts.ScriptKind.JS || sourceFile.scriptKind === ts.ScriptKind.JSX;
            const isCheckJs = isJs && ts.isCheckJsEnabledForFile(sourceFile, options);
            const isPlainJs = ts.isPlainJsFile(sourceFile, options.checkJs);
            const isTsNoCheck = !!sourceFile.checkJsDirective && sourceFile.checkJsDirective.enabled === false;

            // By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
            // - plain JS: .js files with no // ts-check and checkJs: undefined
            // - check JS: .js files with either // ts-check or checkJs: true
            // - external: files that are added by plugins
            const includeBindAndCheckDiagnostics = !isTsNoCheck && (sourceFile.scriptKind === ts.ScriptKind.TS || sourceFile.scriptKind === ts.ScriptKind.TSX
                    || sourceFile.scriptKind === ts.ScriptKind.External || isPlainJs || isCheckJs || sourceFile.scriptKind === ts.ScriptKind.Deferred);
            let bindDiagnostics: readonly ts.Diagnostic[] = includeBindAndCheckDiagnostics ? sourceFile.bindDiagnostics : ts.emptyArray;
            let checkDiagnostics = includeBindAndCheckDiagnostics ? typeChecker.getDiagnostics(sourceFile, cancellationToken) : ts.emptyArray;
            if (isPlainJs) {
                bindDiagnostics = ts.filter(bindDiagnostics, d => plainJSErrors.has(d.code));
                checkDiagnostics = ts.filter(checkDiagnostics, d => plainJSErrors.has(d.code));
            }
            // skip ts-expect-error errors in plain JS files, and skip JSDoc errors except in checked JS
            return getMergedBindAndCheckDiagnostics(sourceFile, includeBindAndCheckDiagnostics && !isPlainJs, bindDiagnostics, checkDiagnostics, isCheckJs ? sourceFile.jsDocDiagnostics : undefined);
        });
    }

    function getMergedBindAndCheckDiagnostics(sourceFile: ts.SourceFile, includeBindAndCheckDiagnostics: boolean, ...allDiagnostics: (readonly ts.Diagnostic[] | undefined)[]) {
        const flatDiagnostics = ts.flatten(allDiagnostics);
        if (!includeBindAndCheckDiagnostics || !sourceFile.commentDirectives?.length) {
            return flatDiagnostics;
        }

        const { diagnostics, directives } = getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, flatDiagnostics);

        for (const errorExpectation of directives.getUnusedExpectations()) {
            diagnostics.push(ts.createDiagnosticForRange(sourceFile, errorExpectation.range, ts.Diagnostics.Unused_ts_expect_error_directive));
        }

        return diagnostics;
    }

    /**
     * Creates a map of comment directives along with the diagnostics immediately preceded by one of them.
     * Comments that match to any of those diagnostics are marked as used.
     */
    function getDiagnosticsWithPrecedingDirectives(sourceFile: ts.SourceFile, commentDirectives: ts.CommentDirective[], flatDiagnostics: ts.Diagnostic[]) {
        // Diagnostics are only reported if there is no comment directive preceding them
        // This will modify the directives map by marking "used" ones with a corresponding diagnostic
        const directives = ts.createCommentDirectivesMap(sourceFile, commentDirectives);
        const diagnostics = flatDiagnostics.filter(diagnostic => markPrecedingCommentDirectiveLine(diagnostic, directives) === -1);

        return { diagnostics, directives };
    }

    function getSuggestionDiagnostics(sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken): readonly ts.DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            return getTypeChecker().getSuggestionDiagnostics(sourceFile, cancellationToken);
        });
    }

    /**
     * @returns The line index marked as preceding the diagnostic, or -1 if none was.
     */
    function markPrecedingCommentDirectiveLine(diagnostic: ts.Diagnostic, directives: ts.CommentDirectivesMap) {
        const { file, start } = diagnostic;
        if (!file) {
            return -1;
        }

        // Start out with the line just before the text
        const lineStarts = ts.getLineStarts(file);
        let line = ts.computeLineAndCharacterOfPosition(lineStarts, start!).line - 1; // TODO: GH#18217
        while (line >= 0) {
            // As soon as that line is known to have a comment directive, use that
            if (directives.markUsed(line)) {
                return line;
            }

            // Stop searching if the line is not empty and not a comment
            const lineText = file.text.slice(lineStarts[line], lineStarts[line + 1]).trim();
            if (lineText !== "" && !/^(\s*)\/\/(.*)$/.test(lineText)) {
                return -1;
            }

            line--;
        }

        return -1;
    }

    function getJSSyntacticDiagnosticsForFile(sourceFile: ts.SourceFile): ts.DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            const diagnostics: ts.DiagnosticWithLocation[] = [];
            walk(sourceFile, sourceFile);
            ts.forEachChildRecursively(sourceFile, walk, walkArray);

            return diagnostics;

            function walk(node: ts.Node, parent: ts.Node) {
                // Return directly from the case if the given node doesnt want to visit each child
                // Otherwise break to visit each child

                switch (parent.kind) {
                    case ts.SyntaxKind.Parameter:
                    case ts.SyntaxKind.PropertyDeclaration:
                    case ts.SyntaxKind.MethodDeclaration:
                        if ((parent as ts.ParameterDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration).questionToken === node) {
                            diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, "?"));
                            return "skip";
                        }
                    // falls through
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.ArrowFunction:
                    case ts.SyntaxKind.VariableDeclaration:
                        // type annotation
                        if ((parent as ts.FunctionLikeDeclaration | ts.VariableDeclaration | ts.ParameterDeclaration | ts.PropertyDeclaration).type === node) {
                            diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.Type_annotations_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                }

                switch (node.kind) {
                    case ts.SyntaxKind.ImportClause:
                        if ((node as ts.ImportClause).isTypeOnly) {
                            diagnostics.push(createDiagnosticForNode(parent, ts.Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, "import type"));
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.ExportDeclaration:
                        if ((node as ts.ExportDeclaration).isTypeOnly) {
                            diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, "export type"));
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.ImportSpecifier:
                    case ts.SyntaxKind.ExportSpecifier:
                        if ((node as ts.ImportOrExportSpecifier).isTypeOnly) {
                            diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, ts.isImportSpecifier(node) ? "import...type" : "export...type"));
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.ImportEqualsDeclaration:
                        diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.import_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case ts.SyntaxKind.ExportAssignment:
                        if ((node as ts.ExportAssignment).isExportEquals) {
                            diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.export_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.HeritageClause:
                        const heritageClause = node as ts.HeritageClause;
                        if (heritageClause.token === ts.SyntaxKind.ImplementsKeyword) {
                            diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.implements_clauses_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.InterfaceDeclaration:
                        const interfaceKeyword = ts.tokenToString(ts.SyntaxKind.InterfaceKeyword);
                        ts.Debug.assertIsDefined(interfaceKeyword);
                        diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, interfaceKeyword));
                        return "skip";
                    case ts.SyntaxKind.ModuleDeclaration:
                        const moduleKeyword = node.flags & ts.NodeFlags.Namespace ? ts.tokenToString(ts.SyntaxKind.NamespaceKeyword) : ts.tokenToString(ts.SyntaxKind.ModuleKeyword);
                        ts.Debug.assertIsDefined(moduleKeyword);
                        diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, moduleKeyword));
                        return "skip";
                    case ts.SyntaxKind.TypeAliasDeclaration:
                        diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.Type_aliases_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case ts.SyntaxKind.EnumDeclaration:
                        const enumKeyword = ts.Debug.checkDefined(ts.tokenToString(ts.SyntaxKind.EnumKeyword));
                        diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files, enumKeyword));
                        return "skip";
                    case ts.SyntaxKind.NonNullExpression:
                        diagnostics.push(createDiagnosticForNode(node, ts.Diagnostics.Non_null_assertions_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case ts.SyntaxKind.AsExpression:
                        diagnostics.push(createDiagnosticForNode((node as ts.AsExpression).type, ts.Diagnostics.Type_assertion_expressions_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case ts.SyntaxKind.SatisfiesExpression:
                        diagnostics.push(createDiagnosticForNode((node as ts.SatisfiesExpression).type, ts.Diagnostics.Type_satisfaction_expressions_can_only_be_used_in_TypeScript_files));
                        return "skip";
                    case ts.SyntaxKind.TypeAssertionExpression:
                        ts.Debug.fail(); // Won't parse these in a JS file anyway, as they are interpreted as JSX.
                }
            }

            function walkArray(nodes: ts.NodeArray<ts.Node>, parent: ts.Node) {
                if (ts.canHaveModifiers(parent) && parent.modifiers === nodes && ts.some(nodes, ts.isDecorator) && !options.experimentalDecorators) {
                    diagnostics.push(createDiagnosticForNode(parent, ts.Diagnostics.Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_in_your_tsconfig_or_jsconfig_to_remove_this_warning));
                }

                switch (parent.kind) {
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.ClassExpression:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.ArrowFunction:
                        // Check type parameters
                        if (nodes === (parent as ts.DeclarationWithTypeParameterChildren).typeParameters) {
                            diagnostics.push(createDiagnosticForNodeArray(nodes, ts.Diagnostics.Type_parameter_declarations_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                    // falls through

                    case ts.SyntaxKind.VariableStatement:
                        // Check modifiers
                        if (nodes === (parent as ts.VariableStatement).modifiers) {
                            checkModifiers((parent as ts.VariableStatement).modifiers!, parent.kind === ts.SyntaxKind.VariableStatement);
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.PropertyDeclaration:
                        // Check modifiers of property declaration
                        if (nodes === (parent as ts.PropertyDeclaration).modifiers) {
                            for (const modifier of nodes as ts.NodeArray<ts.ModifierLike>) {
                                if (ts.isModifier(modifier)
                                    && modifier.kind !== ts.SyntaxKind.StaticKeyword
                                    && modifier.kind !== ts.SyntaxKind.AccessorKeyword) {
                                    diagnostics.push(createDiagnosticForNode(modifier, ts.Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, ts.tokenToString(modifier.kind)));
                                }
                            }
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.Parameter:
                        // Check modifiers of parameter declaration
                        if (nodes === (parent as ts.ParameterDeclaration).modifiers && ts.some(nodes, ts.isModifier)) {
                            diagnostics.push(createDiagnosticForNodeArray(nodes, ts.Diagnostics.Parameter_modifiers_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                    case ts.SyntaxKind.CallExpression:
                    case ts.SyntaxKind.NewExpression:
                    case ts.SyntaxKind.ExpressionWithTypeArguments:
                    case ts.SyntaxKind.JsxSelfClosingElement:
                    case ts.SyntaxKind.JsxOpeningElement:
                    case ts.SyntaxKind.TaggedTemplateExpression:
                        // Check type arguments
                        if (nodes === (parent as ts.NodeWithTypeArguments).typeArguments) {
                            diagnostics.push(createDiagnosticForNodeArray(nodes, ts.Diagnostics.Type_arguments_can_only_be_used_in_TypeScript_files));
                            return "skip";
                        }
                        break;
                }
            }

            function checkModifiers(modifiers: ts.NodeArray<ts.ModifierLike>, isConstValid: boolean) {
                for (const modifier of modifiers) {
                    switch (modifier.kind) {
                        case ts.SyntaxKind.ConstKeyword:
                            if (isConstValid) {
                                continue;
                            }
                        // to report error,
                        // falls through
                        case ts.SyntaxKind.PublicKeyword:
                        case ts.SyntaxKind.PrivateKeyword:
                        case ts.SyntaxKind.ProtectedKeyword:
                        case ts.SyntaxKind.ReadonlyKeyword:
                        case ts.SyntaxKind.DeclareKeyword:
                        case ts.SyntaxKind.AbstractKeyword:
                        case ts.SyntaxKind.OverrideKeyword:
                        case ts.SyntaxKind.InKeyword:
                        case ts.SyntaxKind.OutKeyword:
                            diagnostics.push(createDiagnosticForNode(modifier, ts.Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, ts.tokenToString(modifier.kind)));
                            break;

                        // These are all legal modifiers.
                        case ts.SyntaxKind.StaticKeyword:
                        case ts.SyntaxKind.ExportKeyword:
                        case ts.SyntaxKind.DefaultKeyword:
                        case ts.SyntaxKind.AccessorKeyword:
                    }
                }
            }

            function createDiagnosticForNodeArray(nodes: ts.NodeArray<ts.Node>, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): ts.DiagnosticWithLocation {
                const start = nodes.pos;
                return ts.createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2);
            }

            // Since these are syntactic diagnostics, parent might not have been set
            // this means the sourceFile cannot be infered from the node
            function createDiagnosticForNode(node: ts.Node, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): ts.DiagnosticWithLocation {
                return ts.createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2);
            }
        });
    }

    function getDeclarationDiagnosticsWorker(sourceFile: ts.SourceFile | undefined, cancellationToken: ts.CancellationToken | undefined): readonly ts.DiagnosticWithLocation[] {
        return getAndCacheDiagnostics(sourceFile, cancellationToken, cachedDeclarationDiagnosticsForFile, getDeclarationDiagnosticsForFileNoCache);
    }

    function getDeclarationDiagnosticsForFileNoCache(sourceFile: ts.SourceFile | undefined, cancellationToken: ts.CancellationToken | undefined): readonly ts.DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            const resolver = getTypeChecker().getEmitResolver(sourceFile, cancellationToken);
            // Don't actually write any files since we're just getting diagnostics.
            return ts.getDeclarationDiagnostics(getEmitHost(ts.noop), resolver, sourceFile) || ts.emptyArray;
        });
    }

    function getAndCacheDiagnostics<T extends ts.SourceFile | undefined, U extends ts.Diagnostic>(
        sourceFile: T,
        cancellationToken: ts.CancellationToken | undefined,
        cache: DiagnosticCache<U>,
        getDiagnostics: (sourceFile: T, cancellationToken: ts.CancellationToken | undefined) => readonly U[],
    ): readonly U[] {

        const cachedResult = sourceFile
            ? cache.perFile?.get(sourceFile.path)
            : cache.allDiagnostics;

        if (cachedResult) {
            return cachedResult;
        }
        const result = getDiagnostics(sourceFile, cancellationToken);
        if (sourceFile) {
            (cache.perFile || (cache.perFile = new ts.Map())).set(sourceFile.path, result);
        }
        else {
            cache.allDiagnostics = result;
        }
        return result;
    }

    function getDeclarationDiagnosticsForFile(sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken): readonly ts.DiagnosticWithLocation[] {
        return sourceFile.isDeclarationFile ? [] : getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
    }

    function getOptionsDiagnostics(): ts.SortedReadonlyArray<ts.Diagnostic> {
        return ts.sortAndDeduplicateDiagnostics(ts.concatenate(
            programDiagnostics.getGlobalDiagnostics(),
            getOptionsDiagnosticsOfConfigFile()
        ));
    }

    function getOptionsDiagnosticsOfConfigFile() {
        if (!options.configFile) return ts.emptyArray;
        let diagnostics = programDiagnostics.getDiagnostics(options.configFile.fileName);
        forEachResolvedProjectReference(resolvedRef => {
            diagnostics = ts.concatenate(diagnostics, programDiagnostics.getDiagnostics(resolvedRef.sourceFile.fileName));
        });
        return diagnostics;
    }

    function getGlobalDiagnostics(): ts.SortedReadonlyArray<ts.Diagnostic> {
        return rootNames.length ? ts.sortAndDeduplicateDiagnostics(getTypeChecker().getGlobalDiagnostics().slice()) : ts.emptyArray as any as ts.SortedReadonlyArray<ts.Diagnostic>;
    }

    function getConfigFileParsingDiagnostics(): readonly ts.Diagnostic[] {
        return configFileParsingDiagnostics || ts.emptyArray;
    }

    function processRootFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: ts.FileIncludeReason) {
        processSourceFile(ts.normalizePath(fileName), isDefaultLib, ignoreNoDefaultLib, /*packageId*/ undefined, reason);
    }

    function fileReferenceIsEqualTo(a: ts.FileReference, b: ts.FileReference): boolean {
        return a.fileName === b.fileName;
    }

    function moduleNameIsEqualTo(a: ts.StringLiteralLike | ts.Identifier, b: ts.StringLiteralLike | ts.Identifier): boolean {
        return a.kind === ts.SyntaxKind.Identifier
            ? b.kind === ts.SyntaxKind.Identifier && a.escapedText === b.escapedText
            : b.kind === ts.SyntaxKind.StringLiteral && a.text === b.text;
    }

    function createSyntheticImport(text: string, file: ts.SourceFile) {
        const externalHelpersModuleReference = ts.factory.createStringLiteral(text);
        const importDecl = ts.factory.createImportDeclaration(/*modifiers*/ undefined, /*importClause*/ undefined, externalHelpersModuleReference, /*assertClause*/ undefined);
        ts.addEmitFlags(importDecl, ts.EmitFlags.NeverApplyImportHelper);
        ts.setParent(externalHelpersModuleReference, importDecl);
        ts.setParent(importDecl, file);
        // explicitly unset the synthesized flag on these declarations so the checker API will answer questions about them
        // (which is required to build the dependency graph for incremental emit)
        (externalHelpersModuleReference as ts.Mutable<ts.Node>).flags &= ~ts.NodeFlags.Synthesized;
        (importDecl as ts.Mutable<ts.Node>).flags &= ~ts.NodeFlags.Synthesized;
        return externalHelpersModuleReference;
    }

    function collectExternalModuleReferences(file: ts.SourceFile): void {
        if (file.imports) {
            return;
        }

        const isJavaScriptFile = ts.isSourceFileJS(file);
        const isExternalModuleFile = ts.isExternalModule(file);

        // file.imports may not be undefined if there exists dynamic import
        let imports: ts.StringLiteralLike[] | undefined;
        let moduleAugmentations: (ts.StringLiteral | ts.Identifier)[] | undefined;
        let ambientModules: string[] | undefined;

        // If we are importing helpers, we need to add a synthetic reference to resolve the
        // helpers library.
        if ((options.isolatedModules || isExternalModuleFile)
            && !file.isDeclarationFile) {
            if (options.importHelpers) {
                // synthesize 'import "tslib"' declaration
                imports = [createSyntheticImport(ts.externalHelpersModuleNameText, file)];
            }
            const jsxImport = ts.getJSXRuntimeImport(ts.getJSXImplicitImportBase(options, file), options);
            if (jsxImport) {
                // synthesize `import "base/jsx-runtime"` declaration
                (imports ||= []).push(createSyntheticImport(jsxImport, file));
            }
        }

        for (const node of file.statements) {
            collectModuleReferences(node, /*inAmbientModule*/ false);
        }
        if ((file.flags & ts.NodeFlags.PossiblyContainsDynamicImport) || isJavaScriptFile) {
            collectDynamicImportOrRequireCalls(file);
        }

        file.imports = imports || ts.emptyArray;
        file.moduleAugmentations = moduleAugmentations || ts.emptyArray;
        file.ambientModuleNames = ambientModules || ts.emptyArray;

        return;

        function collectModuleReferences(node: ts.Statement, inAmbientModule: boolean): void {
            if (ts.isAnyImportOrReExport(node)) {
                const moduleNameExpr = ts.getExternalModuleName(node);
                // TypeScript 1.0 spec (April 2014): 12.1.6
                // An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference other external modules
                // only through top - level external module names. Relative external module names are not permitted.
                if (moduleNameExpr && ts.isStringLiteral(moduleNameExpr) && moduleNameExpr.text && (!inAmbientModule || !ts.isExternalModuleNameRelative(moduleNameExpr.text))) {
                    ts.setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
                    imports = ts.append(imports, moduleNameExpr);
                    if (!usesUriStyleNodeCoreModules && currentNodeModulesDepth === 0 && !file.isDeclarationFile) {
                        usesUriStyleNodeCoreModules = ts.startsWith(moduleNameExpr.text, "node:");
                    }
                }
            }
            else if (ts.isModuleDeclaration(node)) {
                if (ts.isAmbientModule(node) && (inAmbientModule || ts.hasSyntacticModifier(node, ts.ModifierFlags.Ambient) || file.isDeclarationFile)) {
                    (node.name as ts.Mutable<ts.Node>).parent = node;
                    const nameText = ts.getTextOfIdentifierOrLiteral(node.name);
                    // Ambient module declarations can be interpreted as augmentations for some existing external modules.
                    // This will happen in two cases:
                    // - if current file is external module then module augmentation is a ambient module declaration defined in the top level scope
                    // - if current file is not external module then module augmentation is an ambient module declaration with non-relative module name
                    //   immediately nested in top level ambient module declaration .
                    if (isExternalModuleFile || (inAmbientModule && !ts.isExternalModuleNameRelative(nameText))) {
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
                        const body = (node as ts.ModuleDeclaration).body as ts.ModuleBlock;
                        if (body) {
                            for (const statement of body.statements) {
                                collectModuleReferences(statement, /*inAmbientModule*/ true);
                            }
                        }
                    }
                }
            }
        }

        function collectDynamicImportOrRequireCalls(file: ts.SourceFile) {
            const r = /import|require/g;
            while (r.exec(file.text) !== null) { // eslint-disable-line no-null/no-null
                const node = getNodeAtPosition(file, r.lastIndex);
                if (isJavaScriptFile && ts.isRequireCall(node, /*checkArgumentIsStringLiteralLike*/ true)) {
                    ts.setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
                    imports = ts.append(imports, node.arguments[0]);
                }
                // we have to check the argument list has length of at least 1. We will still have to process these even though we have parsing error.
                else if (ts.isImportCall(node) && node.arguments.length >= 1 && ts.isStringLiteralLike(node.arguments[0])) {
                    ts.setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
                    imports = ts.append(imports, node.arguments[0]);
                }
                else if (ts.isLiteralImportTypeNode(node)) {
                    ts.setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
                    imports = ts.append(imports, node.argument.literal);
                }
            }
        }

        /** Returns a token if position is in [start-of-leading-trivia, end), includes JSDoc only in JS files */
        function getNodeAtPosition(sourceFile: ts.SourceFile, position: number): ts.Node {
            let current: ts.Node = sourceFile;
            const getContainingChild = (child: ts.Node) => {
                if (child.pos <= position && (position < child.end || (position === child.end && (child.kind === ts.SyntaxKind.EndOfFileToken)))) {
                    return child;
                }
            };
            while (true) {
                const child = isJavaScriptFile && ts.hasJSDocNodes(current) && ts.forEach(current.jsDoc, getContainingChild) || ts.forEachChild(current, getContainingChild);
                if (!child) {
                    return current;
                }
                current = child;
            }
        }
    }

    function getLibFileFromReference(ref: ts.FileReference) {
        const libName = ts.toFileNameLowerCase(ref.fileName);
        const libFileName = ts.libMap.get(libName);
        if (libFileName) {
            return getSourceFile(pathForLibFile(libFileName));
        }
    }

    /** This should have similar behavior to 'processSourceFile' without diagnostics or mutation. */
    function getSourceFileFromReference(referencingFile: ts.SourceFile | ts.UnparsedSource, ref: ts.FileReference): ts.SourceFile | undefined {
        return getSourceFileFromReferenceWorker(resolveTripleslashReference(ref.fileName, referencingFile.fileName), getSourceFile);
    }

    function getSourceFileFromReferenceWorker(
        fileName: string,
        getSourceFile: (fileName: string) => ts.SourceFile | undefined,
        fail?: (diagnostic: ts.DiagnosticMessage, ...argument: string[]) => void,
        reason?: ts.FileIncludeReason): ts.SourceFile | undefined {

        if (ts.hasExtension(fileName)) {
            const canonicalFileName = host.getCanonicalFileName(fileName);
            if (!options.allowNonTsExtensions && !ts.forEach(ts.flatten(supportedExtensionsWithJsonIfResolveJsonModule), extension => ts.fileExtensionIs(canonicalFileName, extension))) {
                if (fail) {
                    if (ts.hasJSFileExtension(canonicalFileName)) {
                        fail(ts.Diagnostics.File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option, fileName);
                    }
                    else {
                        fail(ts.Diagnostics.File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1, fileName, "'" + ts.flatten(supportedExtensions).join("', '") + "'");
                    }
                }
                return undefined;
            }

            const sourceFile = getSourceFile(fileName);
            if (fail) {
                if (!sourceFile) {
                    const redirect = getProjectReferenceRedirect(fileName);
                    if (redirect) {
                        fail(ts.Diagnostics.Output_file_0_has_not_been_built_from_source_file_1, redirect, fileName);
                    }
                    else {
                        fail(ts.Diagnostics.File_0_not_found, fileName);
                    }
                }
                else if (isReferencedFile(reason) && canonicalFileName === host.getCanonicalFileName(getSourceFileByPath(reason.file)!.fileName)) {
                    fail(ts.Diagnostics.A_file_cannot_have_a_reference_to_itself);
                }
            }
            return sourceFile;
        }
        else {
            const sourceFileNoExtension = options.allowNonTsExtensions && getSourceFile(fileName);
            if (sourceFileNoExtension) return sourceFileNoExtension;

            if (fail && options.allowNonTsExtensions) {
                fail(ts.Diagnostics.File_0_not_found, fileName);
                return undefined;
            }

            // Only try adding extensions from the first supported group (which should be .ts/.tsx/.d.ts)
            const sourceFileWithAddedExtension = ts.forEach(supportedExtensions[0], extension => getSourceFile(fileName + extension));
            if (fail && !sourceFileWithAddedExtension) fail(ts.Diagnostics.Could_not_resolve_the_path_0_with_the_extensions_Colon_1, fileName, "'" + ts.flatten(supportedExtensions).join("', '") + "'");
            return sourceFileWithAddedExtension;
        }
    }

    /** This has side effects through `findSourceFile`. */
    function processSourceFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, packageId: ts.PackageId | undefined, reason: ts.FileIncludeReason): void {
        getSourceFileFromReferenceWorker(
            fileName,
            fileName => findSourceFile(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId), // TODO: GH#18217
            (diagnostic, ...args) => addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, diagnostic, args),
            reason
        );
    }

    function processProjectReferenceFile(fileName: string, reason: ts.ProjectReferenceFile) {
        return processSourceFile(fileName, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, /*packageId*/ undefined, reason);
    }

    function reportFileNamesDifferOnlyInCasingError(fileName: string, existingFile: ts.SourceFile, reason: ts.FileIncludeReason): void {
        const hasExistingReasonToReportErrorOn = !isReferencedFile(reason) && ts.some(fileReasons.get(existingFile.path), isReferencedFile);
        if (hasExistingReasonToReportErrorOn) {
            addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, ts.Diagnostics.Already_included_file_name_0_differs_from_file_name_1_only_in_casing, [existingFile.fileName, fileName]);
        }
        else {
            addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, ts.Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, [fileName, existingFile.fileName]);
        }
    }

    function createRedirectSourceFile(redirectTarget: ts.SourceFile, unredirected: ts.SourceFile, fileName: string, path: ts.Path, resolvedPath: ts.Path, originalFileName: string, sourceFileOptions: ts.CreateSourceFileOptions): ts.SourceFile {
        const redirect: ts.SourceFile = Object.create(redirectTarget);
        redirect.fileName = fileName;
        redirect.path = path;
        redirect.resolvedPath = resolvedPath;
        redirect.originalFileName = originalFileName;
        redirect.redirectInfo = { redirectTarget, unredirected };
        redirect.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
        redirect.packageJsonScope = sourceFileOptions.packageJsonScope;
        sourceFilesFoundSearchingNodeModules.set(path, currentNodeModulesDepth > 0);
        Object.defineProperties(redirect, {
            id: {
                get(this: ts.SourceFile) { return this.redirectInfo!.redirectTarget.id; },
                set(this: ts.SourceFile, value: ts.SourceFile["id"]) { this.redirectInfo!.redirectTarget.id = value; },
            },
            symbol: {
                get(this: ts.SourceFile) { return this.redirectInfo!.redirectTarget.symbol; },
                set(this: ts.SourceFile, value: ts.SourceFile["symbol"]) { this.redirectInfo!.redirectTarget.symbol = value; },
            },
        });
        return redirect;
    }

    // Get source file from normalized fileName
    function findSourceFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: ts.FileIncludeReason, packageId: ts.PackageId | undefined): ts.SourceFile | undefined {
        ts.tracing?.push(ts.tracing.Phase.Program, "findSourceFile", {
            fileName,
            isDefaultLib: isDefaultLib || undefined,
            fileIncludeKind: (ts.FileIncludeKind as any)[reason.kind],
        });
        const result = findSourceFileWorker(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId);
        ts.tracing?.pop();
        return result;
    }

    function getCreateSourceFileOptions(fileName: string, moduleResolutionCache: ts.ModuleResolutionCache | undefined, host: ts.CompilerHost, options: ts.CompilerOptions): ts.CreateSourceFileOptions {
        // It's a _little odd_ that we can't set `impliedNodeFormat` until the program step - but it's the first and only time we have a resolution cache
        // and a freshly made source file node on hand at the same time, and we need both to set the field. Persisting the resolution cache all the way
        // to the check and emit steps would be bad - so we much prefer detecting and storing the format information on the source file node upfront.
        const result = getImpliedNodeFormatForFileWorker(ts.getNormalizedAbsolutePath(fileName, currentDirectory), moduleResolutionCache?.getPackageJsonInfoCache(), host, options);
        const languageVersion = ts.getEmitScriptTarget(options);
        const setExternalModuleIndicator = ts.getSetExternalModuleIndicator(options);
        return typeof result === "object" ?
            { ...result, languageVersion, setExternalModuleIndicator } :
            { languageVersion, impliedNodeFormat: result, setExternalModuleIndicator };
    }

    function findSourceFileWorker(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: ts.FileIncludeReason, packageId: ts.PackageId | undefined): ts.SourceFile | undefined {
        const path = toPath(fileName);
        if (useSourceOfProjectReferenceRedirect) {
            let source = getSourceOfProjectReferenceRedirect(path);
            // If preserveSymlinks is true, module resolution wont jump the symlink
            // but the resolved real path may be the .d.ts from project reference
            // Note:: Currently we try the real path only if the
            // file is from node_modules to avoid having to run real path on all file paths
            if (!source &&
                host.realpath &&
                options.preserveSymlinks &&
                ts.isDeclarationFileName(fileName) &&
                ts.stringContains(fileName, ts.nodeModulesPathPart)) {
                const realPath = toPath(host.realpath(fileName));
                if (realPath !== path) source = getSourceOfProjectReferenceRedirect(realPath);
            }
            if (source) {
                const file = ts.isString(source) ?
                    findSourceFile(source, isDefaultLib, ignoreNoDefaultLib, reason, packageId) :
                    undefined;
                if (file) addFileToFilesByName(file, path, /*redirectedPath*/ undefined);
                return file;
            }
        }
        const originalFileName = fileName;
        if (filesByName.has(path)) {
            const file = filesByName.get(path);
            addFileIncludeReason(file || undefined, reason);
            // try to check if we've already seen this file but with a different casing in path
            // NOTE: this only makes sense for case-insensitive file systems, and only on files which are not redirected
            if (file && options.forceConsistentCasingInFileNames) {
                const checkedName = file.fileName;
                const isRedirect = toPath(checkedName) !== toPath(fileName);
                if (isRedirect) {
                    fileName = getProjectReferenceRedirect(fileName) || fileName;
                }
                // Check if it differs only in drive letters its ok to ignore that error:
                const checkedAbsolutePath = ts.getNormalizedAbsolutePathWithoutRoot(checkedName, currentDirectory);
                const inputAbsolutePath = ts.getNormalizedAbsolutePathWithoutRoot(fileName, currentDirectory);
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

        let redirectedPath: ts.Path | undefined;
        if (isReferencedFile(reason) && !useSourceOfProjectReferenceRedirect) {
            const redirectProject = getProjectReferenceRedirectProject(fileName);
            if (redirectProject) {
                if (ts.outFile(redirectProject.commandLine.options)) {
                    // Shouldnt create many to 1 mapping file in --out scenario
                    return undefined;
                }
                const redirect = getProjectReferenceOutputName(redirectProject, fileName);
                fileName = redirect;
                // Once we start redirecting to a file, we can potentially come back to it
                // via a back-reference from another file in the .d.ts folder. If that happens we'll
                // end up trying to add it to the program *again* because we were tracking it via its
                // original (un-redirected) name. So we have to map both the original path and the redirected path
                // to the source file we're about to find/create
                redirectedPath = toPath(redirect);
            }
        }

        // We haven't looked for this file, do so now and cache result
        const sourceFileOptions = getCreateSourceFileOptions(fileName, moduleResolutionCache, host, options);
        const file = host.getSourceFile(
            fileName,
            sourceFileOptions,
            hostErrorMessage => addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, ts.Diagnostics.Cannot_read_file_0_Colon_1, [fileName, hostErrorMessage]),
            shouldCreateNewSourceFile || (oldProgram?.getSourceFileByPath(toPath(fileName))?.impliedNodeFormat !== sourceFileOptions.impliedNodeFormat)
        );

        if (packageId) {
            const packageIdKey = ts.packageIdToString(packageId);
            const fileFromPackageId = packageIdToSourceFile.get(packageIdKey);
            if (fileFromPackageId) {
                // Some other SourceFile already exists with this package name and version.
                // Instead of creating a duplicate, just redirect to the existing one.
                const dupFile = createRedirectSourceFile(fileFromPackageId, file!, fileName, path, toPath(fileName), originalFileName, sourceFileOptions);
                redirectTargetsMap.add(fileFromPackageId.path, fileName);
                addFileToFilesByName(dupFile, path, redirectedPath);
                addFileIncludeReason(dupFile, reason);
                sourceFileToPackageName.set(path, ts.packageIdToPackageName(packageId));
                processingOtherFiles!.push(dupFile);
                return dupFile;
            }
            else if (file) {
                // This is the first source file to have this packageId.
                packageIdToSourceFile.set(packageIdKey, file);
                sourceFileToPackageName.set(path, ts.packageIdToPackageName(packageId));
            }
        }
        addFileToFilesByName(file, path, redirectedPath);

        if (file) {
            sourceFilesFoundSearchingNodeModules.set(path, currentNodeModulesDepth > 0);
            file.fileName = fileName; // Ensure that source file has same name as what we were looking for
            file.path = path;
            file.resolvedPath = toPath(fileName);
            file.originalFileName = originalFileName;
            file.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
            file.packageJsonScope = sourceFileOptions.packageJsonScope;
            addFileIncludeReason(file, reason);

            if (host.useCaseSensitiveFileNames()) {
                const pathLowerCase = ts.toFileNameLowerCase(path);
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
        }
        return file;
    }

    function addFileIncludeReason(file: ts.SourceFile | undefined, reason: ts.FileIncludeReason) {
        if (file) fileReasons.add(file.path, reason);
    }

    function addFileToFilesByName(file: ts.SourceFile | undefined, path: ts.Path, redirectedPath: ts.Path | undefined) {
        if (redirectedPath) {
            filesByName.set(redirectedPath, file);
            filesByName.set(path, file || false);
        }
        else {
            filesByName.set(path, file);
        }
    }

    function getProjectReferenceRedirect(fileName: string): string | undefined {
        const referencedProject = getProjectReferenceRedirectProject(fileName);
        return referencedProject && getProjectReferenceOutputName(referencedProject, fileName);
    }

    function getProjectReferenceRedirectProject(fileName: string) {
        // Ignore dts or any json files
        if (!resolvedProjectReferences || !resolvedProjectReferences.length || ts.isDeclarationFileName(fileName) || ts.fileExtensionIs(fileName, ts.Extension.Json)) {
            return undefined;
        }

        // If this file is produced by a referenced project, we need to rewrite it to
        // look in the output folder of the referenced project rather than the input
        return getResolvedProjectReferenceToRedirect(fileName);
    }


    function getProjectReferenceOutputName(referencedProject: ts.ResolvedProjectReference, fileName: string) {
        const out = ts.outFile(referencedProject.commandLine.options);
        return out ?
            ts.changeExtension(out, ts.Extension.Dts) :
            ts.getOutputDeclarationFileName(fileName, referencedProject.commandLine, !host.useCaseSensitiveFileNames());
    }

    /**
     * Get the referenced project if the file is input file from that reference project
     */
    function getResolvedProjectReferenceToRedirect(fileName: string) {
        if (mapFromFileToProjectReferenceRedirects === undefined) {
            mapFromFileToProjectReferenceRedirects = new ts.Map();
            forEachResolvedProjectReference(referencedProject => {
                // not input file from the referenced project, ignore
                if (toPath(options.configFilePath!) !== referencedProject.sourceFile.path) {
                    referencedProject.commandLine.fileNames.forEach(f =>
                        mapFromFileToProjectReferenceRedirects!.set(toPath(f), referencedProject.sourceFile.path));
                }
            });
        }

        const referencedProjectPath = mapFromFileToProjectReferenceRedirects.get(toPath(fileName));
        return referencedProjectPath && getResolvedProjectReferenceByPath(referencedProjectPath);
    }

    function forEachResolvedProjectReference<T>(
        cb: (resolvedProjectReference: ts.ResolvedProjectReference) => T | undefined
    ): T | undefined {
        return ts.forEachResolvedProjectReference(resolvedProjectReferences, cb);
    }

    function getSourceOfProjectReferenceRedirect(path: ts.Path) {
        if (!ts.isDeclarationFileName(path)) return undefined;
        if (mapFromToProjectReferenceRedirectSource === undefined) {
            mapFromToProjectReferenceRedirectSource = new ts.Map();
            forEachResolvedProjectReference(resolvedRef => {
                const out = ts.outFile(resolvedRef.commandLine.options);
                if (out) {
                    // Dont know which source file it means so return true?
                    const outputDts = ts.changeExtension(out, ts.Extension.Dts);
                    mapFromToProjectReferenceRedirectSource!.set(toPath(outputDts), true);
                }
                else {
                    const getCommonSourceDirectory = ts.memoize(() => ts.getCommonSourceDirectoryOfConfig(resolvedRef.commandLine, !host.useCaseSensitiveFileNames()));
                    ts.forEach(resolvedRef.commandLine.fileNames, fileName => {
                        if (!ts.isDeclarationFileName(fileName) && !ts.fileExtensionIs(fileName, ts.Extension.Json)) {
                            const outputDts = ts.getOutputDeclarationFileName(fileName, resolvedRef.commandLine, !host.useCaseSensitiveFileNames(), getCommonSourceDirectory);
                            mapFromToProjectReferenceRedirectSource!.set(toPath(outputDts), fileName);
                        }
                    });
                }
            });
        }
        return mapFromToProjectReferenceRedirectSource.get(path);
    }

    function isSourceOfProjectReferenceRedirect(fileName: string) {
        return useSourceOfProjectReferenceRedirect && !!getResolvedProjectReferenceToRedirect(fileName);
    }

    function getResolvedProjectReferenceByPath(projectReferencePath: ts.Path): ts.ResolvedProjectReference | undefined {
        if (!projectReferenceRedirects) {
            return undefined;
        }

        return projectReferenceRedirects.get(projectReferencePath) || undefined;
    }

    function processReferencedFiles(file: ts.SourceFile, isDefaultLib: boolean) {
        ts.forEach(file.referencedFiles, (ref, index) => {
            processSourceFile(
                resolveTripleslashReference(ref.fileName, file.fileName),
                isDefaultLib,
                /*ignoreNoDefaultLib*/ false,
                /*packageId*/ undefined,
                { kind: ts.FileIncludeKind.ReferenceFile, file: file.path, index, }
            );
        });
    }

    function processTypeReferenceDirectives(file: ts.SourceFile) {
        const typeDirectives = file.typeReferenceDirectives;
        if (!typeDirectives) {
            return;
        }

        const resolutions = resolveTypeReferenceDirectiveNamesWorker(typeDirectives, file);
        for (let index = 0; index < typeDirectives.length; index++) {
            const ref = file.typeReferenceDirectives[index];
            const resolvedTypeReferenceDirective = resolutions[index];
            // store resolved type directive on the file
            const fileName = ts.toFileNameLowerCase(ref.fileName);
            ts.setResolvedTypeReferenceDirective(file, fileName, resolvedTypeReferenceDirective);
            const mode = ref.resolutionMode || file.impliedNodeFormat;
            if (mode && ts.getEmitModuleResolutionKind(options) !== ts.ModuleResolutionKind.Node16 && ts.getEmitModuleResolutionKind(options) !== ts.ModuleResolutionKind.NodeNext) {
                programDiagnostics.add(ts.createDiagnosticForRange(file, ref, ts.Diagnostics.resolution_mode_assertions_are_only_supported_when_moduleResolution_is_node16_or_nodenext));
            }
            processTypeReferenceDirective(fileName, mode, resolvedTypeReferenceDirective, { kind: ts.FileIncludeKind.TypeReferenceDirective, file: file.path, index, });
        }
    }

    function processTypeReferenceDirective(
        typeReferenceDirective: string,
        mode: ts.SourceFile["impliedNodeFormat"] | undefined,
        resolvedTypeReferenceDirective: ts.ResolvedTypeReferenceDirective | undefined,
        reason: ts.FileIncludeReason
    ): void {
        ts.tracing?.push(ts.tracing.Phase.Program, "processTypeReferenceDirective", { directive: typeReferenceDirective, hasResolved: !!resolvedTypeReferenceDirective, refKind: reason.kind, refPath: isReferencedFile(reason) ? reason.file : undefined });
        processTypeReferenceDirectiveWorker(typeReferenceDirective, mode, resolvedTypeReferenceDirective, reason);
        ts.tracing?.pop();
    }

    function processTypeReferenceDirectiveWorker(
        typeReferenceDirective: string,
        mode: ts.SourceFile["impliedNodeFormat"] | undefined,
        resolvedTypeReferenceDirective: ts.ResolvedTypeReferenceDirective | undefined,
        reason: ts.FileIncludeReason
    ): void {

        // If we already found this library as a primary reference - nothing to do
        const previousResolution = resolvedTypeReferenceDirectives.get(typeReferenceDirective, mode);
        if (previousResolution && previousResolution.primary) {
            return;
        }
        let saveResolution = true;
        if (resolvedTypeReferenceDirective) {
            if (resolvedTypeReferenceDirective.isExternalLibraryImport) currentNodeModulesDepth++;

            if (resolvedTypeReferenceDirective.primary) {
                // resolved from the primary path
                processSourceFile(resolvedTypeReferenceDirective.resolvedFileName!, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, resolvedTypeReferenceDirective.packageId, reason); // TODO: GH#18217
            }
            else {
                // If we already resolved to this file, it must have been a secondary reference. Check file contents
                // for sameness and possibly issue an error
                if (previousResolution) {
                    // Don't bother reading the file again if it's the same file.
                    if (resolvedTypeReferenceDirective.resolvedFileName !== previousResolution.resolvedFileName) {
                        const otherFileText = host.readFile(resolvedTypeReferenceDirective.resolvedFileName!);
                        const existingFile = getSourceFile(previousResolution.resolvedFileName!)!;
                        if (otherFileText !== existingFile.text) {
                            addFilePreprocessingFileExplainingDiagnostic(
                                existingFile,
                                reason,
                                ts.Diagnostics.Conflicting_definitions_for_0_found_at_1_and_2_Consider_installing_a_specific_version_of_this_library_to_resolve_the_conflict,
                                [typeReferenceDirective, resolvedTypeReferenceDirective.resolvedFileName, previousResolution.resolvedFileName]
                            );
                        }
                    }
                    // don't overwrite previous resolution result
                    saveResolution = false;
                }
                else {
                    // First resolution of this library
                    processSourceFile(resolvedTypeReferenceDirective.resolvedFileName!, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, resolvedTypeReferenceDirective.packageId, reason);
                }
            }

            if (resolvedTypeReferenceDirective.isExternalLibraryImport) currentNodeModulesDepth--;
        }
        else {
            addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, ts.Diagnostics.Cannot_find_type_definition_file_for_0, [typeReferenceDirective]);
        }

        if (saveResolution) {
            resolvedTypeReferenceDirectives.set(typeReferenceDirective, mode, resolvedTypeReferenceDirective);
        }
    }

    function pathForLibFile(libFileName: string): string {
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
        const resolveFrom = ts.combinePaths(currentDirectory, `__lib_node_modules_lookup_${libFileName}__.ts`);
        const localOverrideModuleResult = ts.resolveModuleName("@typescript/lib-" + path, resolveFrom, { moduleResolution: ts.ModuleResolutionKind.NodeJs }, host, moduleResolutionCache);
        if (localOverrideModuleResult?.resolvedModule) {
            return localOverrideModuleResult.resolvedModule.resolvedFileName;
        }
        return ts.combinePaths(defaultLibraryPath, libFileName);
    }

    function processLibReferenceDirectives(file: ts.SourceFile) {
        ts.forEach(file.libReferenceDirectives, (libReference, index) => {
            const libName = ts.toFileNameLowerCase(libReference.fileName);
            const libFileName = ts.libMap.get(libName);
            if (libFileName) {
                // we ignore any 'no-default-lib' reference set on this file.
                processRootFile(pathForLibFile(libFileName), /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ true, { kind: ts.FileIncludeKind.LibReferenceDirective, file: file.path, index, });
            }
            else {
                const unqualifiedLibName = ts.removeSuffix(ts.removePrefix(libName, "lib."), ".d.ts");
                const suggestion = ts.getSpellingSuggestion(unqualifiedLibName, ts.libs, ts.identity);
                const diagnostic = suggestion ? ts.Diagnostics.Cannot_find_lib_definition_for_0_Did_you_mean_1 : ts.Diagnostics.Cannot_find_lib_definition_for_0;
                (fileProcessingDiagnostics ||= []).push({
                    kind: ts.FilePreprocessingDiagnosticsKind.FilePreprocessingReferencedDiagnostic,
                    reason: { kind: ts.FileIncludeKind.LibReferenceDirective, file: file.path, index, },
                    diagnostic,
                    args: [libName, suggestion]
                });
            }
        });
    }

    function getCanonicalFileName(fileName: string): string {
        return host.getCanonicalFileName(fileName);
    }

    function processImportedModules(file: ts.SourceFile) {
        collectExternalModuleReferences(file);
        if (file.imports.length || file.moduleAugmentations.length) {
            // Because global augmentation doesn't have string literal name, we can check for global augmentation as such.
            const moduleNames = getModuleNames(file);
            const resolutions = resolveModuleNamesReusingOldState(moduleNames, file);
            ts.Debug.assert(resolutions.length === moduleNames.length);
            const optionsForFile = (useSourceOfProjectReferenceRedirect ? getRedirectReferenceForResolution(file)?.commandLine.options : undefined) || options;
            for (let index = 0; index < moduleNames.length; index++) {
                const resolution = resolutions[index];
                ts.setResolvedModule(file, moduleNames[index].text, resolution, getModeForUsageLocation(file, moduleNames[index]));

                if (!resolution) {
                    continue;
                }

                const isFromNodeModulesSearch = resolution.isExternalLibraryImport;
                const isJsFile = !ts.resolutionExtensionIsTSOrJson(resolution.extension);
                const isJsFileFromNodeModules = isFromNodeModulesSearch && isJsFile;
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
                    && !getResolutionDiagnostic(optionsForFile, resolution)
                    && !optionsForFile.noResolve
                    && index < file.imports.length
                    && !elideImport
                    && !(isJsFile && !ts.getAllowJSCompilerOption(optionsForFile))
                    && (ts.isInJSFile(file.imports[index]) || !(file.imports[index].flags & ts.NodeFlags.JSDoc));

                if (elideImport) {
                    modulesWithElidedImports.set(file.path, true);
                }
                else if (shouldAddFile) {
                    findSourceFile(
                        resolvedFileName,
                        /*isDefaultLib*/ false,
                        /*ignoreNoDefaultLib*/ false,
                        { kind: ts.FileIncludeKind.Import, file: file.path, index, },
                        resolution.packageId,
                    );
                }

                if (isFromNodeModulesSearch) {
                    currentNodeModulesDepth--;
                }
            }
        }
        else {
            // no imports - drop cached module resolutions
            file.resolvedModules = undefined;
        }
    }

    function checkSourceFilesBelongToPath(sourceFiles: readonly ts.SourceFile[], rootDirectory: string): boolean {
        let allFilesBelongToPath = true;
        const absoluteRootDirectoryPath = host.getCanonicalFileName(ts.getNormalizedAbsolutePath(rootDirectory, currentDirectory));
        for (const sourceFile of sourceFiles) {
            if (!sourceFile.isDeclarationFile) {
                const absoluteSourceFilePath = host.getCanonicalFileName(ts.getNormalizedAbsolutePath(sourceFile.fileName, currentDirectory));
                if (absoluteSourceFilePath.indexOf(absoluteRootDirectoryPath) !== 0) {
                    addProgramDiagnosticExplainingFile(
                        sourceFile,
                        ts.Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files,
                        [sourceFile.fileName, rootDirectory]
                    );
                    allFilesBelongToPath = false;
                }
            }
        }

        return allFilesBelongToPath;
    }

    function parseProjectReferenceConfigFile(ref: ts.ProjectReference): ts.ResolvedProjectReference | undefined {
        if (!projectReferenceRedirects) {
            projectReferenceRedirects = new ts.Map();
        }

        // The actual filename (i.e. add "/tsconfig.json" if necessary)
        const refPath = resolveProjectReferencePath(ref);
        const sourceFilePath = toPath(refPath);
        const fromCache = projectReferenceRedirects.get(sourceFilePath);
        if (fromCache !== undefined) {
            return fromCache || undefined;
        }

        let commandLine: ts.ParsedCommandLine | undefined;
        let sourceFile: ts.JsonSourceFile | undefined;
        if (host.getParsedCommandLine) {
            commandLine = host.getParsedCommandLine(refPath);
            if (!commandLine) {
                addFileToFilesByName(/*sourceFile*/ undefined, sourceFilePath, /*redirectedPath*/ undefined);
                projectReferenceRedirects.set(sourceFilePath, false);
                return undefined;
            }
            sourceFile = ts.Debug.checkDefined(commandLine.options.configFile);
            ts.Debug.assert(!sourceFile.path || sourceFile.path === sourceFilePath);
            addFileToFilesByName(sourceFile, sourceFilePath, /*redirectedPath*/ undefined);
        }
        else {
            // An absolute path pointing to the containing directory of the config file
            const basePath = ts.getNormalizedAbsolutePath(ts.getDirectoryPath(refPath), host.getCurrentDirectory());
            sourceFile = host.getSourceFile(refPath, ts.ScriptTarget.JSON) as ts.JsonSourceFile | undefined;
            addFileToFilesByName(sourceFile, sourceFilePath, /*redirectedPath*/ undefined);
            if (sourceFile === undefined) {
                projectReferenceRedirects.set(sourceFilePath, false);
                return undefined;
            }
            commandLine = ts.parseJsonSourceFileConfigFileContent(sourceFile, configParsingHost, basePath, /*existingOptions*/ undefined, refPath);
        }
        sourceFile.fileName = refPath;
        sourceFile.path = sourceFilePath;
        sourceFile.resolvedPath = sourceFilePath;
        sourceFile.originalFileName = refPath;

        const resolvedRef: ts.ResolvedProjectReference = { commandLine, sourceFile };
        projectReferenceRedirects.set(sourceFilePath, resolvedRef);
        if (commandLine.projectReferences) {
            resolvedRef.references = commandLine.projectReferences.map(parseProjectReferenceConfigFile);
        }
        return resolvedRef;
    }

    function verifyCompilerOptions() {
        if (options.strictPropertyInitialization && !ts.getStrictOptionValue(options, "strictNullChecks")) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "strictPropertyInitialization", "strictNullChecks");
        }
        if (options.exactOptionalPropertyTypes && !ts.getStrictOptionValue(options, "strictNullChecks")) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "exactOptionalPropertyTypes", "strictNullChecks");
        }

        if (options.isolatedModules) {
            if (options.out) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "isolatedModules");
            }

            if (options.outFile) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "outFile", "isolatedModules");
            }
        }

        if (options.inlineSourceMap) {
            if (options.sourceMap) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap");
            }
            if (options.mapRoot) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap");
            }
        }

        if (options.composite) {
            if (options.declaration === false) {
                createDiagnosticForOptionName(ts.Diagnostics.Composite_projects_may_not_disable_declaration_emit, "declaration");
            }
            if (options.incremental === false) {
                createDiagnosticForOptionName(ts.Diagnostics.Composite_projects_may_not_disable_incremental_compilation, "declaration");
            }
        }

        const outputFile = ts.outFile(options);
        if (options.tsBuildInfoFile) {
            if (!ts.isIncrementalCompilation(options)) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "tsBuildInfoFile", "incremental", "composite");
            }
        }
        else if (options.incremental && !outputFile && !options.configFilePath) {
            programDiagnostics.add(ts.createCompilerDiagnostic(ts.Diagnostics.Option_incremental_can_only_be_specified_using_tsconfig_emitting_to_single_file_or_when_option_tsBuildInfoFile_is_specified));
        }

        verifyProjectReferences();

        // List of collected files is complete; validate exhautiveness if this is a project with a file list
        if (options.composite) {
            const rootPaths = new ts.Set(rootNames.map(toPath));
            for (const file of files) {
                // Ignore file that is not emitted
                if (ts.sourceFileMayBeEmitted(file, program) && !rootPaths.has(file.path)) {
                    addProgramDiagnosticExplainingFile(
                        file,
                        ts.Diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern,
                        [file.fileName, options.configFilePath || ""]
                    );
                }
            }
        }

        if (options.paths) {
            for (const key in options.paths) {
                if (!ts.hasProperty(options.paths, key)) {
                    continue;
                }
                if (!ts.hasZeroOrOneAsteriskCharacter(key)) {
                    createDiagnosticForOptionPaths(/*onKey*/ true, key, ts.Diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, key);
                }
                if (ts.isArray(options.paths[key])) {
                    const len = options.paths[key].length;
                    if (len === 0) {
                        createDiagnosticForOptionPaths(/*onKey*/ false, key, ts.Diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array, key);
                    }
                    for (let i = 0; i < len; i++) {
                        const subst = options.paths[key][i];
                        const typeOfSubst = typeof subst;
                        if (typeOfSubst === "string") {
                            if (!ts.hasZeroOrOneAsteriskCharacter(subst)) {
                                createDiagnosticForOptionPathKeyValue(key, i, ts.Diagnostics.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character, subst, key);
                            }
                            if (!options.baseUrl && !ts.pathIsRelative(subst) && !ts.pathIsAbsolute(subst)) {
                                createDiagnosticForOptionPathKeyValue(key, i, ts.Diagnostics.Non_relative_paths_are_not_allowed_when_baseUrl_is_not_set_Did_you_forget_a_leading_Slash);
                            }
                        }
                        else {
                            createDiagnosticForOptionPathKeyValue(key, i, ts.Diagnostics.Substitution_0_for_pattern_1_has_incorrect_type_expected_string_got_2, subst, key, typeOfSubst);
                        }
                    }
                }
                else {
                    createDiagnosticForOptionPaths(/*onKey*/ false, key, ts.Diagnostics.Substitutions_for_pattern_0_should_be_an_array, key);
                }
            }
        }

        if (!options.sourceMap && !options.inlineSourceMap) {
            if (options.inlineSources) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "inlineSources");
            }
            if (options.sourceRoot) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "sourceRoot");
            }
        }

        if (options.out && options.outFile) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "outFile");
        }

        if (options.mapRoot && !(options.sourceMap || options.declarationMap)) {
            // Error to specify --mapRoot without --sourcemap
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "mapRoot", "sourceMap", "declarationMap");
        }

        if (options.declarationDir) {
            if (!ts.getEmitDeclarations(options)) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationDir", "declaration", "composite");
            }
            if (outputFile) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "declarationDir", options.out ? "out" : "outFile");
            }
        }

        if (options.declarationMap && !ts.getEmitDeclarations(options)) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationMap", "declaration", "composite");
        }

        if (options.lib && options.noLib) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "lib", "noLib");
        }

        if (options.noImplicitUseStrict && ts.getStrictOptionValue(options, "alwaysStrict")) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "noImplicitUseStrict", "alwaysStrict");
        }

        const languageVersion = ts.getEmitScriptTarget(options);

        const firstNonAmbientExternalModuleSourceFile = ts.find(files, f => ts.isExternalModule(f) && !f.isDeclarationFile);
        if (options.isolatedModules) {
            if (options.module === ts.ModuleKind.None && languageVersion < ts.ScriptTarget.ES2015) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES2015_or_higher, "isolatedModules", "target");
            }

            if (options.preserveConstEnums === false) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_preserveConstEnums_cannot_be_disabled_when_isolatedModules_is_enabled, "preserveConstEnums", "isolatedModules");
            }

            for (const file of files) {
                if (!ts.isExternalModule(file) && !ts.isSourceFileJS(file) && !file.isDeclarationFile && file.scriptKind !== ts.ScriptKind.JSON) {
                    const span = ts.getErrorSpanForNode(file, file);
                    programDiagnostics.add(ts.createFileDiagnostic(file, span.start, span.length,
                        ts.Diagnostics._0_cannot_be_compiled_under_isolatedModules_because_it_is_considered_a_global_script_file_Add_an_import_export_or_an_empty_export_statement_to_make_it_a_module, ts.getBaseFileName(file.fileName)));
                }
            }
        }
        else if (firstNonAmbientExternalModuleSourceFile && languageVersion < ts.ScriptTarget.ES2015 && options.module === ts.ModuleKind.None) {
            // We cannot use createDiagnosticFromNode because nodes do not have parents yet
            const span = ts.getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, typeof firstNonAmbientExternalModuleSourceFile.externalModuleIndicator === "boolean" ? firstNonAmbientExternalModuleSourceFile : firstNonAmbientExternalModuleSourceFile.externalModuleIndicator!);
            programDiagnostics.add(ts.createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, ts.Diagnostics.Cannot_use_imports_exports_or_module_augmentations_when_module_is_none));
        }

        // Cannot specify module gen that isn't amd or system with --out
        if (outputFile && !options.emitDeclarationOnly) {
            if (options.module && !(options.module === ts.ModuleKind.AMD || options.module === ts.ModuleKind.System)) {
                createDiagnosticForOptionName(ts.Diagnostics.Only_amd_and_system_modules_are_supported_alongside_0, options.out ? "out" : "outFile", "module");
            }
            else if (options.module === undefined && firstNonAmbientExternalModuleSourceFile) {
                const span = ts.getErrorSpanForNode(firstNonAmbientExternalModuleSourceFile, typeof firstNonAmbientExternalModuleSourceFile.externalModuleIndicator === "boolean" ? firstNonAmbientExternalModuleSourceFile : firstNonAmbientExternalModuleSourceFile.externalModuleIndicator!);
                programDiagnostics.add(ts.createFileDiagnostic(firstNonAmbientExternalModuleSourceFile, span.start, span.length, ts.Diagnostics.Cannot_compile_modules_using_option_0_unless_the_module_flag_is_amd_or_system, options.out ? "out" : "outFile"));
            }
        }

        if (options.resolveJsonModule) {
            if (ts.getEmitModuleResolutionKind(options) !== ts.ModuleResolutionKind.NodeJs &&
                ts.getEmitModuleResolutionKind(options) !== ts.ModuleResolutionKind.Node16 &&
                ts.getEmitModuleResolutionKind(options) !== ts.ModuleResolutionKind.NodeNext) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_resolveJsonModule_cannot_be_specified_without_node_module_resolution_strategy, "resolveJsonModule");
            }
            // Any emit other than common js, amd, es2015 or esnext is error
            else if (!ts.hasJsonModuleEmitEnabled(options)) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_resolveJsonModule_can_only_be_specified_when_module_code_generation_is_commonjs_amd_es2015_or_esNext, "resolveJsonModule", "module");
            }
        }

        // there has to be common source directory if user specified --outdir || --rootDir || --sourceRoot
        // if user specified --mapRoot, there needs to be common source directory if there would be multiple files being emitted
        if (options.outDir || // there is --outDir specified
            options.rootDir || // there is --rootDir specified
            options.sourceRoot || // there is --sourceRoot specified
            options.mapRoot) { // there is --mapRoot specified

            // Precalculate and cache the common source directory
            const dir = getCommonSourceDirectory();

            // If we failed to find a good common directory, but outDir is specified and at least one of our files is on a windows drive/URL/other resource, add a failure
            if (options.outDir && dir === "" && files.some(file => ts.getRootLength(file.fileName) > 1)) {
                createDiagnosticForOptionName(ts.Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files, "outDir");
            }
        }

        if (options.useDefineForClassFields && languageVersion === ts.ScriptTarget.ES3) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_when_option_target_is_ES3, "useDefineForClassFields");
        }

        if (options.checkJs && !ts.getAllowJSCompilerOption(options)) {
            programDiagnostics.add(ts.createCompilerDiagnostic(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "checkJs", "allowJs"));
        }

        if (options.emitDeclarationOnly) {
            if (!ts.getEmitDeclarations(options)) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "emitDeclarationOnly", "declaration", "composite");
            }

            if (options.noEmit) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "emitDeclarationOnly", "noEmit");
            }
        }

        if (options.emitDecoratorMetadata &&
            !options.experimentalDecorators) {
            createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators");
        }

        if (options.jsxFactory) {
            if (options.reactNamespace) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_with_option_1, "reactNamespace", "jsxFactory");
            }
            if (options.jsx === ts.JsxEmit.ReactJSX || options.jsx === ts.JsxEmit.ReactJSXDev) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFactory", ts.inverseJsxOptionMap.get("" + options.jsx));
            }
            if (!ts.parseIsolatedEntityName(options.jsxFactory, languageVersion)) {
                createOptionValueDiagnostic("jsxFactory", ts.Diagnostics.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name, options.jsxFactory);
            }
        }
        else if (options.reactNamespace && !ts.isIdentifierText(options.reactNamespace, languageVersion)) {
            createOptionValueDiagnostic("reactNamespace", ts.Diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier, options.reactNamespace);
        }

        if (options.jsxFragmentFactory) {
            if (!options.jsxFactory) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "jsxFragmentFactory", "jsxFactory");
            }
            if (options.jsx === ts.JsxEmit.ReactJSX || options.jsx === ts.JsxEmit.ReactJSXDev) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFragmentFactory", ts.inverseJsxOptionMap.get("" + options.jsx));
            }
            if (!ts.parseIsolatedEntityName(options.jsxFragmentFactory, languageVersion)) {
                createOptionValueDiagnostic("jsxFragmentFactory", ts.Diagnostics.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name, options.jsxFragmentFactory);
            }
        }

        if (options.reactNamespace) {
            if (options.jsx === ts.JsxEmit.ReactJSX || options.jsx === ts.JsxEmit.ReactJSXDev) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "reactNamespace", ts.inverseJsxOptionMap.get("" + options.jsx));
            }
        }

        if (options.jsxImportSource) {
            if (options.jsx === ts.JsxEmit.React) {
                createDiagnosticForOptionName(ts.Diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxImportSource", ts.inverseJsxOptionMap.get("" + options.jsx));
            }
        }

        if (options.preserveValueImports && ts.getEmitModuleKind(options) < ts.ModuleKind.ES2015) {
            createOptionValueDiagnostic("importsNotUsedAsValues", ts.Diagnostics.Option_preserveValueImports_can_only_be_used_when_module_is_set_to_es2015_or_later);
        }

        // If the emit is enabled make sure that every output file is unique and not overwriting any of the input files
        if (!options.noEmit && !options.suppressOutputPathCheck) {
            const emitHost = getEmitHost();
            const emitFilesSeen = new ts.Set<string>();
            ts.forEachEmittedFile(emitHost, (emitFileNames) => {
                if (!options.emitDeclarationOnly) {
                    verifyEmitFilePath(emitFileNames.jsFilePath, emitFilesSeen);
                }
                verifyEmitFilePath(emitFileNames.declarationFilePath, emitFilesSeen);
            });
        }

        // Verify that all the emit files are unique and don't overwrite input files
        function verifyEmitFilePath(emitFileName: string | undefined, emitFilesSeen: ts.Set<string>) {
            if (emitFileName) {
                const emitFilePath = toPath(emitFileName);
                // Report error if the output overwrites input file
                if (filesByName.has(emitFilePath)) {
                    let chain: ts.DiagnosticMessageChain | undefined;
                    if (!options.configFilePath) {
                        // The program is from either an inferred project or an external project
                        chain = ts.chainDiagnosticMessages(/*details*/ undefined, ts.Diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig);
                    }
                    chain = ts.chainDiagnosticMessages(chain, ts.Diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, emitFileName);
                    blockEmittingOfFile(emitFileName, ts.createCompilerDiagnosticFromMessageChain(chain));
                }

                const emitFileKey = !host.useCaseSensitiveFileNames() ? ts.toFileNameLowerCase(emitFilePath) : emitFilePath;
                // Report error if multiple files write into same file
                if (emitFilesSeen.has(emitFileKey)) {
                    // Already seen the same emit file - report error
                    blockEmittingOfFile(emitFileName, ts.createCompilerDiagnostic(ts.Diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, emitFileName));
                }
                else {
                    emitFilesSeen.add(emitFileKey);
                }
            }
        }
    }

    function createDiagnosticExplainingFile(file: ts.SourceFile | undefined, fileProcessingReason: ts.FileIncludeReason | undefined, diagnostic: ts.DiagnosticMessage, args: (string | number | undefined)[] | undefined): ts.Diagnostic {
        let fileIncludeReasons: ts.DiagnosticMessageChain[] | undefined;
        let relatedInfo: ts.Diagnostic[] | undefined;
        let locationReason = isReferencedFile(fileProcessingReason) ? fileProcessingReason : undefined;
        if (file) fileReasons.get(file.path)?.forEach(processReason);
        if (fileProcessingReason) processReason(fileProcessingReason);
        // If we have location and there is only one reason file is in which is the location, dont add details for file include
        if (locationReason && fileIncludeReasons?.length === 1) fileIncludeReasons = undefined;
        const location = locationReason && getReferencedFileLocation(getSourceFileByPath, locationReason);
        const fileIncludeReasonDetails = fileIncludeReasons && ts.chainDiagnosticMessages(fileIncludeReasons, ts.Diagnostics.The_file_is_in_the_program_because_Colon);
        const redirectInfo = file && ts.explainIfFileIsRedirectAndImpliedFormat(file);
        const chain = ts.chainDiagnosticMessages(redirectInfo ? fileIncludeReasonDetails ? [fileIncludeReasonDetails, ...redirectInfo] : redirectInfo : fileIncludeReasonDetails, diagnostic, ...args || ts.emptyArray);
        return location && isReferenceFileLocation(location) ?
            ts.createFileDiagnosticFromMessageChain(location.file, location.pos, location.end - location.pos, chain, relatedInfo) :
            ts.createCompilerDiagnosticFromMessageChain(chain, relatedInfo);

        function processReason(reason: ts.FileIncludeReason) {
            (fileIncludeReasons ||= []).push(ts.fileIncludeReasonToDiagnostics(program, reason));
            if (!locationReason && isReferencedFile(reason)) {
                // Report error at first reference file or file currently in processing and dont report in related information
                locationReason = reason;
            }
            else if (locationReason !== reason) {
                relatedInfo = ts.append(relatedInfo, fileIncludeReasonToRelatedInformation(reason));
            }
            // Remove fileProcessingReason if its already included in fileReasons of the program
            if (reason === fileProcessingReason) fileProcessingReason = undefined;
        }
    }

    function addFilePreprocessingFileExplainingDiagnostic(file: ts.SourceFile | undefined, fileProcessingReason: ts.FileIncludeReason, diagnostic: ts.DiagnosticMessage, args?: (string | number | undefined)[]) {
        (fileProcessingDiagnostics ||= []).push({
            kind: ts.FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic,
            file: file && file.path,
            fileProcessingReason,
            diagnostic,
            args
        });
    }

    function addProgramDiagnosticExplainingFile(file: ts.SourceFile, diagnostic: ts.DiagnosticMessage, args?: (string | number | undefined)[]) {
        programDiagnostics.add(createDiagnosticExplainingFile(file, /*fileProcessingReason*/ undefined, diagnostic, args));
    }

    function fileIncludeReasonToRelatedInformation(reason: ts.FileIncludeReason): ts.DiagnosticWithLocation | undefined {
        if (isReferencedFile(reason)) {
            const referenceLocation = getReferencedFileLocation(getSourceFileByPath, reason);
            let message: ts.DiagnosticMessage;
            switch (reason.kind) {
                case ts.FileIncludeKind.Import:
                    message = ts.Diagnostics.File_is_included_via_import_here;
                    break;
                case ts.FileIncludeKind.ReferenceFile:
                    message = ts.Diagnostics.File_is_included_via_reference_here;
                    break;
                case ts.FileIncludeKind.TypeReferenceDirective:
                    message = ts.Diagnostics.File_is_included_via_type_library_reference_here;
                    break;
                case ts.FileIncludeKind.LibReferenceDirective:
                    message = ts.Diagnostics.File_is_included_via_library_reference_here;
                    break;
                default:
                    ts.Debug.assertNever(reason);
            }
            return isReferenceFileLocation(referenceLocation) ? ts.createFileDiagnostic(
                referenceLocation.file,
                referenceLocation.pos,
                referenceLocation.end - referenceLocation.pos,
                message,
            ) : undefined;
        }

        if (!options.configFile) return undefined;
        let configFileNode: ts.Node | undefined;
        let message: ts.DiagnosticMessage;
        switch (reason.kind) {
            case ts.FileIncludeKind.RootFile:
                if (!options.configFile.configFileSpecs) return undefined;
                const fileName = ts.getNormalizedAbsolutePath(rootNames[reason.index], currentDirectory);
                const matchedByFiles = ts.getMatchedFileSpec(program, fileName);
                if (matchedByFiles) {
                    configFileNode = ts.getTsConfigPropArrayElementValue(options.configFile, "files", matchedByFiles);
                    message = ts.Diagnostics.File_is_matched_by_files_list_specified_here;
                    break;
                }
                const matchedByInclude = ts.getMatchedIncludeSpec(program, fileName);
                // Could be additional files specified as roots
                if (!matchedByInclude || !ts.isString(matchedByInclude)) return undefined;
                configFileNode = ts.getTsConfigPropArrayElementValue(options.configFile, "include", matchedByInclude);
                message = ts.Diagnostics.File_is_matched_by_include_pattern_specified_here;
                break;
            case ts.FileIncludeKind.SourceFromProjectReference:
            case ts.FileIncludeKind.OutputFromProjectReference:
                const referencedResolvedRef = ts.Debug.checkDefined(resolvedProjectReferences?.[reason.index]);
                const referenceInfo = forEachProjectReference(projectReferences, resolvedProjectReferences, (resolvedRef, parent, index) =>
                    resolvedRef === referencedResolvedRef ? { sourceFile: parent?.sourceFile || options.configFile!, index } : undefined
                );
                if (!referenceInfo) return undefined;
                const { sourceFile, index } = referenceInfo;
                const referencesSyntax = ts.firstDefined(ts.getTsConfigPropArray(sourceFile as ts.TsConfigSourceFile, "references"),
                    property => ts.isArrayLiteralExpression(property.initializer) ? property.initializer : undefined);
                return referencesSyntax && referencesSyntax.elements.length > index ?
                    ts.createDiagnosticForNodeInSourceFile(
                        sourceFile,
                        referencesSyntax.elements[index],
                        reason.kind === ts.FileIncludeKind.OutputFromProjectReference ?
                            ts.Diagnostics.File_is_output_from_referenced_project_specified_here :
                            ts.Diagnostics.File_is_source_from_referenced_project_specified_here,
                    ) :
                    undefined;
            case ts.FileIncludeKind.AutomaticTypeDirectiveFile:
                if (!options.types) return undefined;
                configFileNode = getOptionsSyntaxByArrayElementValue("types", reason.typeReference);
                message = ts.Diagnostics.File_is_entry_point_of_type_library_specified_here;
                break;
            case ts.FileIncludeKind.LibFile:
                if (reason.index !== undefined) {
                    configFileNode = getOptionsSyntaxByArrayElementValue("lib", options.lib![reason.index]);
                    message = ts.Diagnostics.File_is_library_specified_here;
                    break;
                }
                const target = ts.forEachEntry(ts.targetOptionDeclaration.type, (value, key) => value === ts.getEmitScriptTarget(options) ? key : undefined);
                configFileNode = target ? getOptionsSyntaxByValue("target", target) : undefined;
                message = ts.Diagnostics.File_is_default_library_for_target_specified_here;
                break;
            default:
                ts.Debug.assertNever(reason);
        }
        return configFileNode && ts.createDiagnosticForNodeInSourceFile(
            options.configFile,
            configFileNode,
            message,
        );
    }

    function verifyProjectReferences() {
        const buildInfoPath = !options.suppressOutputPathCheck ? ts.getTsBuildInfoEmitOutputFilePath(options) : undefined;
        forEachProjectReference(projectReferences, resolvedProjectReferences, (resolvedRef, parent, index) => {
            const ref = (parent ? parent.commandLine.projectReferences : projectReferences)![index];
            const parentFile = parent && parent.sourceFile as ts.JsonSourceFile;
            if (!resolvedRef) {
                createDiagnosticForReference(parentFile, index, ts.Diagnostics.File_0_not_found, ref.path);
                return;
            }
            const options = resolvedRef.commandLine.options;
            if (!options.composite || options.noEmit) {
                // ok to not have composite if the current program is container only
                const inputs = parent ? parent.commandLine.fileNames : rootNames;
                if (inputs.length) {
                    if (!options.composite) createDiagnosticForReference(parentFile, index, ts.Diagnostics.Referenced_project_0_must_have_setting_composite_Colon_true, ref.path);
                    if (options.noEmit) createDiagnosticForReference(parentFile, index, ts.Diagnostics.Referenced_project_0_may_not_disable_emit, ref.path);
                }
            }
            if (ref.prepend) {
                const out = ts.outFile(options);
                if (out) {
                    if (!host.fileExists(out)) {
                        createDiagnosticForReference(parentFile, index, ts.Diagnostics.Output_file_0_from_project_1_does_not_exist, out, ref.path);
                    }
                }
                else {
                    createDiagnosticForReference(parentFile, index, ts.Diagnostics.Cannot_prepend_project_0_because_it_does_not_have_outFile_set, ref.path);
                }
            }
            if (!parent && buildInfoPath && buildInfoPath === ts.getTsBuildInfoEmitOutputFilePath(options)) {
                createDiagnosticForReference(parentFile, index, ts.Diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, buildInfoPath, ref.path);
                hasEmitBlockingDiagnostics.set(toPath(buildInfoPath), true);
            }
        });
    }

    function createDiagnosticForOptionPathKeyValue(key: string, valueIndex: number, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number) {
        let needCompilerDiagnostic = true;
        const pathsSyntax = getOptionPathsSyntax();
        for (const pathProp of pathsSyntax) {
            if (ts.isObjectLiteralExpression(pathProp.initializer)) {
                for (const keyProps of ts.getPropertyAssignment(pathProp.initializer, key)) {
                    const initializer = keyProps.initializer;
                    if (ts.isArrayLiteralExpression(initializer) && initializer.elements.length > valueIndex) {
                        programDiagnostics.add(ts.createDiagnosticForNodeInSourceFile(options.configFile!, initializer.elements[valueIndex], message, arg0, arg1, arg2));
                        needCompilerDiagnostic = false;
                    }
                }
            }
        }

        if (needCompilerDiagnostic) {
            programDiagnostics.add(ts.createCompilerDiagnostic(message, arg0, arg1, arg2));
        }
    }

    function createDiagnosticForOptionPaths(onKey: boolean, key: string, message: ts.DiagnosticMessage, arg0: string | number) {
        let needCompilerDiagnostic = true;
        const pathsSyntax = getOptionPathsSyntax();
        for (const pathProp of pathsSyntax) {
            if (ts.isObjectLiteralExpression(pathProp.initializer) &&
                createOptionDiagnosticInObjectLiteralSyntax(
                    pathProp.initializer, onKey, key, /*key2*/ undefined,
                    message, arg0)) {
                needCompilerDiagnostic = false;
            }
        }
        if (needCompilerDiagnostic) {
            programDiagnostics.add(ts.createCompilerDiagnostic(message, arg0));
        }
    }

    function getOptionsSyntaxByName(name: string) {
        const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
        return compilerOptionsObjectLiteralSyntax && ts.getPropertyAssignment(compilerOptionsObjectLiteralSyntax, name);
    }

    function getOptionPathsSyntax() {
        return getOptionsSyntaxByName("paths") || ts.emptyArray;
    }

    function getOptionsSyntaxByValue(name: string, value: string) {
        const syntaxByName = getOptionsSyntaxByName(name);
        return syntaxByName && ts.firstDefined(syntaxByName, property => ts.isStringLiteral(property.initializer) && property.initializer.text === value ? property.initializer : undefined);
    }

    function getOptionsSyntaxByArrayElementValue(name: string, value: string) {
        const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
        return compilerOptionsObjectLiteralSyntax && ts.getPropertyArrayElementValue(compilerOptionsObjectLiteralSyntax, name, value);
    }

    function createDiagnosticForOptionName(message: ts.DiagnosticMessage, option1: string, option2?: string, option3?: string) {
        createDiagnosticForOption(/*onKey*/ true, option1, option2, message, option1, option2, option3);
    }

    function createOptionValueDiagnostic(option1: string, message: ts.DiagnosticMessage, arg0?: string, arg1?: string) {
        createDiagnosticForOption(/*onKey*/ false, option1, /*option2*/ undefined, message, arg0, arg1);
    }

    function createDiagnosticForReference(sourceFile: ts.JsonSourceFile | undefined, index: number, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number) {
        const referencesSyntax = ts.firstDefined(ts.getTsConfigPropArray(sourceFile || options.configFile, "references"),
            property => ts.isArrayLiteralExpression(property.initializer) ? property.initializer : undefined);
        if (referencesSyntax && referencesSyntax.elements.length > index) {
            programDiagnostics.add(ts.createDiagnosticForNodeInSourceFile(sourceFile || options.configFile!, referencesSyntax.elements[index], message, arg0, arg1));
        }
        else {
            programDiagnostics.add(ts.createCompilerDiagnostic(message, arg0, arg1));
        }
    }

    function createDiagnosticForOption(onKey: boolean, option1: string, option2: string | undefined, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number) {
        const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
        const needCompilerDiagnostic = !compilerOptionsObjectLiteralSyntax ||
            !createOptionDiagnosticInObjectLiteralSyntax(compilerOptionsObjectLiteralSyntax, onKey, option1, option2, message, arg0, arg1, arg2);

        if (needCompilerDiagnostic) {
            programDiagnostics.add(ts.createCompilerDiagnostic(message, arg0, arg1, arg2));
        }
    }

    function getCompilerOptionsObjectLiteralSyntax() {
        if (_compilerOptionsObjectLiteralSyntax === undefined) {
            _compilerOptionsObjectLiteralSyntax = false;
            const jsonObjectLiteral = ts.getTsConfigObjectLiteralExpression(options.configFile);
            if (jsonObjectLiteral) {
                for (const prop of ts.getPropertyAssignment(jsonObjectLiteral, "compilerOptions")) {
                    if (ts.isObjectLiteralExpression(prop.initializer)) {
                        _compilerOptionsObjectLiteralSyntax = prop.initializer;
                        break;
                    }
                }
            }
        }
        return _compilerOptionsObjectLiteralSyntax || undefined;
    }

    function createOptionDiagnosticInObjectLiteralSyntax(objectLiteral: ts.ObjectLiteralExpression, onKey: boolean, key1: string, key2: string | undefined, message: ts.DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number): boolean {
        const props = ts.getPropertyAssignment(objectLiteral, key1, key2);
        for (const prop of props) {
            programDiagnostics.add(ts.createDiagnosticForNodeInSourceFile(options.configFile!, onKey ? prop.name : prop.initializer, message, arg0, arg1, arg2));
        }
        return !!props.length;
    }

    function blockEmittingOfFile(emitFileName: string, diag: ts.Diagnostic) {
        hasEmitBlockingDiagnostics.set(toPath(emitFileName), true);
        programDiagnostics.add(diag);
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
        const out = ts.outFile(options);
        if (out) {
            return isSameFile(filePath, out) || isSameFile(filePath, ts.removeFileExtension(out) + ts.Extension.Dts);
        }

        // If declarationDir is specified, return if its a file in that directory
        if (options.declarationDir && ts.containsPath(options.declarationDir, filePath, currentDirectory, !host.useCaseSensitiveFileNames())) {
            return true;
        }

        // If --outDir, check if file is in that directory
        if (options.outDir) {
            return ts.containsPath(options.outDir, filePath, currentDirectory, !host.useCaseSensitiveFileNames());
        }

        if (ts.fileExtensionIsOneOf(filePath, ts.supportedJSExtensionsFlat) || ts.isDeclarationFileName(filePath)) {
            // Otherwise just check if sourceFile with the name exists
            const filePathWithoutExtension = ts.removeFileExtension(filePath);
            return !!getSourceFileByPath((filePathWithoutExtension + ts.Extension.Ts) as ts.Path) ||
                !!getSourceFileByPath((filePathWithoutExtension + ts.Extension.Tsx) as ts.Path);
        }
        return false;
    }

    function isSameFile(file1: string, file2: string) {
        return ts.comparePaths(file1, file2, currentDirectory, !host.useCaseSensitiveFileNames()) === ts.Comparison.EqualTo;
    }

    function getSymlinkCache(): ts.SymlinkCache {
        if (host.getSymlinkCache) {
            return host.getSymlinkCache();
        }
        if (!symlinks) {
            symlinks = ts.createSymlinkCache(currentDirectory, getCanonicalFileName);
        }
        if (files && resolvedTypeReferenceDirectives && !symlinks.hasProcessedResolutions()) {
            symlinks.setSymlinksFromResolutions(files, resolvedTypeReferenceDirectives);
        }
        return symlinks;
    }
}

interface HostForUseSourceOfProjectReferenceRedirect {
    compilerHost: ts.CompilerHost;
    getSymlinkCache: () => ts.SymlinkCache;
    useSourceOfProjectReferenceRedirect: boolean;
    toPath(fileName: string): ts.Path;
    getResolvedProjectReferences(): readonly (ts.ResolvedProjectReference | undefined)[] | undefined;
    getSourceOfProjectReferenceRedirect(path: ts.Path): ts.SourceOfProjectReferenceRedirect | undefined;
    forEachResolvedProjectReference<T>(cb: (resolvedProjectReference: ts.ResolvedProjectReference) => T | undefined): T | undefined;
}

function updateHostForUseSourceOfProjectReferenceRedirect(host: HostForUseSourceOfProjectReferenceRedirect) {
    let setOfDeclarationDirectories: ts.Set<ts.Path> | undefined;
    const originalFileExists = host.compilerHost.fileExists;
    const originalDirectoryExists = host.compilerHost.directoryExists;
    const originalGetDirectories = host.compilerHost.getDirectories;
    const originalRealpath = host.compilerHost.realpath;

    if (!host.useSourceOfProjectReferenceRedirect) return { onProgramCreateComplete: ts.noop, fileExists };

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
                setOfDeclarationDirectories = new ts.Set();
                host.forEachResolvedProjectReference(ref => {
                    const out = ts.outFile(ref.commandLine.options);
                    if (out) {
                        setOfDeclarationDirectories!.add(ts.getDirectoryPath(host.toPath(out)));
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
        if (!ts.isDeclarationFileName(file)) return false;

        // Project references go to source file instead of .d.ts file
        return fileOrDirectoryExistsUsingSource(file, /*isFile*/ true);
    }

    function fileExistsIfProjectReferenceDts(file: string) {
        const source = host.getSourceOfProjectReferenceRedirect(host.toPath(file));
        return source !== undefined ?
            ts.isString(source) ? originalFileExists.call(host.compilerHost, source) as boolean : true :
            undefined;
    }

    function directoryExistsIfProjectReferenceDeclDir(dir: string) {
        const dirPath = host.toPath(dir);
        const dirPathWithTrailingDirectorySeparator = `${dirPath}${ts.directorySeparator}`;
        return ts.forEachKey(
            setOfDeclarationDirectories!,
            declDirPath => dirPath === declDirPath ||
                // Any parent directory of declaration dir
                ts.startsWith(declDirPath, dirPathWithTrailingDirectorySeparator) ||
                // Any directory inside declaration dir
                ts.startsWith(dirPath, `${declDirPath}/`)
        );
    }

    function handleDirectoryCouldBeSymlink(directory: string) {
        if (!host.getResolvedProjectReferences() || ts.containsIgnoredPath(directory)) return;

        // Because we already watch node_modules, handle symlinks in there
        if (!originalRealpath || !ts.stringContains(directory, ts.nodeModulesPathPart)) return;
        const symlinkCache = host.getSymlinkCache();
        const directoryPath = ts.ensureTrailingDirectorySeparator(host.toPath(directory));
        if (symlinkCache.getSymlinkedDirectories()?.has(directoryPath)) return;

        const real = ts.normalizePath(originalRealpath.call(host.compilerHost, directory));
        let realPath: ts.Path;
        if (real === directory ||
            (realPath = ts.ensureTrailingDirectorySeparator(host.toPath(real))) === directoryPath) {
            // not symlinked
            symlinkCache.setSymlinkedDirectory(directoryPath, false);
            return;
        }

        symlinkCache.setSymlinkedDirectory(directory, {
            real: ts.ensureTrailingDirectorySeparator(real),
            realPath
        });
    }

    function fileOrDirectoryExistsUsingSource(fileOrDirectory: string, isFile: boolean): boolean {
        const fileOrDirectoryExistsUsingSource = isFile ?
            (file: string) => fileExistsIfProjectReferenceDts(file) :
            (dir: string) => directoryExistsIfProjectReferenceDeclDir(dir);
        // Check current directory or file
        const result = fileOrDirectoryExistsUsingSource(fileOrDirectory);
        if (result !== undefined) return result;

        const symlinkCache = host.getSymlinkCache();
        const symlinkedDirectories = symlinkCache.getSymlinkedDirectories();
        if (!symlinkedDirectories) return false;
        const fileOrDirectoryPath = host.toPath(fileOrDirectory);
        if (!ts.stringContains(fileOrDirectoryPath, ts.nodeModulesPathPart)) return false;
        if (isFile && symlinkCache.getSymlinkedFiles()?.has(fileOrDirectoryPath)) return true;

        // If it contains node_modules check if its one of the symlinked path we know of
        return ts.firstDefinedIterator(
            symlinkedDirectories.entries(),
            ([directoryPath, symlinkedDirectory]) => {
                if (!symlinkedDirectory || !ts.startsWith(fileOrDirectoryPath, directoryPath)) return undefined;
                const result = fileOrDirectoryExistsUsingSource(fileOrDirectoryPath.replace(directoryPath, symlinkedDirectory.realPath));
                if (isFile && result) {
                    // Store the real path for the file'
                    const absolutePath = ts.getNormalizedAbsolutePath(fileOrDirectory, host.compilerHost.getCurrentDirectory());
                    symlinkCache.setSymlinkedFile(
                        fileOrDirectoryPath,
                        `${symlinkedDirectory.real}${absolutePath.replace(new RegExp(directoryPath, "i"), "")}`
                    );
                }
                return result;
            }
        ) || false;
    }
}

/*@internal*/
export const emitSkippedWithNoDiagnostics: ts.EmitResult = { diagnostics: ts.emptyArray, sourceMaps: undefined, emittedFiles: undefined, emitSkipped: true };

/*@internal*/
export function handleNoEmitOptions<T extends ts.BuilderProgram>(
    program: ts.Program | T,
    sourceFile: ts.SourceFile | undefined,
    writeFile: ts.WriteFileCallback | undefined,
    cancellationToken: ts.CancellationToken | undefined
): ts.EmitResult | undefined {
    const options = program.getCompilerOptions();
    if (options.noEmit) {
        // Cache the semantic diagnostics
        program.getSemanticDiagnostics(sourceFile, cancellationToken);
        return sourceFile || ts.outFile(options) ?
            emitSkippedWithNoDiagnostics :
            program.emitBuildInfo(writeFile, cancellationToken);
    }

    // If the noEmitOnError flag is set, then check if we have any errors so far.  If so,
    // immediately bail out.  Note that we pass 'undefined' for 'sourceFile' so that we
    // get any preEmit diagnostics, not just the ones
    if (!options.noEmitOnError) return undefined;
    let diagnostics: readonly ts.Diagnostic[] = [
        ...program.getOptionsDiagnostics(cancellationToken),
        ...program.getSyntacticDiagnostics(sourceFile, cancellationToken),
        ...program.getGlobalDiagnostics(cancellationToken),
        ...program.getSemanticDiagnostics(sourceFile, cancellationToken)
    ];

    if (diagnostics.length === 0 && ts.getEmitDeclarations(program.getCompilerOptions())) {
        diagnostics = program.getDeclarationDiagnostics(/*sourceFile*/ undefined, cancellationToken);
    }

    if (!diagnostics.length) return undefined;
    let emittedFiles: string[] | undefined;
    if (!sourceFile && !ts.outFile(options)) {
        const emitResult = program.emitBuildInfo(writeFile, cancellationToken);
        if (emitResult.diagnostics) diagnostics = [...diagnostics, ...emitResult.diagnostics];
        emittedFiles = emitResult.emittedFiles;
    }
    return { diagnostics, sourceMaps: undefined, emittedFiles, emitSkipped: true };
}

/*@internal*/
export function filterSemanticDiagnostics(diagnostic: readonly ts.Diagnostic[], option: ts.CompilerOptions): readonly ts.Diagnostic[] {
    return ts.filter(diagnostic, d => !d.skippedOn || !option[d.skippedOn]);
}

/*@internal*/
interface CompilerHostLike {
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string | undefined;
    readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): string[];
    trace?(s: string): void;
    onUnRecoverableConfigFileDiagnostic?: ts.DiagnosticReporter;
}

/* @internal */
export function parseConfigHostFromCompilerHostLike(host: CompilerHostLike, directoryStructureHost: ts.DirectoryStructureHost = host): ts.ParseConfigFileHost {
    return {
        fileExists: f => directoryStructureHost.fileExists(f),
        readDirectory(root, extensions, excludes, includes, depth) {
            ts.Debug.assertIsDefined(directoryStructureHost.readDirectory, "'CompilerHost.readDirectory' must be implemented to correctly process 'projectReferences'");
            return directoryStructureHost.readDirectory(root, extensions, excludes, includes, depth);
        },
        readFile: f => directoryStructureHost.readFile(f),
        useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
        getCurrentDirectory: () => host.getCurrentDirectory(),
        onUnRecoverableConfigFileDiagnostic: host.onUnRecoverableConfigFileDiagnostic || ts.returnUndefined,
        trace: host.trace ? (s) => host.trace!(s) : undefined
    };
}

// For backward compatibility
/** @deprecated */ export interface ResolveProjectReferencePathHost {
    fileExists(fileName: string): boolean;
}

/* @internal */
export function createPrependNodes(
    projectReferences: readonly ts.ProjectReference[] | undefined,
    getCommandLine: (ref: ts.ProjectReference, index: number) => ts.ParsedCommandLine | undefined,
    readFile: (path: string) => string | undefined,
    host: ts.CompilerHost,
) {
    if (!projectReferences) return ts.emptyArray;
    let nodes: ts.InputFiles[] | undefined;
    for (let i = 0; i < projectReferences.length; i++) {
        const ref = projectReferences[i];
        const resolvedRefOpts = getCommandLine(ref, i);
        if (ref.prepend && resolvedRefOpts && resolvedRefOpts.options) {
            const out = ts.outFile(resolvedRefOpts.options);
            // Upstream project didn't have outFile set -- skip (error will have been issued earlier)
            if (!out) continue;

            const { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath } = ts.getOutputPathsForBundle(resolvedRefOpts.options, /*forceDtsPaths*/ true);
            const node = ts.createInputFilesWithFilePaths(readFile, jsFilePath!, sourceMapFilePath, declarationFilePath!, declarationMapPath, buildInfoPath, host, resolvedRefOpts.options);
            (nodes || (nodes = [])).push(node);
        }
    }
    return nodes || ts.emptyArray;
}
/**
 * Returns the target config filename of a project reference.
 * Note: The file might not exist.
 */
export function resolveProjectReferencePath(ref: ts.ProjectReference): ts.ResolvedConfigFileName;
/** @deprecated */ export function resolveProjectReferencePath(host: ResolveProjectReferencePathHost, ref: ts.ProjectReference): ts.ResolvedConfigFileName;
export function resolveProjectReferencePath(hostOrRef: ResolveProjectReferencePathHost | ts.ProjectReference, ref?: ts.ProjectReference): ts.ResolvedConfigFileName {
    const passedInRef = ref ? ref : hostOrRef as ts.ProjectReference;
    return ts.resolveConfigFileProjectName(passedInRef.path);
}

/* @internal */
/**
 * Returns a DiagnosticMessage if we won't include a resolved module due to its extension.
 * The DiagnosticMessage's parameters are the imported module name, and the filename it resolved to.
 * This returns a diagnostic even if the module will be an untyped module.
 */
export function getResolutionDiagnostic(options: ts.CompilerOptions, { extension }: ts.ResolvedModuleFull): ts.DiagnosticMessage | undefined {
    switch (extension) {
        case ts.Extension.Ts:
        case ts.Extension.Dts:
            // These are always allowed.
            return undefined;
        case ts.Extension.Tsx:
            return needJsx();
        case ts.Extension.Jsx:
            return needJsx() || needAllowJs();
        case ts.Extension.Js:
            return needAllowJs();
        case ts.Extension.Json:
            return needResolveJsonModule();
    }

    function needJsx() {
        return options.jsx ? undefined : ts.Diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set;
    }
    function needAllowJs() {
        return ts.getAllowJSCompilerOption(options) || !ts.getStrictOptionValue(options, "noImplicitAny") ? undefined : ts.Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type;
    }
    function needResolveJsonModule() {
        return options.resolveJsonModule ? undefined : ts.Diagnostics.Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used;
    }
}

function getModuleNames({ imports, moduleAugmentations }: ts.SourceFile): ts.StringLiteralLike[] {
    const res = imports.map(i => i);
    for (const aug of moduleAugmentations) {
        if (aug.kind === ts.SyntaxKind.StringLiteral) {
            res.push(aug);
        }
        // Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
    }
    return res;
}

/* @internal */
export function getModuleNameStringLiteralAt({ imports, moduleAugmentations }: SourceFileImportsList, index: number): ts.StringLiteralLike {
    if (index < imports.length) return imports[index];
    let augIndex = imports.length;
    for (const aug of moduleAugmentations) {
        if (aug.kind === ts.SyntaxKind.StringLiteral) {
            if (index === augIndex) return aug;
            augIndex++;
        }
        // Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
    }
    ts.Debug.fail("should never ask for module name at index higher than possible module name");
}
}
