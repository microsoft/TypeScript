/* @internal */
namespace ts.NavigateTo {
interface RawNavigateToItem {
    readonly name: string;
    readonly fileName: string;
    readonly matchKind: ts.PatternMatchKind;
    readonly isCaseSensitive: boolean;
    readonly declaration: ts.Declaration;
}

export function getNavigateToItems(sourceFiles: readonly ts.SourceFile[], checker: ts.TypeChecker, cancellationToken: ts.CancellationToken, searchValue: string, maxResultCount: number | undefined, excludeDtsFiles: boolean): ts.NavigateToItem[] {
    const patternMatcher = ts.createPatternMatcher(searchValue);
    if (!patternMatcher) return ts.emptyArray;
    const rawItems: RawNavigateToItem[] = [];

    // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[]
    for (const sourceFile of sourceFiles) {
        cancellationToken.throwIfCancellationRequested();

        if (excludeDtsFiles && sourceFile.isDeclarationFile) {
            continue;
        }

        sourceFile.getNamedDeclarations().forEach((declarations, name) => {
            getItemsFromNamedDeclaration(patternMatcher, name, declarations, checker, sourceFile.fileName, rawItems);
        });
    }

    rawItems.sort(compareNavigateToItems);
    return (maxResultCount === undefined ? rawItems : rawItems.slice(0, maxResultCount)).map(createNavigateToItem);
}

function getItemsFromNamedDeclaration(patternMatcher: ts.PatternMatcher, name: string, declarations: readonly ts.Declaration[], checker: ts.TypeChecker, fileName: string, rawItems: ts.Push<RawNavigateToItem>): void {
    // First do a quick check to see if the name of the declaration matches the
    // last portion of the (possibly) dotted name they're searching for.
    const match = patternMatcher.getMatchForLastSegmentOfPattern(name);
    if (!match) {
        return; // continue to next named declarations
    }

    for (const declaration of declarations) {
        if (!shouldKeepItem(declaration, checker)) continue;

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

function shouldKeepItem(declaration: ts.Declaration, checker: ts.TypeChecker): boolean {
    switch (declaration.kind) {
        case ts.SyntaxKind.ImportClause:
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ImportEqualsDeclaration:
            const importer = checker.getSymbolAtLocation((declaration as ts.ImportClause | ts.ImportSpecifier | ts.ImportEqualsDeclaration).name!)!; // TODO: GH#18217
            const imported = checker.getAliasedSymbol(importer);
            return importer.escapedName !== imported.escapedName;
        default:
            return true;
    }
}

function tryAddSingleDeclarationName(declaration: ts.Declaration, containers: ts.Push<string>): boolean {
    const name = ts.getNameOfDeclaration(declaration);
    return !!name && (pushLiteral(name, containers) || name.kind === ts.SyntaxKind.ComputedPropertyName && tryAddComputedPropertyName(name.expression, containers));
}

// Only added the names of computed properties if they're simple dotted expressions, like:
//
//      [X.Y.Z]() { }
function tryAddComputedPropertyName(expression: ts.Expression, containers: ts.Push<string>): boolean {
    return pushLiteral(expression, containers)
        || ts.isPropertyAccessExpression(expression) && (containers.push(expression.name.text), true) && tryAddComputedPropertyName(expression.expression, containers);
}

function pushLiteral(node: ts.Node, containers: ts.Push<string>): boolean {
    return ts.isPropertyNameLiteral(node) && (containers.push(ts.getTextOfIdentifierOrLiteral(node)), true);
}

function getContainers(declaration: ts.Declaration): readonly string[] {
    const containers: string[] = [];

    // First, if we started with a computed property name, then add all but the last
    // portion into the container array.
    const name = ts.getNameOfDeclaration(declaration);
    if (name && name.kind === ts.SyntaxKind.ComputedPropertyName && !tryAddComputedPropertyName(name.expression, containers)) {
        return ts.emptyArray;
    }
    // Don't include the last portion.
    containers.shift();

    // Now, walk up our containers, adding all their names to the container array.
    let container = ts.getContainerNode(declaration);

    while (container) {
        if (!tryAddSingleDeclarationName(container, containers)) {
            return ts.emptyArray;
        }

        container = ts.getContainerNode(container);
    }

    return containers.reverse();
}

function compareNavigateToItems(i1: RawNavigateToItem, i2: RawNavigateToItem) {
    // TODO(cyrusn): get the gamut of comparisons that VS already uses here.
    return ts.compareValues(i1.matchKind, i2.matchKind)
        || ts.compareStringsCaseSensitiveUI(i1.name, i2.name);
}

function createNavigateToItem(rawItem: RawNavigateToItem): ts.NavigateToItem {
    const declaration = rawItem.declaration;
    const container = ts.getContainerNode(declaration);
    const containerName = container && ts.getNameOfDeclaration(container);
    return {
        name: rawItem.name,
        kind: ts.getNodeKind(declaration),
        kindModifiers: ts.getNodeModifiers(declaration),
        matchKind: ts.PatternMatchKind[rawItem.matchKind] as keyof typeof ts.PatternMatchKind,
        isCaseSensitive: rawItem.isCaseSensitive,
        fileName: rawItem.fileName,
        textSpan: ts.createTextSpanFromNode(declaration),
        // TODO(jfreeman): What should be the containerName when the container has a computed name?
        containerName: containerName ? (containerName as ts.Identifier).text : "",
        containerKind: containerName ? ts.getNodeKind(container) : ts.ScriptElementKind.unknown,
    };
}
}
