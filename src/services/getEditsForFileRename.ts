/* @internal */
namespace ts {
    export function getEditsForFileRename(program: Program, oldFileOrDirPath: string, newFileOrDirPath: string, host: LanguageServiceHost, formatContext: formatting.FormatContext): ReadonlyArray<FileTextChanges> {
        const pathUpdater = getPathUpdater(oldFileOrDirPath, newFileOrDirPath, host);
        const internalPathUpdater = getMovedFilePathUpdater(oldFileOrDirPath, newFileOrDirPath);
        return textChanges.ChangeTracker.with({ host, formatContext }, changeTracker => {
            updateTsconfigFiles(program, changeTracker, pathUpdater);
            updateImports(program, changeTracker, pathUpdater, internalPathUpdater, oldFileOrDirPath, newFileOrDirPath, host);
        });
    }

    function updateTsconfigFiles(program: Program, changeTracker: textChanges.ChangeTracker, pathUpdater: PathUpdater): void {
        const configFile = program.getCompilerOptions().configFile;
        if (!configFile) return;
        for (const property of getTsConfigPropArray(configFile, "files")) {
            if (!isArrayLiteralExpression(property.initializer)) continue;

            for (const element of property.initializer.elements) {
                if (!isStringLiteral(element)) continue;

                const updated = pathUpdater(element.text, element.text, /*isImport*/ false);
                if (updated !== undefined) {
                    changeTracker.replaceRangeWithText(configFile, createStringRange(element, configFile), updated);
                }
            }
        }
    }

    function updateImports(program: Program, changeTracker: textChanges.ChangeTracker, pathUpdater: PathUpdater, internalPathUpdater: MovedFilePathUpdater, oldFileOrDirPath: string, newFileOrDirPath: string, host: LanguageServiceHost): void {
        for (const sourceFile of program.getSourceFiles()) {
            if (sourceFile.fileName === oldFileOrDirPath || removeDirectoryPrefixFromPath(oldFileOrDirPath, sourceFile.fileName) ||
                sourceFile.fileName === newFileOrDirPath || removeDirectoryPrefixFromPath(newFileOrDirPath, sourceFile.fileName)) {
                // Update imports in a moved file.
                updateImportsWorker(sourceFile, changeTracker, referenceText => internalPathUpdater(sourceFile, referenceText), importText => internalPathUpdater(sourceFile, importText));
            }
            else {
                // This is not a moved file, but may reference a moved file.
                updateImportsWorker(sourceFile, changeTracker,
                    referenceText => pathUpdater(resolveTripleslashReference(referenceText, sourceFile.fileName), referenceText, /*isImport*/ false),
                    importText => {
                        const resolved = host.resolveModuleNames
                            ? host.getResolvedModuleWithFailedLookupLocationsFromCache && host.getResolvedModuleWithFailedLookupLocationsFromCache(importText, sourceFile.fileName)
                            : program.getResolvedModuleWithFailedLookupLocationsFromCache(importText, sourceFile.fileName);
                        return resolved && firstDefined(resolved.resolvedModule ? [resolved.resolvedModule.resolvedFileName] : resolved.failedLookupLocations, path => pathUpdater(path, importText, /*isImport*/ true));
                    });
            }
        }
    }

    function updateImportsWorker(sourceFile: SourceFile, changeTracker: textChanges.ChangeTracker, updateRef: (r: string) => string | undefined, updateImport: (importText: string) => string | undefined) {
        for (const ref of sourceFile.referencedFiles) {
            const updated = updateRef(ref.fileName);
            if (updated !== undefined) changeTracker.replaceRangeWithText(sourceFile, ref, updated);
        }

        for (const importStringLiteral of sourceFile.imports) {
            const updated = updateImport(importStringLiteral.text);
            if (updated !== undefined) changeTracker.replaceRangeWithText(sourceFile, createStringRange(importStringLiteral, sourceFile), updated);
        }
    }

