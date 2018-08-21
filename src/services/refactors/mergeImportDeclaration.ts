/* @internal */
namespace ts.refactor.addOrRemoveBracesToArrowFunction {
    const refactorName = "Merge duplicate import declaration";
    registerRefactor(refactorName, {
        getAvailableActions(context): ApplicableRefactorInfo[] | undefined {
            const i = getImportToMerge(context);
            if (!i) return undefined;
            const description = Diagnostics.Merge_duplicate_import_declaration.message;

            return [{ name: refactorName, description, actions: [{ name: refactorName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === refactorName);
            const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, t, Debug.assertDefined(getImportToMerge(context))));
            return { edits, renameFilename: undefined, renameLocation: undefined };
        }
    });

    interface Info {
        declaration: ImportDeclaration;
        otherDeclarations: ImportClause[];
    }
    function getImportToMerge(context: RefactorContext): Info | undefined {
        const { file } = context;
        const span = getRefactorContextSpan(context);
        const token = getTokenAtPosition(file, span.start);
        const importDecl = getParentNodeInSpan(token, file, span);
        if (!importDecl || !isImportDeclaration(importDecl) || !isMergeableImport(importDecl)) return undefined;
        const otherDeclarations = filter(file.statements, stmt =>
            !!(stmt !== importDecl && isImportDeclaration(stmt) && isMergeableImport(stmt) && (<StringLiteral>stmt.moduleSpecifier).text === (<StringLiteral>importDecl.moduleSpecifier).text)
        ).map(x => cast(x, isImportDeclaration).importClause) as ImportClause[];
        return length(otherDeclarations) && allMergeDefaultImport(importDecl.importClause!, otherDeclarations) ? {
            otherDeclarations,
            declaration: importDecl
        } : undefined;
    }

    function isMergeableImport(declaration: ImportDeclaration) {
        return !!(declaration.importClause && declaration.importClause.namedBindings && isNamedImports(declaration.importClause.namedBindings) && isStringLiteral(declaration.moduleSpecifier));
    }

    function allMergeDefaultImport(source: ImportClause, targets: ImportClause[]) {
        if (source.name) {
            return every(targets, decl => !decl.name || decl.name.text === source.name!.text);
        }
        else {
            let firstDefaultImport: string | undefined;
            return every(targets, decl => {
                if (firstDefaultImport && decl.name) {
                    return firstDefaultImport === decl.name.text;
                }
                else if (decl.name) {
                    firstDefaultImport = decl.name.text;
                }
                return true;
            });
        }
    }

    function getImportSpecifiernName(specifier: ImportSpecifier) {
        return specifier.propertyName ? specifier.propertyName.text : specifier.name.text;
    }

    function doChange(sourceFile: SourceFile, changes: textChanges.ChangeTracker, info: Info): void {
        const { declaration, otherDeclarations } = info;
        const seensNameBindings = createMap<ImportSpecifier>();
        let defaultImportName = declaration.importClause!.name;
        forEach((<NamedImports>declaration.importClause!.namedBindings).elements, element => {
            seensNameBindings.set(getImportSpecifiernName(element), element);
        });
        forEach(otherDeclarations, decl => {
            if (!declaration.importClause!.name && decl.name) {
                defaultImportName = decl.name;
            }
            forEach((<NamedImports>decl.namedBindings).elements, element => {
                if (!seensNameBindings.has(getImportSpecifiernName(element))) {
                    seensNameBindings.set(getImportSpecifiernName(element), element);
                }
            });
        });
        changes.replaceNode(sourceFile, declaration, updateImportDeclaration(
            declaration,
            declaration.decorators,
            declaration.modifiers,
            updateImportClause(
                declaration.importClause!,
                defaultImportName,
                createNamedImports(arrayFrom(seensNameBindings.values()))
            ),
            declaration.moduleSpecifier
        ));
        otherDeclarations.forEach(decl => { changes.delete(sourceFile, decl.parent); });
    }
}
