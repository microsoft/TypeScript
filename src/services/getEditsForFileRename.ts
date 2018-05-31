/* @internal */
namespace ts {
    export function getEditsForFileRename(program: Program, oldFileOrDirPath: string, newFileOrDirPath: string, host: LanguageServiceHost, formatContext: formatting.FormatContext, preferences: UserPreferences): ReadonlyArray<FileTextChanges> {
        const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
        const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
        const oldToNew = getPathUpdater(oldFileOrDirPath, newFileOrDirPath, getCanonicalFileName);
        const newToOld = getPathUpdater(newFileOrDirPath, oldFileOrDirPath, getCanonicalFileName);
        return textChanges.ChangeTracker.with({ host, formatContext }, changeTracker => {
            updateTsconfigFiles(program, changeTracker, oldToNew, newFileOrDirPath, host.getCurrentDirectory(), useCaseSensitiveFileNames);
            updateImports(program, changeTracker, oldToNew, newToOld, host, getCanonicalFileName, preferences);
        });
    }

    /** If 'path' refers to an old directory, returns path in the new directory. */
    type PathUpdater = (path: string) => string | undefined;
    function getPathUpdater(oldFileOrDirPath: string, newFileOrDirPath: string, getCanonicalFileName: GetCanonicalFileName): PathUpdater {
        const canonicalOldPath = getCanonicalFileName(oldFileOrDirPath);
        return path => {
            const canonicalPath = getCanonicalFileName(path);
            if (canonicalPath === canonicalOldPath) return newFileOrDirPath;
            const suffix = tryRemoveDirectoryPrefix(canonicalPath, canonicalOldPath);
            return suffix === undefined ? undefined : newFileOrDirPath + "/" + suffix;
        };
    }