    // Path updater for imports in the file(s) being moved
    type MovedFilePathUpdater = (sourceFile: SourceFile, importText: string) => string | undefined;
    function getMovedFilePathUpdater(oldFileOrDirPath: string, newFileOrDirPath: string): MovedFilePathUpdater {
        const relativeNewDirToOldDir = getRelativePathFromDirectory(toDirectory(newFileOrDirPath), toDirectory(oldFileOrDirPath), /*ignoreCase*/ false);

        if (relativeNewDirToOldDir === ".") return () => undefined;

        return (sourceFile, importText) =>
            !pathIsRelative(importText) ||
                importIsInternalToDirectory(oldFileOrDirPath, sourceFile.fileName, importText) ||
                importIsInternalToDirectory(newFileOrDirPath, sourceFile.fileName, importText)
                ? undefined
                : combineNormal(relativeNewDirToOldDir, importText);
    }

    function toDirectory(path: string): string {
        return isAnySupportedFileExtension(path) ? getDirectoryPath(path) : path;
    }

    function importIsInternalToDirectory(oldDir: string, sourceFilePath: string, importText: string): boolean {
        return !!removeDirectoryPrefixFromPath(oldDir, combineNormal(getDirectoryPath(sourceFilePath), importText));
    }

    /**
     * @param oldFullPath Absolute path to a failed lookup location
     * @param oldRelPath Actual import text
     */
    type PathUpdater = (oldFullPath: string, oldRelPath: string, isImport: boolean) => string | undefined;
    function getPathUpdater(oldFileOrDirPath: string, newFileOrDirPath: string, host: LanguageServiceHost): PathUpdater {
        // Get the relative path from old to new location, and append it on to the end of imports and normalize.
        const rel = getRelativePathFromFile(oldFileOrDirPath, newFileOrDirPath, createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host)));
        return (fullPath, importText, isImport) => {
            if (fullPath === oldFileOrDirPath) {
                const newImportText = pathIsRelative(importText)
                    ? combinePathsSafe(tryRemoveIndexOrPackage(fullPath) && !endsWithSomeIndex(importText) ? importText : getDirectoryPath(importText), rel)
                    : newFileOrDirPath;
                return isImport ? pathToImportPath(newImportText) : newImportText;
            }
            else {
                // e.g., Importing from "/old/a/b", suffix is "/a/b", and we'll leave that part alone.
                const relToOld = removeDirectoryPrefixFromPath(oldFileOrDirPath, fullPath);
                if (relToOld === undefined) return undefined;
                const suffix = isImport ? pathToImportPath(relToOld) : relToOld;
                const newPrefix = pathIsRelative(importText)
                    ? combinePathsSafe(getDirectoryPath(Debug.assertDefined(tryRemoveSuffix(importText, suffix))), rel)
                    : newFileOrDirPath;
                return newPrefix + suffix;
            }
        };
    }

    function combineNormal(pathA: string, pathB: string): string {
        return normalizePath(combinePaths(pathA, pathB));
    }

    function removeDirectoryPrefixFromPath(directory: string, path: string): string | undefined {
        const withoutDir = tryRemovePrefix(path, directory);
        return withoutDir === undefined || !startsWith(withoutDir, "/") ? undefined : withoutDir;
    }

    function combinePathsSafe(pathA: string, pathB: string): string {
        return ensurePathIsNonModuleName(combineNormal(pathA, pathB));
    }

    function endsWithSomeIndex(path: string): boolean {
        return endsWith(removeFileExtension(path), "index");
    }

    /** Strips file extension and "/index" */
    function pathToImportPath(name: string): string {
        const withoutIndex = tryRemoveIndexOrPackage(name);
        return withoutIndex !== undefined ? withoutIndex : removeFileExtension(name);
    }

    const indexEndings: ReadonlyArray<string> = ["/package.json", "/index.js", "/index.jsx", "/index.ts", "/index.d.ts", "/index.tsx"];
    function tryRemoveIndexOrPackage(name: string): string | undefined {
        return firstDefined(indexEndings, e => tryRemoveSuffix(name, e));
    }

    function createStringRange(node: StringLiteralLike, sourceFile: SourceFileLike): TextRange {
        return createTextRange(node.getStart(sourceFile) + 1, node.end - 1);
    }
}
