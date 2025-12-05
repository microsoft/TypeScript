import {
    CallExpression,
    combinePaths,
    createGetCanonicalFileName,
    createModuleSpecifierResolutionHost,
    createRange,
    Debug,
    emptyArray,
    endsWith,
    ensurePathIsNonModuleName,
    Expression,
    factory,
    FileTextChanges,
    find,
    forEach,
    forEachChild,
    formatting,
    GetCanonicalFileName,
    getDirectoryPath,
    getFileMatcherPatterns,
    getOptionFromName,
    getRegexFromPattern,
    getRelativePathFromDirectory,
    getRelativePathFromFile,
    getTsConfigObjectLiteralExpression,
    hostUsesCaseSensitiveFileNames,
    isAmbientModule,
    isArrayLiteralExpression,
    isCallExpression,
    isIdentifier,
    isImportCall,
    isObjectLiteralExpression,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isRequireCall,
    isSourceFile,
    isStringLiteral,
    isStringLiteralLike,
    LanguageServiceHost,
    last,
    mapDefined,
    ModuleResolutionHost,
    moduleSpecifiers,
    Node,
    normalizePath,
    pathIsRelative,
    Program,
    PropertyAssignment,
    ResolvedModuleWithFailedLookupLocations,
    resolveModuleName,
    SourceFile,
    SourceFileLike,
    SourceMapper,
    StringLiteralLike,
    Symbol,
    textChanges,
    TextRange,
    tryRemoveDirectoryPrefix,
    UserPreferences,
} from "./_namespaces/ts.js";

/** @internal */
export function getEditsForFileRename(
    program: Program,
    oldFileOrDirPath: string,
    newFileOrDirPath: string,
    host: LanguageServiceHost,
    formatContext: formatting.FormatContext,
    preferences: UserPreferences,
    sourceMapper: SourceMapper,
): readonly FileTextChanges[] {
    const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
    const getCanonicalFileName = createGetCanonicalFileName(
        useCaseSensitiveFileNames,
    );
    const oldToNew = getPathUpdater(
        oldFileOrDirPath,
        newFileOrDirPath,
        getCanonicalFileName,
        sourceMapper,
    );
    const newToOld = getPathUpdater(
        newFileOrDirPath,
        oldFileOrDirPath,
        getCanonicalFileName,
        sourceMapper,
    );
    return textChanges.ChangeTracker.with(
        { host, formatContext, preferences },
        changeTracker => {
            updateTsconfigFiles(
                program,
                changeTracker,
                oldToNew,
                oldFileOrDirPath,
                newFileOrDirPath,
                host.getCurrentDirectory(),
                useCaseSensitiveFileNames,
            );
            updateImports(
                program,
                changeTracker,
                oldToNew,
                newToOld,
                host,
                getCanonicalFileName,
                preferences,
            );
        },
    );
}

/**
 * If 'path' refers to an old directory, returns path in the new directory.
 *
 * @internal
 */
export type PathUpdater = (path: string) => string | undefined;
// exported for tests
/** @internal */
export function getPathUpdater(
    oldFileOrDirPath: string,
    newFileOrDirPath: string,
    getCanonicalFileName: GetCanonicalFileName,
    sourceMapper: SourceMapper | undefined,
): PathUpdater {
    const canonicalOldPath = getCanonicalFileName(oldFileOrDirPath);
    return path => {
        const originalPath = sourceMapper &&
            sourceMapper.tryGetSourcePosition({ fileName: path, pos: 0 });
        const updatedPath = getUpdatedPath(
            originalPath ? originalPath.fileName : path,
        );
        return originalPath
            ? updatedPath === undefined
                ? undefined
                : makeCorrespondingRelativeChange(
                    originalPath.fileName,
                    updatedPath,
                    path,
                    getCanonicalFileName,
                )
            : updatedPath;
    };

    function getUpdatedPath(pathToUpdate: string): string | undefined {
        if (getCanonicalFileName(pathToUpdate) === canonicalOldPath) return newFileOrDirPath;
        const suffix = tryRemoveDirectoryPrefix(
            pathToUpdate,
            canonicalOldPath,
            getCanonicalFileName,
        );
        return suffix === undefined
            ? undefined
            : newFileOrDirPath + "/" + suffix;
    }
}

