/* @internal */
namespace ts.OrganizeImports {

    /**
     * Organize imports by:
     *   1) Removing unused imports
     *   2) Coalescing imports from the same module
     *   3) Sorting imports
     */
    export function organizeImports(
        sourceFile: SourceFile,
        formatContext: formatting.FormatContext,
        host: LanguageServiceHost,
        program: Program,
        preferences: UserPreferences,
    ) {

        const changeTracker = textChanges.ChangeTracker.fromContext({ host, formatContext, preferences });

        const coalesceAndOrganizeImports = (importGroup: readonly ImportDeclaration[]) => coalesceImports(removeUnusedImports(importGroup, sourceFile, program));

        // All of the old ImportDeclarations in the file, in syntactic order.
        const topLevelImportDecls = sourceFile.statements.filter(isImportDeclaration);
        organizeImportsWorker(topLevelImportDecls, coalesceAndOrganizeImports);

        // All of the old ExportDeclarations in the file, in syntactic order.
        const topLevelExportDecls = sourceFile.statements.filter(isExportDeclaration);
        organizeImportsWorker(topLevelExportDecls, coalesceExports);

        for (const ambientModule of sourceFile.statements.filter(isAmbientModule)) {
            if (!ambientModule.body) { continue; }

            const ambientModuleImportDecls = ambientModule.body.statements.filter(isImportDeclaration);
            organizeImportsWorker(ambientModuleImportDecls, coalesceAndOrganizeImports);

            const ambientModuleExportDecls = ambientModule.body.statements.filter(isExportDeclaration);
            organizeImportsWorker(ambientModuleExportDecls, coalesceExports);
        }

        return changeTracker.getChanges();

        function organizeImportsWorker<T extends ImportDeclaration | ExportDeclaration>(
            oldImportDecls: readonly T[],
            coalesce: (group: readonly T[]) => readonly T[]) {

            if (length(oldImportDecls) === 0) {
                return;
            }

            // Special case: normally, we'd expect leading and trailing trivia to follow each import
            // around as it's sorted.  However, we do not want this to happen for leading trivia
            // on the first import because it is probably the header comment for the file.
            // Consider: we could do a more careful check that this trivia is actually a header,
            // but the consequences of being wrong are very minor.
            suppressLeadingTrivia(oldImportDecls[0]);

            const oldImportGroups = group(oldImportDecls, importDecl => getExternalModuleName(importDecl.moduleSpecifier!)!);
            const sortedImportGroups = stableSort(oldImportGroups, (group1, group2) => compareModuleSpecifiers(group1[0].moduleSpecifier!, group2[0].moduleSpecifier!));
            const newImportDecls = flatMap(sortedImportGroups, importGroup =>
                getExternalModuleName(importGroup[0].moduleSpecifier!)
                    ? coalesce(importGroup)
                    : importGroup);

            // Delete or replace the first import.
            if (newImportDecls.length === 0) {
                changeTracker.delete(sourceFile, oldImportDecls[0]);
            }
            else {
                // Note: Delete the surrounding trivia because it will have been retained in newImportDecls.
                changeTracker.replaceNodeWithNodes(sourceFile, oldImportDecls[0], newImportDecls, {
                    leadingTriviaOption: textChanges.LeadingTriviaOption.Exclude, // Leave header comment in place
                    trailingTriviaOption: textChanges.TrailingTriviaOption.Include,
                    suffix: getNewLineOrDefaultFromHost(host, formatContext.options),
                });
            }

            // Delete any subsequent imports.
            for (let i = 1; i < oldImportDecls.length; i++) {
                changeTracker.deleteNode(sourceFile, oldImportDecls[i]);
            }
        }
    }

