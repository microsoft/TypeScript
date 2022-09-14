import * as ts from "./_namespaces/ts";

/** @internal */
export function getEditsForFileRename(
    program: ts.Program,
    oldFileOrDirPath: string,
    newFileOrDirPath: string,
    host: ts.LanguageServiceHost,
    formatContext: ts.formatting.FormatContext,
    preferences: ts.UserPreferences,
    sourceMapper: ts.SourceMapper,
): readonly ts.FileTextChanges[] {
    const useCaseSensitiveFileNames = ts.hostUsesCaseSensitiveFileNames(host);
    const getCanonicalFileName = ts.createGetCanonicalFileName(useCaseSensitiveFileNames);
    const oldToNew = getPathUpdater(oldFileOrDirPath, newFileOrDirPath, getCanonicalFileName, sourceMapper);
    const newToOld = getPathUpdater(newFileOrDirPath, oldFileOrDirPath, getCanonicalFileName, sourceMapper);
    return ts.textChanges.ChangeTracker.with({ host, formatContext, preferences }, changeTracker => {
        updateTsconfigFiles(program, changeTracker, oldToNew, oldFileOrDirPath, newFileOrDirPath, host.getCurrentDirectory(), useCaseSensitiveFileNames);
        updateImports(program, changeTracker, oldToNew, newToOld, host, getCanonicalFileName);
    });
}

/** If 'path' refers to an old directory, returns path in the new directory. */
type PathUpdater = (path: string) => string | undefined;
// exported for tests
/** @internal */
export function getPathUpdater(oldFileOrDirPath: string, newFileOrDirPath: string, getCanonicalFileName: ts.GetCanonicalFileName, sourceMapper: ts.SourceMapper | undefined): PathUpdater {
    const canonicalOldPath = getCanonicalFileName(oldFileOrDirPath);
    return path => {
        const originalPath = sourceMapper && sourceMapper.tryGetSourcePosition({ fileName: path, pos: 0 });
        const updatedPath = getUpdatedPath(originalPath ? originalPath.fileName : path);
        return originalPath
            ? updatedPath === undefined ? undefined : makeCorrespondingRelativeChange(originalPath.fileName, updatedPath, path, getCanonicalFileName)
            : updatedPath;
    };

    function getUpdatedPath(pathToUpdate: string): string | undefined {
        if (getCanonicalFileName(pathToUpdate) === canonicalOldPath) return newFileOrDirPath;
        const suffix = ts.tryRemoveDirectoryPrefix(pathToUpdate, canonicalOldPath, getCanonicalFileName);
        return suffix === undefined ? undefined : newFileOrDirPath + "/" + suffix;
    }
}

// Relative path from a0 to b0 should be same as relative path from a1 to b1. Returns b1.
function makeCorrespondingRelativeChange(a0: string, b0: string, a1: string, getCanonicalFileName: ts.GetCanonicalFileName): string {
    const rel = ts.getRelativePathFromFile(a0, b0, getCanonicalFileName);
    return combinePathsSafe(ts.getDirectoryPath(a1), rel);
}

function updateTsconfigFiles(program: ts.Program, changeTracker: ts.textChanges.ChangeTracker, oldToNew: PathUpdater, oldFileOrDirPath: string, newFileOrDirPath: string, currentDirectory: string, useCaseSensitiveFileNames: boolean): void {
    const { configFile } = program.getCompilerOptions();
    if (!configFile) return;
    const configDir = ts.getDirectoryPath(configFile.fileName);

    const jsonObjectLiteral = ts.getTsConfigObjectLiteralExpression(configFile);
    if (!jsonObjectLiteral) return;

    forEachProperty(jsonObjectLiteral, (property, propertyName) => {
        switch (propertyName) {
            case "files":
            case "include":
            case "exclude": {
                const foundExactMatch = updatePaths(property);
                if (foundExactMatch || propertyName !== "include" || !ts.isArrayLiteralExpression(property.initializer)) return;
                const includes = ts.mapDefined(property.initializer.elements, e => ts.isStringLiteral(e) ? e.text : undefined);
                if (includes.length === 0) return;
                const matchers = ts.getFileMatcherPatterns(configDir, /*excludes*/ [], includes, useCaseSensitiveFileNames, currentDirectory);
                // If there isn't some include for this, add a new one.
                if (ts.getRegexFromPattern(ts.Debug.checkDefined(matchers.includeFilePattern), useCaseSensitiveFileNames).test(oldFileOrDirPath) &&
                    !ts.getRegexFromPattern(ts.Debug.checkDefined(matchers.includeFilePattern), useCaseSensitiveFileNames).test(newFileOrDirPath)) {
                    changeTracker.insertNodeAfter(configFile, ts.last(property.initializer.elements), ts.factory.createStringLiteral(relativePath(newFileOrDirPath)));
                }
                return;
            }
            case "compilerOptions":
                forEachProperty(property.initializer, (property, propertyName) => {
                    const option = ts.getOptionFromName(propertyName);
                    if (option && (option.isFilePath || option.type === "list" && option.element.isFilePath)) {
                        updatePaths(property);
                    }
                    else if (propertyName === "paths") {
                        forEachProperty(property.initializer, (pathsProperty) => {
                            if (!ts.isArrayLiteralExpression(pathsProperty.initializer)) return;
                            for (const e of pathsProperty.initializer.elements) {
                                tryUpdateString(e);
                            }
                        });
                    }
                });
                return;
        }
    });

    function updatePaths(property: ts.PropertyAssignment): boolean {
        const elements = ts.isArrayLiteralExpression(property.initializer) ? property.initializer.elements : [property.initializer];
        let foundExactMatch = false;
        for (const element of elements) {
            foundExactMatch = tryUpdateString(element) || foundExactMatch;
        }
        return foundExactMatch;
    }

    function tryUpdateString(element: ts.Expression): boolean {
        if (!ts.isStringLiteral(element)) return false;
        const elementFileName = combinePathsSafe(configDir, element.text);

        const updated = oldToNew(elementFileName);
        if (updated !== undefined) {
            changeTracker.replaceRangeWithText(configFile!, createStringRange(element, configFile!), relativePath(updated));
            return true;
        }
        return false;
    }

    function relativePath(path: string): string {
        return ts.getRelativePathFromDirectory(configDir, path, /*ignoreCase*/ !useCaseSensitiveFileNames);
    }
}

