/* @internal */
namespace ts.NavigateTo {
    interface RawNavigateToItem {
        name: string;
        fileName: string;
        matchKind: PatternMatchKind;
        isCaseSensitive: boolean;
        declaration: Declaration;
    }

    export function getNavigateToItems(sourceFiles: ReadonlyArray<SourceFile>, checker: TypeChecker, cancellationToken: CancellationToken, searchValue: string, maxResultCount: number, excludeDtsFiles: boolean): NavigateToItem[] {
        const patternMatcher = createPatternMatcher(searchValue);
        let rawItems: RawNavigateToItem[] = [];

        // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[]
        for (const sourceFile of sourceFiles) {
            cancellationToken.throwIfCancellationRequested();

            if (excludeDtsFiles && fileExtensionIs(sourceFile.fileName, Extension.Dts)) {
                continue;
            }

            forEachEntry(sourceFile.getNamedDeclarations(), (declarations, name) => {
                getItemsFromNamedDeclaration(patternMatcher, name, declarations, checker, sourceFile.fileName, rawItems);
            });
        }

        rawItems.sort(compareNavigateToItems);
        if (maxResultCount !== undefined) {
            rawItems = rawItems.slice(0, maxResultCount);
        }
        return rawItems.map(createNavigateToItem);
    }

    function getItemsFromNamedDeclaration(patternMatcher: PatternMatcher, name: string, declarations: ReadonlyArray<Declaration>, checker: TypeChecker, fileName: string, rawItems: Push<RawNavigateToItem>): void {
        // First do a quick check to see if the name of the declaration matches the
        // last portion of the (possibly) dotted name they're searching for.
        const matches = patternMatcher.getMatchesForLastSegmentOfPattern(name);

        if (!matches) {
            return; // continue to next named declarations
        }

        for (const declaration of declarations) {
            if (!shouldKeepItem(declaration, checker)) {
                continue;
            }

            // It was a match! If the pattern has dots in it, then also see if the
            // declaration container matches as well.
            let containerMatches = matches;
            if (patternMatcher.patternContainsDots) {
                containerMatches = patternMatcher.getMatches(getContainers(declaration), name);
                if (!containerMatches) {
                    continue;
                }
            }

            const matchKind = bestMatchKind(containerMatches);
            const isCaseSensitive = allMatchesAreCaseSensitive(containerMatches);
            rawItems.push({ name, fileName, matchKind, isCaseSensitive, declaration });
        }
    }

    function shouldKeepItem(declaration: Declaration, checker: TypeChecker): boolean {
        switch (declaration.kind) {
            case SyntaxKind.ImportClause:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ImportEqualsDeclaration:
                const importer = checker.getSymbolAtLocation((declaration as ImportClause | ImportSpecifier | ImportEqualsDeclaration).name);
                const imported = checker.getAliasedSymbol(importer);
                return importer.escapedName !== imported.escapedName;
            default:
                return true;
        }
    }

    function allMatchesAreCaseSensitive(matches: ReadonlyArray<PatternMatch>): boolean {
        Debug.assert(matches.length > 0);

        // This is a case sensitive match, only if all the submatches were case sensitive.
        for (const match of matches) {
            if (!match.isCaseSensitive) {
                return false;
            }
        }

        return true;
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

    function getContainers(declaration: Declaration): string[] {
        const containers: string[] = [];

        // First, if we started with a computed property name, then add all but the last
        // portion into the container array.
        const name = getNameOfDeclaration(declaration);
        if (name.kind === SyntaxKind.ComputedPropertyName) {
            if (!tryAddComputedPropertyName(name.expression, containers, /*includeLastPortion*/ false)) {
                return undefined;
            }
        }

        // Now, walk up our containers, adding all their names to the container array.
        declaration = getContainerNode(declaration);

        while (declaration) {
            if (!tryAddSingleDeclarationName(declaration, containers)) {
                return undefined;
            }

            declaration = getContainerNode(declaration);
        }

        return containers;
    }

    function bestMatchKind(matches: ReadonlyArray<PatternMatch>): PatternMatchKind {
        Debug.assert(matches.length > 0);
        let bestMatchKind = PatternMatchKind.camelCase;

        for (const match of matches) {
            const kind = match.kind;
            if (kind < bestMatchKind) {
                bestMatchKind = kind;
            }
        }

        return bestMatchKind;
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
            matchKind: PatternMatchKind[rawItem.matchKind],
            isCaseSensitive: rawItem.isCaseSensitive,
            fileName: rawItem.fileName,
            textSpan: createTextSpanFromNode(declaration),
            // TODO(jfreeman): What should be the containerName when the container has a computed name?
            containerName: containerName ? (<Identifier>containerName).text : "",
            containerKind: containerName ? getNodeKind(container) : ScriptElementKind.unknown
        };
    }
}
