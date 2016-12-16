/* @internal */
namespace ts.Rename {
    export function getRenameInfo(typeChecker: TypeChecker, defaultLibFileName: string, getCanonicalFileName: (fileName: string) => string, sourceFile: SourceFile, position: number): RenameInfo {
        const canonicalDefaultLibName = getCanonicalFileName(ts.normalizePath(defaultLibFileName));

        const node = getTouchingWord(sourceFile, position, /*includeJsDocComment*/ true);

        if (node) {
            if (node.kind === SyntaxKind.Identifier ||
                node.kind === SyntaxKind.StringLiteral ||
                isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||
                isThis(node)) {
                const symbol = typeChecker.getSymbolAtLocation(node);

                // Only allow a symbol to be renamed if it actually has at least one declaration.
                if (symbol) {
                    const declarations = symbol.getDeclarations();
                    if (declarations && declarations.length > 0) {
                        // Disallow rename for elements that are defined in the standard TypeScript library.
                        if (forEach(declarations, isDefinedInLibraryFile)) {
                            return getRenameInfoError(getLocaleSpecificMessage(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library));
                        }

                        const displayName = stripQuotes(getDeclaredName(typeChecker, symbol, node));
                        const kind = SymbolDisplay.getSymbolKind(typeChecker, symbol, node);
                        if (kind) {
                            return {
                                canRename: true,
                                kind,
                                displayName,
                                localizedErrorMessage: undefined,
                                fullDisplayName: typeChecker.getFullyQualifiedName(symbol),
                                kindModifiers: SymbolDisplay.getSymbolModifiers(symbol),
                                triggerSpan: createTriggerSpanForNode(node, sourceFile)
                            };
                        }
                    }
                }
                else if (node.kind === SyntaxKind.StringLiteral) {
                    const type = getStringLiteralTypeForNode(<StringLiteral>node, typeChecker);
                    if (type) {
                        if (isDefinedInLibraryFile(node)) {
                            return getRenameInfoError(getLocaleSpecificMessage(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library));
                        }
                        else {
                            const displayName = stripQuotes(type.text);
                            return {
                                canRename: true,
                                kind: ScriptElementKind.variableElement,
                                displayName,
                                localizedErrorMessage: undefined,
                                fullDisplayName: displayName,
                                kindModifiers: ScriptElementKindModifier.none,
                                triggerSpan: createTriggerSpanForNode(node, sourceFile)
                            };
                        }
                    }
                }
            }
        }

        return getRenameInfoError(getLocaleSpecificMessage(Diagnostics.You_cannot_rename_this_element));

        function getRenameInfoError(localizedErrorMessage: string): RenameInfo {
            return {
                canRename: false,
                localizedErrorMessage: localizedErrorMessage,
                displayName: undefined,
                fullDisplayName: undefined,
                kind: undefined,
                kindModifiers: undefined,
                triggerSpan: undefined
            };
        }

        function isDefinedInLibraryFile(declaration: Node) {
            if (defaultLibFileName) {
                const sourceFile = declaration.getSourceFile();
                const canonicalName = getCanonicalFileName(ts.normalizePath(sourceFile.fileName));
                if (canonicalName === canonicalDefaultLibName) {
                    return true;
                }
            }
            return false;
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
    }
}
