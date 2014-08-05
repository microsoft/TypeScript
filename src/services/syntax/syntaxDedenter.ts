///<reference path='references.ts' />

module TypeScript {
    export class SyntaxDedenter extends SyntaxRewriter {
        private lastTriviaWasNewLine: boolean;

        constructor(dedentFirstToken: boolean,
                    private dedentationAmount: number,
                    private minimumIndent: number,
                    private options: FormattingOptions) {
            super();
            this.lastTriviaWasNewLine = dedentFirstToken;
        }

        private abort(): void {
            this.lastTriviaWasNewLine = false;
            this.dedentationAmount = 0;
        }

        private isAborted(): boolean {
            return this.dedentationAmount === 0;
        }

        public visitToken(token: ISyntaxToken): ISyntaxToken {
            if (token.width() === 0) {
                return token;
            }

            var result = token;
            if (this.lastTriviaWasNewLine) {
                // have to add our indentation to every line that this token hits.
                result = token.withLeadingTrivia(this.dedentTriviaList(token.leadingTrivia()));
            }

            if (this.isAborted()) {
                // If we've decided to stop dedenting.  Then just return immediately.
                return token;
            }

            this.lastTriviaWasNewLine = token.hasTrailingNewLine();
            return result;
        }

        private dedentTriviaList(triviaList: ISyntaxTriviaList): ISyntaxTriviaList {
            var result: ISyntaxTrivia[] = [];
            var dedentNextWhitespace = true;

            // Keep walking through all our trivia (as long as we haven't decided to stop dedenting).
            // Adjust the indentation on any whitespace trivia at the start of a line, or any multi-line
            // trivia that span multiple lines.
            for (var i = 0, n = triviaList.count(); i < n && !this.isAborted(); i++) {
                var trivia = triviaList.syntaxTriviaAt(i);

                var dedentThisTrivia = dedentNextWhitespace;
                dedentNextWhitespace = false;

                if (dedentThisTrivia) {
                    if (trivia.kind() === SyntaxKind.WhitespaceTrivia) {
                        // We pass in if there was a following newline after this whitespace.  If there 
                        // is, then it's fine if we dedent this newline all the way to 0.  Otherwise,
                        // if the whitespace is followed by something, then we need to determine how 
                        // much of the whitespace we can remove.  If we can't remove all that we want,
                        // we'll need to adjust the dedentAmount.  And, if we can't remove at all, then
                        // we need to stop dedenting entirely.
                        var hasFollowingNewLine = (i < triviaList.count() - 1) &&
                                                  triviaList.syntaxTriviaAt(i + 1).kind() === SyntaxKind.NewLineTrivia;
                        result.push(this.dedentWhitespace(trivia, hasFollowingNewLine));
                        continue;
                    }
                    else if (trivia.kind() !== SyntaxKind.NewLineTrivia) {
                        // We wanted to dedent, but the trivia we're on isn't whitespace and wasn't a 
                        // newline.  That means that we have something like a comment at the beginning
                        // of the line that we can't dedent.  And, if we can't dedent it, then we 
                        // shouldn't dedent this token or any more tokens.
                        this.abort();
                        break;
                    }
                }

                if (trivia.kind() === SyntaxKind.MultiLineCommentTrivia) {
                    // This trivia may span multiple lines.  If it does, we need to dedent each 
                    // successive line of it until it terminates.
                    result.push(this.dedentMultiLineComment(trivia));
                    continue;
                }

                // All other trivia we just append to the list.
                result.push(trivia);
                if (trivia.kind() === SyntaxKind.NewLineTrivia) {
                    // We hit a newline processing the trivia.  We need to add the indentation to the 
                    // next line as well.
                    dedentNextWhitespace = true;
                }
            }

            if (dedentNextWhitespace) {
                // We hit a new line as the last trivia (or there was no trivia).  We want to dedent 
                // the next trivia, but we can't (because the token starts at the start of the line).
                // If we can't dedent this, then we shouldn't dedent anymore.
                this.abort();
            }

            if (this.isAborted()) {
                return triviaList;
            }

            return Syntax.triviaList(result);
        }

