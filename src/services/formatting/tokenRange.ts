///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export namespace Shared {
        const allTokens: SyntaxKind[] = [];
        for (let token = SyntaxKind.FirstToken; token <= SyntaxKind.LastToken; token++) {
            allTokens.push(token);
        }

        class TokenValuesAccess implements TokenRange {
            constructor(private readonly tokens: SyntaxKind[] = []) { }

            public GetTokens(): SyntaxKind[] {
                return this.tokens;
            }

            public Contains(token: SyntaxKind): boolean {
                return this.tokens.indexOf(token) >= 0;
            }

            public isSpecific() { return true; }
        }

        class TokenSingleValueAccess implements TokenRange {
            constructor(private readonly token: SyntaxKind) {}

            public GetTokens(): SyntaxKind[] {
                return [this.token];
            }

            public Contains(tokenValue: SyntaxKind): boolean {
                return tokenValue === this.token;
            }

            public isSpecific() { return true; }
        }

        class TokenAllAccess implements TokenRange {
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

        class TokenAllExceptAccess implements TokenRange {
            constructor(private readonly except: SyntaxKind) {}

            public GetTokens(): SyntaxKind[] {
                return allTokens.filter(t => t !== this.except);
            }

            public Contains(token: SyntaxKind): boolean {
                return token !== this.except;
            }

            public isSpecific() { return false; }
        }

        export interface TokenRange {
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
            isSpecific(): boolean;
        }

        export namespace TokenRange {
            export function FromToken(token: SyntaxKind): TokenRange {
                return new TokenSingleValueAccess(token);
            }

            export function FromTokens(tokens: SyntaxKind[]): TokenRange {
                return new TokenValuesAccess(tokens);
            }

            export function FromRange(from: SyntaxKind, to: SyntaxKind, except: SyntaxKind[] = []): TokenRange {
                const tokens: SyntaxKind[] = [];
                for (let token = from; token <= to; token++) {
                    if (ts.indexOf(except, token) < 0) {
                        tokens.push(token);
                    }
                }
                return new TokenValuesAccess(tokens);
            }

            export function AnyExcept(token: SyntaxKind): TokenRange {
                return new TokenAllExceptAccess(token);
            }

            export const Any: TokenRange = new TokenAllAccess();
            export const AnyIncludingMultilineComments = TokenRange.FromTokens([...allTokens, SyntaxKind.MultiLineCommentTrivia]);
            export const Keywords = TokenRange.FromRange(SyntaxKind.FirstKeyword, SyntaxKind.LastKeyword);
            export const BinaryOperators = TokenRange.FromRange(SyntaxKind.FirstBinaryOperator, SyntaxKind.LastBinaryOperator);
            export const BinaryKeywordOperators = TokenRange.FromTokens([
                SyntaxKind.InKeyword, SyntaxKind.InstanceOfKeyword, SyntaxKind.OfKeyword, SyntaxKind.AsKeyword, SyntaxKind.IsKeyword]);
            export const UnaryPrefixOperators = TokenRange.FromTokens([
                SyntaxKind.PlusPlusToken, SyntaxKind.MinusMinusToken, SyntaxKind.TildeToken, SyntaxKind.ExclamationToken]);
            export const UnaryPrefixExpressions = TokenRange.FromTokens([
                SyntaxKind.NumericLiteral, SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.OpenBracketToken,
                SyntaxKind.OpenBraceToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            export const UnaryPreincrementExpressions = TokenRange.FromTokens([
                SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            export const UnaryPostincrementExpressions = TokenRange.FromTokens([
                SyntaxKind.Identifier, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword]);
            export const UnaryPredecrementExpressions = TokenRange.FromTokens([
                SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            export const UnaryPostdecrementExpressions = TokenRange.FromTokens([
                SyntaxKind.Identifier, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword]);
            export const Comments = TokenRange.FromTokens([SyntaxKind.SingleLineCommentTrivia, SyntaxKind.MultiLineCommentTrivia]);
            export const TypeNames = TokenRange.FromTokens([
                SyntaxKind.Identifier, SyntaxKind.NumberKeyword, SyntaxKind.StringKeyword, SyntaxKind.BooleanKeyword,
                SyntaxKind.SymbolKeyword, SyntaxKind.VoidKeyword, SyntaxKind.AnyKeyword]);
        }
    }
}
