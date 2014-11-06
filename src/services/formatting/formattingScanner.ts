module ts.formatting {
    var scanner = createScanner(ScriptTarget.ES5, /*skipTrivia*/ false);

    export interface FormattingScanner {
        advance(): void;
        isOnToken(): boolean;
        readTokenInfo(n: Node): TokenInfo;
        lastTrailingTriviaWasNewLine(): boolean;
        close(): void;
    }

    const enum ScanAction{
        Normal,
        RescanGreaterThanToken,
        RescanSlashToken
    }

    export function getFormattingScanner(sourceFile: SourceFile, enclosingNode: Node, range: TextRange): FormattingScanner {

        scanner.setText(sourceFile.text);
        scanner.setTextPos(enclosingNode.pos);

        var wasNewLine: boolean = true;
        var leadingTrivia: TextRangeWithKind[];
        var trailingTrivia: TextRangeWithKind[];
        
        var savedStartPos: number;
        var lastScanAction: ScanAction;
        var lastTokenInfo: TokenInfo;

        return {
            advance: advance,
            readTokenInfo: readTokenInfo,
            isOnToken: isOnToken,
            lastTrailingTriviaWasNewLine: () => wasNewLine,
            close: () => {
                lastTokenInfo = undefined;
                scanner.setText(undefined);
            }
        }

        function advance(): void {
            lastTokenInfo = undefined;
            var isStarted = scanner.getStartPos() !== enclosingNode.pos;

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

        function shouldRescanGreaterThanToken(container: Node): boolean {
            if (container.kind !== SyntaxKind.BinaryExpression) {
                return false;
            }
            switch ((<BinaryExpression>container).operator) {
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                    return true;
            }

            return false;
        }

        function shouldRescanSlashToken(container: Node): boolean {
            return container.kind === SyntaxKind.RegularExpressionLiteral;
        }

        function startsWithSlashToken(t: SyntaxKind): boolean {
            return t === SyntaxKind.SlashToken || t === SyntaxKind.SlashEqualsToken;
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
                if (shouldRescanGreaterThanToken(n)) {
                    if (lastScanAction === ScanAction.RescanGreaterThanToken) {
                        return lastTokenInfo;
                    }
                }
                else if (shouldRescanSlashToken(n)) {
                    if (lastScanAction === ScanAction.RescanSlashToken) {
                        return lastTokenInfo;
                    }
                }
                else if (lastScanAction === ScanAction.Normal) {
                    return lastTokenInfo;
                }
            }

            if (scanner.getStartPos() !== savedStartPos) {
                scanner.setTextPos(savedStartPos);
                scanner.scan();
            }

            var currentToken = scanner.getToken();
            var endPos: number;

            if (currentToken === SyntaxKind.GreaterThanToken && shouldRescanGreaterThanToken(n)) {
                currentToken = scanner.reScanGreaterToken();
                Debug.assert((<BinaryExpression>n).operator === currentToken);
                lastScanAction = ScanAction.RescanGreaterThanToken;
            }
            else if (n.kind === SyntaxKind.RegularExpressionLiteral && startsWithSlashToken(currentToken)) {
                currentToken = scanner.reScanSlashToken();
                Debug.assert(n.kind === currentToken);
                lastScanAction = ScanAction.RescanSlashToken;
            }
            else {
                lastScanAction = ScanAction.Normal;
            }

            endPos = scanner.getTextPos();

            var token: TextRangeWithKind = {
                pos: scanner.getStartPos(),
                end: scanner.getTextPos(),
                kind: currentToken
            }

            while(scanner.getStartPos() < range.end) {
                currentToken = scanner.scan();
                if (!isTrivia(currentToken)) {
                    break;
                }
                var trivia = {
                    pos: scanner.getStartPos(),
                    end: scanner.getTextPos(),
                    kind: currentToken
                };

                if (!trailingTrivia) {
                    trailingTrivia = [];
                }

                trailingTrivia.push(trivia);

                if (currentToken === SyntaxKind.NewLineTrivia) {
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
    }
}