// Relative path from a0 to b0 should be same as relative path from a1 to b1. Returns b1.
function makeCorrespondingRelativeChange(
    a0: string,
    b0: string,
    a1: string,
    getCanonicalFileName: GetCanonicalFileName,
): string {
    const rel = getRelativePathFromFile(a0, b0, getCanonicalFileName);
    return combinePathsSafe(getDirectoryPath(a1), rel);
}

/**
 * Configuration for test framework function patterns that should be updated during file renames.
 */
interface TestFrameworkPattern {
    /** Object name (e.g., "jest", "vitest") */
    readonly object: string;
    /** Method name (e.g., "mock", "requireActual") */
    readonly method: string;
    /** 0-based index of the argument that contains the module path */
    readonly pathArgumentIndex: number;
}

/**
 * List of test framework patterns to recognize.
 * Extensible design - add new patterns here.
 */
const testFrameworkPatterns: readonly TestFrameworkPattern[] = [
    // Jest patterns
    { object: "jest", method: "mock", pathArgumentIndex: 0 },
    { object: "jest", method: "unmock", pathArgumentIndex: 0 },
    { object: "jest", method: "requireActual", pathArgumentIndex: 0 },
    { object: "jest", method: "requireMock", pathArgumentIndex: 0 },
    { object: "jest", method: "doMock", pathArgumentIndex: 0 },
    { object: "jest", method: "dontMock", pathArgumentIndex: 0 },

    // Vitest patterns
    { object: "vitest", method: "mock", pathArgumentIndex: 0 },
    { object: "vi", method: "mock", pathArgumentIndex: 0 },
];

/**
 * Checks if a call expression is a module loading pattern that should be updated.
 * Returns the string literal argument if it matches, undefined otherwise.
 */
function getModulePathArgument(
    node: CallExpression,
    preferences: UserPreferences,
): StringLiteralLike | undefined {
    // Check for dynamic import: import("./module")
    if (isImportCall(node)) {
        const arg = node.arguments[0];
        if (arg && isStringLiteralLike(arg)) {
            return arg;
        }
        return undefined;
    }

    // Check for require: require("./module")
    if (isRequireCall(node, /*requireStringLiteralLikeArgument*/ true)) {
        return node.arguments[0];
    }

    // Check for test framework patterns (opt-in only)
    if (preferences.updateImportsInTestFrameworkCalls) {
        // Must have form: object.method(...)
        if (!isPropertyAccessExpression(node.expression)) {
            return undefined;
        }

        const propertyAccess = node.expression;

        // Check if it's a simple identifier (not a nested property access)
        if (!isIdentifier(propertyAccess.expression)) {
            return undefined;
        }

        const objectName = propertyAccess.expression.text;
        const methodName = propertyAccess.name.text;

        // Find matching pattern
        const pattern = find(
            testFrameworkPatterns,
            p => p.object === objectName && p.method === methodName,
        );

        if (!pattern) {
            return undefined;
        }

        // Get the argument at the specified index
        const arg = node.arguments[pattern.pathArgumentIndex];

        // Only handle string literals, not template literals with substitutions
        if (arg && isStringLiteral(arg)) {
            return arg;
        }
    }

    return undefined;
}

