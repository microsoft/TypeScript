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
        if (importDecl.getEnd() < span.start + span.length) return undefined;

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
            importSpecifiers.push(factory.createImportSpecifier(name === propertyName ? undefined : factory.createIdentifier(propertyName), factory.createIdentifier(name)));
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

        const preferredName = moduleSpecifier && isStringLiteral(moduleSpecifier) ? codefix.moduleSpecifierToValidIdentifier(moduleSpecifier.text, ScriptTarget.ESNext) : "module";
        const namespaceNameConflicts = toConvert.elements.some(element =>
            FindAllReferences.Core.eachSymbolReferenceInFile(element.name, checker, sourceFile, id =>
                !!checker.resolveName(preferredName, id, SymbolFlags.All, /*excludeGlobals*/ true)) || false);
        const namespaceImportName = namespaceNameConflicts ? getUniqueName(preferredName, sourceFile) : preferredName;

        const neededNamedImports: ImportSpecifier[] = [];

        for (const element of toConvert.elements) {
            const propertyName = (element.propertyName || element.name).text;
            FindAllReferences.Core.eachSymbolReferenceInFile(element.name, checker, sourceFile, id => {
                const access = factory.createPropertyAccessExpression(factory.createIdentifier(namespaceImportName), propertyName);
                if (isShorthandPropertyAssignment(id.parent)) {
                    changes.replaceNode(sourceFile, id.parent, factory.createPropertyAssignment(id.text, access));
                }
                else if (isExportSpecifier(id.parent) && !id.parent.propertyName) {
                    if (!neededNamedImports.some(n => n.name === element.name)) {
                        neededNamedImports.push(factory.createImportSpecifier(element.propertyName && factory.createIdentifier(element.propertyName.text), factory.createIdentifier(element.name.text)));
                    }
                }
                else {
                    changes.replaceNode(sourceFile, id, access);
                }
            });
        }

        changes.replaceNode(sourceFile, toConvert, factory.createNamespaceImport(factory.createIdentifier(namespaceImportName)));
        if (neededNamedImports.length) {
            changes.insertNodeAfter(sourceFile, toConvert.parent.parent, updateImport(importDecl, /*defaultImportName*/ undefined, neededNamedImports));
        }
    }

    function updateImport(old: ImportDeclaration, defaultImportName: Identifier | undefined, elements: readonly ImportSpecifier[] | undefined): ImportDeclaration {
        return factory.createImportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined,
            factory.createImportClause(/*isTypeOnly*/ false, defaultImportName, elements && elements.length ? factory.createNamedImports(elements) : undefined), old.moduleSpecifier);
    }
}
