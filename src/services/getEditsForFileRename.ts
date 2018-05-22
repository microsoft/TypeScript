/* @internal */
namespace ts {
    export function getEditsForFileRename(program: Program, oldFilePath: string, newFilePath: string, host: LanguageServiceHost, formatContext: formatting.FormatContext): ReadonlyArray<FileTextChanges> {
        const pathUpdater = getPathUpdater(oldFilePath, newFilePath, host);
        return textChanges.ChangeTracker.with({ host, formatContext }, changeTracker => {
            updateTsconfigFiles(program, changeTracker, oldFilePath, newFilePath);
            for (const { sourceFile, toUpdate } of getImportsToUpdate(program, oldFilePath, host)) {
                const newPath = pathUpdater(isRef(toUpdate) ? toUpdate.fileName : toUpdate.text);
                if (newPath !== undefined) {
                    const range = isRef(toUpdate) ? toUpdate : createStringRange(toUpdate, sourceFile);
                    changeTracker.replaceRangeWithText(sourceFile, range, isRef(toUpdate) ? newPath : removeFileExtension(newPath));
                }
            }
        });
    }

    function updateTsconfigFiles(program: Program, changeTracker: textChanges.ChangeTracker, oldFilePath: string, newFilePath: string): void {
        const configFile = program.getCompilerOptions().configFile;
        const oldFile = getTsConfigPropArrayElementValue(configFile, "files", oldFilePath);
        if (oldFile) {
            changeTracker.replaceRangeWithText(configFile, createStringRange(oldFile, configFile), newFilePath);
        }
    }

    interface ToUpdate {
        readonly sourceFile: SourceFile;
        readonly toUpdate: StringLiteralLike | FileReference;
    }
    function isRef(toUpdate: StringLiteralLike | FileReference): toUpdate is FileReference {
        return "fileName" in toUpdate;
    }

    function getImportsToUpdate(program: Program, oldFilePath: string, host: LanguageServiceHost): ReadonlyArray<ToUpdate> {
        const result: ToUpdate[] = [];
        for (const sourceFile of program.getSourceFiles()) {
            for (const ref of sourceFile.referencedFiles) {
                if (resolveTripleslashReference(ref.fileName, sourceFile.fileName) === oldFilePath) {
                    result.push({ sourceFile, toUpdate: ref });
                }
            }

            for (const importStringLiteral of sourceFile.imports) {
                const resolved = host.resolveModuleNames
                    ? host.getResolvedModuleWithFailedLookupLocationsFromCache && host.getResolvedModuleWithFailedLookupLocationsFromCache(importStringLiteral.text, sourceFile.fileName)
                    : program.getResolvedModuleWithFailedLookupLocationsFromCache(importStringLiteral.text, sourceFile.fileName);
                // We may or may not have picked up on the file being renamed, so maybe successfully resolved to oldFilePath, or maybe that's in failedLookupLocations
                if (resolved && contains([resolved.resolvedModule && resolved.resolvedModule.resolvedFileName, ...resolved.failedLookupLocations], oldFilePath)) {
                    result.push({ sourceFile, toUpdate: importStringLiteral });
                }
            }
        }
        return result;
    }

    function getPathUpdater(oldFilePath: string, newFilePath: string, host: LanguageServiceHost): (oldPath: string) => string | undefined {
        // Get the relative path from old to new location, and append it on to the end of imports and normalize.
        const rel = getRelativePathFromFile(oldFilePath, newFilePath, createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host)));
        return oldPath => {
            if (!pathIsRelative(oldPath)) return;
            return ensurePathIsNonModuleName(normalizePath(combinePaths(getDirectoryPath(oldPath), rel)));
        };
    }

    function createStringRange(node: StringLiteralLike, sourceFile: SourceFileLike): TextRange {
        return createTextRange(node.getStart(sourceFile) + 1, node.end - 1);
    }
}
