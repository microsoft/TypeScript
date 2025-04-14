import {
    CancellationToken,
    compareStringsCaseSensitiveUI,
    compareValues,
    createPatternMatcher,
    createTextSpanFromNode,
    Declaration,
    emptyArray,
    Expression,
    getContainerNode,
    getNameOfDeclaration,
    getNodeKind,
    getNodeModifiers,
    getTextOfIdentifierOrLiteral,
    Identifier,
    ImportClause,
    ImportEqualsDeclaration,
    ImportSpecifier,
    isInsideNodeModules,
    isPropertyAccessExpression,
    isPropertyNameLiteral,
    NavigateToItem,
    Node,
    PatternMatcher,
    PatternMatchKind,
    ScriptElementKind,
    SourceFile,
    SyntaxKind,
    TypeChecker,
} from "./_namespaces/ts.js";

interface RawNavigateToItem {
    readonly name: string;
    readonly fileName: string;
    readonly matchKind: PatternMatchKind;
    readonly isCaseSensitive: boolean;
    readonly declaration: Declaration;
}

/** @internal */
export function getNavigateToItems(sourceFiles: readonly SourceFile[], checker: TypeChecker, cancellationToken: CancellationToken, searchValue: string, maxResultCount: number | undefined, excludeDtsFiles: boolean, excludeLibFiles?: boolean): NavigateToItem[] {
    const patternMatcher = createPatternMatcher(searchValue);
    if (!patternMatcher) return emptyArray;
    const rawItems: RawNavigateToItem[] = [];
    const singleCurrentFile = sourceFiles.length === 1 ? sourceFiles[0] : undefined;
    // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[]
    for (const sourceFile of sourceFiles) {
        cancellationToken.throwIfCancellationRequested();

        if (excludeDtsFiles && sourceFile.isDeclarationFile) {
            continue;
        }

        if (shouldExcludeFile(sourceFile, !!excludeLibFiles, singleCurrentFile)) {
            continue;
        }

        sourceFile.getNamedDeclarations().forEach((declarations, name) => {
            getItemsFromNamedDeclaration(patternMatcher, name, declarations, checker, sourceFile.fileName, !!excludeLibFiles, singleCurrentFile, rawItems);
        });
    }

    rawItems.sort(compareNavigateToItems);
    return (maxResultCount === undefined ? rawItems : rawItems.slice(0, maxResultCount)).map(createNavigateToItem);
}

/**
 * Exclude 'node_modules/' files and standard library files if 'excludeLibFiles' is true.
 * If we're in current file only mode, we don't exclude the current file, even if it is a library file.
 */
function shouldExcludeFile(file: SourceFile, excludeLibFiles: boolean, singleCurrentFile: SourceFile | undefined): boolean {
    return file !== singleCurrentFile && excludeLibFiles && (isInsideNodeModules(file.path) || file.hasNoDefaultLib);
}

function getItemsFromNamedDeclaration(
    patternMatcher: PatternMatcher,
    name: string,
    declarations: readonly Declaration[],
    checker: TypeChecker,
    fileName: string,
    excludeLibFiles: boolean,
    singleCurrentFile: SourceFile | undefined,
    rawItems: RawNavigateToItem[],
): void {
    // First do a quick check to see if the name of the declaration matches the
    // last portion of the (possibly) dotted name they're searching for.
    const match = patternMatcher.getMatchForLastSegmentOfPattern(name);
    if (!match) {
        return; // continue to next named declarations
    }

    for (const declaration of declarations) {
        if (!shouldKeepItem(declaration, checker, excludeLibFiles, singleCurrentFile)) continue;

        if (patternMatcher.patternContainsDots) {
            // If the pattern has dots in it, then also see if the declaration container matches as well.
            const fullMatch = patternMatcher.getFullMatch(getContainers(declaration), name);
            if (fullMatch) {
                rawItems.push({ name, fileName, matchKind: fullMatch.kind, isCaseSensitive: fullMatch.isCaseSensitive, declaration });
            }
        }
        else {
            rawItems.push({ name, fileName, matchKind: match.kind, isCaseSensitive: match.isCaseSensitive, declaration });
        }
    }
}

function shouldKeepItem(
    declaration: Declaration,
    checker: TypeChecker,
    excludeLibFiles: boolean,
    singleCurrentFile: SourceFile | undefined,
): boolean {
    switch (declaration.kind) {
        case SyntaxKind.ImportClause:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.ImportEqualsDeclaration:
            const importer = checker.getSymbolAtLocation((declaration as ImportClause | ImportSpecifier | ImportEqualsDeclaration).name!)!; // TODO: GH#18217
            const imported = checker.getAliasedSymbol(importer);
            return importer.escapedName !== imported.escapedName
                && !imported.declarations?.every(d => shouldExcludeFile(d.getSourceFile(), excludeLibFiles, singleCurrentFile));
        default:
            return true;
    }
}

function tryAddSingleDeclarationName(declaration: Declaration, containers: string[]): boolean {
    const name = getNameOfDeclaration(declaration);
    return !!name && (pushLiteral(name, containers) || name.kind === SyntaxKind.ComputedPropertyName && tryAddComputedPropertyName(name.expression, containers));
}

// Only added the names of computed properties if they're simple dotted expressions, like:
//
//      [X.Y.Z]() { }
function tryAddComputedPropertyName(expression: Expression, containers: string[]): boolean {
    return pushLiteral(expression, containers)
        || isPropertyAccessExpression(expression) && (containers.push(expression.name.text), true) && tryAddComputedPropertyName(expression.expression, containers);
}

function pushLiteral(node: Node, containers: string[]): boolean {
    return isPropertyNameLiteral(node) && (containers.push(getTextOfIdentifierOrLiteral(node)), true);
}

function getContainers(declaration: Declaration): readonly string[] {
    const containers: string[] = [];

    // First, if we started with a computed property name, then add all but the last
    // portion into the container array.
    const name = getNameOfDeclaration(declaration);
    if (name && name.kind === SyntaxKind.ComputedPropertyName && !tryAddComputedPropertyName(name.expression, containers)) {
        return emptyArray;
    }
    // Don't include the last portion.
    containers.shift();

    // Now, walk up our containers, adding all their names to the container array.
    let container = getContainerNode(declaration);

    while (container) {
        if (!tryAddSingleDeclarationName(container, containers)) {
            return emptyArray;
        }

        container = getContainerNode(container);
    }

    containers.reverse();
    return containers;
}

function compareNavigateToItems(i1: RawNavigateToItem, i2: RawNavigateToItem) {
    // TODO(cyrusn): get the gamut of comparisons that VS already uses here.
    return compareValues(i1.matchKind, i2.matchKind)
        || compareStringsCaseSensitiveUI(i1.name, i2.name);
}

function createNavigateToItem(rawItem: RawNavigateToItem): NavigateToItem {
    const declaration = rawItem.declaration;
    const container = getContainerNode(declaration);
    const containerName = container && getNameOfDeclaration(container);
    return {
        name: rawItem.name,
        kind: getNodeKind(declaration),
        kindModifiers: getNodeModifiers(declaration),
        matchKind: PatternMatchKind[rawItem.matchKind] as keyof typeof PatternMatchKind,
        isCaseSensitive: rawItem.isCaseSensitive,
        fileName: rawItem.fileName,
        textSpan: createTextSpanFromNode(declaration),
        // TODO(jfreeman): What should be the containerName when the container has a computed name?
        containerName: containerName ? (containerName as Identifier).text : "",
        containerKind: containerName ? getNodeKind(container) : ScriptElementKind.unknown,
    };
}
