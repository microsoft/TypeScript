import * as ts from "../_namespaces/ts";

const standardScanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ false, ts.LanguageVariant.Standard);
const jsxScanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ false, ts.LanguageVariant.JSX);

/** @internal */
export interface FormattingScanner {
    advance(): void;
    getStartPos(): number;
    isOnToken(): boolean;
    isOnEOF(): boolean;
    readTokenInfo(n: ts.Node): ts.formatting.TokenInfo;
    readEOFTokenRange(): ts.formatting.TextRangeWithKind;
    getCurrentLeadingTrivia(): ts.formatting.TextRangeWithKind[] | undefined;
    lastTrailingTriviaWasNewLine(): boolean;
    skipToEndOf(node: ts.Node | ts.NodeArray<ts.Node>): void;
    skipToStartOf(node: ts.Node): void;
}

const enum ScanAction {
    Scan,
    RescanGreaterThanToken,
    RescanSlashToken,
    RescanTemplateToken,
    RescanJsxIdentifier,
    RescanJsxText,
    RescanJsxAttributeValue,
}

/** @internal */
export function getFormattingScanner<T>(text: string, languageVariant: ts.LanguageVariant, startPos: number, endPos: number, cb: (scanner: FormattingScanner) => T): T {
    const scanner = languageVariant === ts.LanguageVariant.JSX ? jsxScanner : standardScanner;

    scanner.setText(text);
    scanner.setTextPos(startPos);

    let wasNewLine = true;
    let leadingTrivia: ts.formatting.TextRangeWithTriviaKind[] | undefined;
    let trailingTrivia: ts.formatting.TextRangeWithTriviaKind[] | undefined;

    let savedPos: number;
    let lastScanAction: ScanAction | undefined;
    let lastTokenInfo: ts.formatting.TokenInfo | undefined;

    const res = cb({
        advance,
        readTokenInfo,
        readEOFTokenRange,
        isOnToken,
        isOnEOF,
        getCurrentLeadingTrivia: () => leadingTrivia,
        lastTrailingTriviaWasNewLine: () => wasNewLine,
        skipToEndOf,
        skipToStartOf,
        getStartPos: () => lastTokenInfo?.token.pos ?? scanner.getTokenPos(),
    });

    lastTokenInfo = undefined;
    scanner.setText(undefined);

    return res;

    function advance(): void {
        lastTokenInfo = undefined;
        const isStarted = scanner.getStartPos() !== startPos;

        if (isStarted) {
            wasNewLine = !!trailingTrivia && ts.last(trailingTrivia).kind === ts.SyntaxKind.NewLineTrivia;
        }
        else {
            scanner.scan();
        }

        leadingTrivia = undefined;
        trailingTrivia = undefined;

        let pos = scanner.getStartPos();

        // Read leading trivia and token
        while (pos < endPos) {
            const t = scanner.getToken();
            if (!ts.isTrivia(t)) {
                break;
            }

            // consume leading trivia
            scanner.scan();
            const item: ts.formatting.TextRangeWithTriviaKind = {
                pos,
                end: scanner.getStartPos(),
                kind: t
            };

            pos = scanner.getStartPos();

            leadingTrivia = ts.append(leadingTrivia, item);
        }

        savedPos = scanner.getStartPos();
    }

    function shouldRescanGreaterThanToken(node: ts.Node): boolean {
        switch (node.kind) {
            case ts.SyntaxKind.GreaterThanEqualsToken:
            case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
            case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
            case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case ts.SyntaxKind.GreaterThanGreaterThanToken:
                return true;
        }

        return false;
    }

    function shouldRescanJsxIdentifier(node: ts.Node): boolean {
        if (node.parent) {
            switch (node.parent.kind) {
                case ts.SyntaxKind.JsxAttribute:
                case ts.SyntaxKind.JsxOpeningElement:
                case ts.SyntaxKind.JsxClosingElement:
                case ts.SyntaxKind.JsxSelfClosingElement:
                    // May parse an identifier like `module-layout`; that will be scanned as a keyword at first, but we should parse the whole thing to get an identifier.
                    return ts.isKeyword(node.kind) || node.kind === ts.SyntaxKind.Identifier;
            }
        }

        return false;
    }

    function shouldRescanJsxText(node: ts.Node): boolean {
        return ts.isJsxText(node);
    }

    function shouldRescanSlashToken(container: ts.Node): boolean {
        return container.kind === ts.SyntaxKind.RegularExpressionLiteral;
    }

    function shouldRescanTemplateToken(container: ts.Node): boolean {
        return container.kind === ts.SyntaxKind.TemplateMiddle ||
            container.kind === ts.SyntaxKind.TemplateTail;
    }

    function shouldRescanJsxAttributeValue(node: ts.Node): boolean {
        return node.parent && ts.isJsxAttribute(node.parent) && node.parent.initializer === node;
    }

    function startsWithSlashToken(t: ts.SyntaxKind): boolean {
        return t === ts.SyntaxKind.SlashToken || t === ts.SyntaxKind.SlashEqualsToken;
    }

    function readTokenInfo(n: ts.Node): ts.formatting.TokenInfo {
        ts.Debug.assert(isOnToken());

        // normally scanner returns the smallest available token
        // check the kind of context node to determine if scanner should have more greedy behavior and consume more text.
        const expectedScanAction = shouldRescanGreaterThanToken(n) ? ScanAction.RescanGreaterThanToken :
            shouldRescanSlashToken(n) ? ScanAction.RescanSlashToken :
            shouldRescanTemplateToken(n) ? ScanAction.RescanTemplateToken :
            shouldRescanJsxIdentifier(n) ? ScanAction.RescanJsxIdentifier :
            shouldRescanJsxText(n) ? ScanAction.RescanJsxText :
            shouldRescanJsxAttributeValue(n) ? ScanAction.RescanJsxAttributeValue :
            ScanAction.Scan;

        if (lastTokenInfo && expectedScanAction === lastScanAction) {
            // readTokenInfo was called before with the same expected scan action.
            // No need to re-scan text, return existing 'lastTokenInfo'
            // it is ok to call fixTokenKind here since it does not affect
            // what portion of text is consumed. In contrast rescanning can change it,
            // i.e. for '>=' when originally scanner eats just one character
            // and rescanning forces it to consume more.
            return fixTokenKind(lastTokenInfo, n);
        }

        if (scanner.getStartPos() !== savedPos) {
            ts.Debug.assert(lastTokenInfo !== undefined);
            // readTokenInfo was called before but scan action differs - rescan text
            scanner.setTextPos(savedPos);
            scanner.scan();
        }

        let currentToken = getNextToken(n, expectedScanAction);

        const token = ts.formatting.createTextRangeWithKind(
            scanner.getStartPos(),
            scanner.getTextPos(),
            currentToken,
        );

        // consume trailing trivia
        if (trailingTrivia) {
            trailingTrivia = undefined;
        }
        while (scanner.getStartPos() < endPos) {
            currentToken = scanner.scan();
            if (!ts.isTrivia(currentToken)) {
                break;
            }
            const trivia = ts.formatting.createTextRangeWithKind(
                scanner.getStartPos(),
                scanner.getTextPos(),
                currentToken,
            );

            if (!trailingTrivia) {
                trailingTrivia = [];
            }

            trailingTrivia.push(trivia);

            if (currentToken === ts.SyntaxKind.NewLineTrivia) {
                // move past new line
                scanner.scan();
                break;
            }
        }

        lastTokenInfo = { leadingTrivia, trailingTrivia, token };

        return fixTokenKind(lastTokenInfo, n);
    }

    function getNextToken(n: ts.Node, expectedScanAction: ScanAction): ts.SyntaxKind {
        const token = scanner.getToken();
        lastScanAction = ScanAction.Scan;
        switch (expectedScanAction) {
            case ScanAction.RescanGreaterThanToken:
                if (token === ts.SyntaxKind.GreaterThanToken) {
                    lastScanAction = ScanAction.RescanGreaterThanToken;
                    const newToken = scanner.reScanGreaterToken();
                    ts.Debug.assert(n.kind === newToken);
                    return newToken;
                }
                break;
            case ScanAction.RescanSlashToken:
                if (startsWithSlashToken(token)) {
                    lastScanAction = ScanAction.RescanSlashToken;
                    const newToken = scanner.reScanSlashToken();
                    ts.Debug.assert(n.kind === newToken);
                    return newToken;
                }
                break;
            case ScanAction.RescanTemplateToken:
                if (token === ts.SyntaxKind.CloseBraceToken) {
                    lastScanAction = ScanAction.RescanTemplateToken;
                    return scanner.reScanTemplateToken(/* isTaggedTemplate */ false);
                }
                break;
            case ScanAction.RescanJsxIdentifier:
                lastScanAction = ScanAction.RescanJsxIdentifier;
                return scanner.scanJsxIdentifier();
            case ScanAction.RescanJsxText:
                lastScanAction = ScanAction.RescanJsxText;
                return scanner.reScanJsxToken(/* allowMultilineJsxText */ false);
            case ScanAction.RescanJsxAttributeValue:
                lastScanAction = ScanAction.RescanJsxAttributeValue;
                return scanner.reScanJsxAttributeValue();
            case ScanAction.Scan:
                break;
            default:
                ts.Debug.assertNever(expectedScanAction);
        }
        return token;
    }

    function readEOFTokenRange(): ts.formatting.TextRangeWithKind<ts.SyntaxKind.EndOfFileToken> {
        ts.Debug.assert(isOnEOF());
        return ts.formatting.createTextRangeWithKind(scanner.getStartPos(), scanner.getTextPos(), ts.SyntaxKind.EndOfFileToken);
    }

    function isOnToken(): boolean {
        const current = lastTokenInfo ? lastTokenInfo.token.kind : scanner.getToken();
        return current !== ts.SyntaxKind.EndOfFileToken && !ts.isTrivia(current);
    }

    function isOnEOF(): boolean {
        const current = lastTokenInfo ? lastTokenInfo.token.kind : scanner.getToken();
        return current === ts.SyntaxKind.EndOfFileToken;
    }

    // when containing node in the tree is token
    // but its kind differs from the kind that was returned by the scanner,
    // then kind needs to be fixed. This might happen in cases
    // when parser interprets token differently, i.e keyword treated as identifier
    function fixTokenKind(tokenInfo: ts.formatting.TokenInfo, container: ts.Node): ts.formatting.TokenInfo {
        if (ts.isToken(container) && tokenInfo.token.kind !== container.kind) {
            tokenInfo.token.kind = container.kind;
        }
        return tokenInfo;
    }

    function skipToEndOf(node: ts.Node | ts.NodeArray<ts.Node>): void {
        scanner.setTextPos(node.end);
        savedPos = scanner.getStartPos();
        lastScanAction = undefined;
        lastTokenInfo = undefined;
        wasNewLine = false;
        leadingTrivia = undefined;
        trailingTrivia = undefined;
    }

    function skipToStartOf(node: ts.Node): void {
        scanner.setTextPos(node.pos);
        savedPos = scanner.getStartPos();
        lastScanAction = undefined;
        lastTokenInfo = undefined;
        wasNewLine = false;
        leadingTrivia = undefined;
        trailingTrivia = undefined;
    }
}
