/* @internal */
namespace ts.NavigateTo {
    type RawNavigateToItem = { name: string; fileName: string; matchKind: PatternMatchKind; isCaseSensitive: boolean; declaration: Declaration };

    export function getNavigateToItems(sourceFiles: SourceFile[], checker: TypeChecker, cancellationToken: CancellationToken, searchValue: string, maxResultCount: number, excludeDtsFiles: boolean): NavigateToItem[] {
        const patternMatcher = createPatternMatcher(searchValue);
        let rawItems: RawNavigateToItem[] = [];

        // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[]
        for (const sourceFile of sourceFiles) {
            cancellationToken.throwIfCancellationRequested();

            if (excludeDtsFiles && fileExtensionIs(sourceFile.fileName, Extension.Dts)) {
                continue;
            }

            forEachEntry(sourceFile.getNamedDeclarations(), (declarations, name) => {
                if (declarations) {
                    // First do a quick check to see if the name of the declaration matches the
                    // last portion of the (possibly) dotted name they're searching for.
                    let matches = patternMatcher.getMatchesForLastSegmentOfPattern(name);

                    if (!matches) {
                        return; // continue to next named declarations
                    }

                    for (const declaration of declarations) {
                        // It was a match!  If the pattern has dots in it, then also see if the
                        // declaration container matches as well.
                        if (patternMatcher.patternContainsDots) {
                            const containers = getContainers(declaration);
                            if (!containers) {
                                return true; // Break out of named declarations and go to the next source file.
                            }

                            matches = patternMatcher.getMatches(containers, name);

                            if (!matches) {
                                return; // continue to next named declarations
                            }
                        }

                        const fileName = sourceFile.fileName;
                        const matchKind = bestMatchKind(matches);
                        rawItems.push({ name, fileName, matchKind, isCaseSensitive: allMatchesAreCaseSensitive(matches), declaration });
                    }
                }
            });
        }

        // Remove imports when the imported declaration is already in the list and has the same name.
        rawItems = filter(rawItems, item => {
            const decl = item.declaration;
            if (decl.kind === SyntaxKind.ImportClause || decl.kind === SyntaxKind.ImportSpecifier || decl.kind === SyntaxKind.ImportEqualsDeclaration) {
                const importer = checker.getSymbolAtLocation((decl as NamedDeclaration).name);
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

        function tryAddSingleDeclarationName(declaration: Declaration, containers: string[]) {
            if (declaration) {
                const name = getNameOfDeclaration(declaration);
                if (name) {
                    const text = getTextOfIdentifierOrLiteral(name as (Identifier | LiteralExpression));
                    if (text !== undefined) {
                        containers.unshift(text);
                    }
                    else if (name.kind === SyntaxKind.ComputedPropertyName) {
                        return tryAddComputedPropertyName((<ComputedPropertyName>name).expression, containers, /*includeLastPortion*/ true);
                    }
                    else {
                        // Don't know how to add this.
                        return false;
                    }
                }
            }

            return true;
        }

        // Only added the names of computed properties if they're simple dotted expressions, like:
        //
        //      [X.Y.Z]() { }
        function tryAddComputedPropertyName(expression: Expression, containers: string[], includeLastPortion: boolean): boolean {
            const text = getTextOfIdentifierOrLiteral(expression as LiteralExpression);
            if (text !== undefined) {
                if (includeLastPortion) {
                    containers.unshift(text);
                }
                return true;
            }

            if (expression.kind === SyntaxKind.PropertyAccessExpression) {
                const propertyAccess = <PropertyAccessExpression>expression;
                if (includeLastPortion) {
                    containers.unshift(unescapeLeadingUnderscores(propertyAccess.name.text));
                }

                return tryAddComputedPropertyName(propertyAccess.expression, containers, /*includeLastPortion*/ true);
            }

            return false;
        }

        function getContainers(declaration: Declaration) {
            const containers: string[] = [];

            // First, if we started with a computed property name, then add all but the last
            // portion into the container array.
            const name = getNameOfDeclaration(declaration);
            if (name.kind === SyntaxKind.ComputedPropertyName) {
                if (!tryAddComputedPropertyName((<ComputedPropertyName>name).expression, containers, /*includeLastPortion*/ false)) {
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
                ts.compareStringsCaseInsensitive(i1.name, i2.name) ||
                ts.compareStrings(i1.name, i2.name);
        }

        function createNavigateToItem(rawItem: RawNavigateToItem): NavigateToItem {
            const declaration = rawItem.declaration;
            const container = <Declaration>getContainerNode(declaration);
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
                containerName: containerName ? unescapeLeadingUnderscores((<Identifier>containerName).text) : "",
                containerKind: containerName ? getNodeKind(container) : ScriptElementKind.unknown
            };
        }
    }
}
