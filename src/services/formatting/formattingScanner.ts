/// <reference path="formatting.ts"/>
/// <reference path="..\..\compiler\scanner.ts"/>

module ts.formatting {
    var scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false);

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
        RescanSlashToken,
        RescanTemplateToken
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
            
            // Read leading trivia and token
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

        function shouldRescanTemplateToken(container: Node): boolean {
            return container.kind === SyntaxKind.TemplateMiddle || 
                container.kind === SyntaxKind.TemplateTail;
        }

        function startsWithSlashToken(t: SyntaxKind): boolean {
            return t === SyntaxKind.SlashToken || t === SyntaxKind.SlashEqualsToken;
        }

        function readTokenInfo(n: Node): TokenInfo {
            if (!isOnToken()) {
                // scanner is not on the token (either advance was not called yet or scanner is already past the end position)
                return {
                    leadingTrivia: leadingTrivia,
                    trailingTrivia: undefined,
                    token: undefined
                };
            }

            // normally scanner returns the smallest available token
            // check the kind of context node to determine if scanner should have more greedy behavior and consume more text.
            var expectedScanAction = 
                shouldRescanGreaterThanToken(n)
                ? ScanAction.RescanGreaterThanToken
                : shouldRescanSlashToken(n) 
                    ? ScanAction.RescanSlashToken 
                    : shouldRescanTemplateToken(n)
                        ? ScanAction.RescanTemplateToken
                        : ScanAction.Scan

            if (lastTokenInfo && expectedScanAction === lastScanAction) {
                // readTokenInfo was called before with the same expected scan action.
                // No need to re-scan text, return existing 'lastTokenInfo'
                // it is ok to call fixTokenKind here since it does not affect
                // what portion of text is consumed. In opposize rescanning can change it,
                // i.e. for '>=' when originally scanner eats just one character
                // and rescanning forces it to consume more.
                return fixTokenKind(lastTokenInfo, n);
            }

            if (scanner.getStartPos() !== savedPos) {
                Debug.assert(lastTokenInfo !== undefined);
                // readTokenInfo was called before but scan action differs - rescan text
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
            else if (expectedScanAction === ScanAction.RescanTemplateToken && currentToken === SyntaxKind.CloseBraceToken) {
                currentToken = scanner.reScanTemplateToken();
                lastScanAction = ScanAction.RescanTemplateToken;
            }
            else {
                lastScanAction = ScanAction.Scan;
            }

            var token: TextRangeWithKind = {
                pos: scanner.getStartPos(),
                end: scanner.getTextPos(),
                kind: currentToken
            }

            // consume trailing trivia
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

            lastTokenInfo = {
                leadingTrivia: leadingTrivia,
                trailingTrivia: trailingTrivia,
                token: token
            }

            return fixTokenKind(lastTokenInfo, n);
        }

        function isOnToken(): boolean {
            var current = (lastTokenInfo && lastTokenInfo.token.kind) ||  scanner.getToken();
            var startPos = (lastTokenInfo && lastTokenInfo.token.pos) || scanner.getStartPos();
            return startPos < endPos && current !== SyntaxKind.EndOfFileToken && !isTrivia(current);
        }

        // when containing node in the tree is token 
        // but its kind differs from the kind that was returned by the scanner,
        // then kind needs to be fixed. This might happen in cases 
        // when parser interprets token differently, i.e keyword treated as identifier
        function fixTokenKind(tokenInfo: TokenInfo, container: Node): TokenInfo {
            if (isToken(container) && tokenInfo.token.kind !== container.kind) {
                tokenInfo.token.kind = container.kind;
            }
            return tokenInfo;
        }
    }
}