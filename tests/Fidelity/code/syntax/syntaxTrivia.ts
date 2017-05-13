///<reference path='references.ts' />

module TypeScript {
    export interface ISyntaxTrivia {
        parent?: ISyntaxTriviaList;
        kind(): SyntaxKind;

        isWhitespace(): boolean;
        isComment(): boolean;
        isNewLine(): boolean;
        isSkippedToken(): boolean;

        fullStart(): number;
        fullWidth(): number;

        // Text for this trivia.
        fullText(): string;

        // If this is a skipped token trivia, then this was the token that was skipped.
        skippedToken(): ISyntaxToken;

        clone(): ISyntaxTrivia;
    }
}

module TypeScript.Syntax {
    class AbstractTrivia implements ISyntaxTrivia {
        constructor(private _kind: SyntaxKind) {
        }

        public kind(): SyntaxKind {
            return this._kind;
        }

        public clone(): ISyntaxTrivia {
            throw Errors.abstract();
        }

        public fullStart(): number {
            throw Errors.abstract();
        }

        public fullWidth(): number {
            throw Errors.abstract();
        }

        public fullText(): string {
            throw Errors.abstract();
        }

        public skippedToken(): ISyntaxToken {
            throw Errors.abstract();
        }

        public isWhitespace(): boolean {
            return this.kind() === SyntaxKind.WhitespaceTrivia;
        }

        public isComment(): boolean {
            return this.kind() === SyntaxKind.SingleLineCommentTrivia || this.kind() === SyntaxKind.MultiLineCommentTrivia;
        }

        public isNewLine(): boolean {
            return this.kind() === SyntaxKind.NewLineTrivia;
        }

        public isSkippedToken(): boolean {
            return this.kind() === SyntaxKind.SkippedTokenTrivia;
        }
    }

    class SkippedTokenTrivia extends AbstractTrivia {
        constructor(private _skippedToken: ISyntaxToken, private _fullText: string) {
            super(SyntaxKind.SkippedTokenTrivia);

            _skippedToken.parent = <ISyntaxElement><any>this;
        }

        public clone(): ISyntaxTrivia {
            return new SkippedTokenTrivia(this._skippedToken.clone(), this._fullText);
        }

        public fullStart(): number {
            return this._skippedToken.fullStart();
        }

        public fullWidth(): number {
            return this.fullText().length;
        }

        public fullText(): string {
            return this._fullText;
        }

        public skippedToken(): ISyntaxToken {
            return this._skippedToken;
        }
    }

    class DeferredTrivia extends AbstractTrivia {
        constructor(kind: SyntaxKind, private _text: ISimpleText, private _fullStart: number, private _fullWidth: number) {
            super(kind);
        }

        public clone(): ISyntaxTrivia {
            return new DeferredTrivia(this.kind(), this._text, this._fullStart, this._fullWidth);
        }

        public fullStart(): number {
            return this._fullStart;
        }

        public fullWidth(): number {
            return this._fullWidth;
        }

        public fullText(): string {
            return this._text.substr(this._fullStart, this._fullWidth);
        }

        public skippedToken(): ISyntaxToken {
            throw Errors.invalidOperation();
        }
    }

    export function deferredTrivia(kind: SyntaxKind, text: ISimpleText, fullStart: number, fullWidth: number): ISyntaxTrivia {
        return new DeferredTrivia(kind, text, fullStart, fullWidth);
    }

    export function skippedTokenTrivia(token: ISyntaxToken, text: ISimpleText): ISyntaxTrivia {
        Debug.assert(!token.hasLeadingTrivia());
        Debug.assert(!token.hasTrailingTrivia());
        Debug.assert(token.fullWidth() > 0);
        return new SkippedTokenTrivia(token, token.fullText(text));
    }

    // Breaks a multiline trivia up into individual line components.  If the trivia doesn't span
    // any lines, then the result will be a single string with the entire text of the trivia. 
    // Otherwise, there will be one entry in the array for each line spanned by the trivia.  Each
    // entry will contain the line separator at the end of the string.
    export function splitMultiLineCommentTriviaIntoMultipleLines(trivia: ISyntaxTrivia): string[] {
        // Debug.assert(trivia.kind === SyntaxKind.MultiLineCommentTrivia);
        var result: string[] = [];

        var triviaText = trivia.fullText();
        var currentIndex = 0;

        for (var i = 0; i < triviaText.length; i++) {
            var ch = triviaText.charCodeAt(i);

            // When we run into a newline for the first time, create the string builder and copy
            // all the values up to this newline into it.
            switch (ch) {
                case CharacterCodes.carriageReturn:
                    if (i < triviaText.length - 1 && triviaText.charCodeAt(i + 1) === CharacterCodes.lineFeed) {
                        // Consume the \r
                        i++;
                    }

                // Fall through.

                case CharacterCodes.lineFeed:
                case CharacterCodes.paragraphSeparator:
                case CharacterCodes.lineSeparator:
                    // Eat from the last starting position through to the end of the newline.
                    result.push(triviaText.substring(currentIndex, i + 1));

                    // Set the current index to *after* the newline.
                    currentIndex = i + 1;
                    continue;
            }
        }

        result.push(triviaText.substring(currentIndex));
        return result;
    }
}