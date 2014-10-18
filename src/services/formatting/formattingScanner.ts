module ts.formatting {
    var scanner = createScanner(ScriptTarget.ES5, /*skipTrivia*/ false);

    export interface FormattingScanner {
        advance(): void;
        hasToken(): boolean;
        consumeTokenAndTrailingTrivia(n: Node): TokenInfo;
        lastTrailingTriviaWasNewLine(): boolean;
    }

    export function getFormattingScanner(sourceFile: SourceFile, enclosingNode: Node, range: TextRange): FormattingScanner {

        scanner.setText(sourceFile.text);
        scanner.setTextPos(enclosingNode.pos);

        return {
            advance: advance,
            consumeTokenAndTrailingTrivia: consumeTokenAndTrailingTrivia,
            hasToken: hasToken,
            lastTrailingTriviaWasNewLine: lastTrailingTriviaWasNewLine
        }

        var leadingTrivia: TextRangeWithKind[];
        var trailingTrivia: TextRangeWithKind[];
        var token: TextRangeWithKind;
        var wasNewLine: boolean = true;
        var savedStartPos: number;

        function advance(): void {
            // accumulate leading trivia and token
            if (trailingTrivia) {
                Debug.assert(trailingTrivia.length);
                wasNewLine = trailingTrivia[trailingTrivia.length - 1].kind === SyntaxKind.NewLineTrivia;
            }

            leadingTrivia = undefined;
            trailingTrivia = undefined;
            token = undefined;

            if (scanner.getStartPos() === enclosingNode.pos) {
                scanner.scan();
            }

            var t: SyntaxKind;
            var startPos = scanner.getStartPos();

            while (startPos < range.end) {
                var t = scanner.getToken();
                if (token && !isTrivia(t)) {
                    break;
                }

                // advance to the next token
                scanner.scan();

                var item = {
                    pos: startPos,
                    end: scanner.getStartPos(),
                    kind: t
                };

                startPos = scanner.getStartPos();
    
                if (isTrivia(t)) {
                    if (token) {
                        break;
                    }
                    else {
                        if (!leadingTrivia) {
                            leadingTrivia = [];
                        }
                        leadingTrivia.push(item);
                    }
                }
                else {
                    token = item;
                }
            }

            savedStartPos = scanner.getStartPos();
        }

        function consumeTokenAndTrailingTrivia(n: Node): TokenInfo {
            Debug.assert(hasToken());
            if (scanner.getStartPos() !== savedStartPos) {
                scanner.setTextPos(savedStartPos)
            }

            if (n.kind === SyntaxKind.BinaryExpression && token.kind === SyntaxKind.GreaterThanToken) {
                scanner.setTextPos(token.pos);
                scanner.scan();
                token.kind = scanner.reScanGreaterToken();
                token.end = scanner.getTextPos();
                scanner.scan();
            }
            else if (n.kind === SyntaxKind.RegularExpressionLiteral && token.kind === SyntaxKind.SlashToken) {
                scanner.setTextPos(token.pos);
                scanner.scan();
                token.kind = scanner.reScanSlashToken();
                token.end = scanner.getTextPos();
                scanner.scan();
            }

            // scan trailing trivia
            var startPos = scanner.getStartPos();
            while (startPos < range.end) {
                var t = scanner.getToken();                

                if (isTrivia(t) && t !== SyntaxKind.NewLineTrivia) {
                    if (!trailingTrivia) {
                        trailingTrivia = [];
                    }

                    var trivia = {
                        pos: startPos,
                        end: scanner.getStartPos(),
                        kind: t
                    }
                    trailingTrivia.push(trivia);
                }
                else {
                    break;
                }
                scanner.scan();
                startPos = scanner.getStartPos();
            }

            return {
                leadingTrivia: leadingTrivia,
                trailingTrivia: trailingTrivia,
                token: token
            }
        }

        function hasToken(): boolean {
            return token !== undefined;
        }

        function lastTrailingTriviaWasNewLine(): boolean {
            return wasNewLine;
        }
    }

}