///<reference path='references.ts' />

module TypeScript {
    export class SyntaxIndenter extends SyntaxRewriter {
        private lastTriviaWasNewLine: boolean;
        private indentationTrivia: ISyntaxTrivia;

        constructor(indentFirstToken: boolean,
                    private indentationAmount: number,
                    private options: FormattingOptions) {
            super();
            this.lastTriviaWasNewLine = indentFirstToken;
            this.indentationTrivia = Indentation.indentationTrivia(this.indentationAmount, this.options);
        }

        public visitToken(token: ISyntaxToken): ISyntaxToken {
            if (token.width() === 0) {
                return token;
            }

            var result = token;
            if (this.lastTriviaWasNewLine) {
                // have to add our indentation to every line that this token hits.
                result = token.withLeadingTrivia(this.indentTriviaList(token.leadingTrivia()));
            }

            this.lastTriviaWasNewLine = token.hasTrailingNewLine();
            return result;
        }

        public indentTriviaList(triviaList: ISyntaxTriviaList): ISyntaxTriviaList {
            var result: ISyntaxTrivia[] = [];

            // First, update any existing trivia with the indent amount.  For example, combine the
            // indent with any whitespace trivia, or prepend any comments with the trivia.
            var indentNextTrivia = true;
            for (var i = 0, n = triviaList.count(); i < n; i++) {
                var trivia = triviaList.syntaxTriviaAt(i);

                var indentThisTrivia = indentNextTrivia;
                indentNextTrivia = false;

                switch (trivia.kind()) {
                    case SyntaxKind.MultiLineCommentTrivia:
                        this.indentMultiLineComment(trivia, indentThisTrivia, result);
                        continue;

                    case SyntaxKind.SingleLineCommentTrivia:
                    case SyntaxKind.SkippedTokenTrivia:
                        this.indentSingleLineOrSkippedText(trivia, indentThisTrivia, result);
                        continue;

                    case SyntaxKind.WhitespaceTrivia:
                        this.indentWhitespace(trivia, indentThisTrivia, result);
                        continue;

                    case SyntaxKind.NewLineTrivia:
                        // We hit a newline processing the trivia.  We need to add the indentation to the 
                        // next line as well.  Note: don't bother indenting the newline itself.  This will 
                        // just insert ugly whitespace that most users probably will not want.
                        result.push(trivia);
                        indentNextTrivia = true;
                        continue;

                    default:
                        throw Errors.invalidOperation();
                }
            }

            // Then, if the last trivia was a newline (or there was no trivia at all), then just add the
            // indentation in right before the token.
            if (indentNextTrivia) {
                result.push(this.indentationTrivia);
            }

            return Syntax.triviaList(result);
        }

        private indentSegment(segment: string): string {
            // Find the position of the first non whitespace character in the segment.
            var firstNonWhitespacePosition = Indentation.firstNonWhitespacePosition(segment);

            if (firstNonWhitespacePosition < segment.length &&
                CharacterInfo.isLineTerminator(segment.charCodeAt(firstNonWhitespacePosition))) {

                // If this segment was just a newline, then don't bother indenting it.  That will just
                // leave the user with an ugly indent in their output that they probably do not want.
                return segment;
            }

            // Convert that position to a column.  
            var firstNonWhitespaceColumn = Indentation.columnForPositionInString(segment, firstNonWhitespacePosition, this.options);

            // Find the new column we want the nonwhitespace text to start at.
            var newFirstNonWhitespaceColumn = firstNonWhitespaceColumn + this.indentationAmount;

            // Compute an indentation string for that.
            var indentationString = Indentation.indentationString(newFirstNonWhitespaceColumn, this.options);

            // Join the new indentation and the original string without its indentation.
            return indentationString + segment.substring(firstNonWhitespacePosition);
        }

        private indentWhitespace(trivia: ISyntaxTrivia, indentThisTrivia: boolean, result: ISyntaxTrivia[]): void {
            if (!indentThisTrivia) {
                // Line didn't start with this trivia.  So no need to touch it.  Just add to the result
                // and continue on.
                result.push(trivia);
                return;
            }

            // Line started with this trivia.  We want to figure out what the final column this 
            // whitespace goes to will be.  To do that we add the column it is at now to the column we
            // want to indent to.  We then compute the final tabs+whitespace string for that.
            var newIndentation = this.indentSegment(trivia.fullText());
            result.push(Syntax.whitespace(newIndentation));
        }

        private indentSingleLineOrSkippedText(trivia: ISyntaxTrivia, indentThisTrivia: boolean, result: ISyntaxTrivia[]): void {
            if (indentThisTrivia) {
                // The line started with a comment or skipped text.  Add an indentation based 
                // on the desired settings, and then add the trivia itself.
                result.push(this.indentationTrivia);
            }

            result.push(trivia);
        }

        private indentMultiLineComment(trivia: ISyntaxTrivia, indentThisTrivia: boolean, result: ISyntaxTrivia[]): void {
            if (indentThisTrivia) {
                // The line started with a multiline comment.  Add an indentation based 
                // on the desired settings, and then add the trivia itself.
                result.push(this.indentationTrivia);
            }

            // If the multiline comment spans multiple lines, we need to add the right indent amount to
            // each successive line segment as well.
            var segments = Syntax.splitMultiLineCommentTriviaIntoMultipleLines(trivia);

            for (var i = 1; i < segments.length; i++) {
                segments[i] = this.indentSegment(segments[i]);
            }

            var newText = segments.join("");
            result.push(Syntax.multiLineComment(newText));
        }

        public static indentNode(node: ISyntaxNode, indentFirstToken: boolean, indentAmount: number, options: FormattingOptions): SyntaxNode {
            var indenter = new SyntaxIndenter(indentFirstToken, indentAmount, options);
            return node.accept(indenter);
        }

        public static indentNodes(nodes: SyntaxNode[], indentFirstToken: boolean, indentAmount: number, options: FormattingOptions): SyntaxNode[] {
            // Note: it is necessary for correctness that we reuse the same SyntaxIndenter here.  
            // That's because when working on nodes 1-N, we need to know if the previous node ended
            // with a newline.  The indenter will track that for us.

            var indenter = new SyntaxIndenter(indentFirstToken, indentAmount, options);
            var result: SyntaxNode[] = ArrayUtilities.select<any, any>(nodes, n => n.accept(indenter));

            return result;
        }
    }
}