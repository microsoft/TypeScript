/* @internal */
namespace ts.NavigateTo {
    type RawNavigateToItem = { name: string; fileName: string; matchKind: PatternMatchKind; isCaseSensitive: boolean; declaration: Declaration };

    export function getNavigateToItems(program: Program, checker: TypeChecker, cancellationToken: CancellationToken, searchValue: string, maxResultCount: number): NavigateToItem[] {
        const patternMatcher = createPatternMatcher(searchValue);
        let rawItems: RawNavigateToItem[] = [];

        // This means "compare in a case insensitive manner."
        const baseSensitivity: Intl.CollatorOptions = { sensitivity: "base" };

        // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[]
        forEach(program.getSourceFiles(), sourceFile => {
            cancellationToken.throwIfCancellationRequested();

            const nameToDeclarations = sourceFile.getNamedDeclarations();
            for (const name in nameToDeclarations) {
                const declarations = getProperty(nameToDeclarations, name);
                if (declarations) {
                    // First do a quick check to see if the name of the declaration matches the
                    // last portion of the (possibly) dotted name they're searching for.
                    let matches = patternMatcher.getMatchesForLastSegmentOfPattern(name);

                    if (!matches) {
                        continue;
                    }

                    for (const declaration of declarations) {
                        // It was a match!  If the pattern has dots in it, then also see if the
                        // declaration container matches as well.
                        if (patternMatcher.patternContainsDots) {
                            const containers = getContainers(declaration);
                            if (!containers) {
                                return undefined;
                            }

                            matches = patternMatcher.getMatches(containers, name);

                            if (!matches) {
                                continue;
                            }
                        }

                        const fileName = sourceFile.fileName;
                        const matchKind = bestMatchKind(matches);
                        rawItems.push({ name, fileName, matchKind, isCaseSensitive: allMatchesAreCaseSensitive(matches), declaration });
                    }
                }
            }
        });

        // Remove imports when the imported declaration is already in the list and has the same name.
        rawItems = filter(rawItems, item => {
            const decl = item.declaration;
            if (decl.kind === SyntaxKind.ImportClause || decl.kind === SyntaxKind.ImportSpecifier || decl.kind === SyntaxKind.ImportEqualsDeclaration) {
                const importer = checker.getSymbolAtLocation(decl.name);
                const imported = checker.getAliasedSymbol(importer);
                return importer.name !== imported.name;
            }
            else {
                return true;
            }
        });

        rawItems.sort(compareNavigateToItems);
        if (maxResultCount !== undefined) {
            rawItems = rawItems.slice(0, maxResultCount);
        }

        const items = map(rawItems, createNavigateToItem);

        return items;

        function allMatchesAreCaseSensitive(matches: PatternMatch[]): boolean {
            Debug.assert(matches.length > 0);

            // This is a case sensitive match, only if all the submatches were case sensitive.
            for (const match of matches) {
                if (!match.isCaseSensitive) {
                    return false;
                }
            }

            return true;
        }

        function getTextOfIdentifierOrLiteral(node: Node) {
            if (node) {
                if (node.kind === SyntaxKind.Identifier ||
                    node.kind === SyntaxKind.StringLiteral ||
                    node.kind === SyntaxKind.NumericLiteral) {

                    return (<Identifier | LiteralExpression>node).text;
                }
            }

            return undefined;
        }

        function tryAddSingleDeclarationName(declaration: Declaration, containers: string[]) {
            if (declaration && declaration.name) {
                const text = getTextOfIdentifierOrLiteral(declaration.name);
                if (text !== undefined) {
                    containers.unshift(text);
                }
                else if (declaration.name.kind === SyntaxKind.ComputedPropertyName) {
                    return tryAddComputedPropertyName((<ComputedPropertyName>declaration.name).expression, containers, /*includeLastPortion*/ true);
                }
                else {
                    // Don't know how to add this.
                    return false;
                }
            }

            return true;
        }

        // Only added the names of computed properties if they're simple dotted expressions, like:
        //
        //      [X.Y.Z]() { }
        function tryAddComputedPropertyName(expression: Expression, containers: string[], includeLastPortion: boolean): boolean {
            const text = getTextOfIdentifierOrLiteral(expression);
            if (text !== undefined) {
                if (includeLastPortion) {
                    containers.unshift(text);
                }
                return true;
            }

            if (expression.kind === SyntaxKind.PropertyAccessExpression) {
                const propertyAccess = <PropertyAccessExpression>expression;
                if (includeLastPortion) {
                    containers.unshift(propertyAccess.name.text);
                }

                return tryAddComputedPropertyName(propertyAccess.expression, containers, /*includeLastPortion*/ true);
            }

            return false;
        }

        function getContainers(declaration: Declaration) {
            const containers: string[] = [];

            // First, if we started with a computed property name, then add all but the last
            // portion into the container array.
            if (declaration.name.kind === SyntaxKind.ComputedPropertyName) {
                if (!tryAddComputedPropertyName((<ComputedPropertyName>declaration.name).expression, containers, /*includeLastPortion*/ false)) {
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
            // Right now we just sort by kind first, and then by name of the item.
            // We first sort case insensitively.  So "Aaa" will come before "bar".
            // Then we sort case sensitively, so "aaa" will come before "Aaa".
            return i1.matchKind - i2.matchKind ||
                i1.name.localeCompare(i2.name, undefined, baseSensitivity) ||
                i1.name.localeCompare(i2.name);
        }

        function createNavigateToItem(rawItem: RawNavigateToItem): NavigateToItem {
            const declaration = rawItem.declaration;
            const container = <Declaration>getContainerNode(declaration);
            return {
                name: rawItem.name,
                kind: getNodeKind(declaration),
                kindModifiers: getNodeModifiers(declaration),
                matchKind: PatternMatchKind[rawItem.matchKind],
                isCaseSensitive: rawItem.isCaseSensitive,
                fileName: rawItem.fileName,
                textSpan: createTextSpanFromBounds(declaration.getStart(), declaration.getEnd()),
                // TODO(jfreeman): What should be the containerName when the container has a computed name?
                containerName: container && container.name ? (<Identifier>container.name).text : "",
                containerKind: container && container.name ? getNodeKind(container) : ""
            };
        }
    }
}