module ts.NavigateTo {
    type RawNavigateToItem = { name: string; fileName: string; matchKind: MatchKind; declaration: Declaration };

    enum MatchKind {
        none = 0,
        exact = 1,
        substring = 2,
        prefix = 3
    }

    export function getNavigateToItems(program: Program, cancellationToken: CancellationTokenObject, searchValue: string, maxResultCount: number): NavigateToItem[]{
        // Split search value in terms array
        var terms = searchValue.split(" ");

        // default NavigateTo approach: if search term contains only lower-case chars - use case-insensitive search, otherwise switch to case-sensitive version
        var searchTerms = map(terms, t => ({ caseSensitive: hasAnyUpperCaseCharacter(t), term: t }));

        var rawItems: RawNavigateToItem[] = [];

        // Search the declarations in all files and output matched NavigateToItem into array of NavigateToItem[] 
        forEach(program.getSourceFiles(), sourceFile => {
            cancellationToken.throwIfCancellationRequested();

            var fileName = sourceFile.fileName;
            var declarations = sourceFile.getNamedDeclarations();
            for (var i = 0, n = declarations.length; i < n; i++) {
                var declaration = declarations[i];
                // TODO(jfreeman): Skip this declaration if it has a computed name
                var name = (<Identifier>declaration.name).text;
                var matchKind = getMatchKind(searchTerms, name);
                if (matchKind !== MatchKind.none) {
                    rawItems.push({ name, fileName, matchKind, declaration });
                }
            }
        });

        rawItems.sort(compareNavigateToItems);
        if (maxResultCount !== undefined) {
            rawItems = rawItems.slice(0, maxResultCount);
        }

        var items = map(rawItems, createNavigateToItem);

        return items;

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
                matchKind: MatchKind[rawItem.matchKind],
                fileName: rawItem.fileName,
                textSpan: createTextSpanFromBounds(declaration.getStart(), declaration.getEnd()),
                // TODO(jfreeman): What should be the containerName when the container has a computed name?
                containerName: container && container.name ? (<Identifier>container.name).text : "",
                containerKind: container && container.name ? getNodeKind(container) : ""
            };
        }

        function hasAnyUpperCaseCharacter(s: string): boolean {
            for (var i = 0, n = s.length; i < n; i++) {
                var c = s.charCodeAt(i);
                if ((CharacterCodes.A <= c && c <= CharacterCodes.Z) ||
                    (c >= CharacterCodes.maxAsciiCharacter && s.charAt(i).toLocaleLowerCase() !== s.charAt(i))) {
                    return true;
                }
            }

            return false;
        }

        function getMatchKind(searchTerms: { caseSensitive: boolean; term: string }[], name: string): MatchKind {
            var matchKind = MatchKind.none;

            if (name) {
                for (var j = 0, n = searchTerms.length; j < n; j++) {
                    var searchTerm = searchTerms[j];
                    var nameToSearch = searchTerm.caseSensitive ? name : name.toLocaleLowerCase();
                    // in case of case-insensitive search searchTerm.term will already be lower-cased
                    var index = nameToSearch.indexOf(searchTerm.term);
                    if (index < 0) {
                        // Didn't match.
                        return MatchKind.none;
                    }

                    var termKind = MatchKind.substring;
                    if (index === 0) {
                        // here we know that match occur at the beginning of the string.
                        // if search term and declName has the same length - we have an exact match, otherwise declName have longer length and this will be prefix match
                        termKind = name.length === searchTerm.term.length ? MatchKind.exact : MatchKind.prefix;
                    }

                    // Update our match kind if we don't have one, or if this match is better.
                    if (matchKind === MatchKind.none || termKind < matchKind) {
                        matchKind = termKind;
                    }
                }
            }

            return matchKind;
        }
    }
}