function updateTsconfigFiles(
    program: Program,
    changeTracker: textChanges.ChangeTracker,
    oldToNew: PathUpdater,
    oldFileOrDirPath: string,
    newFileOrDirPath: string,
    currentDirectory: string,
    useCaseSensitiveFileNames: boolean,
): void {
    const { configFile } = program.getCompilerOptions();
    if (!configFile) return;
    const configDir = getDirectoryPath(configFile.fileName);

    const jsonObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
    if (!jsonObjectLiteral) return;

    forEachProperty(jsonObjectLiteral, (property, propertyName) => {
        switch (propertyName) {
            case "files":
            case "include":
            case "exclude": {
                const foundExactMatch = updatePaths(property);
                if (
                    foundExactMatch ||
                    propertyName !== "include" ||
                    !isArrayLiteralExpression(property.initializer)
                ) return;
                const includes = mapDefined(
                    property.initializer.elements,
                    e => (isStringLiteral(e) ? e.text : undefined),
                );
                if (includes.length === 0) return;
                const matchers = getFileMatcherPatterns(
                    configDir,
                    /*excludes*/ [],
                    includes,
                    useCaseSensitiveFileNames,
                    currentDirectory,
                );
                // If there isn't some include for this, add a new one.
                if (
                    getRegexFromPattern(
                        Debug.checkDefined(matchers.includeFilePattern),
                        useCaseSensitiveFileNames,
                    ).test(oldFileOrDirPath) &&
                    !getRegexFromPattern(
                        Debug.checkDefined(matchers.includeFilePattern),
                        useCaseSensitiveFileNames,
                    ).test(newFileOrDirPath)
                ) {
                    changeTracker.insertNodeAfter(
                        configFile,
                        last(property.initializer.elements),
                        factory.createStringLiteral(
                            relativePath(newFileOrDirPath),
                        ),
                    );
                }
                return;
            }
            case "compilerOptions":
                forEachProperty(
                    property.initializer,
                    (property, propertyName) => {
                        const option = getOptionFromName(propertyName);
                        Debug.assert(option?.type !== "listOrElement");
                        if (
                            option &&
                            (option.isFilePath ||
                                (option.type === "list" &&
                                    option.element.isFilePath))
                        ) {
                            updatePaths(property);
                        }
                        else if (propertyName === "paths") {
                            forEachProperty(
                                property.initializer,
                                pathsProperty => {
                                    if (
                                        !isArrayLiteralExpression(
                                            pathsProperty.initializer,
                                        )
                                    ) return;
                                    for (
                                        const e of pathsProperty.initializer
                                            .elements
                                    ) {
                                        tryUpdateString(e);
                                    }
                                },
                            );
                        }
                    },
                );
                return;
        }
    });

    function updatePaths(property: PropertyAssignment): boolean {
        const elements = isArrayLiteralExpression(property.initializer)
            ? property.initializer.elements
            : [property.initializer];
        let foundExactMatch = false;
        for (const element of elements) {
            foundExactMatch = tryUpdateString(element) || foundExactMatch;
        }
        return foundExactMatch;
    }

    function tryUpdateString(element: Expression): boolean {
        if (!isStringLiteral(element)) return false;
        const elementFileName = combinePathsSafe(configDir, element.text);

        const updated = oldToNew(elementFileName);
        if (updated !== undefined) {
            changeTracker.replaceRangeWithText(
                configFile!,
                createStringRange(element, configFile!),
                relativePath(updated),
            );
            return true;
        }
        return false;
    }

    function relativePath(path: string): string {
        return getRelativePathFromDirectory(
            configDir,
            path,
            /*ignoreCase*/ !useCaseSensitiveFileNames,
        );
    }
}

function updateImports(
    program: Program,
    changeTracker: textChanges.ChangeTracker,
    oldToNew: PathUpdater,
    newToOld: PathUpdater,
    host: LanguageServiceHost,
    getCanonicalFileName: GetCanonicalFileName,
    preferences: UserPreferences,
): void {
    const allFiles = program.getSourceFiles();
    for (const sourceFile of allFiles) {
        const newFromOld = oldToNew(sourceFile.fileName);
        const newImportFromPath = newFromOld ?? sourceFile.fileName;
        const newImportFromDirectory = getDirectoryPath(newImportFromPath);

        const oldFromNew: string | undefined = newToOld(sourceFile.fileName);
        const oldImportFromPath: string = oldFromNew || sourceFile.fileName;
        const oldImportFromDirectory = getDirectoryPath(oldImportFromPath);

        const importingSourceFileMoved = newFromOld !== undefined || oldFromNew !== undefined;

        updateImportsWorker(
            sourceFile,
            changeTracker,
            referenceText => {
                if (!pathIsRelative(referenceText)) return undefined;
                const oldAbsolute = combinePathsSafe(
                    oldImportFromDirectory,
                    referenceText,
                );
                const newAbsolute = oldToNew(oldAbsolute);
                return newAbsolute === undefined
                    ? undefined
                    : ensurePathIsNonModuleName(
                        getRelativePathFromDirectory(
                            newImportFromDirectory,
                            newAbsolute,
                            getCanonicalFileName,
                        ),
                    );
            },
            importLiteral => {
                const importedModuleSymbol = program
                    .getTypeChecker()
                    .getSymbolAtLocation(importLiteral);
                // No need to update if it's an ambient module^M
                if (
                    importedModuleSymbol?.declarations &&
                    importedModuleSymbol.declarations.some(d => isAmbientModule(d))
                ) return undefined;

                const toImport = oldFromNew !== undefined
                    // If we're at the new location (file was already renamed), need to redo module resolution starting from the old location.
                    // TODO:GH#18217
                    ? getSourceFileToImportFromResolved(
                        importLiteral,
                        resolveModuleName(
                            importLiteral.text,
                            oldImportFromPath,
                            program.getCompilerOptions(),
                            host as ModuleResolutionHost,
                        ),
                        oldToNew,
                        allFiles,
                    )
                    : getSourceFileToImport(
                        importedModuleSymbol,
                        importLiteral,
                        sourceFile,
                        program,
                        host,
                        oldToNew,
                    );

                // Need an update if the imported file moved, or the importing file moved and was using a relative path.
                return toImport !== undefined &&
                        (toImport.updated ||
                            (importingSourceFileMoved &&
                                pathIsRelative(importLiteral.text)))
                    ? moduleSpecifiers.updateModuleSpecifier(
                        program.getCompilerOptions(),
                        sourceFile,
                        newImportFromPath,
                        toImport.newFileName,
                        createModuleSpecifierResolutionHost(program, host),
                        importLiteral.text,
                    )
                    : undefined;
            },
            preferences,
        );
    }
}

