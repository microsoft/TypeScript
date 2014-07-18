//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='formatting.ts' />

module TypeScript.Services.Formatting {
    export module Shared {
        export interface ITokenAccess {
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
        }

        export class TokenRangeAccess implements ITokenAccess {
            private tokens: SyntaxKind[];

            constructor(from: SyntaxKind, to: SyntaxKind, except: SyntaxKind[]) {
                this.tokens = [];
                for (var token = from; token <= to; token++) {
                    if (except.indexOf(token) < 0) {
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


            public toString(): string {
                return "[tokenRangeStart=" + SyntaxKind[this.tokens[0]] + "," +
                 "tokenRangeEnd=" + SyntaxKind[this.tokens[this.tokens.length - 1]] + "]";
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
                return tokenValue == this.token;
            }

            public toString(): string {
                return "[singleTokenKind=" + SyntaxKind[this.token] + "]";
            }
        }

        export class TokenAllAccess implements ITokenAccess {
            public GetTokens(): SyntaxKind[] {
                var result: SyntaxKind[] = [];
                for (var token = SyntaxKind.FirstToken; token <= SyntaxKind.LastToken; token++) {
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
            static Operators = TokenRange.FromRange(SyntaxKind.SemicolonToken, SyntaxKind.SlashEqualsToken);
            static BinaryOperators = TokenRange.FromRange(SyntaxKind.LessThanToken, SyntaxKind.SlashEqualsToken);
            static BinaryKeywordOperators = TokenRange.FromTokens([SyntaxKind.InKeyword, SyntaxKind.InstanceOfKeyword]);
            static ReservedKeywords = TokenRange.FromRange(SyntaxKind.FirstFutureReservedStrictKeyword, SyntaxKind.LastFutureReservedStrictKeyword);
            static UnaryPrefixOperators = TokenRange.FromTokens([SyntaxKind.PlusPlusToken, SyntaxKind.MinusMinusToken, SyntaxKind.TildeToken, SyntaxKind.ExclamationToken]);
            static UnaryPrefixExpressions = TokenRange.FromTokens([SyntaxKind.NumericLiteral, SyntaxKind.IdentifierName, SyntaxKind.OpenParenToken, SyntaxKind.OpenBracketToken, SyntaxKind.OpenBraceToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            static UnaryPreincrementExpressions = TokenRange.FromTokens([SyntaxKind.IdentifierName, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            static UnaryPostincrementExpressions = TokenRange.FromTokens([SyntaxKind.IdentifierName, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword]);
            static UnaryPredecrementExpressions = TokenRange.FromTokens([SyntaxKind.IdentifierName, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword]);
            static UnaryPostdecrementExpressions = TokenRange.FromTokens([SyntaxKind.IdentifierName, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword]);
            static Comments = TokenRange.FromTokens([SyntaxKind.SingleLineCommentTrivia, SyntaxKind.MultiLineCommentTrivia]);
            static TypeNames = TokenRange.FromTokens([SyntaxKind.IdentifierName, SyntaxKind.NumberKeyword, SyntaxKind.StringKeyword, SyntaxKind.BooleanKeyword, SyntaxKind.VoidKeyword, SyntaxKind.AnyKeyword]);
        }
    }
}