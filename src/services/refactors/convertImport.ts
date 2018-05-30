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
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, t, Debug.assertDefined(getImportToConvert(context))));
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

    function doChange(sourceFile: SourceFile, program: Program, changes: textChanges.ChangeTracker, toConvert: NamedImportBindings): void {
        const usedIdentifiers = createMap<true>();
        forEachFreeIdentifier(sourceFile, id => usedIdentifiers.set(id.text, true));
        const checker = program.getTypeChecker();

        if (toConvert.kind === SyntaxKind.NamespaceImport) {
            doChangeNamespaceToNamed(sourceFile, checker, changes, toConvert, usedIdentifiers, getAllowSyntheticDefaultImports(program.getCompilerOptions()));
        }
        else {
            doChangeNamedToNamespace(sourceFile, checker, changes, toConvert, usedIdentifiers);
        }
    }

    function doChangeNamespaceToNamed(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamespaceImport, usedIdentifiers: ReadonlyMap<true>, allowSyntheticDefaultImports: boolean): void {
        // We may need to change `mod.x` to `_x` to avoid a name conflict.
        const exportNameToImportName = createMap<string>();
        let usedAsNamespaceOrDefault = false;

        FindAllReferences.Core.eachSymbolReferenceInFile(toConvert.name, checker, sourceFile, id => {
            if (!isPropertyAccessExpression(id.parent)) {
                usedAsNamespaceOrDefault = true;
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

        const importDecl = toConvert.parent.parent;
        if (usedAsNamespaceOrDefault && !allowSyntheticDefaultImports) {
            // Need to leave the namespace import alone
            changes.insertNodeAfter(sourceFile, importDecl, updateImport(importDecl, /*defaultImportName*/ undefined, elements));
        }
        else {
            changes.replaceNode(sourceFile, importDecl, updateImport(importDecl, usedAsNamespaceOrDefault ? createIdentifier(toConvert.name.text) : undefined, elements));
        }
    }

    function doChangeNamedToNamespace(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamedImports, usedIdentifiers: ReadonlyMap<true>): void {
        const { moduleSpecifier } = toConvert.parent.parent;
        // We know the user is using at least ScriptTarget.ES6, and moduleSpecifierToValidIdentifier only cares if we're using ES5+, so just set ScriptTarget.ESNext
        const namespaceImportName = generateName(moduleSpecifier && isStringLiteral(moduleSpecifier) ? codefix.moduleSpecifierToValidIdentifier(moduleSpecifier.text, ScriptTarget.ESNext) : "module", usedIdentifiers);

        const neededNamedImports: ImportSpecifier[] = [];

        for (const element of toConvert.elements) {
            const propertyName = (element.propertyName || element.name).text;
            FindAllReferences.Core.eachSymbolReferenceInFile(element.name, checker, sourceFile, id => {
                const access = createPropertyAccess(createIdentifier(namespaceImportName), propertyName);
                if (isShorthandPropertyAssignment(id.parent)) {
                    changes.replaceNode(sourceFile, id.parent, createPropertyAssignment(id.text, access));
                }
                else if (isExportSpecifier(id.parent) && !id.parent.propertyName) {
                    if (!neededNamedImports.some(n => n.name === element.name)) {
                        neededNamedImports.push(createImportSpecifier(element.propertyName && createIdentifier(element.propertyName.text), createIdentifier(element.name.text)));
                    }
                }
                else {
                    changes.replaceNode(sourceFile, id, access);
                }
            });
        }

        changes.replaceNode(sourceFile, toConvert, createNamespaceImport(createIdentifier(namespaceImportName)));
        if (neededNamedImports.length) {
            const importDecl = toConvert.parent.parent;
            changes.insertNodeAfter(sourceFile, toConvert.parent.parent, updateImport(importDecl, /*defaultImportName*/ undefined, neededNamedImports));
        }
    }

    function updateImport(old: ImportDeclaration, defaultImportName: Identifier | undefined, elements: ReadonlyArray<ImportSpecifier> | undefined): ImportDeclaration {
        return createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined,
            createImportClause(defaultImportName, elements && elements.length ? createNamedImports(elements) : undefined), old.moduleSpecifier);
    }

    function generateName(name: string, usedIdentifiers: ReadonlyMap<true>): string {
        while (usedIdentifiers.has(name)) {
            name = `_${name}`;
        }
        return name;
    }
}