function combineNormal(pathA: string, pathB: string): string {
    return normalizePath(combinePaths(pathA, pathB));
}
function combinePathsSafe(pathA: string, pathB: string): string {
    return ensurePathIsNonModuleName(combineNormal(pathA, pathB));
}

interface ToImport {
    readonly newFileName: string;
    /** True if the imported file was renamed. */
    readonly updated: boolean;
}
function getSourceFileToImport(
    importedModuleSymbol: Symbol | undefined,
    importLiteral: StringLiteralLike,
    importingSourceFile: SourceFile,
    program: Program,
    host: LanguageServiceHost,
    oldToNew: PathUpdater,
): ToImport | undefined {
    if (importedModuleSymbol) {
        // `find` should succeed because we checked for ambient modules before calling this function.
        const oldFileName = find(
            importedModuleSymbol.declarations,
            isSourceFile,
        )!.fileName;
        const newFileName = oldToNew(oldFileName);
        return newFileName === undefined
            ? { newFileName: oldFileName, updated: false }
            : { newFileName, updated: true };
    }
    else {
        const mode = program.getModeForUsageLocation(
            importingSourceFile,
            importLiteral,
        );
        const resolved = host.resolveModuleNameLiterals || !host.resolveModuleNames
            ? program.getResolvedModuleFromModuleSpecifier(
                importLiteral,
                importingSourceFile,
            )
            : host.getResolvedModuleWithFailedLookupLocationsFromCache &&
                host.getResolvedModuleWithFailedLookupLocationsFromCache(
                    importLiteral.text,
                    importingSourceFile.fileName,
                    mode,
                );
        return getSourceFileToImportFromResolved(
            importLiteral,
            resolved,
            oldToNew,
            program.getSourceFiles(),
        );
    }
}

