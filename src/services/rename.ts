/* @internal */
namespace ts.Rename {
    export function getRenameInfo(typeChecker: TypeChecker, defaultLibFileName: string, getCanonicalFileName: (fileName: string) => string, sourceFile: SourceFile, position: number): RenameInfo {
        const getCanonicalDefaultLibName = memoize(() => getCanonicalFileName(ts.normalizePath(defaultLibFileName)));
        const node = getTouchingWord(sourceFile, position, /*includeJsDocComment*/ true);
        const renameInfo = node && nodeIsEligibleForRename(node)
            ? getRenameInfoForNode(node, typeChecker, sourceFile, isDefinedInLibraryFile)
            : undefined;
        return renameInfo || getRenameInfoError(Diagnostics.You_cannot_rename_this_element);

        function isDefinedInLibraryFile(declaration: Node) {
            if (!defaultLibFileName) {
                return false;
            }

            const sourceFile = declaration.getSourceFile();
            const canonicalName = getCanonicalFileName(ts.normalizePath(sourceFile.fileName));
            return canonicalName === getCanonicalDefaultLibName();
        }
    }

    function getRenameInfoForNode(node: Node, typeChecker: TypeChecker, sourceFile: SourceFile, isDefinedInLibraryFile: (declaration: Node) => boolean): RenameInfo | undefined {
        const symbol = typeChecker.getSymbolAtLocation(node);

        // Only allow a symbol to be renamed if it actually has at least one declaration.
        if (symbol) {
            const declarations = symbol.getDeclarations();
            if (declarations && declarations.length > 0) {
                // Disallow rename for elements that are defined in the standard TypeScript library.
                if (some(declarations, isDefinedInLibraryFile)) {
                    return getRenameInfoError(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library);
                }

                // Cannot rename `default` as in `import { default as foo } from "./someModule";
                if (node.kind === SyntaxKind.Identifier &&
                        (node as Identifier).originalKeywordKind === SyntaxKind.DefaultKeyword &&
                        symbol.parent.flags & ts.SymbolFlags.Module) {
                    return undefined;
                }

                const displayName = stripQuotes(getDeclaredName(typeChecker, symbol, node));
                const kind = SymbolDisplay.getSymbolKind(typeChecker, symbol, node);
                return kind ? getRenameInfoSuccess(displayName, typeChecker.getFullyQualifiedName(symbol), kind, SymbolDisplay.getSymbolModifiers(symbol), node, sourceFile) : undefined;
            }
        }
        else if (node.kind === SyntaxKind.StringLiteral) {
            if (isDefinedInLibraryFile(node)) {
                return getRenameInfoError(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library);
            }

            const displayName = stripQuotes((node as StringLiteral).text);
            return getRenameInfoSuccess(displayName, displayName, ScriptElementKind.variableElement, ScriptElementKindModifier.none, node, sourceFile);
        }
    }

    function getRenameInfoSuccess(displayName: string, fullDisplayName: string, kind: ScriptElementKind, kindModifiers: string, node: Node, sourceFile: SourceFile): RenameInfo {
        return {
            canRename: true,
            kind,
            displayName,
            localizedErrorMessage: undefined,
            fullDisplayName,
            kindModifiers,
            triggerSpan: createTriggerSpanForNode(node, sourceFile)
        };
    }

    function getRenameInfoError(diagnostic: DiagnosticMessage): RenameInfo {
        return {
            canRename: false,
            localizedErrorMessage: getLocaleSpecificMessage(diagnostic),
            displayName: undefined,
            fullDisplayName: undefined,
            kind: undefined,
            kindModifiers: undefined,
            triggerSpan: undefined
        };
    }

    function createTriggerSpanForNode(node: Node, sourceFile: SourceFile) {
        let start = node.getStart(sourceFile);
        let width = node.getWidth(sourceFile);
        if (node.kind === SyntaxKind.StringLiteral) {
            // Exclude the quotes
            start += 1;
            width -= 2;
        }
        return createTextSpan(start, width);
    }

    function nodeIsEligibleForRename(node: Node): boolean {
        return node.kind === ts.SyntaxKind.Identifier ||
            node.kind === SyntaxKind.StringLiteral ||
            isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||
            isThis(node);
    }
}
