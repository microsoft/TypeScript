/* @internal */
namespace ts.refactor {
const refactorName = "Convert import";

const actions = {
    [ts.ImportKind.Named]: {
        name: "Convert namespace import to named imports",
        description: ts.Diagnostics.Convert_namespace_import_to_named_imports.message,
        kind: "refactor.rewrite.import.named",
    },
    [ts.ImportKind.Namespace]: {
        name: "Convert named imports to namespace import",
        description: ts.Diagnostics.Convert_named_imports_to_namespace_import.message,
        kind: "refactor.rewrite.import.namespace",
    },
    [ts.ImportKind.Default]: {
        name: "Convert named imports to default import",
        description: ts.Diagnostics.Convert_named_imports_to_default_import.message,
        kind: "refactor.rewrite.import.default",
    },
};

ts.refactor.registerRefactor(refactorName, {
    kinds: ts.getOwnValues(actions).map(a => a.kind),
    getAvailableActions: function getRefactorActionsToConvertBetweenNamedAndNamespacedImports(context): readonly ts.ApplicableRefactorInfo[] {
        const info = getImportConversionInfo(context, context.triggerReason === "invoked");
        if (!info) return ts.emptyArray;

        if (!ts.refactor.isRefactorErrorInfo(info)) {
            const action = actions[info.convertTo];
            return [{ name: refactorName, description: action.description, actions: [action] }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return ts.getOwnValues(actions).map(action => ({
                name: refactorName,
                description: action.description,
                actions: [{ ...action, notApplicableReason: info.error }]
            }));
        }

        return ts.emptyArray;
    },
    getEditsForAction: function getRefactorEditsToConvertBetweenNamedAndNamespacedImports(context, actionName): ts.RefactorEditInfo {
        ts.Debug.assert(ts.some(ts.getOwnValues(actions), action => action.name === actionName), "Unexpected action name");
        const info = getImportConversionInfo(context);
        ts.Debug.assert(info && !ts.refactor.isRefactorErrorInfo(info), "Expected applicable refactor info");
        const edits = ts.textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, t, info));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    }
});

// Can convert imports of the form `import * as m from "m";` or `import d, { x, y } from "m";`.
type ImportConversionInfo =
    | { convertTo: ts.ImportKind.Default, import: ts.NamedImports }
    | { convertTo: ts.ImportKind.Namespace, import: ts.NamedImports }
    | { convertTo: ts.ImportKind.Named, import: ts.NamespaceImport };

function getImportConversionInfo(context: ts.RefactorContext, considerPartialSpans = true): ImportConversionInfo | ts.refactor.RefactorErrorInfo | undefined {
    const { file } = context;
    const span = ts.getRefactorContextSpan(context);
    const token = ts.getTokenAtPosition(file, span.start);
    const importDecl = considerPartialSpans ? ts.findAncestor(token, ts.isImportDeclaration) : ts.getParentNodeInSpan(token, file, span);
    if (!importDecl || !ts.isImportDeclaration(importDecl)) return { error: "Selection is not an import declaration." };

    const end = span.start + span.length;
    const nextToken = ts.findNextToken(importDecl, importDecl.parent, file);
    if (nextToken && end > nextToken.getStart()) return undefined;

    const { importClause } = importDecl;
    if (!importClause) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_import_clause) };
    }

    if (!importClause.namedBindings) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_namespace_import_or_named_imports) };
    }

    if (importClause.namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
        return { convertTo: ts.ImportKind.Named, import: importClause.namedBindings };
    }
    const shouldUseDefault = getShouldUseDefault(context.program, importClause);

    return shouldUseDefault
        ? { convertTo: ts.ImportKind.Default, import: importClause.namedBindings }
        : { convertTo: ts.ImportKind.Namespace, import: importClause.namedBindings };
}

function getShouldUseDefault(program: ts.Program, importClause: ts.ImportClause) {
    return ts.getAllowSyntheticDefaultImports(program.getCompilerOptions())
        && isExportEqualsModule(importClause.parent.moduleSpecifier, program.getTypeChecker());
}

