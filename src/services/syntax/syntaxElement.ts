///<reference path='references.ts' />

module TypeScript {
    export function syntaxTree(element: ISyntaxElement): SyntaxTree {
        if (element) {
            // Debug.assert(!isShared(element));

            while (element) {
                if (element.kind() === SyntaxKind.SourceUnit) {
                    return (<SourceUnitSyntax>element).syntaxTree;
                }

                element = element.parent;
            }
        }

        return undefined;
    }

    export function parsedInStrictMode(node: ISyntaxNode): boolean {
        var info = node.__data;
        if (info === undefined) {
            return false;
        }

        return (info & SyntaxConstants.NodeParsedInStrictModeMask) !== 0;
    }

    export function previousToken(token: ISyntaxToken): ISyntaxToken {
        var start = token.fullStart();
        if (start === 0) {
            return undefined;
        }

        return findToken(syntaxTree(token).sourceUnit(), start - 1);
    }

    /**
     * Finds a token according to the following rules:
     * 1) If position matches the End of the node/s FullSpan and the node is SourceUnitSyntax,
     *    then the EOF token is returned.
     *
     *  2) If node.FullSpan.Contains(position) then the token that contains given position is
     *     returned.
     *
     *  3) Otherwise an ArgumentOutOfRangeException is thrown
     *
     * Note: findToken will always return a non-missing token with width greater than or equal to
     * 1 (except for EOF).  Empty tokens synthesized by the parser are never returned.
     */
    export function findToken(sourceUnit: SourceUnitSyntax, position: number): ISyntaxToken {
        if (position < 0) {
            throw Errors.argumentOutOfRange("position");
        }

        var token = findTokenWorker(sourceUnit, 0, position);
        if (token) {
            Debug.assert(token.fullWidth() > 0);
            return token;
        }

        if (position === fullWidth(sourceUnit)) {
            return sourceUnit.endOfFileToken;
        }

        if (position > fullWidth(sourceUnit)) {
            throw Errors.argumentOutOfRange("position");
        }

        throw Errors.invalidOperation();
    }

    export function findSkippedTokenInPositionedToken(positionedToken: ISyntaxToken, position: number): ISyntaxToken {
        var positionInLeadingTriviaList = (position < start(positionedToken));
        return findSkippedTokenInTriviaList(positionedToken, position, /*lookInLeadingTriviaList*/ positionInLeadingTriviaList);
    }

    export function findSkippedTokenInLeadingTriviaList(positionedToken: ISyntaxToken, position: number): ISyntaxToken {
        return findSkippedTokenInTriviaList(positionedToken, position, /*lookInLeadingTriviaList*/ true);
    }

    export function findSkippedTokenInTrailingTriviaList(positionedToken: ISyntaxToken, position: number): ISyntaxToken {
        return findSkippedTokenInTriviaList(positionedToken, position, /*lookInLeadingTriviaList*/ false);
    }

    function findSkippedTokenInTriviaList(positionedToken: ISyntaxToken, position: number, lookInLeadingTriviaList: boolean): ISyntaxToken {
        var triviaList: TypeScript.ISyntaxTriviaList = undefined;
        var fullStart: number;

        if (lookInLeadingTriviaList) {
            triviaList = positionedToken.leadingTrivia();
            fullStart = positionedToken.fullStart();
        }
        else {
            triviaList = positionedToken.trailingTrivia();
            fullStart = end(positionedToken);
        }

        if (triviaList && triviaList.hasSkippedToken()) {
            for (var i = 0, n = triviaList.count(); i < n; i++) {
                var trivia = triviaList.syntaxTriviaAt(i);
                var triviaWidth = trivia.fullWidth();

                if (trivia.isSkippedToken() && position >= fullStart && position <= fullStart + triviaWidth) {
                    return trivia.skippedToken();
                }

                fullStart += triviaWidth;
            }
        }

        return undefined;
    }

    function findTokenWorker(element: ISyntaxElement, elementPosition: number, position: number): ISyntaxToken {
        if (isToken(element)) {
            return <ISyntaxToken>element;
        }

        // Consider: we could use a binary search here to find the child more quickly.
        for (var i = 0, n = childCount(element); i < n; i++) {
            var child = childAt(element, i);

            if (child) {
                var childFullWidth = fullWidth(child);
                var elementEndPosition = elementPosition + childFullWidth;

                if (position < elementEndPosition) {
                    return findTokenWorker(child, elementPosition, position);
                }

                elementPosition = elementEndPosition;
            }
        }

        return undefined;
    }