function updateImports(
    program: ts.Program,
    changeTracker: ts.textChanges.ChangeTracker,
    oldToNew: PathUpdater,
    newToOld: PathUpdater,
    host: ts.LanguageServiceHost,
    getCanonicalFileName: ts.GetCanonicalFileName,
): void {
    const allFiles = program.getSourceFiles();
    for (const sourceFile of allFiles) {
        const newFromOld = oldToNew(sourceFile.fileName);
        const newImportFromPath = newFromOld ?? sourceFile.fileName;
        const newImportFromDirectory = ts.getDirectoryPath(newImportFromPath);

        const oldFromNew: string | undefined = newToOld(sourceFile.fileName);
        const oldImportFromPath: string = oldFromNew || sourceFile.fileName;
        const oldImportFromDirectory = ts.getDirectoryPath(oldImportFromPath);

        const importingSourceFileMoved = newFromOld !== undefined || oldFromNew !== undefined;

        updateImportsWorker(sourceFile, changeTracker,
            referenceText => {
                if (!ts.pathIsRelative(referenceText)) return undefined;
                const oldAbsolute = combinePathsSafe(oldImportFromDirectory, referenceText);
                const newAbsolute = oldToNew(oldAbsolute);
                return newAbsolute === undefined ? undefined : ts.ensurePathIsNonModuleName(ts.getRelativePathFromDirectory(newImportFromDirectory, newAbsolute, getCanonicalFileName));
            },
            importLiteral => {
                const importedModuleSymbol = program.getTypeChecker().getSymbolAtLocation(importLiteral);
                // No need to update if it's an ambient module^M
                if (importedModuleSymbol?.declarations && importedModuleSymbol.declarations.some(d => ts.isAmbientModule(d))) return undefined;

                const toImport = oldFromNew !== undefined
                    // If we're at the new location (file was already renamed), need to redo module resolution starting from the old location.
                    // TODO:GH#18217
                    ? getSourceFileToImportFromResolved(importLiteral, ts.resolveModuleName(importLiteral.text, oldImportFromPath, program.getCompilerOptions(), host as ts.ModuleResolutionHost),
                                                        oldToNew, allFiles)
                    : getSourceFileToImport(importedModuleSymbol, importLiteral, sourceFile, program, host, oldToNew);

                // Need an update if the imported file moved, or the importing file moved and was using a relative path.
                return toImport !== undefined && (toImport.updated || (importingSourceFileMoved && ts.pathIsRelative(importLiteral.text)))
                    ? ts.moduleSpecifiers.updateModuleSpecifier(program.getCompilerOptions(), sourceFile, getCanonicalFileName(newImportFromPath) as ts.Path, toImport.newFileName, ts.createModuleSpecifierResolutionHost(program, host), importLiteral.text)
                    : undefined;
            });
    }
}

function combineNormal(pathA: string, pathB: string): string {
    return ts.normalizePath(ts.combinePaths(pathA, pathB));
}
function combinePathsSafe(pathA: string, pathB: string): string {
    return ts.ensurePathIsNonModuleName(combineNormal(pathA, pathB));
}

