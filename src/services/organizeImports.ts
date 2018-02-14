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

        const oldValidImportDecls = oldImportDecls.filter(importDecl => getExternalModuleName(importDecl.moduleSpecifier));
        const oldInvalidImportDecls = oldImportDecls.filter(importDecl => !getExternalModuleName(importDecl.moduleSpecifier));

        // All of the new ImportDeclarations in the file, in sorted order.
        const newImportDecls = coalesceImports(sortImports(removeUnusedImports(oldValidImportDecls))).concat(oldInvalidImportDecls);

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

    /* @internal */ // Internal for testing
    export function sortImports(oldImports: ReadonlyArray<ImportDeclaration>) {
        return stableSort(oldImports, (import1, import2) => {
            const name1 = getExternalModuleName(import1.moduleSpecifier);
            const name2 = getExternalModuleName(import2.moduleSpecifier);
            Debug.assert(name1 !== undefined);
            Debug.assert(name2 !== undefined);
            return compareBooleans(isExternalModuleNameRelative(name1), isExternalModuleNameRelative(name2)) ||
                compareStringsCaseSensitive(name1, name2);
        });
    }

    function getExternalModuleName(specifier: Expression) {
        return isStringLiteral(specifier) || isNoSubstitutionTemplateLiteral(specifier)
            ? specifier.text
            : undefined;
    }

    /**
     * @param sortedImports a non-empty list of ImportDeclarations, sorted by module name.
     */
    function groupSortedImports(sortedImports: ReadonlyArray<ImportDeclaration>): ReadonlyArray<ReadonlyArray<ImportDeclaration>> {
        Debug.assert(length(sortedImports) > 0);

        const groups: ImportDeclaration[][] = [];

        let groupName: string | undefined = getExternalModuleName(sortedImports[0].moduleSpecifier);
        Debug.assert(groupName !== undefined);
        let group: ImportDeclaration[] = [];

        for (const importDeclaration of sortedImports) {
            const moduleName = getExternalModuleName(importDeclaration.moduleSpecifier);
            Debug.assert(moduleName !== undefined);
            if (moduleName === groupName) {
                group.push(importDeclaration);
            }
            else if (group.length) {
                groups.push(group);

                groupName = moduleName;
                group = [importDeclaration];
            }
        }

        if (group.length) {
            groups.push(group);
        }

        return groups;
    }

    /* @internal */ // Internal for testing
    /**
     * @param sortedImports a list of ImportDeclarations, sorted by module name.
     */
    export function coalesceImports(sortedImports: ReadonlyArray<ImportDeclaration>) {
        if (sortedImports.length === 0) {
            return sortedImports;
        }

        const coalescedImports: ImportDeclaration[] = [];

        const groupedImports = groupSortedImports(sortedImports);
        for (const importGroup of groupedImports) {

            const { importWithoutClause, defaultImports, namespaceImports, namedImports } = getImportParts(importGroup);

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

                continue;
            }

            const sortedNamespaceImports = stableSort(namespaceImports, (n1, n2) => compareIdentifiers(n1.name, n2.name));

            for (const namespaceImport of sortedNamespaceImports) {
                // Drop the name, if any
                coalescedImports.push(
                    updateImportDeclarationAndClause(namespaceImport.parent, /*name*/ undefined, namespaceImport));
            }

            if (defaultImports.length === 0 && namedImports.length === 0) {
                continue;
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
        }

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
}