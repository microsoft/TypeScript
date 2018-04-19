/* @internal */
namespace ts {
    export function renameFile(program: Program, oldFilePath: string, newFilePath: string, host: LanguageServiceHost, formatContext: formatting.FormatContext): ReadonlyArray<FileTextChanges> {
        const pathUpdater = getPathUpdater(oldFilePath, newFilePath, host);
        return textChanges.ChangeTracker.with({ host, formatContext }, changeTracker => {
            const importsToUpdate = getImportsToUpdate(program, oldFilePath);
            for (const importToUpdate of importsToUpdate) {
                const newPath = pathUpdater(importToUpdate.text);
                if (newPath !== undefined) {
                    changeTracker.replaceNode(importToUpdate.getSourceFile(), importToUpdate, updateStringLiteralLike(importToUpdate, newPath));
                }
            }
        });
    }

    function getImportsToUpdate(program: Program, oldFilePath: string): ReadonlyArray<StringLiteralLike> {
        const checker = program.getTypeChecker();
        const result: StringLiteralLike[] = [];
        for (const file of program.getSourceFiles()) {
            for (const importStringLiteral of file.imports) {
                // If it resolved to something already, ignore.
                if (checker.getSymbolAtLocation(importStringLiteral)) continue;

                const resolved = program.getResolvedModuleWithFailedLookupLocationsFromCache(importStringLiteral.text, file.fileName);
                if (contains(resolved.failedLookupLocations, oldFilePath)) {
                    result.push(importStringLiteral);
                }
            }
        }
        return result;
    }

    function getPathUpdater(oldFilePath: string, newFilePath: string, host: LanguageServiceHost): (oldPath: string) => string | undefined {
        // Get the relative path from old to new location, and append it on to the end of imports and normalize.
        const rel = removeFileExtension(getRelativePath(newFilePath, getDirectoryPath(oldFilePath), createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host))));
        return oldPath => {
            if (!pathIsRelative(oldPath)) return;
            return ensurePathIsRelative(normalizePath(combinePaths(getDirectoryPath(oldPath), rel)));
        };
    }

    function updateStringLiteralLike(old: StringLiteralLike, newText: string): StringLiteralLike {
        return old.kind === SyntaxKind.StringLiteral ? createLiteral(newText, /*isSingleQuote*/ old.singleQuote) : createNoSubstitutionTemplateLiteral(newText);
    }
}
