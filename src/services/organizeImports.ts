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
        skipDestructiveCodeActions?: boolean
    ) {
        const changeTracker = textChanges.ChangeTracker.fromContext({ host, formatContext, preferences });

        const coalesceAndOrganizeImports = (importGroup: readonly ImportDeclaration[]) => stableSort(
            coalesceImports(removeUnusedImports(importGroup, sourceFile, program, skipDestructiveCodeActions)),
            (s1, s2) => compareImportsOrRequireStatements(s1, s2));

        // All of the old ImportDeclarations in the file, in syntactic order.
        const topLevelImportGroupDecls = groupImportsByNewlineContiguous(sourceFile, sourceFile.statements.filter(isImportDeclaration));
        topLevelImportGroupDecls.forEach(importGroupDecl => organizeImportsWorker(importGroupDecl, coalesceAndOrganizeImports));

        // All of the old ExportDeclarations in the file, in syntactic order.
        const topLevelExportDecls = sourceFile.statements.filter(isExportDeclaration);
        organizeImportsWorker(topLevelExportDecls, coalesceExports);

        for (const ambientModule of sourceFile.statements.filter(isAmbientModule)) {
            if (!ambientModule.body) continue;

            const ambientModuleImportGroupDecls = groupImportsByNewlineContiguous(sourceFile, ambientModule.body.statements.filter(isImportDeclaration));
            ambientModuleImportGroupDecls.forEach(importGroupDecl => organizeImportsWorker(importGroupDecl, coalesceAndOrganizeImports));

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
            const sortedImportGroups = stableSort(oldImportGroups, (group1, group2) => compareModuleSpecifiers(group1[0].moduleSpecifier, group2[0].moduleSpecifier));
            const newImportDecls = flatMap(sortedImportGroups, importGroup =>
                getExternalModuleName(importGroup[0].moduleSpecifier!)
                    ? coalesce(importGroup)
                    : importGroup);

            // Delete all nodes if there are no imports.
            if (newImportDecls.length === 0) {
                // Consider the first node to have trailingTrivia as we want to exclude the
                // "header" comment.
                changeTracker.deleteNodes(sourceFile, oldImportDecls, {
                    trailingTriviaOption: textChanges.TrailingTriviaOption.Include,
                }, /*hasTrailingComment*/ true);
            }
            else {
                // Note: Delete the surrounding trivia because it will have been retained in newImportDecls.
                const replaceOptions = {
                    leadingTriviaOption: textChanges.LeadingTriviaOption.Exclude, // Leave header comment in place
                    trailingTriviaOption: textChanges.TrailingTriviaOption.Include,
                    suffix: getNewLineOrDefaultFromHost(host, formatContext.options),
                };
                changeTracker.replaceNodeWithNodes(sourceFile, oldImportDecls[0], newImportDecls, replaceOptions);
                const hasTrailingComment = changeTracker.nodeHasTrailingComment(sourceFile, oldImportDecls[0], replaceOptions);
                changeTracker.deleteNodes(sourceFile, oldImportDecls.slice(1), {
                    trailingTriviaOption: textChanges.TrailingTriviaOption.Include,
                }, hasTrailingComment);
            }
        }
    }

    function groupImportsByNewlineContiguous(sourceFile: SourceFile, importDecls: ImportDeclaration[]): ImportDeclaration[][] {
        const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ false, sourceFile.languageVariant);
        const groupImports: ImportDeclaration[][] = [];
        let groupIndex = 0;
        for (const topLevelImportDecl of importDecls) {
            if (isNewGroup(sourceFile, topLevelImportDecl, scanner)) {
                groupIndex++;
            }

            if (!groupImports[groupIndex]) {
                groupImports[groupIndex] = [];
            }

            groupImports[groupIndex].push(topLevelImportDecl);
        }

        return groupImports;
    }

    // a new group is created if an import includes at least two new line
    // new line from multi-line comment doesn't count
    function isNewGroup(sourceFile: SourceFile, topLevelImportDecl: ImportDeclaration, scanner: Scanner) {
        const startPos = topLevelImportDecl.getFullStart();
        const endPos = topLevelImportDecl.getStart();
        scanner.setText(sourceFile.text, startPos, endPos - startPos);

        let numberOfNewLines = 0;
        while (scanner.getTokenPos() < endPos) {
            const tokenKind = scanner.scan();

            if (tokenKind === SyntaxKind.NewLineTrivia) {
                numberOfNewLines++;

                if (numberOfNewLines >= 2) {
                    return true;
                }
            }
        }

        return false;
    }

    function removeUnusedImports(oldImports: readonly ImportDeclaration[], sourceFile: SourceFile, program: Program, skipDestructiveCodeActions: boolean | undefined) {
        // As a precaution, consider unused import detection to be destructive (GH #43051)
        if (skipDestructiveCodeActions) {
            return oldImports;
        }

        const typeChecker = program.getTypeChecker();
        const compilerOptions = program.getCompilerOptions();
        const jsxNamespace = typeChecker.getJsxNamespace(sourceFile);
        const jsxFragmentFactory = typeChecker.getJsxFragmentFactory(sourceFile);
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
                            ? factory.updateNamedImports(namedBindings, newElements)
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
                    usedImports.push(factory.createImportDeclaration(
                        importDecl.decorators,
                        importDecl.modifiers,
                        /*importClause*/ undefined,
                        moduleSpecifier,
                        /*assertClause*/ undefined));
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
            return jsxElementsPresent && (identifier.text === jsxNamespace || jsxFragmentFactory && identifier.text === jsxFragmentFactory) && jsxModeNeedsExplicitImport(compilerOptions.jsx) ||
                FindAllReferences.Core.isSymbolReferencedInFile(identifier, typeChecker, sourceFile);
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
                        factory.createImportSpecifier(/*isTypeOnly*/ false, factory.createIdentifier("default"), defaultImport.importClause!.name!)); // TODO: GH#18217
                }
            }

            newImportSpecifiers.push(...getNewImportSpecifiers(namedImports));

            const sortedImportSpecifiers = sortSpecifiers(newImportSpecifiers);
            const importDecl = defaultImports.length > 0
                ? defaultImports[0]
                : namedImports[0];

            const newNamedImports = sortedImportSpecifiers.length === 0
                ? newDefaultImport
                    ? undefined
                    : factory.createNamedImports(emptyArray)
                : namedImports.length === 0
                    ? factory.createNamedImports(sortedImportSpecifiers)
                    : factory.updateNamedImports(namedImports[0].importClause!.namedBindings as NamedImports, sortedImportSpecifiers); // TODO: GH#18217

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
                factory.updateExportDeclaration(
                    exportDecl,
                    exportDecl.decorators,
                    exportDecl.modifiers,
                    exportDecl.isTypeOnly,
                    exportDecl.exportClause && (
                        isNamedExports(exportDecl.exportClause) ?
                            factory.updateNamedExports(exportDecl.exportClause, sortedExportSpecifiers) :
                            factory.updateNamespaceExport(exportDecl.exportClause, exportDecl.exportClause.name)
                    ),
                    exportDecl.moduleSpecifier,
                    exportDecl.assertClause));
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

        return factory.updateImportDeclaration(
            importDeclaration,
            importDeclaration.decorators,
            importDeclaration.modifiers,
            factory.updateImportClause(importDeclaration.importClause!, importDeclaration.importClause!.isTypeOnly, name, namedBindings), // TODO: GH#18217
            importDeclaration.moduleSpecifier,
            importDeclaration.assertClause);
    }

    function sortSpecifiers<T extends ImportOrExportSpecifier>(specifiers: readonly T[]) {
        return stableSort(specifiers, compareImportOrExportSpecifiers);
    }

    export function compareImportOrExportSpecifiers<T extends ImportOrExportSpecifier>(s1: T, s2: T) {
        return compareBooleans(s1.isTypeOnly, s2.isTypeOnly)
            || compareIdentifiers(s1.propertyName || s1.name, s2.propertyName || s2.name)
            || compareIdentifiers(s1.name, s2.name);
    }

    /* internal */ // Exported for testing
    export function compareModuleSpecifiers(m1: Expression | undefined, m2: Expression | undefined) {
        const name1 = m1 === undefined ? undefined : getExternalModuleName(m1);
        const name2 = m2 === undefined ? undefined : getExternalModuleName(m2);
        return compareBooleans(name1 === undefined, name2 === undefined) ||
            compareBooleans(isExternalModuleNameRelative(name1!), isExternalModuleNameRelative(name2!)) ||
            compareStringsCaseInsensitive(name1!, name2!);
    }

    function compareIdentifiers(s1: Identifier, s2: Identifier) {
        return compareStringsCaseInsensitive(s1.text, s2.text);
    }

    function getModuleSpecifierExpression(declaration: AnyImportOrRequireStatement): Expression | undefined {
        switch (declaration.kind) {
            case SyntaxKind.ImportEqualsDeclaration:
                return tryCast(declaration.moduleReference, isExternalModuleReference)?.expression;
            case SyntaxKind.ImportDeclaration:
                return declaration.moduleSpecifier;
            case SyntaxKind.VariableStatement:
                return declaration.declarationList.declarations[0].initializer.arguments[0];
        }
    }

    export function importsAreSorted(imports: readonly AnyImportOrRequireStatement[]): imports is SortedReadonlyArray<AnyImportOrRequireStatement> {
        return arrayIsSorted(imports, compareImportsOrRequireStatements);
    }

    export function importSpecifiersAreSorted(imports: readonly ImportSpecifier[]): imports is SortedReadonlyArray<ImportSpecifier> {
        return arrayIsSorted(imports, compareImportOrExportSpecifiers);
    }

    export function getImportDeclarationInsertionIndex(sortedImports: SortedReadonlyArray<AnyImportOrRequireStatement>, newImport: AnyImportOrRequireStatement) {
        const index = binarySearch(sortedImports, newImport, identity, compareImportsOrRequireStatements);
        return index < 0 ? ~index : index;
    }

    export function getImportSpecifierInsertionIndex(sortedImports: SortedReadonlyArray<ImportSpecifier>, newImport: ImportSpecifier) {
        const index = binarySearch(sortedImports, newImport, identity, compareImportOrExportSpecifiers);
        return index < 0 ? ~index : index;
    }

    export function compareImportsOrRequireStatements(s1: AnyImportOrRequireStatement, s2: AnyImportOrRequireStatement) {
        return compareModuleSpecifiers(getModuleSpecifierExpression(s1), getModuleSpecifierExpression(s2)) || compareImportKind(s1, s2);
    }

    function compareImportKind(s1: AnyImportOrRequireStatement, s2: AnyImportOrRequireStatement) {
        return compareValues(getImportKindOrder(s1), getImportKindOrder(s2));
    }

    // 1. Side-effect imports
    // 2. Type-only imports
    // 3. Namespace imports
    // 4. Default imports
    // 5. Named imports
    // 6. ImportEqualsDeclarations
    // 7. Require variable statements
    function getImportKindOrder(s1: AnyImportOrRequireStatement) {
        switch (s1.kind) {
            case SyntaxKind.ImportDeclaration:
                if (!s1.importClause) return 0;
                if (s1.importClause.isTypeOnly) return 1;
                if (s1.importClause.namedBindings?.kind === SyntaxKind.NamespaceImport) return 2;
                if (s1.importClause.name) return 3;
                return 4;
            case SyntaxKind.ImportEqualsDeclaration:
                return 5;
            case SyntaxKind.VariableStatement:
                return 6;
        }
    }

    function getNewImportSpecifiers(namedImports: ImportDeclaration[]) {
        return flatMap(namedImports, namedImport =>
            map(tryGetNamedBindingElements(namedImport), importSpecifier =>
                importSpecifier.name && importSpecifier.propertyName && importSpecifier.name.escapedText === importSpecifier.propertyName.escapedText
                    ? factory.updateImportSpecifier(importSpecifier, importSpecifier.isTypeOnly, /*propertyName*/ undefined, importSpecifier.name)
                    : importSpecifier
            )
        );
    }

    function tryGetNamedBindingElements(namedImport: ImportDeclaration) {
        return namedImport.importClause?.namedBindings && isNamedImports(namedImport.importClause.namedBindings)
            ? namedImport.importClause.namedBindings.elements
            : undefined;
    }
}