        private dedentSegment(segment: string, hasFollowingNewLineTrivia: boolean): string {
            // Find the position of the first non whitespace character in the segment.
            var firstNonWhitespacePosition = Indentation.firstNonWhitespacePosition(segment);

            if (firstNonWhitespacePosition === segment.length) {
                if (hasFollowingNewLineTrivia) {
                    // It was entirely whitespace trivia, with a newline after it.  Just trim this down 
                    // to an empty string.
                    return "";
                }
            }
            else if (CharacterInfo.isLineTerminator(segment.charCodeAt(firstNonWhitespacePosition))) {
                // It was entirely whitespace, with a newline after it.  Just trim this down to 
                // the newline
                return segment.substring(firstNonWhitespacePosition);
            }

            // It was whitespace without a newline following it.  We need to try to dedent this a bit.

            // Convert that position to a column.  
            var firstNonWhitespaceColumn = Indentation.columnForPositionInString(segment, firstNonWhitespacePosition, this.options);

            // Find the new column we want the nonwhitespace text to start at. Ideally it would be 
            // whatever column it was minus the dedentation amount.  However, we won't go below a 
            // specified minimum indent (hence, max(initial - dedentAmount, minIndent).  *But* if 
            // the initial column was less than that minimum indent, then we'll keep it at that column.
            // (hence min(initial, desired)).
            var newFirstNonWhitespaceColumn =
                MathPrototype.min(firstNonWhitespaceColumn,
                MathPrototype.max(firstNonWhitespaceColumn - this.dedentationAmount, this.minimumIndent));

            if (newFirstNonWhitespaceColumn === firstNonWhitespaceColumn) {
                // We aren't able to detent this token.  Abort what we're doing
                this.abort();
                return segment;
            }

            // Update the dedentation amount for all subsequent tokens we run into.
            this.dedentationAmount = firstNonWhitespaceColumn - newFirstNonWhitespaceColumn;
            Debug.assert(this.dedentationAmount >= 0);

            // Compute an indentation string for that.
            var indentationString = Indentation.indentationString(newFirstNonWhitespaceColumn, this.options);

            // Join the new indentation and the original string without its indentation.
            return indentationString + segment.substring(firstNonWhitespacePosition);
        }

        private dedentWhitespace(trivia: ISyntaxTrivia, hasFollowingNewLineTrivia: boolean): ISyntaxTrivia {
            var newIndentation = this.dedentSegment(trivia.fullText(), hasFollowingNewLineTrivia);
            return Syntax.whitespace(newIndentation);
        }

        private dedentMultiLineComment(trivia: ISyntaxTrivia): ISyntaxTrivia {
            var segments = Syntax.splitMultiLineCommentTriviaIntoMultipleLines(trivia);
            if (segments.length === 1) {
                // If there was only one segment, then this wasn't multiline.
                return trivia;
            }

            for (var i = 1; i < segments.length; i++) {
                var segment = segments[i];
                segments[i] = this.dedentSegment(segment, /*hasFollowingNewLineTrivia*/ false);
            }

            var result = segments.join("");

            // Create a new trivia token out of the indented lines.
            return Syntax.multiLineComment(result);
        }

        public static dedentNode<T extends ISyntaxNode>(node: T, dedentFirstToken: boolean, dedentAmount: number, minimumIndent: number, options: FormattingOptions): T {
            var dedenter = new SyntaxDedenter(dedentFirstToken, dedentAmount, minimumIndent, options);
            var result = node.accept(dedenter);

            if (dedenter.isAborted()) {
                // We failed to dedent a token in this node.  Return the original node as is.
                return node;
            }

            return result;
        }
    }
}