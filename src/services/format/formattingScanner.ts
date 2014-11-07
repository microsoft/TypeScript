/// <reference path="..\..\compiler\scanner.ts"/>

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
        Scan,
        RescanGreaterThanToken,
        RescanSlashToken
    }

    export function getFormattingScanner(sourceFile: SourceFile, startPos: number, endPos: number): FormattingScanner {

        scanner.setText(sourceFile.text);
        scanner.setTextPos(startPos);

        var wasNewLine: boolean = true;
        var leadingTrivia: TextRangeWithKind[];
        var trailingTrivia: TextRangeWithKind[];
        
        var savedPos: number;
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
            var isStarted = scanner.getStartPos() !== startPos;

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
            var pos = scanner.getStartPos();

            while (pos < endPos) {
                var t = scanner.getToken();
                if (!isTrivia(t)) {
                    break;
                }

                // consume leading trivia
                scanner.scan();
                var item = {
                    pos: pos,
                    end: scanner.getStartPos(),
                    kind: t
                }

                pos = scanner.getStartPos();

                if (!leadingTrivia) {
                    leadingTrivia = [];
                }
                leadingTrivia.push(item);
            }

            savedPos = scanner.getStartPos();
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

            var expectedScanAction = 
                shouldRescanSlashToken(n)
                ? ScanAction.RescanGreaterThanToken
                : shouldRescanSlashToken(n) 
                    ? ScanAction.RescanSlashToken 
                    : ScanAction.Scan

            if (lastTokenInfo && expectedScanAction === lastScanAction) {
                return lastTokenInfo;
            }

            if (scanner.getStartPos() !== savedPos) {
                scanner.setTextPos(savedPos);
                scanner.scan();
            }

            var currentToken = scanner.getToken();

            if (expectedScanAction === ScanAction.RescanGreaterThanToken && currentToken === SyntaxKind.GreaterThanToken) {
                currentToken = scanner.reScanGreaterToken();
                Debug.assert((<BinaryExpression>n).operator === currentToken);
                lastScanAction = ScanAction.RescanGreaterThanToken;
            }
            else if (expectedScanAction === ScanAction.RescanSlashToken && startsWithSlashToken(currentToken)) {
                currentToken = scanner.reScanSlashToken();
                Debug.assert(n.kind === currentToken);
                lastScanAction = ScanAction.RescanSlashToken;
            }
            else {
                lastScanAction = ScanAction.Scan;
            }

            var token: TextRangeWithKind = {
                pos: scanner.getStartPos(),
                end: scanner.getTextPos(),
                kind: currentToken
            }

            while(scanner.getStartPos() < endPos) {
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
            return startPos < endPos && current !== SyntaxKind.EndOfFileToken && !isTrivia(current);
        }
    }
}