/* @internal */
namespace ts {
    export function getEditsForFileRename(program: Program, oldFilePath: string, newFilePath: string, host: LanguageServiceHost, formatContext: formatting.FormatContext): ReadonlyArray<FileTextChanges> {
        const pathUpdater = getPathUpdater(oldFilePath, newFilePath, host);
        return textChanges.ChangeTracker.with({ host, formatContext }, changeTracker => {
            updateTsconfigFiles(program, changeTracker, pathUpdater);
            updateImports(program, changeTracker, pathUpdater, host);
        });
    }

    function updateTsconfigFiles(program: Program, changeTracker: textChanges.ChangeTracker, pathUpdater: PathUpdater): void {
        const configFile = program.getCompilerOptions().configFile;
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

    function updateImports(program: Program, changeTracker: textChanges.ChangeTracker, pathUpdater: PathUpdater, host: LanguageServiceHost): void {
        const checker = program.getTypeChecker();
        for (const sourceFile of program.getSourceFiles()) {
            for (const ref of sourceFile.referencedFiles) {
                if (program.getSourceFileFromReference(sourceFile, ref)) continue;

                const updated = pathUpdater(resolveTripleslashReference(ref.fileName, sourceFile.fileName), ref.fileName, /*isImport*/ false);
                if (updated !== undefined) changeTracker.replaceRangeWithText(sourceFile, ref, updated);
            }

            for (const importStringLiteral of sourceFile.imports) {
                // If it resolved to something already, ignore.
                if (checker.getSymbolAtLocation(importStringLiteral)) continue;

                const resolved = host.resolveModuleNames
                    ? host.getResolvedModuleWithFailedLookupLocationsFromCache && host.getResolvedModuleWithFailedLookupLocationsFromCache(importStringLiteral.text, sourceFile.fileName)
                    : program.getResolvedModuleWithFailedLookupLocationsFromCache(importStringLiteral.text, sourceFile.fileName);
                const updated = resolved && firstDefined(resolved.failedLookupLocations, path => pathUpdater(path, importStringLiteral.text, /*isImport*/ true));
                if (updated !== undefined) {
                    changeTracker.replaceRangeWithText(sourceFile, createStringRange(importStringLiteral, sourceFile), updated);
                }
            }
        }
    }

    /**
     * @param oldFullPath Absolute path to a failed lookup location
     * @param oldRelPath Actual import text
     */
    type PathUpdater = (oldFullPath: string, oldRelPath: string, isImport: boolean) => string | undefined;
    function getPathUpdater(oldFileOrDirPath: string, newFileOrDirPath: string, host: LanguageServiceHost): PathUpdater {
        // Get the relative path from old to new location, and append it on to the end of imports and normalize.
        const rel = getRelativePathFromFile(oldFileOrDirPath, newFileOrDirPath, createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host)));
        return (fullPath, relPath, isImport) => {
            if (fullPath === oldFileOrDirPath) {
                const newRelPath = pathIsRelative(relPath)
                    ? combinePathsSafe(tryRemoveIndexOrPackage(fullPath) && !endsWithSomeIndex(relPath) ? relPath : getDirectoryPath(relPath), rel)
                    : newFileOrDirPath;
                return isImport ? pathToImportPath(newRelPath) : newRelPath;
            }
            else {
                // e.g., Importing from "/old/a/b", suffix is "/a/b", and we'll leave that part alone.
                const relToOld = tryRemovePrefix(fullPath, oldFileOrDirPath);
                if (relToOld === undefined || !startsWith(relToOld, "/")) return undefined;
                const suffix = isImport ? pathToImportPath(relToOld) : relToOld;
                const newPrefix = pathIsRelative(relPath)
                    ? combinePathsSafe(getDirectoryPath(Debug.assertDefined(tryRemoveSuffix(relPath, suffix))), rel)
                    : newFileOrDirPath;
                return newPrefix + suffix;
            }
        };
    }

    function combinePathsSafe(pathA: string, pathB: string): string {
        return ensurePathIsNonModuleName(normalizePath(combinePaths(pathA, pathB)));
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
