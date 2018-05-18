/* @internal */
namespace ts {
    export function getEditsForFileRename(program: Program, oldFilePath: string, newFilePath: string, host: LanguageServiceHost, formatContext: formatting.FormatContext): ReadonlyArray<FileTextChanges> {
        const pathUpdater = getPathUpdater(oldFilePath, newFilePath, host);
        return textChanges.ChangeTracker.with({ host, formatContext }, changeTracker => {
            updateTsconfigFiles(program, changeTracker, oldFilePath, newFilePath);
            for (const { sourceFile, toUpdate } of getImportsToUpdate(program, oldFilePath)) {
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

    function getImportsToUpdate(program: Program, oldFilePath: string): ReadonlyArray<ToUpdate> {
        const checker = program.getTypeChecker();
        const result: ToUpdate[] = [];
        for (const sourceFile of program.getSourceFiles()) {
            for (const ref of sourceFile.referencedFiles) {
                if (!program.getSourceFileFromReference(sourceFile, ref) && resolveTripleslashReference(ref.fileName, sourceFile.fileName) === oldFilePath) {
                    result.push({ sourceFile, toUpdate: ref });
                }
            }

            for (const importStringLiteral of sourceFile.imports) {
                // If it resolved to something already, ignore.
                if (checker.getSymbolAtLocation(importStringLiteral)) continue;

                const resolved = program.getResolvedModuleWithFailedLookupLocationsFromCache(importStringLiteral.text, sourceFile.fileName);
                if (resolved && contains(resolved.failedLookupLocations, oldFilePath)) {
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