function getSourceFileToImportFromResolved(
    importLiteral: StringLiteralLike,
    resolved: ResolvedModuleWithFailedLookupLocations | undefined,
    oldToNew: PathUpdater,
    sourceFiles: readonly SourceFile[],
): ToImport | undefined {
    // Search through all locations looking for a moved file, and only then test already existing files.
    // This is because if `a.ts` is compiled to `a.js` and `a.ts` is moved, we don't want to resolve anything to `a.js`, but to `a.ts`'s new location.
    if (!resolved) return undefined;

    // First try resolved module
    if (resolved.resolvedModule) {
        const result = tryChange(resolved.resolvedModule.resolvedFileName);
        if (result) return result;
    }

    // Then failed lookups that are in the list of sources
    const result = forEach(
        resolved.failedLookupLocations,
        tryChangeWithIgnoringPackageJsonExisting,
    ) ||
        // Then failed lookups except package.json since we dont want to touch them (only included ts/js files).
        // At this point, the confidence level of this fix being correct is too low to change bare specifiers or absolute paths.
        (pathIsRelative(importLiteral.text) &&
            forEach(
                resolved.failedLookupLocations,
                tryChangeWithIgnoringPackageJson,
            ));
    if (result) return result;

    // If nothing changed, then result is resolved module file thats not updated
    return (
        resolved.resolvedModule && {
            newFileName: resolved.resolvedModule.resolvedFileName,
            updated: false,
        }
    );

    function tryChangeWithIgnoringPackageJsonExisting(oldFileName: string) {
        const newFileName = oldToNew(oldFileName);
        return newFileName &&
                find(sourceFiles, src => src.fileName === newFileName)
            ? tryChangeWithIgnoringPackageJson(oldFileName)
            : undefined;
    }

    function tryChangeWithIgnoringPackageJson(oldFileName: string) {
        return !endsWith(oldFileName, "/package.json")
            ? tryChange(oldFileName)
            : undefined;
    }

    function tryChange(oldFileName: string) {
        const newFileName = oldToNew(oldFileName);
        return newFileName && { newFileName, updated: true };
    }
}

function updateImportsWorker(
    sourceFile: SourceFile,
    changeTracker: textChanges.ChangeTracker,
    updateRef: (refText: string) => string | undefined,
    updateImport: (importLiteral: StringLiteralLike) => string | undefined,
    preferences: UserPreferences,
) {
    for (const ref of sourceFile.referencedFiles || emptyArray) {
        // TODO: GH#26162
        const updated = updateRef(ref.fileName);
        if (
            updated !== undefined &&
            updated !== sourceFile.text.slice(ref.pos, ref.end)
        ) changeTracker.replaceRangeWithText(sourceFile, ref, updated);
    }

    for (const importStringLiteral of sourceFile.imports) {
        const updated = updateImport(importStringLiteral);
        if (updated !== undefined && updated !== importStringLiteral.text) {
            changeTracker.replaceRangeWithText(
                sourceFile,
                createStringRange(importStringLiteral, sourceFile),
                updated,
            );
        }
    }

    // Update additional module loading patterns (dynamic import, require, test mocks)
    // This catches patterns that aren't in sourceFile.imports (like require in .ts files)
    updateModuleLoadingCalls(
        sourceFile,
        changeTracker,
        updateImport,
        preferences,
    );
}

/**
 * Updates module loading calls (dynamic import, require, test framework mocks) in a source file.
 * Handles import(), require(), jest.mock(), vitest.mock(), etc.
 */
function updateModuleLoadingCalls(
    sourceFile: SourceFile,
    changeTracker: textChanges.ChangeTracker,
    updateImport: (importLiteral: StringLiteralLike) => string | undefined,
    preferences: UserPreferences,
): void {
    // Create a set of string literals already processed from sourceFile.imports to avoid duplicates
    const processedImports = new Set(sourceFile.imports);

    // Visitor pattern - recursively walk the AST
    function visitor(node: Node): void {
        // Check for call expressions
        if (isCallExpression(node)) {
            const pathArgument = getModulePathArgument(node, preferences);
            // Skip if this path argument was already processed from sourceFile.imports
            if (pathArgument && !processedImports.has(pathArgument)) {
                const updated = updateImport(pathArgument);
                if (updated !== undefined && updated !== pathArgument.text) {
                    changeTracker.replaceRangeWithText(
                        sourceFile,
                        createStringRange(pathArgument, sourceFile),
                        updated,
                    );
                }
            }
        }

        // Continue walking the tree
        forEachChild(node, visitor);
    }

    // Start the traversal
    visitor(sourceFile);
}

function createStringRange(
    node: StringLiteralLike,
    sourceFile: SourceFileLike,
): TextRange {
    return createRange(node.getStart(sourceFile) + 1, node.end - 1);
}

function forEachProperty(
    objectLiteral: Expression,
    cb: (property: PropertyAssignment, propertyName: string) => void,
) {
    if (!isObjectLiteralExpression(objectLiteral)) return;
    for (const property of objectLiteral.properties) {
        if (isPropertyAssignment(property) && isStringLiteral(property.name)) {
            cb(property, property.name.text);
        }
    }
}
