/* @internal */
namespace ts.NavigateTo {
    interface RawNavigateToItem {
        readonly name: string;
        readonly fileName: string;
        readonly matchKind: PatternMatchKind;
        readonly isCaseSensitive: boolean;
        readonly declaration: Declaration;
    }

    export function getNavigateToItems(sourceFiles: ReadonlyArray<SourceFile>, checker: TypeChecker, cancellationToken: CancellationToken, searchValue: string, maxResultCount: number | undefined, excludeDtsFiles: boolean): NavigateToItem[] {
        const patternMatcher = createPatternMatcher(searchValue);
        if (!patternMatcher) return emptyArray;
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

    function getItemsFromNamedDeclaration(patternMatcher: PatternMatcher, name: string, declarations: ReadonlyArray<Declaration>, checker: TypeChecker, fileName: string, rawItems: Push<RawNavigateToItem>): void {
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

    function shouldKeepItem(declaration: Declaration, checker: TypeChecker): boolean {
        switch (declaration.kind) {
            case SyntaxKind.ImportClause:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
                const importer = checker.getSymbolAtLocation((declaration as ImportClause | ImportSpecifier | ImportEqualsDeclaration).name!)!; // TODO: GH#18217
                const imported = checker.getAliasedSymbol(importer);
                return importer.escapedName !== imported.escapedName;
            default:
                return true;
        }
    }

    function tryAddSingleDeclarationName(declaration: Declaration, containers: string[]): boolean {
        const name = getNameOfDeclaration(declaration);
        if (name && isPropertyNameLiteral(name)) {
            containers.unshift(getTextOfIdentifierOrLiteral(name));
            return true;
        }
        else if (name && name.kind === SyntaxKind.ComputedPropertyName) {
            return tryAddComputedPropertyName(name.expression, containers, /*includeLastPortion*/ true);
        }
        else {
            // Don't know how to add this.
            return false;
        }
    }

    // Only added the names of computed properties if they're simple dotted expressions, like:
    //
    //      [X.Y.Z]() { }
    function tryAddComputedPropertyName(expression: Expression, containers: string[], includeLastPortion: boolean): boolean {
        if (isPropertyNameLiteral(expression)) {
            const text = getTextOfIdentifierOrLiteral(expression);
            if (includeLastPortion) {
                containers.unshift(text);
            }
            return true;
        }
        if (isPropertyAccessExpression(expression)) {
            if (includeLastPortion) {
                containers.unshift(expression.name.text);
            }

            return tryAddComputedPropertyName(expression.expression, containers, /*includeLastPortion*/ true);
        }

        return false;
    }

    function getContainers(declaration: Declaration): ReadonlyArray<string> {
        const containers: string[] = [];

        // First, if we started with a computed property name, then add all but the last
        // portion into the container array.
        const name = getNameOfDeclaration(declaration);
        if (name && name.kind === SyntaxKind.ComputedPropertyName && !tryAddComputedPropertyName(name.expression, containers, /*includeLastPortion*/ false)) {
            return emptyArray;
        }

        // Now, walk up our containers, adding all their names to the container array.
        let container = getContainerNode(declaration);

        while (container) {
            if (!tryAddSingleDeclarationName(container, containers)) {
                return emptyArray;
            }

            container = getContainerNode(container);
        }

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
            containerName: containerName ? (<Identifier>containerName).text : "",
            containerKind: containerName ? getNodeKind(container!) : ScriptElementKind.unknown, // TODO: GH#18217 Just use `container ? ...`
        };
    }
}
