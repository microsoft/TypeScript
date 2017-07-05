///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export namespace Shared {
        export interface ITokenAccess {
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
        }

        export class TokenRangeAccess implements ITokenAccess {
            private tokens: SyntaxKind[];

            constructor(from: SyntaxKind, to: SyntaxKind, except: SyntaxKind[]) {
                this.tokens = [];
                for (let token = from; token <= to; token++) {
                    if (ts.indexOf(except, token) < 0) {
                        this.tokens.push(token);
                    }
                }
            }

            public GetTokens(): SyntaxKind[] {
                return this.tokens;
            }

            public Contains(token: SyntaxKind): boolean {
                return this.tokens.indexOf(token) >= 0;
            }
        }

        export class TokenValuesAccess implements ITokenAccess {
            private tokens: SyntaxKind[];

            constructor(tks: SyntaxKind[]) {
                this.tokens = tks && tks.length ? tks : <SyntaxKind[]>[];
            }

            public GetTokens(): SyntaxKind[] {
                return this.tokens;
            }

            public Contains(token: SyntaxKind): boolean {
                return this.tokens.indexOf(token) >= 0;
            }
        }

        export class TokenSingleValueAccess implements ITokenAccess {
            constructor(public token: SyntaxKind) {
            }

            public GetTokens(): SyntaxKind[] {
                return [this.token];
            }

            public Contains(tokenValue: SyntaxKind): boolean {
                return tokenValue === this.token;
            }
        }

        export class TokenAllAccess implements ITokenAccess {
            public GetTokens(): SyntaxKind[] {
                const result: SyntaxKind[] = [];
                for (let token = SyntaxKind.FirstToken; token <= SyntaxKind.LastToken; token++) {
                    result.push(token);
                }
                return result;
            }

            public Contains(tokenValue: SyntaxKind): boolean {
                return true;
            }

            public toString(): string {
                return "[allTokens]";
            }
        }

        export class TokenRange {
            constructor(public tokenAccess: ITokenAccess) {
            }

            static FromToken(token: SyntaxKind): TokenRange {
                return new TokenRange(new TokenSingleValueAccess(token));
            }

            static FromTokens(tokens: SyntaxKind[]): TokenRange {
                return new TokenRange(new TokenValuesAccess(tokens));
            }

            static FromRange(f: SyntaxKind, to: SyntaxKind, except: SyntaxKind[] = []): TokenRange {
                return new TokenRange(new TokenRangeAccess(f, to, except));
            }

            static AllTokens(): TokenRange {
                return new TokenRange(new TokenAllAccess());
            }

            public GetTokens(): SyntaxKind[] {
                return this.tokenAccess.GetTokens();
            }

            public Contains(token: SyntaxKind): boolean {
                return this.tokenAccess.Contains(token);
            }

            public toString(): string {
                return this.tokenAccess.toString();
            }

            static Any: TokenRange = TokenRange.AllTokens();
            static AnyIncludingMultilineComments = TokenRange.FromTokens(TokenRange.Any.GetTokens().concat([SyntaxKind.MultiLineCommentTrivia]));
            static Keywords = TokenRange.FromRange(SyntaxKind.FirstKeyword, SyntaxKind.LastKeyword);
            static BinaryOperators = TokenRange.FromRange(SyntaxKind.FirstBinaryOperator, SyntaxKind.LastBinaryOperator);
            static BinaryKeywordOperators = TokenRange.FromTokens([SyntaxKind.InKeyword, SyntaxKind.InstanceOfKeyword, SyntaxKind.OfKeyword, SyntaxKind.AsKeyword, SyntaxKind.IsKeyword]);
            static UnaryPrefixOperators = TokenRange.FromTokens([SyntaxKind.PlusPlusToken, SyntaxKind.MinusMinusToken, SyntaxKind.TildeToken, SyntaxKind.ExclamationToken]);
            static UnaryPrefixExpressions = TokenRange.FromTokens([SyntaxKind.NumericLiteral, SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.OpenBracketToken, SyntaxKind.OpenBraceToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            static UnaryPreincrementExpressions = TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            static UnaryPostincrementExpressions = TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword]);
            static UnaryPredecrementExpressions = TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            static UnaryPostdecrementExpressions = TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword]);
            static Comments = TokenRange.FromTokens([SyntaxKind.SingleLineCommentTrivia, SyntaxKind.MultiLineCommentTrivia]);
            static TypeNames = TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.NumberKeyword, SyntaxKind.StringKeyword, SyntaxKind.BooleanKeyword, SyntaxKind.SymbolKeyword, SyntaxKind.VoidKeyword, SyntaxKind.AnyKeyword]);
        }
    }
}
