///<reference path='references.ts' />

module TypeScript.Syntax {
    export var _nextSyntaxID: number = 1;

    export function nodeHasSkippedOrMissingTokens(node: ISyntaxNode): boolean {
        for (var i = 0; i < childCount(node); i++) {
            var child = childAt(node, i);
            if (isToken(child)) {
                var token = <ISyntaxToken>child;
                // If a token is skipped, return true. Or if it is a missing token. The only empty token that is not missing is EOF
                if (token.hasLeadingSkippedToken() || (fullWidth(token) === 0 && token.kind !== SyntaxKind.EndOfFileToken)) {
                    return true;
                }
            }
        }

        return false;
    }

    export function isUnterminatedStringLiteral(token: ISyntaxToken): boolean {
        if (token && token.kind === SyntaxKind.StringLiteral) {
            var text = token.text();
            return text.length < 2 || text.charCodeAt(text.length - 1) !== text.charCodeAt(0);
        }

        return false;
    }

    export function isUnterminatedMultilineCommentTrivia(trivia: ISyntaxTrivia): boolean {
        if (trivia && trivia.kind === SyntaxKind.MultiLineCommentTrivia) {
            var text = trivia.fullText();
            return text.length < 4 || text.substring(text.length - 2) !== "*/";
        }
        return false;
    }

    export function isEntirelyInsideCommentTrivia(trivia: ISyntaxTrivia, fullStart: number, position: number): boolean {
        if (trivia && trivia.isComment() && position > fullStart) {
            var end = fullStart + trivia.fullWidth();
            if (position < end) {
                return true;
            }
            else if (position === end) {
                return trivia.kind === SyntaxKind.SingleLineCommentTrivia || isUnterminatedMultilineCommentTrivia(trivia);
            }
        }

        return false;
    }

    export function getAncestorOfKind(positionedToken: ISyntaxElement, kind: SyntaxKind): ISyntaxElement {
        while (positionedToken && positionedToken.parent) {
            if (positionedToken.parent.kind === kind) {
                return positionedToken.parent;
            }

            positionedToken = positionedToken.parent;
        }

        return undefined;
    }

    export function hasAncestorOfKind(positionedToken: ISyntaxElement, kind: SyntaxKind): boolean {
        return !!getAncestorOfKind(positionedToken, kind);
    }

    export function isIntegerLiteral(expression: IExpressionSyntax): boolean {
        if (expression) {
            switch (expression.kind) {
                case SyntaxKind.PrefixUnaryExpression:
                    var prefixExpr = <PrefixUnaryExpressionSyntax>expression;
                    if (prefixExpr.operatorToken.kind == SyntaxKind.PlusToken || prefixExpr.operatorToken.kind === SyntaxKind.MinusToken) {
                        // Note: if there is a + or - sign, we can only allow a normal integer following
                        // (and not a hex integer).  i.e. -0xA is a legal expression, but it is not a 
                        // *literal*.
                        expression = prefixExpr.operand;
                        return isToken(expression) && IntegerUtilities.isInteger((<ISyntaxToken>expression).text());
                    }

                    return false;

                case SyntaxKind.NumericLiteral:
                    // If it doesn't have a + or -, then either an integer literal or a hex literal
                    // is acceptable.
                    var text = (<ISyntaxToken> expression).text();
                    return IntegerUtilities.isInteger(text) || IntegerUtilities.isHexInteger(text);
            }
        }

        return false;
    }

    export function containingNode(element: ISyntaxElement): ISyntaxNode {
        var current = element.parent;

        while (current && !isNode(current)) {
            current = current.parent;
        }

        return <ISyntaxNode>current;
    }

    export function findTokenOnLeft(sourceUnit: SourceUnitSyntax, position: number): ISyntaxToken {
        var positionedToken = findToken(sourceUnit, position);
        var _start = start(positionedToken);

        // Position better fall within this token.
        // Debug.assert(position >= positionedToken.fullStart());
        // Debug.assert(position < positionedToken.fullEnd() || positionedToken.token().tokenKind === SyntaxKind.EndOfFileToken);

        // if position is after the start of the token, then this token is the token on the left.
        if (position > _start) {
            return positionedToken;
        }

        // we're in the trivia before the start of the token.  Need to return the previous token.
        if (positionedToken.fullStart() === 0) {
            // Already on the first token.  Nothing before us.
            return undefined;
        }

        return previousToken(positionedToken);
    }

    export function findCompleteTokenOnLeft(sourceUnit: SourceUnitSyntax, position: number): ISyntaxToken {
        var positionedToken = findToken(sourceUnit, position);

        // Position better fall within this token.
        // Debug.assert(position >= positionedToken.fullStart());
        // Debug.assert(position < positionedToken.fullEnd() || positionedToken.token().tokenKind === SyntaxKind.EndOfFileToken);

        // if position is after the end of the token, then this token is the token on the left.
        if (width(positionedToken) > 0 && position >= fullEnd(positionedToken)) {
            return positionedToken;
        }

        return previousToken(positionedToken);
    }
}