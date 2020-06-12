/* @internal */
namespace ts.refactor {
    const refactorName = "Convert import";
    const actionNameNamespaceToNamed = "Convert namespace import to named imports";
    const actionNameNamedToNamespace = "Convert named imports to namespace import";
    registerRefactor(refactorName, {
        getAvailableActions(context): readonly ApplicableRefactorInfo[] {
            const i = getImportToConvert(context, context.triggerReason === "invoked");
            if (!i) return emptyArray;
            const description = i.kind === SyntaxKind.NamespaceImport ? Diagnostics.Convert_namespace_import_to_named_imports.message : Diagnostics.Convert_named_imports_to_namespace_import.message;
            const actionName = i.kind === SyntaxKind.NamespaceImport ? actionNameNamespaceToNamed : actionNameNamedToNamespace;
            return [{ name: refactorName, description, actions: [{ name: actionName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === actionNameNamespaceToNamed || actionName === actionNameNamedToNamespace, "Unexpected action name");
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program, t, Debug.checkDefined(getImportToConvert(context), "Context must provide an import to convert")));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
    });

    // Can convert imports of the form `import * as m from "m";` or `import d, { x, y } from "m";`.
    function getImportToConvert(context: RefactorContext, considerPartialSpans = true): NamedImportBindings | undefined {
        const { file } = context;
        const span = getRefactorContextSpan(context);
        const token = getTokenAtPosition(file, span.start);
        const importDecl = considerPartialSpans ? findAncestor(token, isImportDeclaration) : getParentNodeInSpan(token, file, span);
        if (!importDecl || !isImportDeclaration(importDecl) || (importDecl.getEnd() < span.start + span.length)) return undefined;
        const { importClause } = importDecl;
        return importClause && importClause.namedBindings;
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

        const nodesToReplace: PropertyAccessExpression[] = [];
        const conflictingNames = createMap<true>();

        FindAllReferences.Core.eachSymbolReferenceInFile(toConvert.name, checker, sourceFile, id => {
            if (!isPropertyAccessExpression(id.parent)) {
                usedAsNamespaceOrDefault = true;
            }
            else {
                const parent = cast(id.parent, isPropertyAccessExpression);
                const exportName = parent.name.text;
                if (checker.resolveName(exportName, id, SymbolFlags.All, /*excludeGlobals*/ true)) {
                    conflictingNames.set(exportName, true);
                }
                Debug.assert(parent.expression === id, "Parent expression should match id");
                nodesToReplace.push(parent);
            }
        });

        // We may need to change `mod.x` to `_x` to avoid a name conflict.
        const exportNameToImportName = createMap<string>();

        for (const propertyAccess of nodesToReplace) {
            const exportName = propertyAccess.name.text;
            let importName = exportNameToImportName.get(exportName);
            if (importName === undefined) {
                exportNameToImportName.set(exportName, importName = conflictingNames.has(exportName) ? getUniqueName(exportName, sourceFile) : exportName);
            }
            changes.replaceNode(sourceFile, propertyAccess, createIdentifier(importName));
        }

        const importSpecifiers: ImportSpecifier[] = [];
        exportNameToImportName.forEach((name, propertyName) => {
            importSpecifiers.push(createImportSpecifier(name === propertyName ? undefined : createIdentifier(propertyName), createIdentifier(name)));
        });

        const importDecl = toConvert.parent.parent;
        if (usedAsNamespaceOrDefault && !allowSyntheticDefaultImports) {
            // Need to leave the namespace import alone
            changes.insertNodeAfter(sourceFile, importDecl, updateImport(importDecl, /*defaultImportName*/ undefined, importSpecifiers));
        }
        else {
            changes.replaceNode(sourceFile, importDecl, updateImport(importDecl, usedAsNamespaceOrDefault ? createIdentifier(toConvert.name.text) : undefined, importSpecifiers));
        }
    }

    function doChangeNamedToNamespace(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: NamedImports): void {
        const importDecl = toConvert.parent.parent;
        const { moduleSpecifier } = importDecl;

        const preferredName = moduleSpecifier && isStringLiteral(moduleSpecifier) ? codefix.moduleSpecifierToValidIdentifier(moduleSpecifier.text, ScriptTarget.ESNext) : "module";
        const namespaceNameConflicts = toConvert.elements.some(element =>
            FindAllReferences.Core.eachSymbolReferenceInFile(element.name, checker, sourceFile, id =>
                !!checker.resolveName(preferredName, id, SymbolFlags.All, /*excludeGlobals*/ true)) || false);
        const namespaceImportName = namespaceNameConflicts ? getUniqueName(preferredName, sourceFile) : preferredName;

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
            changes.insertNodeAfter(sourceFile, toConvert.parent.parent, updateImport(importDecl, /*defaultImportName*/ undefined, neededNamedImports));
        }
    }

    function updateImport(old: ImportDeclaration, defaultImportName: Identifier | undefined, elements: readonly ImportSpecifier[] | undefined): ImportDeclaration {
        return createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined,
            createImportClause(defaultImportName, elements && elements.length ? createNamedImports(elements) : undefined), old.moduleSpecifier);
    }
}
