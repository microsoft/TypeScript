module ts.NavigateTo {
    type RawNavigateToItem = { name: string; fileName: string; matchKind: PatternMatchKind; isCaseSensitive: boolean; declaration: Declaration };

    export function getNavigateToItems(program: Program, cancellationToken: CancellationTokenObject, searchValue: string, maxResultCount: number): NavigateToItem[] {
        var patternMatcher = createPatternMatcher(searchValue);
        var rawItems: RawNavigateToItem[] = [];

        // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[] 
        forEach(program.getSourceFiles(), sourceFile => {
            cancellationToken.throwIfCancellationRequested();

            var declarations = sourceFile.getNamedDeclarations();
            for (var i = 0, n = declarations.length; i < n; i++) {
                var declaration = declarations[i];
                var name = getDeclarationName(declaration);
                if (name !== undefined) {

                    // First do a quick check to see if the name of the declaration matches the 
                    // last portion of the (possibly) dotted name they're searching for.
                    var matches = patternMatcher.getMatchesForLastSegmentOfPattern(name);

                    if (!matches) {
                        continue;
                    }

                    // It was a match!  If the pattern has dots in it, then also see if hte 
                    // declaration container matches as well.
                    if (patternMatcher.patternContainsDots) {
                        var containers = getContainers(declaration);
                        if (!containers) {
                            return undefined;
                        }

                        matches = patternMatcher.getMatches(containers, name);

                        if (!matches) {
                            continue;
                        }
                    }

                    var fileName = sourceFile.fileName;
                    var matchKind = bestMatchKind(matches);
                    rawItems.push({ name, fileName, matchKind, isCaseSensitive: allMatchesAreCaseSensitive(matches), declaration });
                }
            }
        });

        rawItems.sort(compareNavigateToItems);
        if (maxResultCount !== undefined) {
            rawItems = rawItems.slice(0, maxResultCount);
        }

        var items = map(rawItems, createNavigateToItem);

        return items;

        function allMatchesAreCaseSensitive(matches: PatternMatch[]): boolean {
            Debug.assert(matches.length > 0);

            // This is a case sensitive match, only if all the submatches were case sensitive.
            for (var i = 0, n = matches.length; i < n; i++) {
                if (!matches[i].isCaseSensitive) {
                    return false;
                }
            }

            return true;
        }

        function getDeclarationName(declaration: Declaration): string {
            var result = getTextOfIdentifierOrLiteral(declaration.name);
            if (result !== undefined) {
                return result;
            }

            if (declaration.name.kind === SyntaxKind.ComputedPropertyName) {
                var expr = (<ComputedPropertyName>declaration.name).expression;
                if (expr.kind === SyntaxKind.PropertyAccessExpression) {
                    return (<PropertyAccessExpression>expr).name.text;
                }

                return getTextOfIdentifierOrLiteral(expr);
            }

            return undefined;
        }

        function getTextOfIdentifierOrLiteral(node: Node) {
            if (node.kind === SyntaxKind.Identifier ||
                node.kind === SyntaxKind.StringLiteral ||
                node.kind === SyntaxKind.NumericLiteral) {

                return (<Identifier | LiteralExpression>node).text;
            }

            return undefined;
        }

        function tryAddSingleDeclarationName(declaration: Declaration, containers: string[]) {
            if (declaration && declaration.name) {
                var text = getTextOfIdentifierOrLiteral(declaration.name);
                if (text !== undefined) {
                    containers.unshift(text);
                }
                else if (declaration.name.kind === SyntaxKind.ComputedPropertyName) {
                    return tryAddComputedPropertyName((<ComputedPropertyName>declaration.name).expression, containers, /*includeLastPortion:*/ true);
                }
                else {
                    // Don't know how to add this.
                    return false
                }
            }

            return true;
        }

        // Only added the names of computed properties if they're simple dotted expressions, like:
        //
        //      [X.Y.Z]() { }
        function tryAddComputedPropertyName(expression: Expression, containers: string[], includeLastPortion: boolean): boolean {
            var text = getTextOfIdentifierOrLiteral(expression);
            if (text !== undefined) {
                if (includeLastPortion) {
                    containers.unshift(text);
                }
                return true;
            }

            if (expression.kind === SyntaxKind.PropertyAccessExpression) {
                var propertyAccess = <PropertyAccessExpression>expression;
                if (includeLastPortion) {
                    containers.unshift(propertyAccess.name.text);
                }

                return tryAddComputedPropertyName(propertyAccess.expression, containers, /*includeLastPortion:*/ true);
            }

            return false;
        }

        function getContainers(declaration: Declaration) {
            var containers: string[] = [];

            // First, if we started with a computed property name, then add all but the last
            // portion into the container array.
            if (declaration.name.kind === SyntaxKind.ComputedPropertyName) {
                if (!tryAddComputedPropertyName((<ComputedPropertyName>declaration.name).expression, containers, /*includeLastPortion:*/ false)) {
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

        function bestMatchKind(matches: PatternMatch[]) {
            Debug.assert(matches.length > 0);
            var bestMatchKind = PatternMatchKind.camelCase;

            for (var i = 0, n = matches.length; i < n; i++) {
                var kind = matches[i].kind;
                if (kind < bestMatchKind) {
                    bestMatchKind = kind;
                }
            }

            return bestMatchKind;
        }

        // This means "compare in a case insensitive manner."
        var baseSensitivity: Intl.CollatorOptions = { sensitivity: "base" };
        function compareNavigateToItems(i1: RawNavigateToItem, i2: RawNavigateToItem) {
            // TODO(cyrusn): get the gamut of comparisons that VS already uses here.
            // Right now we just sort by kind first, and then by name of the item.
            // We first sort case insensitively.  So "Aaa" will come before "bar".
            // Then we sort case sensitively, so "aaa" will come before "Aaa".
            return i1.matchKind - i2.matchKind ||
                i1.name.localeCompare(i2.name, undefined, baseSensitivity) || 
                i1.name.localeCompare(i2.name);
        }

        function createNavigateToItem(rawItem: RawNavigateToItem): NavigateToItem {
            var declaration = rawItem.declaration;
            var container = <Declaration>getContainerNode(declaration);
            return {
                name: rawItem.name,
                kind: getNodeKind(declaration),
                kindModifiers: getNodeModifiers(declaration),
                matchKind: PatternMatchKind[rawItem.matchKind],
                isCaseSensitive: rawItem.isCaseSensitive,
                fileName: rawItem.fileName,
                textSpan: createSpanFromBounds(declaration.getStart(), declaration.getEnd()),
                // TODO(jfreeman): What should be the containerName when the container has a computed name?
                containerName: container && container.name ? (<Identifier>container.name).text : "",
                containerKind: container && container.name ? getNodeKind(container) : ""
            };
        }
    }
}