function doChange(sourceFile: ts.SourceFile, program: ts.Program, changes: ts.textChanges.ChangeTracker, info: ImportConversionInfo): void {
    const checker = program.getTypeChecker();
    if (info.convertTo === ts.ImportKind.Named) {
        doChangeNamespaceToNamed(sourceFile, checker, changes, info.import, ts.getAllowSyntheticDefaultImports(program.getCompilerOptions()));
    }
    else {
        doChangeNamedToNamespaceOrDefault(sourceFile, program, changes, info.import, info.convertTo === ts.ImportKind.Default);
    }
}

function doChangeNamespaceToNamed(sourceFile: ts.SourceFile, checker: ts.TypeChecker, changes: ts.textChanges.ChangeTracker, toConvert: ts.NamespaceImport, allowSyntheticDefaultImports: boolean): void {
    let usedAsNamespaceOrDefault = false;

    const nodesToReplace: (ts.PropertyAccessExpression | ts.QualifiedName)[] = [];
    const conflictingNames = new ts.Map<string, true>();

    ts.FindAllReferences.Core.eachSymbolReferenceInFile(toConvert.name, checker, sourceFile, id => {
        if (!ts.isPropertyAccessOrQualifiedName(id.parent)) {
            usedAsNamespaceOrDefault = true;
        }
        else {
            const exportName = getRightOfPropertyAccessOrQualifiedName(id.parent).text;
            if (checker.resolveName(exportName, id, ts.SymbolFlags.All, /*excludeGlobals*/ true)) {
                conflictingNames.set(exportName, true);
            }
            ts.Debug.assert(getLeftOfPropertyAccessOrQualifiedName(id.parent) === id, "Parent expression should match id");
            nodesToReplace.push(id.parent);
        }
    });

    // We may need to change `mod.x` to `_x` to avoid a name conflict.
    const exportNameToImportName = new ts.Map<string, string>();

    for (const propertyAccessOrQualifiedName of nodesToReplace) {
        const exportName = getRightOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName).text;
        let importName = exportNameToImportName.get(exportName);
        if (importName === undefined) {
            exportNameToImportName.set(exportName, importName = conflictingNames.has(exportName) ? ts.getUniqueName(exportName, sourceFile) : exportName);
        }
        changes.replaceNode(sourceFile, propertyAccessOrQualifiedName, ts.factory.createIdentifier(importName));
    }

    const importSpecifiers: ts.ImportSpecifier[] = [];
    exportNameToImportName.forEach((name, propertyName) => {
        importSpecifiers.push(ts.factory.createImportSpecifier(/*isTypeOnly*/ false, name === propertyName ? undefined : ts.factory.createIdentifier(propertyName), ts.factory.createIdentifier(name)));
    });

    const importDecl = toConvert.parent.parent;
    if (usedAsNamespaceOrDefault && !allowSyntheticDefaultImports) {
        // Need to leave the namespace import alone
        changes.insertNodeAfter(sourceFile, importDecl, updateImport(importDecl, /*defaultImportName*/ undefined, importSpecifiers));
    }
    else {
        changes.replaceNode(sourceFile, importDecl, updateImport(importDecl, usedAsNamespaceOrDefault ? ts.factory.createIdentifier(toConvert.name.text) : undefined, importSpecifiers));
    }
}

function getRightOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName: ts.PropertyAccessExpression | ts.QualifiedName) {
    return ts.isPropertyAccessExpression(propertyAccessOrQualifiedName) ? propertyAccessOrQualifiedName.name : propertyAccessOrQualifiedName.right;
}

function getLeftOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName: ts.PropertyAccessExpression | ts.QualifiedName) {
    return ts.isPropertyAccessExpression(propertyAccessOrQualifiedName) ? propertyAccessOrQualifiedName.expression : propertyAccessOrQualifiedName.left;
}

