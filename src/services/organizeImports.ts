/* @internal */
namespace ts.OrganizeImports {
    export function organizeImports(
        sourceFile: SourceFile,
        formatContext: formatting.FormatContext,
        host: LanguageServiceHost) {

        // TODO (https://github.com/Microsoft/TypeScript/issues/10020): sort *within* ambient modules (find using isAmbientModule)

        // All of the old ImportDeclarations in the file, in syntactic order.
        const oldImportDecls = sourceFile.statements.filter(isImportDeclaration);

        if (oldImportDecls.length === 0) {
            return [];
        }

        const oldImportGroups = group(oldImportDecls, importDecl => getExternalModuleName(importDecl.moduleSpecifier));

        const sortedImportGroups = stableSort(oldImportGroups, (group1, group2) =>
            compareModuleSpecifiers(group1[0].moduleSpecifier, group2[0].moduleSpecifier));

        const newImportDecls = flatMap(sortedImportGroups, importGroup =>
            getExternalModuleName(importGroup[0].moduleSpecifier)
                ? coalesceImports(removeUnusedImports(importGroup))
                : importGroup);

        const changeTracker = textChanges.ChangeTracker.fromContext({ host, formatContext });

        // Delete or replace the first import.
        if (newImportDecls.length === 0) {
            changeTracker.deleteNode(sourceFile, oldImportDecls[0]);
        }
        else {
            // Note: Delete the surrounding trivia because it will have been retained in newImportDecls.
            changeTracker.replaceNodeWithNodes(sourceFile, oldImportDecls[0], newImportDecls, {
                useNonAdjustedStartPosition: false,
                useNonAdjustedEndPosition: false,
                suffix: getNewLineOrDefaultFromHost(host, formatContext.options),
            });
        }

        // Delete any subsequent imports.
        for (let i = 1; i < oldImportDecls.length; i++) {
            changeTracker.deleteNode(sourceFile, oldImportDecls[i]);
        }

        return changeTracker.getChanges();
    }

    function removeUnusedImports(oldImports: ReadonlyArray<ImportDeclaration>) {
        return oldImports; // TODO (https://github.com/Microsoft/TypeScript/issues/10020)
    }

    function getExternalModuleName(specifier: Expression) {
        return isStringLiteral(specifier) || isNoSubstitutionTemplateLiteral(specifier)
            ? specifier.text
            : undefined;
    }

    /* @internal */ // Internal for testing
    /**
     * @param importGroup a list of ImportDeclarations, all with the same module name.
     */
    export function coalesceImports(importGroup: ReadonlyArray<ImportDeclaration>) {
        if (importGroup.length === 0) {
            return importGroup;
        }

        const { importWithoutClause, defaultImports, namespaceImports, namedImports } = getImportParts(importGroup);

        const coalescedImports: ImportDeclaration[] = [];

        if (importWithoutClause) {
            coalescedImports.push(importWithoutClause);
        }

        // Normally, we don't combine default and namespace imports, but it would be silly to
        // produce two import declarations in this special case.
        if (defaultImports.length === 1 && namespaceImports.length === 1 && namedImports.length === 0) {
            // Add the namespace import to the existing default ImportDeclaration.
            const defaultImportClause = defaultImports[0].parent as ImportClause;
            coalescedImports.push(
                updateImportDeclarationAndClause(defaultImportClause, defaultImportClause.name, namespaceImports[0]));

            return coalescedImports;
        }

        const sortedNamespaceImports = stableSort(namespaceImports, (n1, n2) => compareIdentifiers(n1.name, n2.name));

        for (const namespaceImport of sortedNamespaceImports) {
            // Drop the name, if any
            coalescedImports.push(
                updateImportDeclarationAndClause(namespaceImport.parent, /*name*/ undefined, namespaceImport));
        }

        if (defaultImports.length === 0 && namedImports.length === 0) {
            return coalescedImports;
        }

        let newDefaultImport: Identifier | undefined;
        const newImportSpecifiers: ImportSpecifier[] = [];
        if (defaultImports.length === 1) {
            newDefaultImport = defaultImports[0];
        }
        else {
            for (const defaultImport of defaultImports) {
                newImportSpecifiers.push(
                    createImportSpecifier(createIdentifier("default"), defaultImport));
            }
        }

        newImportSpecifiers.push(...flatMap(namedImports, n => n.elements));

        const sortedImportSpecifiers = stableSort(newImportSpecifiers, (s1, s2) =>
            compareIdentifiers(s1.propertyName || s1.name, s2.propertyName || s2.name) ||
            compareIdentifiers(s1.name, s2.name));

        const importClause = defaultImports.length > 0
            ? defaultImports[0].parent as ImportClause
            : namedImports[0].parent;

        const newNamedImports = sortedImportSpecifiers.length === 0
            ? undefined
            : namedImports.length === 0
                ? createNamedImports(sortedImportSpecifiers)
                : updateNamedImports(namedImports[0], sortedImportSpecifiers);

        coalescedImports.push(
            updateImportDeclarationAndClause(importClause, newDefaultImport, newNamedImports));

        return coalescedImports;

        function getImportParts(importGroup: ReadonlyArray<ImportDeclaration>) {
            let importWithoutClause: ImportDeclaration | undefined;
            const defaultImports: Identifier[] = [];
            const namespaceImports: NamespaceImport[] = [];
            const namedImports: NamedImports[] = [];

            for (const importDeclaration of importGroup) {
                if (importDeclaration.importClause === undefined) {
                    // Only the first such import is interesting - the others are redundant.
                    // Note: Unfortunately, we will lose trivia that was on this node.
                    importWithoutClause = importWithoutClause || importDeclaration;
                    continue;
                }

                const { name, namedBindings } = importDeclaration.importClause;

                if (name) {
                    defaultImports.push(name);
                }

                if (namedBindings) {
                    if (isNamespaceImport(namedBindings)) {
                        namespaceImports.push(namedBindings);
                    }
                    else {
                        namedImports.push(namedBindings);
                    }
                }
            }

            return {
                importWithoutClause,
                defaultImports,
                namespaceImports,
                namedImports,
            };
        }

        function compareIdentifiers(s1: Identifier, s2: Identifier) {
            return compareStringsCaseSensitive(s1.text, s2.text);
        }

        function updateImportDeclarationAndClause(
            importClause: ImportClause,
            name: Identifier | undefined,
            namedBindings: NamedImportBindings | undefined) {

            const importDeclaration = importClause.parent;
            return updateImportDeclaration(
                importDeclaration,
                importDeclaration.decorators,
                importDeclaration.modifiers,
                updateImportClause(importClause, name, namedBindings),
                importDeclaration.moduleSpecifier);
        }
    }

    /* internal */ // Exported for testing
    export function compareModuleSpecifiers(m1: Expression, m2: Expression) {
        const name1 = getExternalModuleName(m1);
        const name2 = getExternalModuleName(m2);
        return compareBooleans(name1 === undefined, name2 === undefined) ||
            compareBooleans(isExternalModuleNameRelative(name1), isExternalModuleNameRelative(name2)) ||
            compareStringsCaseSensitive(name1, name2);
    }
}