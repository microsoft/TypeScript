import {
    AnyImportOrRequireStatement,
    arrayIsSorted,
    binarySearch,
    compareBooleans,
    Comparer,
    compareStringsCaseInsensitiveEslintCompatible,
    compareStringsCaseSensitive,
    compareValues,
    Comparison,
    createScanner,
    detectSortCaseSensitivity,
    EmitFlags,
    emptyArray,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    factory,
    FileTextChanges,
    find,
    FindAllReferences,
    firstOrUndefined,
    flatMap,
    formatting,
    getNewLineOrDefaultFromHost,
    getUILocale,
    group,
    Identifier,
    identity,
    ImportClause,
    ImportDeclaration,
    ImportOrExportSpecifier,
    ImportSpecifier,
    isAmbientModule,
    isExportDeclaration,
    isExternalModuleNameRelative,
    isExternalModuleReference,
    isImportDeclaration,
    isNamedExports,
    isNamedImports,
    isNamespaceImport,
    isString,
    isStringLiteral,
    isStringLiteralLike,
    jsxModeNeedsExplicitImport,
    LanguageServiceHost,
    length,
    map,
    MemoizeCache,
    memoizeCached,
    NamedImportBindings,
    NamedImports,
    NamespaceImport,
    OrganizeImportsMode,
    Program,
    rangeIsOnSingleLine,
    Scanner,
    setEmitFlags,
    some,
    SortKind,
    SourceFile,
    stableSort,
    SyntaxKind,
    textChanges,
    TransformFlags,
    tryCast,
    UserPreferences,
} from "./_namespaces/ts";

/**
 * Organize imports by:
 *   1) Removing unused imports
 *   2) Coalescing imports from the same module
 *   3) Sorting imports
 *
 * @internal
 */
