module ts.formatting {

    var internedTabsIndentation: string[];
    var internedSpacesIndentation: string[];

    export function getIndentationString(indentation: number, options: FormatCodeOptions): string {
        if (!options.ConvertTabsToSpaces) {
            var tabs = Math.floor(indentation / options.TabSize);
            var spaces = indentation - tabs * options.TabSize;

            var tabString: string;
            if (!internedTabsIndentation) {
                internedTabsIndentation = [];
            }

            if (internedTabsIndentation[tabs] === undefined) {
                internedTabsIndentation[tabs] = tabString = repeat('\t', tabs);
            }
            else {
                tabString = internedTabsIndentation[tabs];
            }

            return spaces ? tabString + repeat(" ", spaces) : tabString;
        }
        else {
            var spacesString: string;
            var quotient = Math.floor(indentation / options.IndentSize);
            var remainder = indentation % options.IndentSize;
            if (!internedSpacesIndentation) {
                internedSpacesIndentation = [];
            }

            if (internedSpacesIndentation[quotient] === undefined) {
                spacesString = repeat(" ", options.IndentSize * quotient);
                internedSpacesIndentation[quotient] = spacesString;
            }
            else {
                spacesString = internedSpacesIndentation[quotient];
            }

            
            return remainder ? spacesString + repeat(" ", remainder) : spacesString;
        }

        function repeat(value: string, count: number): string {
            var s = "";
            for (var i = 0; i < count; ++i) {
                s += value;
            }

            return s;
        }
    }
}