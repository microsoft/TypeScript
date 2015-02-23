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
                        var containerName = getContainerName(getContainerNode(declaration));
                        matches = patternMatcher.getMatches(name, containerName);

                        if (!matches) {
                            continue;
                        }
                    }

                    var fileName = sourceFile.fileName;
                    var matchKind = bestMatchKind(matches);
                    rawItems.push({ name, fileName, matchKind, isCaseSensitive: isCaseSensitive(matches), declaration });
                }
            }
        });

        rawItems.sort(compareNavigateToItems);
        if (maxResultCount !== undefined) {
            rawItems = rawItems.slice(0, maxResultCount);
        }

        var items = map(rawItems, createNavigateToItem);

        return items;

        function isCaseSensitive(matches: PatternMatch[]): boolean {
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
            if (declaration.name.kind === SyntaxKind.Identifier ||
                declaration.name.kind === SyntaxKind.StringLiteral ||
                declaration.name.kind === SyntaxKind.NumericLiteral) {

                return (<Identifier>declaration.name).text;
            }

            return undefined;
        }

        function getContainerName(declaration: Declaration): string {
            var name = getDeclarationName(declaration);
            if (name === undefined) {
                return undefined;
            }

            var container = getContainerNode(declaration);
            return container && container.name
                ? getContainerName(container) + "." + name
                : name;
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
                textSpan: createTextSpanFromBounds(declaration.getStart(), declaration.getEnd()),
                // TODO(jfreeman): What should be the containerName when the container has a computed name?
                containerName: container && container.name ? (<Identifier>container.name).text : "",
                containerKind: container && container.name ? getNodeKind(container) : ""
            };
        }
    }
}