    function tryGetEndOfFileAt(element: ISyntaxElement, position: number): ISyntaxToken {
        if (element.kind() === SyntaxKind.SourceUnit && position === fullWidth(element)) {
            var sourceUnit = <SourceUnitSyntax>element;
            return sourceUnit.endOfFileToken;
        }

        return undefined;
    }

    export function nextToken(token: ISyntaxToken, text?: ISimpleText): ISyntaxToken {
        if (token.kind() === SyntaxKind.EndOfFileToken) {
            return undefined;
        }

        return findToken(syntaxTree(token).sourceUnit(), fullEnd(token));
    }

    export function isNode(element: ISyntaxElement): boolean {
        if (element) {
            var kind = element.kind();
            return kind >= SyntaxKind.FirstNode && kind <= SyntaxKind.LastNode;
        }

        return false;
    }

    function isTokenKind(kind: SyntaxKind) {
        return kind >= SyntaxKind.FirstToken && kind <= SyntaxKind.LastToken
    }

    export function isToken(element: ISyntaxElement): boolean {
        if (element) {
            return isTokenKind(element.kind());
        }

        return false;
    }

    export function isList(element: ISyntaxElement): boolean {
        return element instanceof Array;
    }

    export function syntaxID(element: ISyntaxElement): number {
        //if (isShared(element)) {
        //    throw Errors.invalidOperation("Should not use shared syntax element as a key.");
        //}

        var obj = <any>element;
        if (obj._syntaxID === undefined) {
            obj._syntaxID = TypeScript.Syntax._nextSyntaxID++;
        }

        return obj._syntaxID;
    }

    function collectTextElements(element: ISyntaxElement, elements: string[], text: ISimpleText): void {
        if (element) {
            if (isToken(element)) {
                elements.push((<ISyntaxToken>element).fullText(text));
            }
            else {
                for (var i = 0, n = childCount(element); i < n; i++) {
                    collectTextElements(childAt(element, i), elements, text);
                }
            }
        }
    }

    export function fullText(element: ISyntaxElement, text?: ISimpleText): string {
        if (isToken(element)) {
            return (<ISyntaxToken>element).fullText(text);
        }

        var elements: string[] = [];
        collectTextElements(element, elements, text);

        return elements.join("");
    }

    export function leadingTriviaWidth(element: ISyntaxElement, text?: ISimpleText): number {
        var token = firstToken(element);
        return token ? token.leadingTriviaWidth(text) : 0;
    }

    export function trailingTriviaWidth(element: ISyntaxElement, text?: ISimpleText): number {
        var token = lastToken(element);
        return token ? token.trailingTriviaWidth(text) : 0;
    }

    export function firstToken(element: ISyntaxElement): ISyntaxToken {
        if (element) {
            var kind = element.kind();

            if (isTokenKind(kind)) {
                return (<ISyntaxToken>element).fullWidth() > 0 || kind === SyntaxKind.EndOfFileToken ? <ISyntaxToken>element : undefined;
            }

            for (var i = 0, n = childCount(element); i < n; i++) {
                var token = firstToken(childAt(element, i));
                if (token) {
                    return token;
                }
            }
        }

        return undefined;
    }

    export function lastToken(element: ISyntaxElement): ISyntaxToken {
        if (isToken(element)) {
            return fullWidth(element) > 0 || element.kind() === SyntaxKind.EndOfFileToken ? <ISyntaxToken>element : undefined;
        }

        if (element.kind() === SyntaxKind.SourceUnit) {
            return (<SourceUnitSyntax>element).endOfFileToken;
        }

        for (var i = childCount(element) - 1; i >= 0; i--) {
            var child = childAt(element, i);
            if (child) {
                var token = lastToken(child);
                if (token) {
                    return token;
                }
            }
        }

        return undefined;
    }

    export function fullStart(element: ISyntaxElement): number {
        // Debug.assert(!isShared(element));
        var token = isToken(element) ? <ISyntaxToken>element : firstToken(element);
        return token ? token.fullStart() : -1;
    }

    export function fullWidth(element: ISyntaxElement): number {
        if (isToken(element)) {
            return (<ISyntaxToken>element).fullWidth();
        }

        var info = data(element);
        return info >>> SyntaxConstants.NodeFullWidthShift;
    }

    export function isIncrementallyUnusable(element: ISyntaxElement): boolean {
        if (isToken(element)) {
            return (<ISyntaxToken>element).isIncrementallyUnusable();
        }

        return (data(element) & SyntaxConstants.NodeIncrementallyUnusableMask) !== 0;
    }

