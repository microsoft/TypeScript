
module TypeScript.Indentation {
    // Returns the column that this input string ends at (assuming it starts at column 0).
    export function columnForPositionInString(input: string, position: number, options: FormattingOptions): number {
        return columnForPositionInStringWorker(input, position, 0, options);
    }
    
    function columnForPositionInStringWorker(input: string, position: number, startColumn: number, options: FormattingOptions): number {
        var column = startColumn;
        var spacesPerTab = options.spacesPerTab;

        for (var j = 0; j < position; j++) {
            var ch = input.charCodeAt(j);

            if (ch === CharacterCodes.tab) {
                column += spacesPerTab - column % spacesPerTab;
            }
            else {
                column++;
            }
        }

        return column;
    }

    export function indentationString(column: number, options: FormattingOptions): string {
        var numberOfTabs = 0;
        var numberOfSpaces = Math.max(0, column);

        if (options.useTabs) {
            numberOfTabs = Math.floor(column / options.spacesPerTab);
            numberOfSpaces -= numberOfTabs * options.spacesPerTab;
        }

        return StringUtilities.repeat('\t', numberOfTabs) +
               StringUtilities.repeat(' ', numberOfSpaces);
    }

    export function firstNonWhitespacePosition(value: string): number {
        for (var i = 0; i < value.length; i++) {
            var ch = value.charCodeAt(i);
            if (!CharacterInfo.isWhitespace(ch)) {
                return i;
            }
        }

        return value.length;
    }
}