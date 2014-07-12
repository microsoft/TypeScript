///<reference path='references.ts' />

module TypeScript.Indentation {
    export function columnForEndOfToken(token: ISyntaxToken,
                                        syntaxInformationMap: SyntaxInformationMap,
                                        options: FormattingOptions): number {
        return columnForStartOfToken(token, syntaxInformationMap, options) + token.width();
    }

    export function columnForStartOfToken(token: ISyntaxToken,
                                          syntaxInformationMap: SyntaxInformationMap,
                                          options: FormattingOptions): number {
        // Walk backward from this token until we find the first token in the line.  For each token 
        // we see (that is not the first tokem in line), push the entirety of the text into the text 
        // array.  Then, for the first token, add its text (without its leading trivia) to the text
        // array.  i.e. if we have:
        //
        //      var foo = a => bar();
        //
        // And we want the column for the start of 'bar', then we'll add the underlinded portions to
        // the text array:
        //
        //      var foo = a => bar();
        //                  _
        //                __
        //              __
        //          ____
        //      ____
        var firstTokenInLine = syntaxInformationMap.firstTokenInLineContainingToken(token);
        var leadingTextInReverse: string[] = [];

        var current = token;
        while (current !== firstTokenInLine) {
            current = syntaxInformationMap.previousToken(current);

            if (current === firstTokenInLine) {
                // We're at the first token in teh line.
                // We don't want the leading trivia for this token.  That will be taken care of in
                // columnForFirstNonWhitespaceCharacterInLine.  So just push the trailing trivia
                // and then the token text.
                leadingTextInReverse.push(current.trailingTrivia().fullText());
                leadingTextInReverse.push(current.text());
            }
            else {
                // We're at an intermediate token on the line.  Just push all its text into the array.
                leadingTextInReverse.push(current.fullText());
            }
        }

        // Now, add all trivia to the start of the line on the first token in the list.
        collectLeadingTriviaTextToStartOfLine(firstTokenInLine, leadingTextInReverse);

        return columnForLeadingTextInReverse(leadingTextInReverse, options);
    }

    export function columnForStartOfFirstTokenInLineContainingToken(
            token: ISyntaxToken,
            syntaxInformationMap: SyntaxInformationMap,
            options: FormattingOptions): number {
        // Walk backward through the tokens until we find the first one on the line.
        var firstTokenInLine = syntaxInformationMap.firstTokenInLineContainingToken(token);
        var leadingTextInReverse: string[] = [];

        // Now, add all trivia to the start of the line on the first token in the list.
        collectLeadingTriviaTextToStartOfLine(firstTokenInLine, leadingTextInReverse);

        return columnForLeadingTextInReverse(leadingTextInReverse, options);
    }

    // Collect all the trivia that precedes this token.  Stopping when we hit a newline trivia
    // or a multiline comment that spans multiple lines.  This is meant to be called on the first
    // token in a line.
    function collectLeadingTriviaTextToStartOfLine(firstTokenInLine: ISyntaxToken,
                                                   leadingTextInReverse: string[]) {
        var leadingTrivia = firstTokenInLine.leadingTrivia();

        for (var i = leadingTrivia.count() - 1; i >= 0; i--) {
            var trivia = leadingTrivia.syntaxTriviaAt(i);
            if (trivia.kind() === SyntaxKind.NewLineTrivia) {
                break;
            }

            if (trivia.kind() === SyntaxKind.MultiLineCommentTrivia) {
                var lineSegments = Syntax.splitMultiLineCommentTriviaIntoMultipleLines(trivia);
                leadingTextInReverse.push(ArrayUtilities.last(lineSegments));

                if (lineSegments.length > 0) {
                    // This multiline comment actually spanned multiple lines.  So we're done.
                    break;
                }

                // It was only on a single line, so keep on going.
            }

            leadingTextInReverse.push(trivia.fullText());
        }
    }

    function columnForLeadingTextInReverse(leadingTextInReverse: string[],
                                           options: FormattingOptions): number {
        var column = 0;

        // walk backwards.  This means we're actually walking forward from column 0 to the start of
        // the token.
        for (var i = leadingTextInReverse.length - 1; i >= 0; i--) {
            var text = leadingTextInReverse[i];
            column = columnForPositionInStringWorker(text, text.length, column, options);
       }

        return column;
    }

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
        var numberOfSpaces = MathPrototype.max(0, column);

        if (options.useTabs) {
            numberOfTabs = Math.floor(column / options.spacesPerTab);
            numberOfSpaces -= numberOfTabs * options.spacesPerTab;
        }

        return StringUtilities.repeat('\t', numberOfTabs) +
               StringUtilities.repeat(' ', numberOfSpaces);
    }

    export function indentationTrivia(column: number, options: FormattingOptions): ISyntaxTrivia {
        return Syntax.whitespace(this.indentationString(column, options));
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