    function data(element: ISyntaxElement): number {
        // Debug.assert(isNode(element) || isList(element));

        // Lists and nodes all have a 'data' element.
        var dataElement = <ISyntaxNode>element;

        var info = dataElement.__data;
        if (info === undefined) {
            info = 0;
        }

        if ((info & SyntaxConstants.NodeDataComputed) === 0) {
            info |= computeData(element);
            dataElement.__data = info;
        }

        return info;
    }

    function computeData(element: ISyntaxElement): number {
        var slotCount = childCount(element);

        var fullWidth = 0;

        // If we have no children (like an OmmittedExpressionSyntax), we're automatically not reusable.
        var isIncrementallyUnusable = slotCount === 0 && !isList(element);

        for (var i = 0, n = slotCount; i < n; i++) {
            var child = childAt(element, i);

            if (child) {
                fullWidth += TypeScript.fullWidth(child);

                isIncrementallyUnusable = isIncrementallyUnusable || TypeScript.isIncrementallyUnusable(child);
            }
        }

        return (fullWidth << SyntaxConstants.NodeFullWidthShift)
            | (isIncrementallyUnusable ? SyntaxConstants.NodeIncrementallyUnusableMask : 0)
            | SyntaxConstants.NodeDataComputed;
    }

    export function start(element: ISyntaxElement, text?: ISimpleText): number {
        var token = isToken(element) ? <ISyntaxToken>element : firstToken(element);
        return token ? token.fullStart() + token.leadingTriviaWidth(text) : -1;
    }

    export function end(element: ISyntaxElement, text?: ISimpleText): number {
        var token = isToken(element) ? <ISyntaxToken>element : lastToken(element);
        return token ? fullEnd(token) - token.trailingTriviaWidth(text) : -1;
    }

    export function width(element: ISyntaxElement, text?: ISimpleText): number {
        if (isToken(element)) {
            return (<ISyntaxToken>element).text().length;
        }
        return fullWidth(element) - leadingTriviaWidth(element, text) - trailingTriviaWidth(element, text);
    }

    export function fullEnd(element: ISyntaxElement): number {
        return fullStart(element) + fullWidth(element);
    }

    export function existsNewLineBetweenTokens(token1: ISyntaxToken, token2: ISyntaxToken, text: ISimpleText) {
        if (token1 === token2) {
            return false;
        }

        if (!token1 || !token2) {
            return true;
        }

        var lineMap = text.lineMap();
        return lineMap.getLineNumberFromPosition(end(token1, text)) !== lineMap.getLineNumberFromPosition(start(token2, text));
    }

    export interface ISyntaxElement {
        kind(): SyntaxKind;
        parent?: ISyntaxElement;
    }

    export interface ISyntaxNode extends ISyntaxNodeOrToken {
        __data: number;
        __cachedTokens: ISyntaxToken[];
    }

    export interface IModuleReferenceSyntax extends ISyntaxNode {
        _moduleReferenceBrand: any;
    }

    export interface IModuleElementSyntax extends ISyntaxNode {
    }

    export interface IStatementSyntax extends IModuleElementSyntax {
        _statementBrand: any;
    }

    export interface ITypeMemberSyntax extends ISyntaxNode {
    }

    export interface IClassElementSyntax extends ISyntaxNode {
    }

    export interface IMemberDeclarationSyntax extends IClassElementSyntax {
    }

    export interface IPropertyAssignmentSyntax extends IClassElementSyntax {
    }

    export interface ISwitchClauseSyntax extends ISyntaxNode {
        _switchClauseBrand: any;
        statements: IStatementSyntax[];
    }

    export interface IExpressionSyntax extends ISyntaxNodeOrToken {
        _expressionBrand: any;
    }

    export interface IUnaryExpressionSyntax extends IExpressionSyntax {
        _unaryExpressionBrand: any;
    }

    export interface IPostfixExpressionSyntax extends IUnaryExpressionSyntax {
        _postfixExpressionBrand: any;
    }

    export interface ILeftHandSideExpressionSyntax extends IPostfixExpressionSyntax {
        _leftHandSideExpressionBrand: any;
    }

    export interface IMemberExpressionSyntax extends ILeftHandSideExpressionSyntax {
        _memberExpressionBrand: any;
    }

    export interface ICallExpressionSyntax extends ILeftHandSideExpressionSyntax {
        _callExpressionBrand: any;
        expression: IExpressionSyntax;
    }

    export interface IPrimaryExpressionSyntax extends IMemberExpressionSyntax {
        _primaryExpressionBrand: any;
    }

    export interface ITypeSyntax extends ISyntaxNodeOrToken {
        _typeBrand: any;
    }

    export interface INameSyntax extends ITypeSyntax {
    }
}