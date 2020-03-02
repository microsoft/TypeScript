import { Program, SourceFile, RenameInfoOptions, RenameInfo, getAdjustedRenameLocation, getTouchingPropertyName, Diagnostics, Node, TypeChecker, isIdentifier, SyntaxKind, SymbolFlags, isStringLiteralLike, tryGetImportFromModuleSpecifier, isImportOrExportSpecifierName, isStringOrNumericLiteralLike, stripQuotes, getTextOfIdentifierOrLiteral, StringLiteralLike, Symbol, isExternalModuleNameRelative, find, isSourceFile, endsWith, tryRemoveSuffix, removeFileExtension, ScriptElementKind, createTextSpan, ScriptElementKindModifier, RenameInfoSuccess, DiagnosticMessage, RenameInfoFailure, getLocaleSpecificMessage, isLiteralNameOfPropertyDeclarationOrIndexAccess, NumericLiteral } from "./ts";
import { getSymbolKind, getSymbolModifiers } from "./ts.SymbolDisplay";
/* @internal */
export function getRenameInfo(program: Program, sourceFile: SourceFile, position: number, options?: RenameInfoOptions): RenameInfo {
    const node = getAdjustedRenameLocation(getTouchingPropertyName(sourceFile, position));
    if (nodeIsEligibleForRename(node)) {
        const renameInfo = getRenameInfoForNode(node, program.getTypeChecker(), sourceFile, declaration => program.isSourceFileDefaultLibrary(declaration.getSourceFile()), options);
        if (renameInfo) {
            return renameInfo;
        }
    }
    return getRenameInfoError(Diagnostics.You_cannot_rename_this_element);
}
/* @internal */
function getRenameInfoForNode(node: Node, typeChecker: TypeChecker, sourceFile: SourceFile, isDefinedInLibraryFile: (declaration: Node) => boolean, options?: RenameInfoOptions): RenameInfo | undefined {
    const symbol = typeChecker.getSymbolAtLocation(node);
    if (!symbol)
        return;
    // Only allow a symbol to be renamed if it actually has at least one declaration.
    const { declarations } = symbol;
    if (!declarations || declarations.length === 0)
        return;
    // Disallow rename for elements that are defined in the standard TypeScript library.
    if (declarations.some(isDefinedInLibraryFile)) {
        return getRenameInfoError(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library);
    }
    // Cannot rename `default` as in `import { default as foo } from "./someModule";
    if (isIdentifier(node) && node.originalKeywordKind === SyntaxKind.DefaultKeyword && symbol.parent!.flags & SymbolFlags.Module) {
        return undefined;
    }
    if (isStringLiteralLike(node) && tryGetImportFromModuleSpecifier(node)) {
        return options && options.allowRenameOfImportPath ? getRenameInfoForModule(node, sourceFile, symbol) : undefined;
    }
    const kind = getSymbolKind(typeChecker, symbol, node);
    const specifierName = (isImportOrExportSpecifierName(node) || isStringOrNumericLiteralLike(node) && node.parent.kind === SyntaxKind.ComputedPropertyName)
        ? stripQuotes(getTextOfIdentifierOrLiteral(node))
        : undefined;
    const displayName = specifierName || typeChecker.symbolToString(symbol);
    const fullDisplayName = specifierName || typeChecker.getFullyQualifiedName(symbol);
    return getRenameInfoSuccess(displayName, fullDisplayName, kind, getSymbolModifiers(symbol), node, sourceFile);
}
/* @internal */
function getRenameInfoForModule(node: StringLiteralLike, sourceFile: SourceFile, moduleSymbol: Symbol): RenameInfo | undefined {
    if (!isExternalModuleNameRelative(node.text)) {
        return getRenameInfoError(Diagnostics.You_cannot_rename_a_module_via_a_global_import);
    }
    const moduleSourceFile = find(moduleSymbol.declarations, isSourceFile);
    if (!moduleSourceFile)
        return undefined;
    const withoutIndex = endsWith(node.text, "/index") || endsWith(node.text, "/index.js") ? undefined : tryRemoveSuffix(removeFileExtension(moduleSourceFile.fileName), "/index");
    const name = withoutIndex === undefined ? moduleSourceFile.fileName : withoutIndex;
    const kind = withoutIndex === undefined ? ScriptElementKind.moduleElement : ScriptElementKind.directory;
    const indexAfterLastSlash = node.text.lastIndexOf("/") + 1;
    // Span should only be the last component of the path. + 1 to account for the quote character.
    const triggerSpan = createTextSpan(node.getStart(sourceFile) + 1 + indexAfterLastSlash, node.text.length - indexAfterLastSlash);
    return {
        canRename: true,
        fileToRename: name,
        kind,
        displayName: name,
        fullDisplayName: name,
        kindModifiers: ScriptElementKindModifier.none,
        triggerSpan,
    };
}
/* @internal */
function getRenameInfoSuccess(displayName: string, fullDisplayName: string, kind: ScriptElementKind, kindModifiers: string, node: Node, sourceFile: SourceFile): RenameInfoSuccess {
    return {
        canRename: true,
        fileToRename: undefined,
        kind,
        displayName,
        fullDisplayName,
        kindModifiers,
        triggerSpan: createTriggerSpanForNode(node, sourceFile)
    };
}
/* @internal */
function getRenameInfoError(diagnostic: DiagnosticMessage): RenameInfoFailure {
    return { canRename: false, localizedErrorMessage: getLocaleSpecificMessage(diagnostic) };
}
/* @internal */
function createTriggerSpanForNode(node: Node, sourceFile: SourceFile) {
    let start = node.getStart(sourceFile);
    let width = node.getWidth(sourceFile);
    if (isStringLiteralLike(node)) {
        // Exclude the quotes
        start += 1;
        width -= 2;
    }
    return createTextSpan(start, width);
}
/* @internal */
function nodeIsEligibleForRename(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.ThisKeyword:
            return true;
        case SyntaxKind.NumericLiteral:
            return isLiteralNameOfPropertyDeclarationOrIndexAccess((node as NumericLiteral));
        default:
            return false;
    }
}