    function removeUnusedImports(oldImports: readonly ImportDeclaration[], sourceFile: SourceFile, program: Program) {
        const typeChecker = program.getTypeChecker();
        const jsxNamespace = typeChecker.getJsxNamespace(sourceFile);
        const jsxElementsPresent = !!(sourceFile.transformFlags & TransformFlags.ContainsJsx);

        const usedImports: ImportDeclaration[] = [];

        for (const importDecl of oldImports) {
            const { importClause, moduleSpecifier } = importDecl;

            if (!importClause) {
                // Imports without import clauses are assumed to be included for their side effects and are not removed.
                usedImports.push(importDecl);
                continue;
            }

            let { name, namedBindings } = importClause;

            // Default import
            if (name && !isDeclarationUsed(name)) {
                name = undefined;
            }

            if (namedBindings) {
                if (isNamespaceImport(namedBindings)) {
                    // Namespace import
                    if (!isDeclarationUsed(namedBindings.name)) {
                        namedBindings = undefined;
                    }
                }
                else {
                    // List of named imports
                    const newElements = namedBindings.elements.filter(e => isDeclarationUsed(e.name));
                    if (newElements.length < namedBindings.elements.length) {
                        namedBindings = newElements.length
                            ? updateNamedImports(namedBindings, newElements)
                            : undefined;
                    }
                }
            }

            if (name || namedBindings) {
                usedImports.push(updateImportDeclarationAndClause(importDecl, name, namedBindings));
            }
            // If a module is imported to be augmented, it’s used
            else if (hasModuleDeclarationMatchingSpecifier(sourceFile, moduleSpecifier)) {
                // If we’re in a declaration file, it’s safe to remove the import clause from it
                if (sourceFile.isDeclarationFile) {
                    usedImports.push(createImportDeclaration(
                        importDecl.decorators,
                        importDecl.modifiers,
                        /*importClause*/ undefined,
                        moduleSpecifier));
                }
                // If we’re not in a declaration file, we can’t remove the import clause even though
                // the imported symbols are unused, because removing them makes it look like the import
                // declaration has side effects, which will cause it to be preserved in the JS emit.
                else {
                    usedImports.push(importDecl);
                }
            }
        }

        return usedImports;

        function isDeclarationUsed(identifier: Identifier) {
            // The JSX factory symbol is always used if JSX elements are present - even if they are not allowed.
            return jsxElementsPresent && (identifier.text === jsxNamespace) || FindAllReferences.Core.isSymbolReferencedInFile(identifier, typeChecker, sourceFile);
        }
    }

    function hasModuleDeclarationMatchingSpecifier(sourceFile: SourceFile, moduleSpecifier: Expression) {
        const moduleSpecifierText = isStringLiteral(moduleSpecifier) && moduleSpecifier.text;
        return isString(moduleSpecifierText) && some(sourceFile.moduleAugmentations, moduleName =>
            isStringLiteral(moduleName)
            && moduleName.text === moduleSpecifierText);
    }

    function getExternalModuleName(specifier: Expression) {
        return specifier !== undefined && isStringLiteralLike(specifier)
            ? specifier.text
            : undefined;
    }

