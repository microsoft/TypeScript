/* @internal */
namespace ts.OrganizeImports {
    export function organizeImports(
        sourceFile: SourceFile,
        formatContext: formatting.FormatContext,
        host: LanguageServiceHost,
        cancellationToken: CancellationToken) {

        // All of the (old) ImportDeclarations in the file, in syntactic order.
        const oldImportDecls: ImportDeclaration[] = [];

        forEachChild(sourceFile, node => {
            cancellationToken.throwIfCancellationRequested();
            if (isImportDeclaration(node)) {
                oldImportDecls.push(node);
            }
            // TODO (https://github.com/Microsoft/TypeScript/issues/10020): sort *within* ambient modules (find using isAmbientModule)
        });

        if (oldImportDecls.length === 0) {
            return [];
        }

        const usedImportDecls = removeUnusedImports(oldImportDecls);
        cancellationToken.throwIfCancellationRequested();
        const sortedImportDecls = sortImports(usedImportDecls);
        cancellationToken.throwIfCancellationRequested();
        const coalescedImportDecls = coalesceImports(sortedImportDecls);
        cancellationToken.throwIfCancellationRequested();

        // All of the (new) ImportDeclarations in the file, in sorted order.
        const newImportDecls = coalescedImportDecls;

        const changeTracker = textChanges.ChangeTracker.fromContext({ host, formatContext });

        // NB: Stopping before i === 0
        for (let i = oldImportDecls.length - 1; i > 0; i--) {
            changeTracker.deleteNode(sourceFile, oldImportDecls[i]);
        }

        if (newImportDecls.length === 0) {
            changeTracker.deleteNode(sourceFile, oldImportDecls[0]);
        }
        else {
            // Delete the surrounding trivia because it will have been retained in newImportDecls.
            const replaceOptions = {
                useNonAdjustedStartPosition: false,
                useNonAdjustedEndPosition: false,
                suffix: getNewLineOrDefaultFromHost(host, formatContext.options),
             };
            changeTracker.replaceNodeWithNodes(sourceFile, oldImportDecls[0], newImportDecls, replaceOptions);
        }

        const changes = changeTracker.getChanges();
        return changes;
    }

    function removeUnusedImports(oldImports: ReadonlyArray<ImportDeclaration>) {
        return oldImports; // TODO (https://github.com/Microsoft/TypeScript/issues/10020)
    }

    /* @internal */ // Internal for testing
    export function sortImports(oldImports: ReadonlyArray<ImportDeclaration>) {
        if (oldImports.length < 2) {
            return oldImports;
        }

        // NB: declaration order determines sort order
        const enum ModuleNameKind {
            NonRelative,
            Relative,
            Invalid,
        }

        const importRecords = oldImports.map(createImportRecord);

        const sortedRecords = stableSort(importRecords, (import1, import2) => {
            const { name: name1, kind: kind1 } = import1;
            const { name: name2, kind: kind2 } = import2;

            if (kind1 !== kind2) {
                return kind1 < kind2
                    ? Comparison.LessThan
                    : Comparison.GreaterThan;
            }

            // Note that we're using simple equality, retaining case-sensitivity.
            if (name1 !== name2) {
                return name1 < name2
                    ? Comparison.LessThan
                    : Comparison.GreaterThan;
            }

            return Comparison.EqualTo;
        });

        return sortedRecords.map(r => r.importDeclaration);

        function createImportRecord(importDeclaration: ImportDeclaration) {
            const specifier = importDeclaration.moduleSpecifier;
            const name = getExternalModuleName(specifier);
            if (name) {
                const isRelative = isExternalModuleNameRelative(name);
                return { importDeclaration, name, kind: isRelative ? ModuleNameKind.Relative : ModuleNameKind.NonRelative };
            }

            return { importDeclaration, name: specifier.getText(), kind: ModuleNameKind.Invalid };
        }
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
        let group: ImportDeclaration[] = [];

        for (const importDeclaration of sortedImports) {
            const moduleName = getExternalModuleName(importDeclaration.moduleSpecifier);
            if (moduleName && moduleName === groupName) {
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

            let seenImportWithoutClause = false;

            const defaultImports: Identifier[] = [];
            const namespaceImports: NamespaceImport[] = [];
            const namedImports: NamedImports[] = [];

            for (const importDeclaration of importGroup) {
                if (importDeclaration.importClause === undefined) {
                    // Only the first such import is interesting - the others are redundant.
                    // Note: Unfortunately, we will lose trivia that was on this node.
                    if (!seenImportWithoutClause) {
                        coalescedImports.push(importDeclaration);
                    }

                    seenImportWithoutClause = true;
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

            // Normally, we don't combine default and namespace imports, but it would be silly to
            // produce two import declarations in this special case.
            if (defaultImports.length === 1 && namespaceImports.length === 1 && namedImports.length === 0) {
                // Add the namespace import to the existing default ImportDeclaration.
                const defaultImportClause = defaultImports[0].parent as ImportClause;
                coalescedImports.push(
                    updateImportDeclarationAndClause(defaultImportClause, defaultImportClause.name, namespaceImports[0]));

                continue;
            }

            // For convenience, we cheat and do a little sorting during coalescing.
            // Seems reasonable since we're restructuring so much anyway.
            const sortedNamespaceImports = stableSort(namespaceImports, (n1, n2) => compareIdentifiers(n1.name, n2.name));

            for (const namespaceImport of sortedNamespaceImports) {
                // Drop the name, if any
                coalescedImports.push(
                    updateImportDeclarationAndClause(namespaceImport.parent, /*name*/ undefined, namespaceImport));
            }

            if (defaultImports.length === 0 && namedImports.length === 0) {
                continue;
            }

            let newDefaultImport: Identifier = undefined;
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

            for (const namedImport of namedImports) {
                for (const specifier of namedImport.elements) {
                    newImportSpecifiers.push(specifier);
                }
            }

            const sortedImportSpecifiers = stableSort(newImportSpecifiers, (s1, s2) => {
                const nameComparison = compareIdentifiers(s1.propertyName || s1.name, s2.propertyName || s2.name);
                return nameComparison !== Comparison.EqualTo
                    ? nameComparison
                    : compareIdentifiers(s1.name, s2.name);
            });

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

        // `undefined` is the min value.
        function compareIdentifiers(s1: Identifier | undefined, s2: Identifier | undefined) {
            return s1 === undefined
                ? s2 === undefined
                    ? Comparison.EqualTo
                    : Comparison.LessThan
                : s2 === undefined
                    ? Comparison.GreaterThan
                    : s1.text < s2.text
                        ? Comparison.LessThan
                        : s1.text > s2.text
                            ? Comparison.GreaterThan
                            : Comparison.EqualTo;
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