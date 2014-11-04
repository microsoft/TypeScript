///<reference path='references.ts' />

module TypeScript.SyntaxFacts {
    export function isDirectivePrologueElement(node: ISyntaxNodeOrToken): boolean {
        return node.kind === SyntaxKind.ExpressionStatement &&
            (<ExpressionStatementSyntax>node).expression.kind === SyntaxKind.StringLiteral;
    }

    export function isUseStrictDirective(node: ISyntaxNodeOrToken): boolean {
        var expressionStatement = <ExpressionStatementSyntax>node;
        var stringLiteral = <ISyntaxToken>expressionStatement.expression;

        var text = stringLiteral.text();
        return text === '"use strict"' || text === "'use strict'";
    }

    export function isIdentifierNameOrAnyKeyword(token: ISyntaxToken): boolean {
        var tokenKind = token.kind;
        return tokenKind === SyntaxKind.IdentifierName || SyntaxFacts.isAnyKeyword(tokenKind);
    }

    export function isAccessibilityModifier(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
                return true;
        }

        return false;
    }
}