    // Internal for testing
    /**
     * @param importGroup a list of ImportDeclarations, all with the same module name.
     */
    export function coalesceImports(importGroup: readonly ImportDeclaration[]) {
        if (importGroup.length === 0) {
            return importGroup;
        }

        const { importWithoutClause, typeOnlyImports, regularImports } = getCategorizedImports(importGroup);

        const coalescedImports: ImportDeclaration[] = [];

        if (importWithoutClause) {
            coalescedImports.push(importWithoutClause);
        }

        for (const group of [regularImports, typeOnlyImports]) {
            const isTypeOnly = group === typeOnlyImports;
            const { defaultImports, namespaceImports, namedImports } = group;
            // Normally, we don't combine default and namespace imports, but it would be silly to
            // produce two import declarations in this special case.
            if (!isTypeOnly && defaultImports.length === 1 && namespaceImports.length === 1 && namedImports.length === 0) {
                // Add the namespace import to the existing default ImportDeclaration.
                const defaultImport = defaultImports[0];
                coalescedImports.push(
                    updateImportDeclarationAndClause(defaultImport, defaultImport.importClause!.name, namespaceImports[0].importClause!.namedBindings)); // TODO: GH#18217

                continue;
            }

            const sortedNamespaceImports = stableSort(namespaceImports, (i1, i2) =>
                compareIdentifiers((i1.importClause!.namedBindings as NamespaceImport).name, (i2.importClause!.namedBindings as NamespaceImport).name)); // TODO: GH#18217

            for (const namespaceImport of sortedNamespaceImports) {
                // Drop the name, if any
                coalescedImports.push(
                    updateImportDeclarationAndClause(namespaceImport, /*name*/ undefined, namespaceImport.importClause!.namedBindings)); // TODO: GH#18217
            }

            if (defaultImports.length === 0 && namedImports.length === 0) {
                continue;
            }

            let newDefaultImport: Identifier | undefined;
            const newImportSpecifiers: ImportSpecifier[] = [];
            if (defaultImports.length === 1) {
                newDefaultImport = defaultImports[0].importClause!.name;
            }
            else {
                for (const defaultImport of defaultImports) {
                    newImportSpecifiers.push(
                        createImportSpecifier(createIdentifier("default"), defaultImport.importClause!.name!)); // TODO: GH#18217
                }
            }

            newImportSpecifiers.push(...flatMap(namedImports, i => (i.importClause!.namedBindings as NamedImports).elements)); // TODO: GH#18217

            const sortedImportSpecifiers = sortSpecifiers(newImportSpecifiers);

            const importDecl = defaultImports.length > 0
                ? defaultImports[0]
                : namedImports[0];

            const newNamedImports = sortedImportSpecifiers.length === 0
                ? newDefaultImport
                    ? undefined
                    : createNamedImports(emptyArray)
                : namedImports.length === 0
                    ? createNamedImports(sortedImportSpecifiers)
                    : updateNamedImports(namedImports[0].importClause!.namedBindings as NamedImports, sortedImportSpecifiers); // TODO: GH#18217

            // Type-only imports are not allowed to mix default, namespace, and named imports in any combination.
            // We could rewrite a default import as a named import (`import { default as name }`), but we currently
            // choose not to as a stylistic preference.
            if (isTypeOnly && newDefaultImport && newNamedImports) {
                coalescedImports.push(
                    updateImportDeclarationAndClause(importDecl, newDefaultImport, /*namedBindings*/ undefined));
                coalescedImports.push(
                    updateImportDeclarationAndClause(namedImports[0] ?? importDecl, /*name*/ undefined, newNamedImports));
            }
            else {
                coalescedImports.push(
                    updateImportDeclarationAndClause(importDecl, newDefaultImport, newNamedImports));
            }
        }

        return coalescedImports;

    }

    interface ImportGroup {
        defaultImports: ImportDeclaration[];
        namespaceImports: ImportDeclaration[];
        namedImports: ImportDeclaration[];
    }

    /*
     * Returns entire import declarations because they may already have been rewritten and
     * may lack parent pointers.  The desired parts can easily be recovered based on the
     * categorization.
     *
     * NB: There may be overlap between `defaultImports` and `namespaceImports`/`namedImports`.
     */
    function getCategorizedImports(importGroup: readonly ImportDeclaration[]) {
        let importWithoutClause: ImportDeclaration | undefined;
        const typeOnlyImports: ImportGroup = { defaultImports: [], namespaceImports: [], namedImports: [] };
        const regularImports: ImportGroup = { defaultImports: [], namespaceImports: [], namedImports: [] };

        for (const importDeclaration of importGroup) {
            if (importDeclaration.importClause === undefined) {
                // Only the first such import is interesting - the others are redundant.
                // Note: Unfortunately, we will lose trivia that was on this node.
                importWithoutClause = importWithoutClause || importDeclaration;
                continue;
            }

            const group = importDeclaration.importClause.isTypeOnly ? typeOnlyImports : regularImports;
            const { name, namedBindings } = importDeclaration.importClause;

            if (name) {
                group.defaultImports.push(importDeclaration);
            }

            if (namedBindings) {
                if (isNamespaceImport(namedBindings)) {
                    group.namespaceImports.push(importDeclaration);
                }
                else {
                    group.namedImports.push(importDeclaration);
                }
            }
        }

        return {
            importWithoutClause,
            typeOnlyImports,
            regularImports,
        };
    }

