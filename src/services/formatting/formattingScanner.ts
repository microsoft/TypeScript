module ts.formatting {
    var scanner = createScanner(ScriptTarget.ES5, /*skipTrivia*/ false);

    export interface FormattingScanner {
        advance(): void;
        isOnToken(): boolean;
        readTokenInfo(n: Node): TokenInfo;
        lastTrailingTriviaWasNewLine(): boolean;
        close(): void;
    }

    export function getFormattingScanner(sourceFile: SourceFile, enclosingNode: Node, range: TextRange): FormattingScanner {

        scanner.setText(sourceFile.text);
        scanner.setTextPos(enclosingNode.pos);

        var wasNewLine: boolean = true;
        var leadingTrivia: TextRangeWithKind[];
        var trailingTrivia: TextRangeWithKind[];
        var savedStartPos: number;
        var lastTokenInfo: TokenInfo;

        return {
            advance: advance,
            readTokenInfo: readTokenInfo,
            isOnToken: isOnToken,
            lastTrailingTriviaWasNewLine: lastTrailingTriviaWasNewLine,
            close: () => scanner.setText(undefined)
        }


        function advance(): void {
            lastTokenInfo = undefined;
            var isStarted = scanner.getStartPos() !== enclosingNode.pos;

            // accumulate leading trivia and token
            if (isStarted) {
                if (trailingTrivia) {
                    Debug.assert(trailingTrivia.length !== 0);
                    wasNewLine = trailingTrivia[trailingTrivia.length - 1].kind === SyntaxKind.NewLineTrivia;
                }
                else {
                    wasNewLine = false;
                }
            }

            leadingTrivia = undefined;
            trailingTrivia = undefined;

            if (!isStarted) {
                scanner.scan();
            }

            var t: SyntaxKind;
            var startPos = scanner.getStartPos();

            while (startPos < range.end) {
                var t = scanner.getToken();
                if (!isTrivia(t)) {
                    break;
                }

                // consume leading trivia
                scanner.scan();
                var item = {
                    pos: startPos,
                    end: scanner.getStartPos(),
                    kind: t
                }

                startPos = scanner.getStartPos();

                if (!leadingTrivia) {
                    leadingTrivia = [];
                }
                leadingTrivia.push(item);
            }

            savedStartPos = scanner.getStartPos();
        }

        function startsWithGreaterThanToken(t: SyntaxKind): boolean {
            switch(t) {
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                    return true;
                default:
                    return false;
            }
        }

        function readTokenInfo(n: Node): TokenInfo {
            if (!isOnToken()) {
                return {
                    leadingTrivia: leadingTrivia,
                    trailingTrivia: undefined,
                    token: undefined
                };

            }
            if (lastTokenInfo) {
                //return lastTokenInfo;
            }

            if (scanner.getStartPos() !== savedStartPos) {
                scanner.setTextPos(savedStartPos);
                scanner.scan();
            }

            var current = scanner.getToken();
            var endPos: number;
            if (n.kind === SyntaxKind.BinaryExpression && startsWithGreaterThanToken((<BinaryExpression>n).operator) && current === SyntaxKind.GreaterThanToken) {
                current = scanner.reScanGreaterToken();
                Debug.assert((<BinaryExpression>n).operator === current);
            }
            else if (n.kind === SyntaxKind.RegularExpressionLiteral && current === SyntaxKind.SlashToken) {
                current = scanner.reScanSlashToken();
                Debug.assert(n.kind === current);
            }

            endPos = scanner.getTextPos();

            var token: TextRangeWithKind = {
                pos: scanner.getStartPos(),
                end: scanner.getTextPos(),
                kind: current
            }

            while(scanner.getStartPos() < range.end) {
                current = scanner.scan();
                if (!isTrivia(current)) {
                    break;
                }
                var trivia = {
                    pos: scanner.getStartPos(),
                    end: scanner.getTextPos(),
                    kind: current
                };

                if (!trailingTrivia) {
                    trailingTrivia = [];
                }

                trailingTrivia.push(trivia);

                if (current === SyntaxKind.NewLineTrivia) {
                    // move past new line
                    scanner.scan();
                    break;
                }
            }

            return lastTokenInfo = {
                leadingTrivia: leadingTrivia,
                trailingTrivia: trailingTrivia,
                token: token
            }
        }

        function isOnToken(): boolean {
            var current = (lastTokenInfo && lastTokenInfo.token.kind) ||  scanner.getToken();
            var startPos = (lastTokenInfo && lastTokenInfo.token.pos) || scanner.getStartPos();
            return startPos < range.end && current !== SyntaxKind.EndOfFileToken && !isTrivia(current);
        }

        function lastTrailingTriviaWasNewLine(): boolean {
            return wasNewLine;
        }
    }
}