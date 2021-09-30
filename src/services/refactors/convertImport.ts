/* @internal */
namespace ts.refactor {
    const refactorName = "Convert import";

    const namespaceToNamedAction = {
        name: "Convert namespace import to named imports",
        description: Diagnostics.Convert_namespace_import_to_named_imports.message,
        kind: "refactor.rewrite.import.named",
    };
    const namedToNamespaceAction = {
        name: "Convert named imports to namespace import",
        description: Diagnostics.Convert_named_imports_to_namespace_import.message,
        kind: "refactor.rewrite.import.namespace",
    };

    registerRefactor(refactorName, {
        kinds: [
            namespaceToNamedAction.kind,
            namedToNamespaceAction.kind
        ],
        getAvailableActions(context): readonly ApplicableRefactorInfo[] {
            const info = getImportToConvert(context, context.triggerReason === "invoked");
            if (!info) return emptyArray;

            if (!isRefactorErrorInfo(info)) {
                const namespaceImport = info.kind === SyntaxKind.NamespaceImport;
                const action = namespaceImport ? namespaceToNamedAction : namedToNamespaceAction;
                return [{ name: refactorName, description: action.description, actions: [action] }];
            }

            if (context.preferences.provideRefactorNotApplicableReason) {
                return [
                    { name: refactorName, description: namespaceToNamedAction.description,
                        actions: [{ ...namespaceToNamedAction, notApplicableReason: info.error }] },
                    { name: refactorName, description: namedToNamespaceAction.description,
                        actions: [{ ...namedToNamespaceAction, notApplicableReason: info.error }] }
                ];
            }

            return emptyArray;
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === namespaceToNamedAction.name || actionName === namedToNamespaceAction.name, "Unexpected action name");
            const info = getImportToConvert(context);
            Debug.assert(info && !isRefactorErrorInfo(info), "Expected applicable refactor info");
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, t, info));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
    });

    // Can convert imports of the form `import * as m from "m";` or `import d, { x, y } from "m";`.
    function getImportToConvert(context: RefactorContext, considerPartialSpans = true): NamedImportBindings | RefactorErrorInfo | undefined {
        const { file } = context;
        const span = getRefactorContextSpan(context);
        const token = getTokenAtPosition(file, span.start);
        const importDecl = considerPartialSpans ? findAncestor(token, isImportDeclaration) : getParentNodeInSpan(token, file, span);
        if (!importDecl || !isImportDeclaration(importDecl)) return { error: "Selection is not an import declaration." };

        const end = span.start + span.length;
        const nextToken = findNextToken(importDecl, importDecl.parent, file);
        if (nextToken && end > nextToken.getStart()) return undefined;

        const { importClause } = importDecl;
        if (!importClause) {
            return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_import_clause) };
        }

        if (!importClause.namedBindings) {
            return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_namespace_import_or_named_imports) };
        }

        return importClause.namedBindings;
    }

    function doChange(sourceFile: SourceFile, program: Program, changes: textChanges.ChangeTracker, toConvert: NamedImportBindings): void {
        const checker = program.getTypeChecker();
        if (toConvert.kind === SyntaxKind.NamespaceImport) {
            doChangeNamespaceToNamed(sourceFile, checker, changes, toConvert, getAllowSyntheticDefaultImports(program.getCompilerOptions()));
        }
        else {
            doChangeNamedToNamespace(sourceFile, checker, changes, toConvert);
        }
    }

    function doChangeNamespaceToNamed(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamespaceImport, allowSyntheticDefaultImports: boolean): void {
        let usedAsNamespaceOrDefault = false;

        const nodesToReplace: (PropertyAccessExpression | QualifiedName)[] = [];
        const conflictingNames = new Map<string, true>();

        FindAllReferences.Core.eachSymbolReferenceInFile(toConvert.name, checker, sourceFile, id => {
            if (!isPropertyAccessOrQualifiedName(id.parent)) {
                usedAsNamespaceOrDefault = true;
            }
            else {
                const exportName = getRightOfPropertyAccessOrQualifiedName(id.parent).text;
                if (checker.resolveName(exportName, id, SymbolFlags.All, /*excludeGlobals*/ true)) {
                    conflictingNames.set(exportName, true);
                }
                Debug.assert(getLeftOfPropertyAccessOrQualifiedName(id.parent) === id, "Parent expression should match id");
                nodesToReplace.push(id.parent);
            }
        });

        // We may need to change `mod.x` to `_x` to avoid a name conflict.
        const exportNameToImportName = new Map<string, string>();

        for (const propertyAccessOrQualifiedName of nodesToReplace) {
            const exportName = getRightOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName).text;
            let importName = exportNameToImportName.get(exportName);
            if (importName === undefined) {
                exportNameToImportName.set(exportName, importName = conflictingNames.has(exportName) ? getUniqueName(exportName, sourceFile) : exportName);
            }
            changes.replaceNode(sourceFile, propertyAccessOrQualifiedName, factory.createIdentifier(importName));
        }

        const importSpecifiers: ImportSpecifier[] = [];
        exportNameToImportName.forEach((name, propertyName) => {
            importSpecifiers.push(factory.createImportSpecifier(/*isTypeOnly*/ false, name === propertyName ? undefined : factory.createIdentifier(propertyName), factory.createIdentifier(name)));
        });

        const importDecl = toConvert.parent.parent;
        if (usedAsNamespaceOrDefault && !allowSyntheticDefaultImports) {
            // Need to leave the namespace import alone
            changes.insertNodeAfter(sourceFile, importDecl, updateImport(importDecl, /*defaultImportName*/ undefined, importSpecifiers));
        }
        else {
            changes.replaceNode(sourceFile, importDecl, updateImport(importDecl, usedAsNamespaceOrDefault ? factory.createIdentifier(toConvert.name.text) : undefined, importSpecifiers));
        }
    }

    function getRightOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName: PropertyAccessExpression | QualifiedName) {
        return isPropertyAccessExpression(propertyAccessOrQualifiedName) ? propertyAccessOrQualifiedName.name : propertyAccessOrQualifiedName.right;
    }

    function getLeftOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName: PropertyAccessExpression | QualifiedName) {
        return isPropertyAccessExpression(propertyAccessOrQualifiedName) ? propertyAccessOrQualifiedName.expression : propertyAccessOrQualifiedName.left;
    }

    function doChangeNamedToNamespace(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamedImports): void {
        const importDecl = toConvert.parent.parent;
        const { moduleSpecifier } = importDecl;

        const toConvertSymbols: Set<Symbol> = new Set();
        toConvert.elements.forEach(namedImport => {
            const symbol = checker.getSymbolAtLocation(namedImport.name);
            if (symbol) {
                toConvertSymbols.add(symbol);
            }
        });
        const preferredName = moduleSpecifier && isStringLiteral(moduleSpecifier) ? codefix.moduleSpecifierToValidIdentifier(moduleSpecifier.text, ScriptTarget.ESNext) : "module";
        function hasNamespaceNameConflict(namedImport: ImportSpecifier): boolean {
            // We need to check if the preferred namespace name (`preferredName`) we'd like to use in the refactored code will present a name conflict.
            // A name conflict means that, in a scope where we would like to use the preferred namespace name, there already exists a symbol with that name in that scope.
            // We are going to use the namespace name in the scopes the named imports being refactored are referenced,
            // so we look for conflicts by looking at every reference to those named imports.
            return !!FindAllReferences.Core.eachSymbolReferenceInFile(namedImport.name, checker, sourceFile, id => {
                const symbol = checker.resolveName(preferredName, id, SymbolFlags.All, /*excludeGlobals*/ true);
                if (symbol) { // There already is a symbol with the same name as the preferred namespace name.
                    if (toConvertSymbols.has(symbol)) { // `preferredName` resolves to a symbol for one of the named import references we are going to transform into namespace import references...
                        return isExportSpecifier(id.parent); // ...but if this reference is an export specifier, it will not be transformed, so it is a conflict; otherwise, it will be renamed and is not a conflict.
                    }
                    return true; // `preferredName` resolves to any other symbol, which will be present in the refactored code and so poses a name conflict.
                }
                return false; // There is no symbol with the same name as the preferred namespace name, so no conflict.
            });
        }
        const namespaceNameConflicts = toConvert.elements.some(hasNamespaceNameConflict);
        const namespaceImportName = namespaceNameConflicts ? getUniqueName(preferredName, sourceFile) : preferredName;

        // Imports that need to be kept as named imports in the refactored code, to avoid changing the semantics.
        // More specifically, those are named imports that appear in named exports in the original code, e.g. `a` in `import { a } from "m"; export { a }`.
        const neededNamedImports: Set<ImportSpecifier> = new Set();

        for (const element of toConvert.elements) {
            const propertyName = (element.propertyName || element.name).text;
            FindAllReferences.Core.eachSymbolReferenceInFile(element.name, checker, sourceFile, id => {
                const access = factory.createPropertyAccessExpression(factory.createIdentifier(namespaceImportName), propertyName);
                if (isShorthandPropertyAssignment(id.parent)) {
                    changes.replaceNode(sourceFile, id.parent, factory.createPropertyAssignment(id.text, access));
                }
                else if (isExportSpecifier(id.parent)) {
                    neededNamedImports.add(element);
                }
                else {
                    changes.replaceNode(sourceFile, id, access);
                }
            });
        }

        changes.replaceNode(sourceFile, toConvert, factory.createNamespaceImport(factory.createIdentifier(namespaceImportName)));
        if (neededNamedImports.size) {
            const newNamedImports: ImportSpecifier[] = arrayFrom(neededNamedImports.values()).map(element =>
                factory.createImportSpecifier(element.isTypeOnly, element.propertyName && factory.createIdentifier(element.propertyName.text), factory.createIdentifier(element.name.text)));
            changes.insertNodeAfter(sourceFile, toConvert.parent.parent, updateImport(importDecl, /*defaultImportName*/ undefined, newNamedImports));
        }
    }

    function updateImport(old: ImportDeclaration, defaultImportName: Identifier | undefined, elements: readonly ImportSpecifier[] | undefined): ImportDeclaration {
        return factory.createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined,
            factory.createImportClause(/*isTypeOnly*/ false, defaultImportName, elements && elements.length ? factory.createNamedImports(elements) : undefined), old.moduleSpecifier, /*assertClause*/ undefined);
    }
}