    function updateTsconfigFiles(program: Program, changeTracker: textChanges.ChangeTracker, oldToNew: PathUpdater, newFileOrDirPath: string, currentDirectory: string, useCaseSensitiveFileNames: boolean): void {
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
                    if (!foundExactMatch && propertyName === "include" && isArrayLiteralExpression(property.initializer)) {
                        const includes = mapDefined(property.initializer.elements, e => isStringLiteral(e) ? e.text : undefined);
                        const matchers = getFileMatcherPatterns(configDir, /*excludes*/ [], includes, useCaseSensitiveFileNames, currentDirectory);
                        // If there isn't some include for this, add a new one.
                        if (!getRegexFromPattern(Debug.assertDefined(matchers.includeFilePattern), useCaseSensitiveFileNames).test(newFileOrDirPath)) {
                            changeTracker.insertNodeAfter(configFile, last(property.initializer.elements), createStringLiteral(relativePath(newFileOrDirPath)));
                        }
                    }
                    break;
                }
                case "compilerOptions":
                    forEachProperty(property.initializer, (property, propertyName) => {
                        switch (propertyName) {
                            case "baseUrl":
                            case "typeRoots":
                            case "mapRoot":
                            case "rootDir":
                            case "rootDirs":
                                updatePaths(property);
                                break;
                            case "paths":
                                forEachProperty(property.initializer, (pathsProperty) => {
                                    if (!isArrayLiteralExpression(pathsProperty.initializer)) return;
                                    for (const e of pathsProperty.initializer.elements) {
                                        tryUpdateString(e);
                                    }
                                });
                                break;
                        }
                    });
                    break;
            }
        });

        function updatePaths(property: PropertyAssignment): boolean {
            // Type annotation needed due to #7294
            const elements: ReadonlyArray<Expression> = isArrayLiteralExpression(property.initializer) ? property.initializer.elements : [property.initializer];
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
                changeTracker.replaceRangeWithText(configFile!, createStringRange(element, configFile!), relativePath(updated));
                return true;
            }
            return false;
        }

        function relativePath(path: string): string {
            return getRelativePathFromDirectory(configDir, path, /*ignoreCase*/ !useCaseSensitiveFileNames);
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
        for (const sourceFile of program.getSourceFiles()) {
            const newImportFromPath = oldToNew(sourceFile.fileName) || sourceFile.fileName;
            const newImportFromDirectory = getDirectoryPath(newImportFromPath);

            const oldFromNew: string | undefined = newToOld(sourceFile.fileName);
            const oldImportFromPath: string = oldFromNew || sourceFile.fileName;
            const oldImportFromDirectory = getDirectoryPath(oldImportFromPath);

            updateImportsWorker(sourceFile, changeTracker,
                referenceText => {
                    if (!pathIsRelative(referenceText)) return undefined;
                    const oldAbsolute = combinePathsSafe(oldImportFromDirectory, referenceText);
                    const newAbsolute = oldToNew(oldAbsolute);
                    return newAbsolute === undefined ? undefined : ensurePathIsNonModuleName(getRelativePathFromDirectory(newImportFromDirectory, newAbsolute, getCanonicalFileName));
                },
                importLiteral => {
                    const toImport = oldFromNew !== undefined
                        // If we're at the new location (file was already renamed), need to redo module resolution starting from the old location.
                        // TODO:GH#18217
                        ? getSourceFileToImportFromResolved(resolveModuleName(importLiteral.text, oldImportFromPath, program.getCompilerOptions(), host as ModuleResolutionHost), oldToNew, program)
                        : getSourceFileToImport(importLiteral, sourceFile, program, host, oldToNew);
                    return toImport === undefined ? undefined : moduleSpecifiers.getModuleSpecifier(program, sourceFile, newImportFromPath, toImport, host, preferences);
                });
        }
    }

    function combineNormal(pathA: string, pathB: string): string {
        return normalizePath(combinePaths(pathA, pathB));
    }
    function combinePathsSafe(pathA: string, pathB: string): string {
        return ensurePathIsNonModuleName(combineNormal(pathA, pathB));
    }

    function getSourceFileToImport(importLiteral: StringLiteralLike, importingSourceFile: SourceFile, program: Program, host: LanguageServiceHost, oldToNew: PathUpdater): string | undefined {
        const symbol = program.getTypeChecker().getSymbolAtLocation(importLiteral);
        if (symbol) {
            if (symbol.declarations.some(d => isAmbientModule(d))) return undefined; // No need to update if it's an ambient module
            const oldFileName = find(symbol.declarations, isSourceFile)!.fileName;
            return oldToNew(oldFileName) || oldFileName;
        }
        else {
            const resolved = host.resolveModuleNames
                ? host.getResolvedModuleWithFailedLookupLocationsFromCache && host.getResolvedModuleWithFailedLookupLocationsFromCache(importLiteral.text, importingSourceFile.fileName)
                : program.getResolvedModuleWithFailedLookupLocationsFromCache(importLiteral.text, importingSourceFile.fileName);
            return getSourceFileToImportFromResolved(resolved, oldToNew, program);
        }
    }

    function getSourceFileToImportFromResolved(resolved: ResolvedModuleWithFailedLookupLocations | undefined, oldToNew: PathUpdater, program: Program): string | undefined {
        return resolved && (
            (resolved.resolvedModule && getIfInProgram(resolved.resolvedModule.resolvedFileName)) || firstDefined(resolved.failedLookupLocations, getIfInProgram));

        function getIfInProgram(oldLocation: string): string | undefined {
            const newLocation = oldToNew(oldLocation);
            return program.getSourceFile(oldLocation) || newLocation !== undefined && program.getSourceFile(newLocation)
                ? newLocation || oldLocation
                : undefined;
        }
    }

    function updateImportsWorker(sourceFile: SourceFile, changeTracker: textChanges.ChangeTracker, updateRef: (refText: string) => string | undefined, updateImport: (importLiteral: StringLiteralLike) => string | undefined) {
        for (const ref of sourceFile.referencedFiles) {
            const updated = updateRef(ref.fileName);
            if (updated !== undefined && updated !== sourceFile.text.slice(ref.pos, ref.end)) changeTracker.replaceRangeWithText(sourceFile, ref, updated);
        }

        for (const importStringLiteral of sourceFile.imports) {
            const updated = updateImport(importStringLiteral);
            if (updated !== undefined && updated !== importStringLiteral.text) changeTracker.replaceRangeWithText(sourceFile, createStringRange(importStringLiteral, sourceFile), updated);
        }
    }

    function createStringRange(node: StringLiteralLike, sourceFile: SourceFileLike): TextRange {
        return createTextRange(node.getStart(sourceFile) + 1, node.end - 1);
    }

    function forEachProperty(objectLiteral: Expression, cb: (property: PropertyAssignment, propertyName: string) => void) {
        if (!isObjectLiteralExpression(objectLiteral)) return;
        for (const property of objectLiteral.properties) {
            if (isPropertyAssignment(property) && isStringLiteral(property.name)) {
                cb(property, property.name.text);
            }
        }
    }
}