export function doChangeNamedToNamespaceOrDefault(sourceFile: ts.SourceFile, program: ts.Program, changes: ts.textChanges.ChangeTracker, toConvert: ts.NamedImports, shouldUseDefault = getShouldUseDefault(program, toConvert.parent)): void {
    const checker = program.getTypeChecker();
    const importDecl = toConvert.parent.parent;
    const { moduleSpecifier } = importDecl;

    const toConvertSymbols: ts.Set<ts.Symbol> = new ts.Set();
    toConvert.elements.forEach(namedImport => {
        const symbol = checker.getSymbolAtLocation(namedImport.name);
        if (symbol) {
            toConvertSymbols.add(symbol);
        }
    });
    const preferredName = moduleSpecifier && ts.isStringLiteral(moduleSpecifier) ? ts.codefix.moduleSpecifierToValidIdentifier(moduleSpecifier.text, ts.ScriptTarget.ESNext) : "module";
    function hasNamespaceNameConflict(namedImport: ts.ImportSpecifier): boolean {
        // We need to check if the preferred namespace name (`preferredName`) we'd like to use in the refactored code will present a name conflict.
        // A name conflict means that, in a scope where we would like to use the preferred namespace name, there already exists a symbol with that name in that scope.
        // We are going to use the namespace name in the scopes the named imports being refactored are referenced,
        // so we look for conflicts by looking at every reference to those named imports.
        return !!ts.FindAllReferences.Core.eachSymbolReferenceInFile(namedImport.name, checker, sourceFile, id => {
            const symbol = checker.resolveName(preferredName, id, ts.SymbolFlags.All, /*excludeGlobals*/ true);
            if (symbol) { // There already is a symbol with the same name as the preferred namespace name.
                if (toConvertSymbols.has(symbol)) { // `preferredName` resolves to a symbol for one of the named import references we are going to transform into namespace import references...
                    return ts.isExportSpecifier(id.parent); // ...but if this reference is an export specifier, it will not be transformed, so it is a conflict; otherwise, it will be renamed and is not a conflict.
                }
                return true; // `preferredName` resolves to any other symbol, which will be present in the refactored code and so poses a name conflict.
            }
            return false; // There is no symbol with the same name as the preferred namespace name, so no conflict.
        });
    }
    const namespaceNameConflicts = toConvert.elements.some(hasNamespaceNameConflict);
    const namespaceImportName = namespaceNameConflicts ? ts.getUniqueName(preferredName, sourceFile) : preferredName;

    // Imports that need to be kept as named imports in the refactored code, to avoid changing the semantics.
    // More specifically, those are named imports that appear in named exports in the original code, e.g. `a` in `import { a } from "m"; export { a }`.
    const neededNamedImports: ts.Set<ts.ImportSpecifier> = new ts.Set();

    for (const element of toConvert.elements) {
        const propertyName = (element.propertyName || element.name).text;
        ts.FindAllReferences.Core.eachSymbolReferenceInFile(element.name, checker, sourceFile, id => {
            const access = ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier(namespaceImportName), propertyName);
            if (ts.isShorthandPropertyAssignment(id.parent)) {
                changes.replaceNode(sourceFile, id.parent, ts.factory.createPropertyAssignment(id.text, access));
            }
            else if (ts.isExportSpecifier(id.parent)) {
                neededNamedImports.add(element);
            }
            else {
                changes.replaceNode(sourceFile, id, access);
            }
        });
    }

    changes.replaceNode(sourceFile, toConvert, shouldUseDefault
        ? ts.factory.createIdentifier(namespaceImportName)
        : ts.factory.createNamespaceImport(ts.factory.createIdentifier(namespaceImportName)));
    if (neededNamedImports.size) {
        const newNamedImports: ts.ImportSpecifier[] = ts.arrayFrom(neededNamedImports.values()).map(element =>
            ts.factory.createImportSpecifier(element.isTypeOnly, element.propertyName && ts.factory.createIdentifier(element.propertyName.text), ts.factory.createIdentifier(element.name.text)));
        changes.insertNodeAfter(sourceFile, toConvert.parent.parent, updateImport(importDecl, /*defaultImportName*/ undefined, newNamedImports));
    }
}

function isExportEqualsModule(moduleSpecifier: ts.Expression, checker: ts.TypeChecker) {
    const externalModule = checker.resolveExternalModuleName(moduleSpecifier);
    if (!externalModule) return false;
    const exportEquals = checker.resolveExternalModuleSymbol(externalModule);
    return externalModule !== exportEquals;
}

function updateImport(old: ts.ImportDeclaration, defaultImportName: ts.Identifier | undefined, elements: readonly ts.ImportSpecifier[] | undefined): ts.ImportDeclaration {
    return ts.factory.createImportDeclaration(/*modifiers*/ undefined,
        ts.factory.createImportClause(/*isTypeOnly*/ false, defaultImportName, elements && elements.length ? ts.factory.createNamedImports(elements) : undefined), old.moduleSpecifier, /*assertClause*/ undefined);
}
}
