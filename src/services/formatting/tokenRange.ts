///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export namespace Shared {
        export interface ITokenAccess {
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
            isSpecific(): boolean;
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

            public isSpecific() { return true; }
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

            public isSpecific() { return true; }
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

            public isSpecific() { return true; }
        }

        const allTokens: SyntaxKind[] = [];
        for (let token = SyntaxKind.FirstToken; token <= SyntaxKind.LastToken; token++) {
            allTokens.push(token);
        }

        export class TokenAllAccess implements ITokenAccess {
            public GetTokens(): SyntaxKind[] {
                return allTokens;
            }

            public Contains(): boolean {
                return true;
            }

            public toString(): string {
                return "[allTokens]";
            }

            public isSpecific() { return false; }
        }

        export class TokenAllExceptAccess implements ITokenAccess {
            constructor(readonly except: SyntaxKind) {}

            public GetTokens(): SyntaxKind[] {
                return allTokens.filter(t => t !== this.except);
            }

            public Contains(token: SyntaxKind): boolean {
                return token !== this.except;
            }

            public isSpecific() { return false; }
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

            static AnyExcept(token: SyntaxKind): TokenRange {
                return new TokenRange(new TokenAllExceptAccess(token));
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

            public isSpecific() {
                return this.tokenAccess.isSpecific();
            }

            static Any: TokenRange = new TokenRange(new TokenAllAccess());
            static AnyIncludingMultilineComments = TokenRange.FromTokens([...allTokens, SyntaxKind.MultiLineCommentTrivia]);
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
