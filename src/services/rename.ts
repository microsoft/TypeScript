/* @internal */
namespace ts.Rename {
export function getRenameInfo(program: ts.Program, sourceFile: ts.SourceFile, position: number, preferences: ts.UserPreferences): ts.RenameInfo {
    const node = ts.getAdjustedRenameLocation(ts.getTouchingPropertyName(sourceFile, position));
    if (nodeIsEligibleForRename(node)) {
        const renameInfo = getRenameInfoForNode(node, program.getTypeChecker(), sourceFile, program, preferences);
        if (renameInfo) {
            return renameInfo;
        }
    }
    return getRenameInfoError(ts.Diagnostics.You_cannot_rename_this_element);
}

function getRenameInfoForNode(
    node: ts.Node,
    typeChecker: ts.TypeChecker,
    sourceFile: ts.SourceFile,
    program: ts.Program,
    preferences: ts.UserPreferences): ts.RenameInfo | undefined {
    const symbol = typeChecker.getSymbolAtLocation(node);
    if (!symbol) {
        if (ts.isStringLiteralLike(node)) {
            const type = ts.getContextualTypeFromParentOrAncestorTypeNode(node, typeChecker);
            if (type && ((type.flags & ts.TypeFlags.StringLiteral) || (
                (type.flags & ts.TypeFlags.Union) && ts.every((type as ts.UnionType).types, type => !!(type.flags & ts.TypeFlags.StringLiteral))
            ))) {
                return getRenameInfoSuccess(node.text, node.text, ts.ScriptElementKind.string, "", node, sourceFile);
            }
        }
        else if (ts.isLabelName(node)) {
            const name = ts.getTextOfNode(node);
            return getRenameInfoSuccess(name, name, ts.ScriptElementKind.label, ts.ScriptElementKindModifier.none, node, sourceFile);
        }
        return undefined;
    }
    // Only allow a symbol to be renamed if it actually has at least one declaration.
    const { declarations } = symbol;
    if (!declarations || declarations.length === 0) return;

    // Disallow rename for elements that are defined in the standard TypeScript library.
    if (declarations.some(declaration => isDefinedInLibraryFile(program, declaration))) {
        return getRenameInfoError(ts.Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library);
    }

    // Cannot rename `default` as in `import { default as foo } from "./someModule";
    if (ts.isIdentifier(node) && node.originalKeywordKind === ts.SyntaxKind.DefaultKeyword && symbol.parent && symbol.parent.flags & ts.SymbolFlags.Module) {
        return undefined;
    }

    if (ts.isStringLiteralLike(node) && ts.tryGetImportFromModuleSpecifier(node)) {
        return preferences.allowRenameOfImportPath ? getRenameInfoForModule(node, sourceFile, symbol) : undefined;
    }

    // Disallow rename for elements that would rename across `*/node_modules/*` packages.
    const wouldRenameNodeModules = wouldRenameInOtherNodeModules(sourceFile, symbol, typeChecker, preferences);
    if (wouldRenameNodeModules) {
        return getRenameInfoError(wouldRenameNodeModules);
    }

    const kind = ts.SymbolDisplay.getSymbolKind(typeChecker, symbol, node);
    const specifierName = (ts.isImportOrExportSpecifierName(node) || ts.isStringOrNumericLiteralLike(node) && node.parent.kind === ts.SyntaxKind.ComputedPropertyName)
        ? ts.stripQuotes(ts.getTextOfIdentifierOrLiteral(node))
        : undefined;
    const displayName = specifierName || typeChecker.symbolToString(symbol);
    const fullDisplayName = specifierName || typeChecker.getFullyQualifiedName(symbol);
    return getRenameInfoSuccess(displayName, fullDisplayName, kind, ts.SymbolDisplay.getSymbolModifiers(typeChecker,symbol), node, sourceFile);
}

function isDefinedInLibraryFile(program: ts.Program, declaration: ts.Node) {
    const sourceFile = declaration.getSourceFile();
    return program.isSourceFileDefaultLibrary(sourceFile) && ts.fileExtensionIs(sourceFile.fileName, ts.Extension.Dts);
}

function wouldRenameInOtherNodeModules(
    originalFile: ts.SourceFile,
    symbol: ts.Symbol,
    checker: ts.TypeChecker,
    preferences: ts.UserPreferences
): ts.DiagnosticMessage | undefined {
    if (!preferences.providePrefixAndSuffixTextForRename && symbol.flags & ts.SymbolFlags.Alias) {
        const importSpecifier = symbol.declarations && ts.find(symbol.declarations, decl => ts.isImportSpecifier(decl));
        if (importSpecifier && !(importSpecifier as ts.ImportSpecifier).propertyName) {
            symbol = checker.getAliasedSymbol(symbol);
        }
    }
    const { declarations } = symbol;
    if (!declarations) {
        return undefined;
    }
    const originalPackage = getPackagePathComponents(originalFile.path);
    if (originalPackage === undefined) { // original source file is not in node_modules
        if (ts.some(declarations, declaration => ts.isInsideNodeModules(declaration.getSourceFile().path))) {
            return ts.Diagnostics.You_cannot_rename_elements_that_are_defined_in_a_node_modules_folder;
        }
        else {
            return undefined;
        }
    }
    // original source file is in node_modules
    for (const declaration of declarations) {
        const declPackage = getPackagePathComponents(declaration.getSourceFile().path);
        if (declPackage) {
            const length = Math.min(originalPackage.length, declPackage.length);
            for (let i = 0; i <= length; i++) {
                if (ts.compareStringsCaseSensitive(originalPackage[i], declPackage[i]) !== ts.Comparison.EqualTo) {
                    return ts.Diagnostics.You_cannot_rename_elements_that_are_defined_in_another_node_modules_folder;
                }
            }
        }
    }
    return undefined;
}

function getPackagePathComponents(filePath: ts.Path): string[] | undefined {
    const components = ts.getPathComponents(filePath);
    const nodeModulesIdx = components.lastIndexOf("node_modules");
    if (nodeModulesIdx === -1) {
        return undefined;
    }
    return components.slice(0, nodeModulesIdx + 2);
}

function getRenameInfoForModule(node: ts.StringLiteralLike, sourceFile: ts.SourceFile, moduleSymbol: ts.Symbol): ts.RenameInfo | undefined {
    if (!ts.isExternalModuleNameRelative(node.text)) {
        return getRenameInfoError(ts.Diagnostics.You_cannot_rename_a_module_via_a_global_import);
    }

    const moduleSourceFile = moduleSymbol.declarations && ts.find(moduleSymbol.declarations, ts.isSourceFile);
    if (!moduleSourceFile) return undefined;
    const withoutIndex = ts.endsWith(node.text, "/index") || ts.endsWith(node.text, "/index.js") ? undefined : ts.tryRemoveSuffix(ts.removeFileExtension(moduleSourceFile.fileName), "/index");
    const name = withoutIndex === undefined ? moduleSourceFile.fileName : withoutIndex;
    const kind = withoutIndex === undefined ? ts.ScriptElementKind.moduleElement : ts.ScriptElementKind.directory;
    const indexAfterLastSlash = node.text.lastIndexOf("/") + 1;
    // Span should only be the last component of the path. + 1 to account for the quote character.
    const triggerSpan = ts.createTextSpan(node.getStart(sourceFile) + 1 + indexAfterLastSlash, node.text.length - indexAfterLastSlash);
    return {
        canRename: true,
        fileToRename: name,
        kind,
        displayName: name,
        fullDisplayName: name,
        kindModifiers: ts.ScriptElementKindModifier.none,
        triggerSpan,
    };
}

function getRenameInfoSuccess(displayName: string, fullDisplayName: string, kind: ts.ScriptElementKind, kindModifiers: string, node: ts.Node, sourceFile: ts.SourceFile): ts.RenameInfoSuccess {
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

function getRenameInfoError(diagnostic: ts.DiagnosticMessage): ts.RenameInfoFailure {
    return { canRename: false, localizedErrorMessage: ts.getLocaleSpecificMessage(diagnostic) };
}

function createTriggerSpanForNode(node: ts.Node, sourceFile: ts.SourceFile) {
    let start = node.getStart(sourceFile);
    let width = node.getWidth(sourceFile);
    if (ts.isStringLiteralLike(node)) {
        // Exclude the quotes
        start += 1;
        width -= 2;
    }
    return ts.createTextSpan(start, width);
}

export function nodeIsEligibleForRename(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.PrivateIdentifier:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.ThisKeyword:
            return true;
        case ts.SyntaxKind.NumericLiteral:
            return ts.isLiteralNameOfPropertyDeclarationOrIndexAccess(node as ts.NumericLiteral);
        default:
            return false;
    }
}
}