    // Internal for testing
    /**
     * @param exportGroup a list of ExportDeclarations, all with the same module name.
     */
    export function coalesceExports(exportGroup: readonly ExportDeclaration[]) {
        if (exportGroup.length === 0) {
            return exportGroup;
        }

        const { exportWithoutClause, namedExports, typeOnlyExports } = getCategorizedExports(exportGroup);

        const coalescedExports: ExportDeclaration[] = [];

        if (exportWithoutClause) {
            coalescedExports.push(exportWithoutClause);
        }

        for (const exportGroup of [namedExports, typeOnlyExports]) {
            if (exportGroup.length === 0) {
                continue;
            }
            const newExportSpecifiers: ExportSpecifier[] = [];
            newExportSpecifiers.push(...flatMap(exportGroup, i => i.exportClause && isNamedExports(i.exportClause) ? i.exportClause.elements : emptyArray));

            const sortedExportSpecifiers = sortSpecifiers(newExportSpecifiers);

            const exportDecl = exportGroup[0];
            coalescedExports.push(
                updateExportDeclaration(
                    exportDecl,
                    exportDecl.decorators,
                    exportDecl.modifiers,
                    exportDecl.exportClause && (
                        isNamedExports(exportDecl.exportClause) ?
                            updateNamedExports(exportDecl.exportClause, sortedExportSpecifiers) :
                            updateNamespaceExport(exportDecl.exportClause, exportDecl.exportClause.name)
                    ),
                    exportDecl.moduleSpecifier,
                    exportDecl.isTypeOnly));
        }

        return coalescedExports;

        /*
         * Returns entire export declarations because they may already have been rewritten and
         * may lack parent pointers.  The desired parts can easily be recovered based on the
         * categorization.
         */
        function getCategorizedExports(exportGroup: readonly ExportDeclaration[]) {
            let exportWithoutClause: ExportDeclaration | undefined;
            const namedExports: ExportDeclaration[] = [];
            const typeOnlyExports: ExportDeclaration[] = [];

            for (const exportDeclaration of exportGroup) {
                if (exportDeclaration.exportClause === undefined) {
                    // Only the first such export is interesting - the others are redundant.
                    // Note: Unfortunately, we will lose trivia that was on this node.
                    exportWithoutClause = exportWithoutClause || exportDeclaration;
                }
                else if (exportDeclaration.isTypeOnly) {
                    typeOnlyExports.push(exportDeclaration);
                }
                else {
                    namedExports.push(exportDeclaration);
                }
            }

            return {
                exportWithoutClause,
                namedExports,
                typeOnlyExports,
            };
        }
    }

    function updateImportDeclarationAndClause(
        importDeclaration: ImportDeclaration,
        name: Identifier | undefined,
        namedBindings: NamedImportBindings | undefined) {

        return updateImportDeclaration(
            importDeclaration,
            importDeclaration.decorators,
            importDeclaration.modifiers,
            updateImportClause(importDeclaration.importClause!, name, namedBindings, importDeclaration.importClause!.isTypeOnly), // TODO: GH#18217
            importDeclaration.moduleSpecifier);
    }

    function sortSpecifiers<T extends ImportOrExportSpecifier>(specifiers: readonly T[]) {
        return stableSort(specifiers, (s1, s2) =>
            compareIdentifiers(s1.propertyName || s1.name, s2.propertyName || s2.name) ||
            compareIdentifiers(s1.name, s2.name));
    }

    /* internal */ // Exported for testing
    export function compareModuleSpecifiers(m1: Expression, m2: Expression) {
        const name1 = getExternalModuleName(m1);
        const name2 = getExternalModuleName(m2);
        return compareBooleans(name1 === undefined, name2 === undefined) ||
            compareBooleans(isExternalModuleNameRelative(name1!), isExternalModuleNameRelative(name2!)) ||
            compareStringsCaseInsensitive(name1!, name2!);
    }

    function compareIdentifiers(s1: Identifier, s2: Identifier) {
        return compareStringsCaseInsensitive(s1.text, s2.text);
    }
}
