/* @internal */
namespace ts.Rename {
    export function getRenameInfo(typeChecker: TypeChecker, defaultLibFileName: string, getCanonicalFileName: GetCanonicalFileName, sourceFile: SourceFile, position: number): RenameInfo {
        const getCanonicalDefaultLibName = memoize(() => getCanonicalFileName(normalizePath(defaultLibFileName)));
        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
        const renameInfo = node && nodeIsEligibleForRename(node)
            ? getRenameInfoForNode(node, typeChecker, sourceFile, isDefinedInLibraryFile)
            : undefined;
        return renameInfo || getRenameInfoError(Diagnostics.You_cannot_rename_this_element);

        function isDefinedInLibraryFile(declaration: Node) {
            if (!defaultLibFileName) {
                return false;
            }

            const sourceFile = declaration.getSourceFile();
            const canonicalName = getCanonicalFileName(normalizePath(sourceFile.fileName));
            return canonicalName === getCanonicalDefaultLibName();
        }
    }

    function getRenameInfoForNode(node: Node, typeChecker: TypeChecker, sourceFile: SourceFile, isDefinedInLibraryFile: (declaration: Node) => boolean): RenameInfo | undefined {
        const symbol = typeChecker.getSymbolAtLocation(node);

        // Only allow a symbol to be renamed if it actually has at least one declaration.
        if (symbol) {
            const { declarations } = symbol;
            if (declarations && declarations.length > 0) {
                // Disallow rename for elements that are defined in the standard TypeScript library.
                if (declarations.some(isDefinedInLibraryFile)) {
                    return getRenameInfoError(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library);
                }

                // Cannot rename `default` as in `import { default as foo } from "./someModule";
                if (isIdentifier(node) && node.originalKeywordKind === SyntaxKind.DefaultKeyword && symbol.parent.flags & SymbolFlags.Module) {
                    return undefined;
                }

                // Can't rename a module name.
                if (isStringLiteralLike(node) && tryGetImportFromModuleSpecifier(node)) return undefined;

                const kind = SymbolDisplay.getSymbolKind(typeChecker, symbol, node);
                const specifierName = (isImportOrExportSpecifierName(node) || isStringOrNumericLiteral(node) && node.parent.kind === SyntaxKind.ComputedPropertyName)
                    ? stripQuotes(getTextOfIdentifierOrLiteral(node))
                    : undefined;
                const displayName = specifierName || typeChecker.symbolToString(symbol);
                const fullDisplayName = specifierName || typeChecker.getFullyQualifiedName(symbol);
                return getRenameInfoSuccess(displayName, fullDisplayName, kind, SymbolDisplay.getSymbolModifiers(symbol), node, sourceFile);
            }
        }
        else if (isStringLiteral(node)) {
            if (isDefinedInLibraryFile(node)) {
                return getRenameInfoError(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library);
            }
            return getRenameInfoSuccess(node.text, node.text, ScriptElementKind.variableElement, ScriptElementKindModifier.none, node, sourceFile);
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
        switch (node.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.ThisKeyword:
                return true;
            case SyntaxKind.NumericLiteral:
                return isLiteralNameOfPropertyDeclarationOrIndexAccess(node as NumericLiteral);
            default:
                return false;
        }
    }
}
