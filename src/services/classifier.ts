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

///<reference path='typescriptServices.ts' />

module TypeScript.Services {
    export enum EndOfLineState {
        Start,
        InMultiLineCommentTrivia,
        InSingleQuoteStringLiteral,
        InDoubleQuoteStringLiteral,
    }

    export enum TokenClass {
        Punctuation,
        Keyword,
        Operator,
        Comment,
        Whitespace,
        Identifier,
        NumberLiteral,
        StringLiteral,
        RegExpLiteral,
    }

    var noRegexTable: boolean[] = [];
    noRegexTable[TypeScript.SyntaxKind.IdentifierName] = true;
    noRegexTable[TypeScript.SyntaxKind.StringLiteral] = true;
    noRegexTable[TypeScript.SyntaxKind.NumericLiteral] = true;
    noRegexTable[TypeScript.SyntaxKind.RegularExpressionLiteral] = true;
    noRegexTable[TypeScript.SyntaxKind.ThisKeyword] = true;
    noRegexTable[TypeScript.SyntaxKind.PlusPlusToken] = true;
    noRegexTable[TypeScript.SyntaxKind.MinusMinusToken] = true;
    noRegexTable[TypeScript.SyntaxKind.CloseParenToken] = true;
    noRegexTable[TypeScript.SyntaxKind.CloseBracketToken] = true;
    noRegexTable[TypeScript.SyntaxKind.CloseBraceToken] = true;
    noRegexTable[TypeScript.SyntaxKind.TrueKeyword] = true;
    noRegexTable[TypeScript.SyntaxKind.FalseKeyword] = true;

    export class Classifier {
        private scanner: TypeScript.Scanner;
        private characterWindow: number[] = TypeScript.ArrayUtilities.createArray<number>(2048, 0);
        private diagnostics: TypeScript.Diagnostic[] = [];

        constructor(public host: IClassifierHost) {
        }

        /// COLORIZATION
        public getClassificationsForLine(text: string, lexState: EndOfLineState): ClassificationResult {
            var offset = 0;
            if (lexState !== EndOfLineState.Start) {
                // If we're in a string literal, then prepend: "\
                // (and a newline).  That way when we lex we'll think we're still in a string literal.
                //
                // If we're in a multiline comment, then prepend: /*
                // (and a newline).  That way when we lex we'll think we're still in a multiline comment.
                if (lexState === EndOfLineState.InDoubleQuoteStringLiteral) {
                    text = '"\\\n' + text;
                }
                else if (lexState === EndOfLineState.InSingleQuoteStringLiteral) {
                    text = "'\\\n" + text;
                }
                else if (lexState === EndOfLineState.InMultiLineCommentTrivia) {
                    text = "/*\n" + text;
                }

                offset = 3;
            }

            var result = new ClassificationResult();
            this.scanner = new TypeScript.Scanner("", TypeScript.SimpleText.fromString(text), TypeScript.LanguageVersion.EcmaScript5, this.characterWindow);

            var lastTokenKind = TypeScript.SyntaxKind.None;

            while (this.scanner.absoluteIndex() < text.length) {
                this.diagnostics.length = 0;
                var token = this.scanner.scan(this.diagnostics, !noRegexTable[lastTokenKind]);
                lastTokenKind = token.tokenKind;

                this.processToken(text, offset, token, result);
            }

            return result;
        }

        private processToken(text: string, offset: number, token: TypeScript.ISyntaxToken, result: ClassificationResult): void {
            this.processTriviaList(text, offset, token.leadingTrivia(), result);
            this.addResult(text, offset, result, token.width(), token.tokenKind);
            this.processTriviaList(text, offset, token.trailingTrivia(), result);

            if (this.scanner.absoluteIndex() >= text.length) {
                // We're at the end.
                if (this.diagnostics.length > 0) {
                    if (this.diagnostics[this.diagnostics.length - 1].diagnosticKey() === TypeScript.DiagnosticCode.AsteriskSlash_expected) {
                        result.finalLexState = EndOfLineState.InMultiLineCommentTrivia;
                        return;
                    }
                }

                if (token.tokenKind === TypeScript.SyntaxKind.StringLiteral) {
                    var tokenText = token.text();
                    if (tokenText.length > 0 && tokenText.charCodeAt(tokenText.length - 1) === TypeScript.CharacterCodes.backslash) {
                        var quoteChar = tokenText.charCodeAt(0);
                        result.finalLexState = quoteChar === TypeScript.CharacterCodes.doubleQuote
                            ? EndOfLineState.InDoubleQuoteStringLiteral
                            : EndOfLineState.InSingleQuoteStringLiteral;
                        return;
                    }
                }
            }
        }

        private processTriviaList(text: string, offset: number, triviaList: TypeScript.ISyntaxTriviaList, result: ClassificationResult): void {
            for (var i = 0, n = triviaList.count(); i < n; i++) {
                var trivia = triviaList.syntaxTriviaAt(i);
                this.addResult(text, offset, result, trivia.fullWidth(), trivia.kind());
            }
        }

        private addResult(text: string, offset: number, result: ClassificationResult, length: number, kind: TypeScript.SyntaxKind): void {
            if (length > 0) {
                // If this is the first classification we're adding to the list, then remove any 
                // offset we have if we were continuing a construct from the previous line.
                if (result.entries.length === 0) {
                    length -= offset;
                }

                result.entries.push(new ClassificationInfo(length, this.classFromKind(kind)));
            }
        }

        private classFromKind(kind: TypeScript.SyntaxKind) {
            if (TypeScript.SyntaxFacts.isAnyKeyword(kind)) {
                return TokenClass.Keyword;
            }
            else if (TypeScript.SyntaxFacts.isBinaryExpressionOperatorToken(kind) ||
                     TypeScript.SyntaxFacts.isPrefixUnaryExpressionOperatorToken(kind)) {
                return TokenClass.Operator;
            }
            else if (TypeScript.SyntaxFacts.isAnyPunctuation(kind)) {
                return TokenClass.Punctuation;
            }

            switch (kind) {
                case TypeScript.SyntaxKind.WhitespaceTrivia:
                    return TokenClass.Whitespace;
                case TypeScript.SyntaxKind.MultiLineCommentTrivia:
                case TypeScript.SyntaxKind.SingleLineCommentTrivia:
                    return TokenClass.Comment;
                case TypeScript.SyntaxKind.NumericLiteral:
                    return TokenClass.NumberLiteral;
                case TypeScript.SyntaxKind.StringLiteral:
                    return TokenClass.StringLiteral;
                case TypeScript.SyntaxKind.RegularExpressionLiteral:
                    return TokenClass.RegExpLiteral;
                case TypeScript.SyntaxKind.IdentifierName:
                default:
                    return TokenClass.Identifier;
            }
        }
    }

    export interface IClassifierHost extends TypeScript.ILogger {
    }

    export class ClassificationResult {
        public finalLexState: EndOfLineState = EndOfLineState.Start;
        public entries: ClassificationInfo[] = [];

        constructor() {
        }
    }

    export class ClassificationInfo {
        constructor(public length: number, public classification: TokenClass) {
        }
    }
}