export function organizeImports(
    sourceFile: SourceFile,
    formatContext: formatting.FormatContext,
    host: LanguageServiceHost,
    program: Program,
    preferences: UserPreferences,
    mode: OrganizeImportsMode,
): FileTextChanges[] {
    const changeTracker = textChanges.ChangeTracker.fromContext({ host, formatContext, preferences });
    const shouldSort = mode === OrganizeImportsMode.SortAndCombine || mode === OrganizeImportsMode.All;
    const shouldCombine = shouldSort; // These are currently inseparable, but I draw a distinction for clarity and in case we add modes in the future.
    const shouldRemove = mode === OrganizeImportsMode.RemoveUnused || mode === OrganizeImportsMode.All;
    // All of the old ImportDeclarations in the file, in syntactic order.
    const topLevelImportGroupDecls = groupByNewlineContiguous(sourceFile, sourceFile.statements.filter(isImportDeclaration));

    const comparer = getOrganizeImportsComparerWithDetection(preferences, shouldSort ? () => detectSortingWorker(topLevelImportGroupDecls, preferences) === SortKind.CaseInsensitive : undefined);

    const processImportsOfSameModuleSpecifier = (importGroup: readonly ImportDeclaration[]) => {
        if (shouldRemove) importGroup = removeUnusedImports(importGroup, sourceFile, program);
        if (shouldCombine) importGroup = coalesceImportsWorker(importGroup, comparer, sourceFile);
        if (shouldSort) importGroup = stableSort(importGroup, (s1, s2) => compareImportsOrRequireStatements(s1, s2, comparer));
        return importGroup;
    };

    topLevelImportGroupDecls.forEach(importGroupDecl => organizeImportsWorker(importGroupDecl, processImportsOfSameModuleSpecifier));

    // Exports are always used
    if (mode !== OrganizeImportsMode.RemoveUnused) {
        // All of the old ExportDeclarations in the file, in syntactic order.
        getTopLevelExportGroups(sourceFile).forEach(exportGroupDecl => organizeImportsWorker(exportGroupDecl, group => coalesceExportsWorker(group, comparer)));
    }

    for (const ambientModule of sourceFile.statements.filter(isAmbientModule)) {
        if (!ambientModule.body) continue;

        const ambientModuleImportGroupDecls = groupByNewlineContiguous(sourceFile, ambientModule.body.statements.filter(isImportDeclaration));
        ambientModuleImportGroupDecls.forEach(importGroupDecl => organizeImportsWorker(importGroupDecl, processImportsOfSameModuleSpecifier));

        // Exports are always used
        if (mode !== OrganizeImportsMode.RemoveUnused) {
            const ambientModuleExportDecls = ambientModule.body.statements.filter(isExportDeclaration);
            organizeImportsWorker(ambientModuleExportDecls, group => coalesceExportsWorker(group, comparer));
        }
    }

    return changeTracker.getChanges();

    function organizeImportsWorker<T extends ImportDeclaration | ExportDeclaration>(
        oldImportDecls: readonly T[],
        coalesce: (group: readonly T[]) => readonly T[],
    ) {
        if (length(oldImportDecls) === 0) {
            return;
        }

        // Special case: normally, we'd expect leading and trailing trivia to follow each import
        // around as it's sorted.  However, we do not want this to happen for leading trivia
        // on the first import because it is probably the header comment for the file.
        // Consider: we could do a more careful check that this trivia is actually a header,
        // but the consequences of being wrong are very minor.
        setEmitFlags(oldImportDecls[0], EmitFlags.NoLeadingComments);

        const oldImportGroups = shouldCombine
            ? group(oldImportDecls, importDecl => getExternalModuleName(importDecl.moduleSpecifier)!)
            : [oldImportDecls];
        const sortedImportGroups = shouldSort
            ? stableSort(oldImportGroups, (group1, group2) => compareModuleSpecifiersWorker(group1[0].moduleSpecifier, group2[0].moduleSpecifier, comparer))
            : oldImportGroups;
        const newImportDecls = flatMap(sortedImportGroups, importGroup =>
            getExternalModuleName(importGroup[0].moduleSpecifier) || importGroup[0].moduleSpecifier === undefined
                ? coalesce(importGroup)
                : importGroup);

        // Delete all nodes if there are no imports.
        if (newImportDecls.length === 0) {
            // Consider the first node to have trailingTrivia as we want to exclude the
            // "header" comment.
            changeTracker.deleteNodes(sourceFile, oldImportDecls, {
                leadingTriviaOption: textChanges.LeadingTriviaOption.Exclude,
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

function groupByNewlineContiguous<T extends ImportDeclaration | ExportDeclaration>(sourceFile: SourceFile, decls: T[]): T[][] {
    const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ false, sourceFile.languageVariant);
    const group: T[][] = [];
    let groupIndex = 0;
    for (const decl of decls) {
        if (group[groupIndex] && isNewGroup(sourceFile, decl, scanner)) {
            groupIndex++;
        }

        if (!group[groupIndex]) {
            group[groupIndex] = [];
        }

        group[groupIndex].push(decl);
    }

    return group;
}

// a new group is created if an import/export includes at least two new line
// new line from multi-line comment doesn't count
function isNewGroup(sourceFile: SourceFile, decl: ImportDeclaration | ExportDeclaration, scanner: Scanner) {
    const startPos = decl.getFullStart();
    const endPos = decl.getStart();
    scanner.setText(sourceFile.text, startPos, endPos - startPos);

    let numberOfNewLines = 0;
    while (scanner.getTokenStart() < endPos) {
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

function removeUnusedImports(oldImports: readonly ImportDeclaration[], sourceFile: SourceFile, program: Program) {
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
        // If a module is imported to be augmented, it's used
        else if (hasModuleDeclarationMatchingSpecifier(sourceFile, moduleSpecifier)) {
            // If we're in a declaration file, it's safe to remove the import clause from it
            if (sourceFile.isDeclarationFile) {
                usedImports.push(factory.createImportDeclaration(
                    importDecl.modifiers,
                    /*importClause*/ undefined,
                    moduleSpecifier,
                    /*attributes*/ undefined,
                ));
            }
            // If we're not in a declaration file, we can't remove the import clause even though
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

function getExternalModuleName(specifier: Expression | undefined) {
    return specifier !== undefined && isStringLiteralLike(specifier)
        ? specifier.text
        : undefined;
}

// Internal for testing
/**
 * @param importGroup a list of ImportDeclarations, all with the same module name.
 *
 * @deprecated Only used for testing
 * @internal
 */
export function coalesceImports(importGroup: readonly ImportDeclaration[], ignoreCase: boolean, sourceFile?: SourceFile): readonly ImportDeclaration[] {
    const comparer = getOrganizeImportsOrdinalStringComparer(ignoreCase);
    return coalesceImportsWorker(importGroup, comparer, sourceFile);
}

function coalesceImportsWorker(importGroup: readonly ImportDeclaration[], comparer: Comparer<string>, sourceFile?: SourceFile): readonly ImportDeclaration[] {
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
                updateImportDeclarationAndClause(defaultImport, defaultImport.importClause.name, namespaceImports[0].importClause.namedBindings),
            );

            continue;
        }

        const sortedNamespaceImports = stableSort(namespaceImports, (i1, i2) => comparer(i1.importClause.namedBindings.name.text, i2.importClause.namedBindings.name.text));

        for (const namespaceImport of sortedNamespaceImports) {
            // Drop the name, if any
            coalescedImports.push(
                updateImportDeclarationAndClause(namespaceImport, /*name*/ undefined, namespaceImport.importClause.namedBindings),
            );
        }

        const firstDefaultImport = firstOrUndefined(defaultImports);
        const firstNamedImport = firstOrUndefined(namedImports);
        const importDecl = firstDefaultImport ?? firstNamedImport;
        if (!importDecl) {
            continue;
        }

        let newDefaultImport: Identifier | undefined;
        const newImportSpecifiers: ImportSpecifier[] = [];
        if (defaultImports.length === 1) {
            newDefaultImport = defaultImports[0].importClause.name;
        }
        else {
            for (const defaultImport of defaultImports) {
                newImportSpecifiers.push(
                    factory.createImportSpecifier(/*isTypeOnly*/ false, factory.createIdentifier("default"), defaultImport.importClause.name),
                );
            }
        }

        newImportSpecifiers.push(...getNewImportSpecifiers(namedImports));

        const sortedImportSpecifiers = factory.createNodeArray(
            sortSpecifiers(newImportSpecifiers, comparer),
            firstNamedImport?.importClause.namedBindings.elements.hasTrailingComma,
        );

        const newNamedImports = sortedImportSpecifiers.length === 0
            ? newDefaultImport
                ? undefined
                : factory.createNamedImports(emptyArray)
            : firstNamedImport
            ? factory.updateNamedImports(firstNamedImport.importClause.namedBindings, sortedImportSpecifiers)
            : factory.createNamedImports(sortedImportSpecifiers);

        if (
            sourceFile &&
            newNamedImports &&
            firstNamedImport?.importClause.namedBindings &&
            !rangeIsOnSingleLine(firstNamedImport.importClause.namedBindings, sourceFile)
        ) {
            setEmitFlags(newNamedImports, EmitFlags.MultiLine);
        }

        // Type-only imports are not allowed to mix default, namespace, and named imports in any combination.
        // We could rewrite a default import as a named import (`import { default as name }`), but we currently
        // choose not to as a stylistic preference.
        if (isTypeOnly && newDefaultImport && newNamedImports) {
            coalescedImports.push(
                updateImportDeclarationAndClause(importDecl, newDefaultImport, /*namedBindings*/ undefined),
            );
            coalescedImports.push(
                updateImportDeclarationAndClause(firstNamedImport ?? importDecl, /*name*/ undefined, newNamedImports),
            );
        }
        else {
            coalescedImports.push(
                updateImportDeclarationAndClause(importDecl, newDefaultImport, newNamedImports),
            );
        }
    }

    return coalescedImports;
}

type ImportDeclarationWithDefaultImport = ImportDeclaration & {
    readonly importClause: ImportClause & {
        readonly name: Identifier;
    };
};

type ImportDeclarationWithNamespaceImport = ImportDeclaration & {
    readonly importClause: ImportClause & {
        readonly namedBindings: NamespaceImport;
    };
};

type ImportDeclarationWithNamedImports = ImportDeclaration & {
    readonly importClause: ImportClause & {
        readonly namedBindings: NamedImports;
    };
};

interface ImportGroup {
    defaultImports: ImportDeclarationWithDefaultImport[];
    namespaceImports: ImportDeclarationWithNamespaceImport[];
    namedImports: ImportDeclarationWithNamedImports[];
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
            group.defaultImports.push(importDeclaration as ImportDeclarationWithDefaultImport);
        }

        if (namedBindings) {
            if (isNamespaceImport(namedBindings)) {
                group.namespaceImports.push(importDeclaration as ImportDeclarationWithNamespaceImport);
            }
            else {
                group.namedImports.push(importDeclaration as ImportDeclarationWithNamedImports);
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
 *
 * @deprecated Only used for testing
 * @internal
 */
export function coalesceExports(exportGroup: readonly ExportDeclaration[], ignoreCase: boolean) {
    const comparer = getOrganizeImportsOrdinalStringComparer(ignoreCase);
    return coalesceExportsWorker(exportGroup, comparer);
}

function coalesceExportsWorker(exportGroup: readonly ExportDeclaration[], comparer: Comparer<string>) {
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

        const sortedExportSpecifiers = sortSpecifiers(newExportSpecifiers, comparer);

        const exportDecl = exportGroup[0];
        coalescedExports.push(
            factory.updateExportDeclaration(
                exportDecl,
                exportDecl.modifiers,
                exportDecl.isTypeOnly,
                exportDecl.exportClause && (
                    isNamedExports(exportDecl.exportClause) ?
                        factory.updateNamedExports(exportDecl.exportClause, sortedExportSpecifiers) :
                        factory.updateNamespaceExport(exportDecl.exportClause, exportDecl.exportClause.name)
                ),
                exportDecl.moduleSpecifier,
                exportDecl.attributes,
            ),
        );
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
    namedBindings: NamedImportBindings | undefined,
) {
    return factory.updateImportDeclaration(
        importDeclaration,
        importDeclaration.modifiers,
        factory.updateImportClause(importDeclaration.importClause!, importDeclaration.importClause!.isTypeOnly, name, namedBindings), // TODO: GH#18217
        importDeclaration.moduleSpecifier,
        importDeclaration.attributes,
    );
}

function sortSpecifiers<T extends ImportOrExportSpecifier>(specifiers: readonly T[], comparer: Comparer<string>) {
    return stableSort(specifiers, (s1, s2) => compareImportOrExportSpecifiers(s1, s2, comparer));
}

/** @internal */
export function compareImportOrExportSpecifiers<T extends ImportOrExportSpecifier>(s1: T, s2: T, comparer: Comparer<string>): Comparison {
    return compareBooleans(s1.isTypeOnly, s2.isTypeOnly) || comparer(s1.name.text, s2.name.text);
}

/**
 * Exported for testing
 *
 * @deprecated Only used for testing
 * @internal
 */
export function compareModuleSpecifiers(m1: Expression | undefined, m2: Expression | undefined, ignoreCase?: boolean) {
    const comparer = getOrganizeImportsOrdinalStringComparer(!!ignoreCase);
    return compareModuleSpecifiersWorker(m1, m2, comparer);
}

function compareModuleSpecifiersWorker(m1: Expression | undefined, m2: Expression | undefined, comparer: Comparer<string>) {
    const name1 = m1 === undefined ? undefined : getExternalModuleName(m1);
    const name2 = m2 === undefined ? undefined : getExternalModuleName(m2);
    return compareBooleans(name1 === undefined, name2 === undefined) ||
        compareBooleans(isExternalModuleNameRelative(name1!), isExternalModuleNameRelative(name2!)) ||
        comparer(name1!, name2!);
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

/** @internal */
export function detectSorting(sourceFile: SourceFile, preferences: UserPreferences): SortKind {
    return detectSortingWorker(
        groupByNewlineContiguous(sourceFile, sourceFile.statements.filter(isImportDeclaration)),
        preferences,
    );
}

function detectSortingWorker(importGroups: ImportDeclaration[][], preferences: UserPreferences): SortKind {
    const collateCaseSensitive = getOrganizeImportsComparer(preferences, /*ignoreCase*/ false);
    const collateCaseInsensitive = getOrganizeImportsComparer(preferences, /*ignoreCase*/ true);
    let sortState = SortKind.Both;
    let seenUnsortedGroup = false;
    for (const importGroup of importGroups) {
        // Check module specifiers
        if (importGroup.length > 1) {
            const moduleSpecifierSort = detectSortCaseSensitivity(
                importGroup,
                i => tryCast(i.moduleSpecifier, isStringLiteral)?.text ?? "",
                collateCaseSensitive,
                collateCaseInsensitive,
            );
            if (moduleSpecifierSort) {
                // Don't let a single unsorted group of module specifiers make the whole algorithm detect unsorted.
                // If other things are sorted consistently, that's a stronger indicator than unsorted module specifiers.
                sortState &= moduleSpecifierSort;
                seenUnsortedGroup = true;
            }
            if (!sortState) {
                return sortState;
            }
        }

        // Check import specifiers
        const declarationWithNamedImports = find(
            importGroup,
            i => tryCast(i.importClause?.namedBindings, isNamedImports)?.elements.length! > 1,
        );
        if (declarationWithNamedImports) {
            const namedImportSort = detectImportSpecifierSorting((declarationWithNamedImports.importClause!.namedBindings as NamedImports).elements, preferences);
            if (namedImportSort) {
                // Don't let a single unsorted group of named imports make the whole algorithm detect unsorted.
                // If other things are sorted consistently, that's a stronger indicator than unsorted named imports.
                sortState &= namedImportSort;
                seenUnsortedGroup = true;
            }
            if (!sortState) {
                return sortState;
            }
        }

        // Quit as soon as we've disambiguated. There's a chance that something later will disagree with what we've
        // found so far, but this function is only intended to infer a preference, not validate the whole file for
        // consistent and correct sorting.
        if (sortState !== SortKind.Both) {
            return sortState;
        }
    }
    return seenUnsortedGroup ? SortKind.None : sortState;
}

/** @internal */
export function detectImportDeclarationSorting(imports: readonly AnyImportOrRequireStatement[], preferences: UserPreferences): SortKind {
    const collateCaseSensitive = getOrganizeImportsComparer(preferences, /*ignoreCase*/ false);
    const collateCaseInsensitive = getOrganizeImportsComparer(preferences, /*ignoreCase*/ true);
    return detectSortCaseSensitivity(
        imports,
        s => getExternalModuleName(getModuleSpecifierExpression(s)) || "",
        collateCaseSensitive,
        collateCaseInsensitive,
    );
}

class ImportSpecifierSortingCache implements MemoizeCache<[readonly ImportSpecifier[], UserPreferences], SortKind> {
    private _lastPreferences: UserPreferences | undefined;
    private _cache: WeakMap<readonly ImportSpecifier[], SortKind> | undefined;

    has([specifiers, preferences]: [readonly ImportSpecifier[], UserPreferences]) {
        if (this._lastPreferences !== preferences || !this._cache) return false;
        return this._cache.has(specifiers);
    }

    get([specifiers, preferences]: [readonly ImportSpecifier[], UserPreferences]) {
        if (this._lastPreferences !== preferences || !this._cache) return undefined;
        return this._cache.get(specifiers);
    }

    set([specifiers, preferences]: [readonly ImportSpecifier[], UserPreferences], value: SortKind) {
        if (this._lastPreferences !== preferences) {
            this._lastPreferences = preferences;
            this._cache = undefined;
        }
        this._cache ??= new WeakMap();
        this._cache.set(specifiers, value);
    }
}

/** @internal */
export const detectImportSpecifierSorting = memoizeCached((specifiers: readonly ImportSpecifier[], preferences: UserPreferences): SortKind => {
    if (!arrayIsSorted(specifiers, (s1, s2) => compareBooleans(s1.isTypeOnly, s2.isTypeOnly))) {
        return SortKind.None;
    }
    const collateCaseSensitive = getOrganizeImportsComparer(preferences, /*ignoreCase*/ false);
    const collateCaseInsensitive = getOrganizeImportsComparer(preferences, /*ignoreCase*/ true);
    return detectSortCaseSensitivity(specifiers, specifier => specifier.name.text, collateCaseSensitive, collateCaseInsensitive);
}, new ImportSpecifierSortingCache());

/** @internal */
export function getImportDeclarationInsertionIndex(sortedImports: readonly AnyImportOrRequireStatement[], newImport: AnyImportOrRequireStatement, comparer: Comparer<string>) {
    const index = binarySearch(sortedImports, newImport, identity, (a, b) => compareImportsOrRequireStatements(a, b, comparer));
    return index < 0 ? ~index : index;
}

/** @internal */
export function getImportSpecifierInsertionIndex(sortedImports: readonly ImportSpecifier[], newImport: ImportSpecifier, comparer: Comparer<string>) {
    const index = binarySearch(sortedImports, newImport, identity, (s1, s2) => compareImportOrExportSpecifiers(s1, s2, comparer));
    return index < 0 ? ~index : index;
}

/** @internal */
export function compareImportsOrRequireStatements(s1: AnyImportOrRequireStatement, s2: AnyImportOrRequireStatement, comparer: Comparer<string>) {
    return compareModuleSpecifiersWorker(getModuleSpecifierExpression(s1), getModuleSpecifierExpression(s2), comparer) || compareImportKind(s1, s2);
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
                : importSpecifier));
}

function tryGetNamedBindingElements(namedImport: ImportDeclaration) {
    return namedImport.importClause?.namedBindings && isNamedImports(namedImport.importClause.namedBindings)
        ? namedImport.importClause.namedBindings.elements
        : undefined;
}

function getOrganizeImportsOrdinalStringComparer(ignoreCase: boolean) {
    return ignoreCase ? compareStringsCaseInsensitiveEslintCompatible : compareStringsCaseSensitive;
}

function getOrganizeImportsUnicodeStringComparer(ignoreCase: boolean, preferences: UserPreferences): Comparer<string> {
    const resolvedLocale = getOrganizeImportsLocale(preferences);
    const caseFirst = preferences.organizeImportsCaseFirst ?? false;
    const numeric = preferences.organizeImportsNumericCollation ?? false;
    const accents = preferences.organizeImportsAccentCollation ?? true;
    const sensitivity = ignoreCase ?
        accents ? "accent" : "base" :
        accents ? "variant" : "case";

    const collator = new Intl.Collator(resolvedLocale, {
        usage: "sort",
        caseFirst: caseFirst || "false",
        sensitivity,
        numeric,
    });

    // `compare` is a bound method, so we do not need to close over `collator`.
    return collator.compare;
}

function getOrganizeImportsLocale(preferences: UserPreferences): string {
    let locale = preferences.organizeImportsLocale;
    if (locale === "auto") locale = getUILocale();
    if (locale === undefined) locale = "en";

    const supportedLocales = Intl.Collator.supportedLocalesOf(locale);
    const resolvedLocale = supportedLocales.length ? supportedLocales[0] : "en";
    return resolvedLocale;
}

/** @internal */
export function getOrganizeImportsComparer(preferences: UserPreferences, ignoreCase: boolean): Comparer<string> {
    const collation = preferences.organizeImportsCollation ?? "ordinal";
    return collation === "unicode" ?
        getOrganizeImportsUnicodeStringComparer(ignoreCase, preferences) :
        getOrganizeImportsOrdinalStringComparer(ignoreCase);
}

function getOrganizeImportsComparerWithDetection(preferences: UserPreferences, detectIgnoreCase?: () => boolean): Comparer<string> {
    const ignoreCase = typeof preferences.organizeImportsIgnoreCase === "boolean" ? preferences.organizeImportsIgnoreCase : detectIgnoreCase?.() ?? false;
    return getOrganizeImportsComparer(preferences, ignoreCase);
}

function getTopLevelExportGroups(sourceFile: SourceFile) {
    const topLevelExportGroups: ExportDeclaration[][] = [];
    const statements = sourceFile.statements;
    const len = length(statements);

    let i = 0;
    let groupIndex = 0;
    while (i < len) {
        if (isExportDeclaration(statements[i])) {
            if (topLevelExportGroups[groupIndex] === undefined) {
                topLevelExportGroups[groupIndex] = [];
            }
            const exportDecl = statements[i] as ExportDeclaration;
            if (exportDecl.moduleSpecifier) {
                topLevelExportGroups[groupIndex].push(exportDecl);
                i++;
            }
            else {
                while (i < len && isExportDeclaration(statements[i])) {
                    topLevelExportGroups[groupIndex].push(statements[i++] as ExportDeclaration);
                }
                groupIndex++;
            }
        }
        else {
            i++;
        }
    }
    return flatMap(topLevelExportGroups, exportGroupDecls => groupByNewlineContiguous(sourceFile, exportGroupDecls));
}
