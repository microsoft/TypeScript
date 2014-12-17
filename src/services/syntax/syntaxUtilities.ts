///<reference path='references.ts' />

module TypeScript {
    export function childCount(element: ISyntaxElement): number {
        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element).length; }
        return (<ISyntaxNodeOrToken>element).childCount;
    }

    export function childAt(element: ISyntaxElement, index: number): ISyntaxElement {
        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element)[index]; }
        return (<ISyntaxNodeOrToken>element).childAt(index);
    }

    interface ISyntaxNodeInternal extends ISyntaxNode {
        __cachedTokens: ISyntaxToken[];
    }

    class TokenCollectorWalker extends SyntaxWalker {
        public tokens: ISyntaxToken[] = [];

        public visitToken(token: ISyntaxToken): void {
            this.tokens.push(token);
        }
    }

    var tokenCollectorWalker = new TokenCollectorWalker();

    export function getTokens(node: ISyntaxNode): ISyntaxToken[] {
        var tokens = (<ISyntaxNodeInternal>node).__cachedTokens;
        if (!tokens) {
            tokens = [];
            tokenCollectorWalker.tokens = tokens;

            visitNodeOrToken(tokenCollectorWalker, node);

            (<ISyntaxNodeInternal>node).__cachedTokens = tokens;
            tokenCollectorWalker.tokens = undefined;
        }

        return tokens;
    }

    export module SyntaxUtilities {
        export function isAnyFunctionExpressionOrDeclaration(ast: ISyntaxElement): boolean {
            switch (ast.kind) {
                case SyntaxKind.SimpleArrowFunctionExpression:
                case SyntaxKind.ParenthesizedArrowFunctionExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.ConstructorDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return true;
            }

            return false;
        }

        export function isLeftHandSizeExpression(element: ISyntaxElement) {
            if (element) {
                switch (element.kind) {
                    case SyntaxKind.PropertyAccessExpression:
                    case SyntaxKind.ElementAccessExpression:
                    case SyntaxKind.TemplateAccessExpression:
                    case SyntaxKind.ObjectCreationExpression:
                    case SyntaxKind.InvocationExpression:
                    case SyntaxKind.ArrayLiteralExpression:
                    case SyntaxKind.ParenthesizedExpression:
                    case SyntaxKind.ObjectLiteralExpression:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.IdentifierName:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.NullKeyword:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.SuperKeyword:
                        return true;
                }
            }

            return false;
        }

        export function isSwitchClause(element: ISyntaxElement) {
            if (element) {
                switch (element.kind) {
                    case SyntaxKind.CaseSwitchClause:
                    case SyntaxKind.DefaultSwitchClause:
                        return true;
                }
            }

            return false;
        }

        export function isTypeMember(element: ISyntaxElement) {
            if (element) {
                switch (element.kind) {
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.CallSignature:
                        return true;
                }
            }

            return false;
        }

        export function isClassElement(element: ISyntaxElement) {
            if (element) {
                switch (element.kind) {
                    case SyntaxKind.ConstructorDeclaration:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.PropertyDeclaration:
                        return true;
                }
            }

            return false;
        }

        export function isModuleElement(element: ISyntaxElement) {
            if (element) {
                switch (element.kind) {
                    case SyntaxKind.ImportDeclaration:
                    case SyntaxKind.ExportAssignment:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.EnumDeclaration:

                    // Keep in sync with isStatement:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.Block:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.EmptyStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.DebuggerStatement:
                        return true;
                }
            }

            return false;
        }

        export function isStatement(element: ISyntaxElement) {
            if (element) {
                switch (element.kind) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.Block:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.EmptyStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.DebuggerStatement:
                        return true;
                }
            }

            return false;
        }

        export function getToken(list: ISyntaxToken[], kind: SyntaxKind): ISyntaxToken {
            for (var i = 0, n = list.length; i < n; i++) {
                var token = list[i];
                if (token.kind === kind) {
                    return token;
                }
            }

            return undefined;
        }

        export function containsToken(list: ISyntaxToken[], kind: SyntaxKind): boolean {
            return !!SyntaxUtilities.getToken(list, kind);
        }
    }
}