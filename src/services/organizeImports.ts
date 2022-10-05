/* @internal */
namespace ts.OrganizeImports {

/**
 * Organize imports by:
 *   1) Removing unused imports
 *   2) Coalescing imports from the same module
 *   3) Sorting imports
 */
export function organizeImports(
    sourceFile: ts.SourceFile,
    formatContext: ts.formatting.FormatContext,
    host: ts.LanguageServiceHost,
    program: ts.Program,
    preferences: ts.UserPreferences,
    mode: ts.OrganizeImportsMode,
) {
    const changeTracker = ts.textChanges.ChangeTracker.fromContext({ host, formatContext, preferences });
    const shouldSort = mode === ts.OrganizeImportsMode.SortAndCombine || mode === ts.OrganizeImportsMode.All;
    const shouldCombine = shouldSort; // These are currently inseparable, but I draw a distinction for clarity and in case we add modes in the future.
    const shouldRemove = mode === ts.OrganizeImportsMode.RemoveUnused || mode === ts.OrganizeImportsMode.All;
    const maybeRemove = shouldRemove ? removeUnusedImports : ts.identity;
    const maybeCoalesce = shouldCombine ? coalesceImports : ts.identity;
    const processImportsOfSameModuleSpecifier = (importGroup: readonly ts.ImportDeclaration[]) => {
        const processedDeclarations = maybeCoalesce(maybeRemove(importGroup, sourceFile, program));
        return shouldSort
            ? ts.stableSort(processedDeclarations, (s1, s2) => compareImportsOrRequireStatements(s1, s2))
            : processedDeclarations;
    };

    // All of the old ImportDeclarations in the file, in syntactic order.
    const topLevelImportGroupDecls = groupImportsByNewlineContiguous(sourceFile, sourceFile.statements.filter(ts.isImportDeclaration));
    topLevelImportGroupDecls.forEach(importGroupDecl => organizeImportsWorker(importGroupDecl, processImportsOfSameModuleSpecifier));

    // Exports are always used
    if (mode !== ts.OrganizeImportsMode.RemoveUnused) {
        // All of the old ExportDeclarations in the file, in syntactic order.
        const topLevelExportDecls = sourceFile.statements.filter(ts.isExportDeclaration);
        organizeImportsWorker(topLevelExportDecls, coalesceExports);
    }

    for (const ambientModule of sourceFile.statements.filter(ts.isAmbientModule)) {
        if (!ambientModule.body) continue;

        const ambientModuleImportGroupDecls = groupImportsByNewlineContiguous(sourceFile, ambientModule.body.statements.filter(ts.isImportDeclaration));
        ambientModuleImportGroupDecls.forEach(importGroupDecl => organizeImportsWorker(importGroupDecl, processImportsOfSameModuleSpecifier));

        // Exports are always used
        if (mode !== ts.OrganizeImportsMode.RemoveUnused) {
            const ambientModuleExportDecls = ambientModule.body.statements.filter(ts.isExportDeclaration);
            organizeImportsWorker(ambientModuleExportDecls, coalesceExports);
        }
    }

    return changeTracker.getChanges();

    function organizeImportsWorker<T extends ts.ImportDeclaration | ts.ExportDeclaration>(
        oldImportDecls: readonly T[],
        coalesce: (group: readonly T[]) => readonly T[],
    ) {
        if (ts.length(oldImportDecls) === 0) {
            return;
        }

        // Special case: normally, we'd expect leading and trailing trivia to follow each import
        // around as it's sorted.  However, we do not want this to happen for leading trivia
        // on the first import because it is probably the header comment for the file.
        // Consider: we could do a more careful check that this trivia is actually a header,
        // but the consequences of being wrong are very minor.
        ts.suppressLeadingTrivia(oldImportDecls[0]);

        const oldImportGroups = shouldCombine
            ? ts.group(oldImportDecls, importDecl => getExternalModuleName(importDecl.moduleSpecifier!)!)
            : [oldImportDecls];
        const sortedImportGroups = shouldSort
            ? ts.stableSort(oldImportGroups, (group1, group2) => compareModuleSpecifiers(group1[0].moduleSpecifier, group2[0].moduleSpecifier))
            : oldImportGroups;
        const newImportDecls = ts.flatMap(sortedImportGroups, importGroup =>
            getExternalModuleName(importGroup[0].moduleSpecifier!)
                ? coalesce(importGroup)
                : importGroup);

        // Delete all nodes if there are no imports.
        if (newImportDecls.length === 0) {
            // Consider the first node to have trailingTrivia as we want to exclude the
            // "header" comment.
            changeTracker.deleteNodes(sourceFile, oldImportDecls, {
                trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Include,
            }, /*hasTrailingComment*/ true);
        }
        else {
            // Note: Delete the surrounding trivia because it will have been retained in newImportDecls.
            const replaceOptions = {
                leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, // Leave header comment in place
                trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Include,
                suffix: ts.getNewLineOrDefaultFromHost(host, formatContext.options),
            };
            changeTracker.replaceNodeWithNodes(sourceFile, oldImportDecls[0], newImportDecls, replaceOptions);
            const hasTrailingComment = changeTracker.nodeHasTrailingComment(sourceFile, oldImportDecls[0], replaceOptions);
            changeTracker.deleteNodes(sourceFile, oldImportDecls.slice(1), {
                trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Include,
            }, hasTrailingComment);
        }
    }
}

function groupImportsByNewlineContiguous(sourceFile: ts.SourceFile, importDecls: ts.ImportDeclaration[]): ts.ImportDeclaration[][] {
    const scanner = ts.createScanner(sourceFile.languageVersion, /*skipTrivia*/ false, sourceFile.languageVariant);
    const groupImports: ts.ImportDeclaration[][] = [];
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
function isNewGroup(sourceFile: ts.SourceFile, topLevelImportDecl: ts.ImportDeclaration, scanner: ts.Scanner) {
    const startPos = topLevelImportDecl.getFullStart();
    const endPos = topLevelImportDecl.getStart();
    scanner.setText(sourceFile.text, startPos, endPos - startPos);

    let numberOfNewLines = 0;
    while (scanner.getTokenPos() < endPos) {
        const tokenKind = scanner.scan();

        if (tokenKind === ts.SyntaxKind.NewLineTrivia) {
            numberOfNewLines++;

            if (numberOfNewLines >= 2) {
                return true;
            }
        }
    }

    return false;
}

function removeUnusedImports(oldImports: readonly ts.ImportDeclaration[], sourceFile: ts.SourceFile, program: ts.Program) {
    const typeChecker = program.getTypeChecker();
    const compilerOptions = program.getCompilerOptions();
    const jsxNamespace = typeChecker.getJsxNamespace(sourceFile);
    const jsxFragmentFactory = typeChecker.getJsxFragmentFactory(sourceFile);
    const jsxElementsPresent = !!(sourceFile.transformFlags & ts.TransformFlags.ContainsJsx);

    const usedImports: ts.ImportDeclaration[] = [];

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
            if (ts.isNamespaceImport(namedBindings)) {
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
                        ? ts.factory.updateNamedImports(namedBindings, newElements)
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
                usedImports.push(ts.factory.createImportDeclaration(
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

    function isDeclarationUsed(identifier: ts.Identifier) {
        // The JSX factory symbol is always used if JSX elements are present - even if they are not allowed.
        return jsxElementsPresent && (identifier.text === jsxNamespace || jsxFragmentFactory && identifier.text === jsxFragmentFactory) && ts.jsxModeNeedsExplicitImport(compilerOptions.jsx) ||
            ts.FindAllReferences.Core.isSymbolReferencedInFile(identifier, typeChecker, sourceFile);
    }
}

function hasModuleDeclarationMatchingSpecifier(sourceFile: ts.SourceFile, moduleSpecifier: ts.Expression) {
    const moduleSpecifierText = ts.isStringLiteral(moduleSpecifier) && moduleSpecifier.text;
    return ts.isString(moduleSpecifierText) && ts.some(sourceFile.moduleAugmentations, moduleName =>
        ts.isStringLiteral(moduleName)
        && moduleName.text === moduleSpecifierText);
}

function getExternalModuleName(specifier: ts.Expression) {
    return specifier !== undefined && ts.isStringLiteralLike(specifier)
        ? specifier.text
        : undefined;
}

// Internal for testing
/**
 * @param importGroup a list of ImportDeclarations, all with the same module name.
 */
export function coalesceImports(importGroup: readonly ts.ImportDeclaration[]) {
    if (importGroup.length === 0) {
        return importGroup;
    }

    const { importWithoutClause, typeOnlyImports, regularImports } = getCategorizedImports(importGroup);

    const coalescedImports: ts.ImportDeclaration[] = [];

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

        const sortedNamespaceImports = ts.stableSort(namespaceImports, (i1, i2) =>
            compareIdentifiers((i1.importClause!.namedBindings as ts.NamespaceImport).name, (i2.importClause!.namedBindings as ts.NamespaceImport).name)); // TODO: GH#18217

        for (const namespaceImport of sortedNamespaceImports) {
            // Drop the name, if any
            coalescedImports.push(
                updateImportDeclarationAndClause(namespaceImport, /*name*/ undefined, namespaceImport.importClause!.namedBindings)); // TODO: GH#18217
        }

        if (defaultImports.length === 0 && namedImports.length === 0) {
            continue;
        }

        let newDefaultImport: ts.Identifier | undefined;
        const newImportSpecifiers: ts.ImportSpecifier[] = [];
        if (defaultImports.length === 1) {
            newDefaultImport = defaultImports[0].importClause!.name;
        }
        else {
            for (const defaultImport of defaultImports) {
                newImportSpecifiers.push(
                    ts.factory.createImportSpecifier(/*isTypeOnly*/ false, ts.factory.createIdentifier("default"), defaultImport.importClause!.name!)); // TODO: GH#18217
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
                : ts.factory.createNamedImports(ts.emptyArray)
            : namedImports.length === 0
                ? ts.factory.createNamedImports(sortedImportSpecifiers)
                : ts.factory.updateNamedImports(namedImports[0].importClause!.namedBindings as ts.NamedImports, sortedImportSpecifiers); // TODO: GH#18217

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
    defaultImports: ts.ImportDeclaration[];
    namespaceImports: ts.ImportDeclaration[];
    namedImports: ts.ImportDeclaration[];
}

/*
 * Returns entire import declarations because they may already have been rewritten and
 * may lack parent pointers.  The desired parts can easily be recovered based on the
 * categorization.
 *
 * NB: There may be overlap between `defaultImports` and `namespaceImports`/`namedImports`.
 */
function getCategorizedImports(importGroup: readonly ts.ImportDeclaration[]) {
    let importWithoutClause: ts.ImportDeclaration | undefined;
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
            if (ts.isNamespaceImport(namedBindings)) {
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
export function coalesceExports(exportGroup: readonly ts.ExportDeclaration[]) {
    if (exportGroup.length === 0) {
        return exportGroup;
    }

    const { exportWithoutClause, namedExports, typeOnlyExports } = getCategorizedExports(exportGroup);

    const coalescedExports: ts.ExportDeclaration[] = [];

    if (exportWithoutClause) {
        coalescedExports.push(exportWithoutClause);
    }

    for (const exportGroup of [namedExports, typeOnlyExports]) {
        if (exportGroup.length === 0) {
            continue;
        }
        const newExportSpecifiers: ts.ExportSpecifier[] = [];
        newExportSpecifiers.push(...ts.flatMap(exportGroup, i => i.exportClause && ts.isNamedExports(i.exportClause) ? i.exportClause.elements : ts.emptyArray));

        const sortedExportSpecifiers = sortSpecifiers(newExportSpecifiers);

        const exportDecl = exportGroup[0];
        coalescedExports.push(
            ts.factory.updateExportDeclaration(
                exportDecl,
                exportDecl.modifiers,
                exportDecl.isTypeOnly,
                exportDecl.exportClause && (
                    ts.isNamedExports(exportDecl.exportClause) ?
                        ts.factory.updateNamedExports(exportDecl.exportClause, sortedExportSpecifiers) :
                        ts.factory.updateNamespaceExport(exportDecl.exportClause, exportDecl.exportClause.name)
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
    function getCategorizedExports(exportGroup: readonly ts.ExportDeclaration[]) {
        let exportWithoutClause: ts.ExportDeclaration | undefined;
        const namedExports: ts.ExportDeclaration[] = [];
        const typeOnlyExports: ts.ExportDeclaration[] = [];

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
    importDeclaration: ts.ImportDeclaration,
    name: ts.Identifier | undefined,
    namedBindings: ts.NamedImportBindings | undefined) {

    return ts.factory.updateImportDeclaration(
        importDeclaration,
        importDeclaration.modifiers,
        ts.factory.updateImportClause(importDeclaration.importClause!, importDeclaration.importClause!.isTypeOnly, name, namedBindings), // TODO: GH#18217
        importDeclaration.moduleSpecifier,
        importDeclaration.assertClause);
}

function sortSpecifiers<T extends ts.ImportOrExportSpecifier>(specifiers: readonly T[]) {
    return ts.stableSort(specifiers, compareImportOrExportSpecifiers);
}

export function compareImportOrExportSpecifiers<T extends ts.ImportOrExportSpecifier>(s1: T, s2: T) {
    return ts.compareBooleans(s1.isTypeOnly, s2.isTypeOnly)
        || compareIdentifiers(s1.propertyName || s1.name, s2.propertyName || s2.name)
        || compareIdentifiers(s1.name, s2.name);
}

/* internal */ // Exported for testing
export function compareModuleSpecifiers(m1: ts.Expression | undefined, m2: ts.Expression | undefined) {
    const name1 = m1 === undefined ? undefined : getExternalModuleName(m1);
    const name2 = m2 === undefined ? undefined : getExternalModuleName(m2);
    return ts.compareBooleans(name1 === undefined, name2 === undefined) ||
        ts.compareBooleans(ts.isExternalModuleNameRelative(name1!), ts.isExternalModuleNameRelative(name2!)) ||
        ts.compareStringsCaseInsensitive(name1!, name2!);
}

function compareIdentifiers(s1: ts.Identifier, s2: ts.Identifier) {
    return ts.compareStringsCaseInsensitive(s1.text, s2.text);
}

function getModuleSpecifierExpression(declaration: ts.AnyImportOrRequireStatement): ts.Expression | undefined {
    switch (declaration.kind) {
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return ts.tryCast(declaration.moduleReference, ts.isExternalModuleReference)?.expression;
        case ts.SyntaxKind.ImportDeclaration:
            return declaration.moduleSpecifier;
        case ts.SyntaxKind.VariableStatement:
            return declaration.declarationList.declarations[0].initializer.arguments[0];
    }
}

export function importsAreSorted(imports: readonly ts.AnyImportOrRequireStatement[]): imports is ts.SortedReadonlyArray<ts.AnyImportOrRequireStatement> {
    return ts.arrayIsSorted(imports, compareImportsOrRequireStatements);
}

export function importSpecifiersAreSorted(imports: readonly ts.ImportSpecifier[]): imports is ts.SortedReadonlyArray<ts.ImportSpecifier> {
    return ts.arrayIsSorted(imports, compareImportOrExportSpecifiers);
}

export function getImportDeclarationInsertionIndex(sortedImports: ts.SortedReadonlyArray<ts.AnyImportOrRequireStatement>, newImport: ts.AnyImportOrRequireStatement) {
    const index = ts.binarySearch(sortedImports, newImport, ts.identity, compareImportsOrRequireStatements);
    return index < 0 ? ~index : index;
}

export function getImportSpecifierInsertionIndex(sortedImports: ts.SortedReadonlyArray<ts.ImportSpecifier>, newImport: ts.ImportSpecifier) {
    const index = ts.binarySearch(sortedImports, newImport, ts.identity, compareImportOrExportSpecifiers);
    return index < 0 ? ~index : index;
}

export function compareImportsOrRequireStatements(s1: ts.AnyImportOrRequireStatement, s2: ts.AnyImportOrRequireStatement) {
    return compareModuleSpecifiers(getModuleSpecifierExpression(s1), getModuleSpecifierExpression(s2)) || compareImportKind(s1, s2);
}

function compareImportKind(s1: ts.AnyImportOrRequireStatement, s2: ts.AnyImportOrRequireStatement) {
    return ts.compareValues(getImportKindOrder(s1), getImportKindOrder(s2));
}

// 1. Side-effect imports
// 2. Type-only imports
// 3. Namespace imports
// 4. Default imports
// 5. Named imports
// 6. ImportEqualsDeclarations
// 7. Require variable statements
function getImportKindOrder(s1: ts.AnyImportOrRequireStatement) {
    switch (s1.kind) {
        case ts.SyntaxKind.ImportDeclaration:
            if (!s1.importClause) return 0;
            if (s1.importClause.isTypeOnly) return 1;
            if (s1.importClause.namedBindings?.kind === ts.SyntaxKind.NamespaceImport) return 2;
            if (s1.importClause.name) return 3;
            return 4;
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return 5;
        case ts.SyntaxKind.VariableStatement:
            return 6;
    }
}

function getNewImportSpecifiers(namedImports: ts.ImportDeclaration[]) {
    return ts.flatMap(namedImports, namedImport =>
        ts.map(tryGetNamedBindingElements(namedImport), importSpecifier =>
            importSpecifier.name && importSpecifier.propertyName && importSpecifier.name.escapedText === importSpecifier.propertyName.escapedText
                ? ts.factory.updateImportSpecifier(importSpecifier, importSpecifier.isTypeOnly, /*propertyName*/ undefined, importSpecifier.name)
                : importSpecifier
        )
    );
}

function tryGetNamedBindingElements(namedImport: ts.ImportDeclaration) {
    return namedImport.importClause?.namedBindings && ts.isNamedImports(namedImport.importClause.namedBindings)
        ? namedImport.importClause.namedBindings.elements
        : undefined;
}
}
