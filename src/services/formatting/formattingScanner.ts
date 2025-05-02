import {
    createTextRangeWithKind,
    TextRangeWithKind,
    TextRangeWithTriviaKind,
    TokenInfo,
} from "../_namespaces/ts.formatting.js";
import {
    append,
    createScanner,
    Debug,
    isJsxAttribute,
    isJsxElement,
    isJsxText,
    isKeyword,
    isToken,
    isTrivia,
    LanguageVariant,
    last,
    Node,
    NodeArray,
    ScriptTarget,
    SyntaxKind,
} from "../_namespaces/ts.js";

const standardScanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false, LanguageVariant.Standard);
const jsxScanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false, LanguageVariant.JSX);

/** @internal */
export interface FormattingScanner {
    advance(): void;
    getTokenFullStart(): number;
    /** @deprecated use {@link getTokenFullStart} */
    getStartPos(): number;
    isOnToken(): boolean;
    isOnEOF(): boolean;
    readTokenInfo(n: Node): TokenInfo;
    readEOFTokenRange(): TextRangeWithKind;
    getCurrentLeadingTrivia(): TextRangeWithKind[] | undefined;
    lastTrailingTriviaWasNewLine(): boolean;
    skipToEndOf(node: Node | NodeArray<Node>): void;
    skipToStartOf(node: Node): void;
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
export function getFormattingScanner<T>(text: string, languageVariant: LanguageVariant, startPos: number, endPos: number, cb: (scanner: FormattingScanner) => T): T {
    const scanner = languageVariant === LanguageVariant.JSX ? jsxScanner : standardScanner;

    scanner.setText(text);
    scanner.resetTokenState(startPos);

    let wasNewLine = true;
    let leadingTrivia: TextRangeWithTriviaKind[] | undefined;
    let trailingTrivia: TextRangeWithTriviaKind[] | undefined;

    let savedPos: number;
    let lastScanAction: ScanAction | undefined;
    let lastTokenInfo: TokenInfo | undefined;

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
        getTokenFullStart: () => lastTokenInfo?.token.pos ?? scanner.getTokenStart(),
        getStartPos: () => lastTokenInfo?.token.pos ?? scanner.getTokenStart(),
    });

    lastTokenInfo = undefined;
    scanner.setText(undefined);

    return res;

    function advance(): void {
        lastTokenInfo = undefined;
        const isStarted = scanner.getTokenFullStart() !== startPos;

        if (isStarted) {
            wasNewLine = !!trailingTrivia && last(trailingTrivia).kind === SyntaxKind.NewLineTrivia;
        }
        else {
            scanner.scan();
        }

        leadingTrivia = undefined;
        trailingTrivia = undefined;

        let pos = scanner.getTokenFullStart();

        // Read leading trivia and token
        while (pos < endPos) {
            const t = scanner.getToken();
            if (!isTrivia(t)) {
                break;
            }

            // consume leading trivia
            scanner.scan();
            const item: TextRangeWithTriviaKind = {
                pos,
                end: scanner.getTokenFullStart(),
                kind: t,
            };

            pos = scanner.getTokenFullStart();

            leadingTrivia = append(leadingTrivia, item);
        }

        savedPos = scanner.getTokenFullStart();
    }

    function shouldRescanGreaterThanToken(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.GreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case SyntaxKind.GreaterThanGreaterThanToken:
                return true;
        }

        return false;
    }

    function shouldRescanJsxIdentifier(node: Node): boolean {
        if (node.parent) {
            switch (node.parent.kind) {
                case SyntaxKind.JsxAttribute:
                case SyntaxKind.JsxOpeningElement:
                case SyntaxKind.JsxClosingElement:
                case SyntaxKind.JsxSelfClosingElement:
                    // May parse an identifier like `module-layout`; that will be scanned as a keyword at first, but we should parse the whole thing to get an identifier.
                    return isKeyword(node.kind) || node.kind === SyntaxKind.Identifier;
            }
        }

        return false;
    }

    function shouldRescanJsxText(node: Node): boolean {
        return isJsxText(node) || isJsxElement(node) && lastTokenInfo?.token.kind === SyntaxKind.JsxText;
    }

    function shouldRescanSlashToken(container: Node): boolean {
        return container.kind === SyntaxKind.RegularExpressionLiteral;
    }

    function shouldRescanTemplateToken(container: Node): boolean {
        return container.kind === SyntaxKind.TemplateMiddle ||
            container.kind === SyntaxKind.TemplateTail;
    }

    function shouldRescanJsxAttributeValue(node: Node): boolean {
        return node.parent && isJsxAttribute(node.parent) && node.parent.initializer === node;
    }

    function startsWithSlashToken(t: SyntaxKind): boolean {
        return t === SyntaxKind.SlashToken || t === SyntaxKind.SlashEqualsToken;
    }

    function readTokenInfo(n: Node): TokenInfo {
        Debug.assert(isOnToken());

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

        if (scanner.getTokenFullStart() !== savedPos) {
            Debug.assert(lastTokenInfo !== undefined);
            // readTokenInfo was called before but scan action differs - rescan text
            scanner.resetTokenState(savedPos);
            scanner.scan();
        }

        let currentToken = getNextToken(n, expectedScanAction);

        const token = createTextRangeWithKind(
            scanner.getTokenFullStart(),
            scanner.getTokenEnd(),
            currentToken,
        );

        // consume trailing trivia
        if (trailingTrivia) {
            trailingTrivia = undefined;
        }
        while (scanner.getTokenFullStart() < endPos) {
            currentToken = scanner.scan();
            if (!isTrivia(currentToken)) {
                break;
            }
            const trivia = createTextRangeWithKind(
                scanner.getTokenFullStart(),
                scanner.getTokenEnd(),
                currentToken,
            );

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

        lastTokenInfo = { leadingTrivia, trailingTrivia, token };

        return fixTokenKind(lastTokenInfo, n);
    }

    function getNextToken(n: Node, expectedScanAction: ScanAction): SyntaxKind {
        const token = scanner.getToken();
        lastScanAction = ScanAction.Scan;
        switch (expectedScanAction) {
            case ScanAction.RescanGreaterThanToken:
                if (token === SyntaxKind.GreaterThanToken) {
                    lastScanAction = ScanAction.RescanGreaterThanToken;
                    const newToken = scanner.reScanGreaterToken();
                    Debug.assert(n.kind === newToken);
                    return newToken;
                }
                break;
            case ScanAction.RescanSlashToken:
                if (startsWithSlashToken(token)) {
                    lastScanAction = ScanAction.RescanSlashToken;
                    const newToken = scanner.reScanSlashToken();
                    Debug.assert(n.kind === newToken);
                    return newToken;
                }
                break;
            case ScanAction.RescanTemplateToken:
                if (token === SyntaxKind.CloseBraceToken) {
                    lastScanAction = ScanAction.RescanTemplateToken;
                    return scanner.reScanTemplateToken(/*isTaggedTemplate*/ false);
                }
                break;
            case ScanAction.RescanJsxIdentifier:
                lastScanAction = ScanAction.RescanJsxIdentifier;
                return scanner.scanJsxIdentifier();
            case ScanAction.RescanJsxText:
                lastScanAction = ScanAction.RescanJsxText;
                return scanner.reScanJsxToken(/*allowMultilineJsxText*/ false);
            case ScanAction.RescanJsxAttributeValue:
                lastScanAction = ScanAction.RescanJsxAttributeValue;
                return scanner.reScanJsxAttributeValue();
            case ScanAction.Scan:
                break;
            default:
                Debug.assertNever(expectedScanAction);
        }
        return token;
    }

    function readEOFTokenRange(): TextRangeWithKind<SyntaxKind.EndOfFileToken> {
        Debug.assert(isOnEOF());
        return createTextRangeWithKind(scanner.getTokenFullStart(), scanner.getTokenEnd(), SyntaxKind.EndOfFileToken);
    }

    function isOnToken(): boolean {
        const current = lastTokenInfo ? lastTokenInfo.token.kind : scanner.getToken();
        return current !== SyntaxKind.EndOfFileToken && !isTrivia(current);
    }

    function isOnEOF(): boolean {
        const current = lastTokenInfo ? lastTokenInfo.token.kind : scanner.getToken();
        return current === SyntaxKind.EndOfFileToken;
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

    function skipToEndOf(node: Node | NodeArray<Node>): void {
        scanner.resetTokenState(node.end);
        savedPos = scanner.getTokenFullStart();
        lastScanAction = undefined;
        lastTokenInfo = undefined;
        wasNewLine = false;
        leadingTrivia = undefined;
        trailingTrivia = undefined;
    }

    function skipToStartOf(node: Node): void {
        scanner.resetTokenState(node.pos);
        savedPos = scanner.getTokenFullStart();
        lastScanAction = undefined;
        lastTokenInfo = undefined;
        wasNewLine = false;
        leadingTrivia = undefined;
        trailingTrivia = undefined;
    }
}
