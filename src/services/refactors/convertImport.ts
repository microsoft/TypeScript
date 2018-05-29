/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const refactorName = "Convert import";
    const actionNameNamespaceToNamed = "Convert namespace import to named imports";
    const actionNameNamedToNamespace = "Convert named imports to namespace import";
    registerRefactor(refactorName, {
        getAvailableActions(context): ApplicableRefactorInfo[] | undefined {
            const i = getImportToConvert(context);
            if (!i) return undefined;
            const description = i.kind === SyntaxKind.NamespaceImport ? Diagnostics.Convert_namespace_import_to_named_imports.message : Diagnostics.Convert_named_imports_to_namespace_import.message;
            const actionName = i.kind === SyntaxKind.NamespaceImport ? actionNameNamespaceToNamed : actionNameNamedToNamespace;
            return [{ name: refactorName, description, actions: [{ name: actionName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === actionNameNamespaceToNamed || actionName === actionNameNamedToNamespace);
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program.getTypeChecker(), t, Debug.assertDefined(getImportToConvert(context))));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
    });

    // Can convert imports of the form `import * as m from "m";` or `import d, { x, y } from "m";`.
    function getImportToConvert(context: RefactorContext): NamedImportBindings | undefined {
        const { file } = context;
        const span = getRefactorContextSpan(context);
        const token = getTokenAtPosition(file, span.start, /*includeJsDocComment*/ false);
        const importDecl = getParentNodeInSpan(token, file, span);
        if (!importDecl || !isImportDeclaration(importDecl)) return undefined;
        const { importClause } = importDecl;
        return importClause && importClause.namedBindings;
    }

    function doChange(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamedImportBindings): void {
        const usedIdentifiers = createMap<true>();
        forEachFreeIdentifier(sourceFile, id => usedIdentifiers.set(id.text, true));

        if (toConvert.kind === SyntaxKind.NamespaceImport) {
            doChangeNamespaceToNamed(sourceFile, checker, changes, toConvert, usedIdentifiers);
        }
        else {
            doChangeNamedToNamespace(sourceFile, checker, changes, toConvert, usedIdentifiers);
        }
    }

    function doChangeNamespaceToNamed(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamespaceImport, usedIdentifiers: ReadonlyMap<true>): void {
        const namespaceSymbol = checker.getSymbolAtLocation(toConvert.name)!;

        // We may need to change `mod.x` to `_x` to avoid a name conflict.
        const exportNameToImportName = createMap<string>();
        let usedAsNamespace = false;

        forEachFreeIdentifier(sourceFile, id => {
            if (id === toConvert.name || checker.getSymbolAtLocation(id) !== namespaceSymbol) return;

            if (!isPropertyAccessExpression(id.parent)) {
                usedAsNamespace = true;
            }
            else {
                const parent = cast(id.parent, isPropertyAccessExpression);
                const exportName = parent.name.text;
                let name = exportNameToImportName.get(exportName);
                if (name === undefined) {
                    exportNameToImportName.set(exportName, name = generateName(exportName, usedIdentifiers));
                }
                Debug.assert(parent.expression === id);
                changes.replaceNode(sourceFile, parent, createIdentifier(name));
            }
        });

        const elements: ImportSpecifier[] = [];
        exportNameToImportName.forEach((name, propertyName) => {
            elements.push(createImportSpecifier(name === propertyName ? undefined : createIdentifier(propertyName), createIdentifier(name)));
        });
        const namedImports = createNamedImports(elements);

        if (usedAsNamespace) {
            changes.insertNodeAfter(sourceFile, toConvert.parent.parent,
                createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createImportClause(/*name*/ undefined, namedImports), toConvert.parent.parent.moduleSpecifier));
        }
        else {
            changes.replaceNode(sourceFile, toConvert, namedImports);
        }
    }

    function doChangeNamedToNamespace(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamedImports, usedIdentifiers: ReadonlyMap<true>): void {
        const { moduleSpecifier } = toConvert.parent.parent;
        // We know the user is using at least ScriptTarget.ES6, and moduleSpecifierToValidIdentifier only cares if we're using ES5+, so just set ScriptTarget.ESNext
        const namespaceImportName = generateName(moduleSpecifier && isStringLiteral(moduleSpecifier) ? codefix.moduleSpecifierToValidIdentifier(moduleSpecifier.text, ScriptTarget.ESNext) : "module", usedIdentifiers);

        changes.replaceNode(sourceFile, toConvert, createNamespaceImport(createIdentifier(namespaceImportName)));

        const nameToPropertyName = createMap<string>();
        for (const element of toConvert.elements) {
            if (element.propertyName) {
                nameToPropertyName.set(element.name.text, element.propertyName.text);
            }
        }

        const importedSymbols = toConvert.elements.map(e => checker.getSymbolAtLocation(e.name)!);

        forEachFreeIdentifier(sourceFile, id => {
            if (!toConvert.elements.some(e => e.name === id) && contains(importedSymbols, checker.getSymbolAtLocation(id))) {
                changes.replaceNode(sourceFile, id, createPropertyAccess(createIdentifier(namespaceImportName), nameToPropertyName.get(id.text) || id.text));
            }
        });
    }

    function generateName(name: string, usedIdentifiers: ReadonlyMap<true>): string {
        while (usedIdentifiers.has(name)) {
            name = `_${name}`;
        }
        return name;
    }
}