interface ToImport {
    readonly newFileName: string;
    /** True if the imported file was renamed. */
    readonly updated: boolean;
}
function getSourceFileToImport(
    importedModuleSymbol: ts.Symbol | undefined,
    importLiteral: ts.StringLiteralLike,
    importingSourceFile: ts.SourceFile,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    oldToNew: PathUpdater,
): ToImport | undefined {
    if (importedModuleSymbol) {
        // `find` should succeed because we checked for ambient modules before calling this function.
        const oldFileName = ts.find(importedModuleSymbol.declarations, ts.isSourceFile)!.fileName;
        const newFileName = oldToNew(oldFileName);
        return newFileName === undefined ? { newFileName: oldFileName, updated: false } : { newFileName, updated: true };
    }
    else {
        const mode = ts.getModeForUsageLocation(importingSourceFile, importLiteral);
        const resolved = host.resolveModuleNames
            ? host.getResolvedModuleWithFailedLookupLocationsFromCache && host.getResolvedModuleWithFailedLookupLocationsFromCache(importLiteral.text, importingSourceFile.fileName, mode)
            : program.getResolvedModuleWithFailedLookupLocationsFromCache(importLiteral.text, importingSourceFile.fileName, mode);
        return getSourceFileToImportFromResolved(importLiteral, resolved, oldToNew, program.getSourceFiles());
    }
}

function getSourceFileToImportFromResolved(importLiteral: ts.StringLiteralLike, resolved: ts.ResolvedModuleWithFailedLookupLocations | undefined, oldToNew: PathUpdater, sourceFiles: readonly ts.SourceFile[]): ToImport | undefined {
    // Search through all locations looking for a moved file, and only then test already existing files.
    // This is because if `a.ts` is compiled to `a.js` and `a.ts` is moved, we don't want to resolve anything to `a.js`, but to `a.ts`'s new location.
    if (!resolved) return undefined;

    // First try resolved module
    if (resolved.resolvedModule) {
        const result = tryChange(resolved.resolvedModule.resolvedFileName);
        if (result) return result;
    }

    // Then failed lookups that are in the list of sources
    const result = ts.forEach(resolved.failedLookupLocations, tryChangeWithIgnoringPackageJsonExisting)
        // Then failed lookups except package.json since we dont want to touch them (only included ts/js files).
        // At this point, the confidence level of this fix being correct is too low to change bare specifiers or absolute paths.
        || ts.pathIsRelative(importLiteral.text) && ts.forEach(resolved.failedLookupLocations, tryChangeWithIgnoringPackageJson);
    if (result) return result;

    // If nothing changed, then result is resolved module file thats not updated
    return resolved.resolvedModule && { newFileName: resolved.resolvedModule.resolvedFileName, updated: false };

    function tryChangeWithIgnoringPackageJsonExisting(oldFileName: string) {
        const newFileName = oldToNew(oldFileName);
        return newFileName && ts.find(sourceFiles, src => src.fileName === newFileName)
            ? tryChangeWithIgnoringPackageJson(oldFileName) : undefined;
    }

    function tryChangeWithIgnoringPackageJson(oldFileName: string) {
        return !ts.endsWith(oldFileName, "/package.json") ? tryChange(oldFileName) : undefined;
    }

    function tryChange(oldFileName: string) {
        const newFileName = oldToNew(oldFileName);
        return newFileName && { newFileName, updated: true };
    }
}

function updateImportsWorker(sourceFile: ts.SourceFile, changeTracker: ts.textChanges.ChangeTracker, updateRef: (refText: string) => string | undefined, updateImport: (importLiteral: ts.StringLiteralLike) => string | undefined) {
    for (const ref of sourceFile.referencedFiles || ts.emptyArray) { // TODO: GH#26162
        const updated = updateRef(ref.fileName);
        if (updated !== undefined && updated !== sourceFile.text.slice(ref.pos, ref.end)) changeTracker.replaceRangeWithText(sourceFile, ref, updated);
    }

    for (const importStringLiteral of sourceFile.imports) {
        const updated = updateImport(importStringLiteral);
        if (updated !== undefined && updated !== importStringLiteral.text) changeTracker.replaceRangeWithText(sourceFile, createStringRange(importStringLiteral, sourceFile), updated);
    }
}

function createStringRange(node: ts.StringLiteralLike, sourceFile: ts.SourceFileLike): ts.TextRange {
    return ts.createRange(node.getStart(sourceFile) + 1, node.end - 1);
}

function forEachProperty(objectLiteral: ts.Expression, cb: (property: ts.PropertyAssignment, propertyName: string) => void) {
    if (!ts.isObjectLiteralExpression(objectLiteral)) return;
    for (const property of objectLiteral.properties) {
        if (ts.isPropertyAssignment(property) && ts.isStringLiteral(property.name)) {
            cb(property, property.name.text);
        }
    }
}
