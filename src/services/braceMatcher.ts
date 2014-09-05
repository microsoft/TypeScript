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

///<reference path='references.ts' />

module TypeScript.Services {
    export class BraceMatcher {

        // Given a script name and position in the script, return a pair of text range if the 
        // position corresponds to a "brace matchin" characters (e.g. "{" or "(", etc.)
        // If the position is not on any range, return an empty set.
        public static getMatchSpans(syntaxTree: TypeScript.SyntaxTree, position: number): TypeScript.TextSpan[] {
            var result: TypeScript.TextSpan[] = [];

            var token = findToken(syntaxTree.sourceUnit(), position);

            if (start(token) === position) {
                var matchKind = BraceMatcher.getMatchingTokenKind(token);

                if (matchKind !== null) {
                    var parentElement = token.parent;

                    for (var i = 0, n = childCount(parentElement); i < n; i++) {
                        var current = childAt(parentElement, i);

                        if (current !== null && fullWidth(current) > 0) {
                            if (current.kind() === matchKind) {
                                var range1 = new TypeScript.TextSpan(start(token), width(token));
                                var range2 = new TypeScript.TextSpan(start(current), width(current));
                                if (range1.start() < range2.start()) {
                                    result.push(range1, range2);
                                }
                                else {
                                    result.push(range2, range1);
                                }
                                break;
                            }
                        }
                    }
                }
            }

            return result;
        }

        private static getMatchingTokenKind(token: TypeScript.ISyntaxToken): TypeScript.SyntaxKind {
            switch (token.kind()) {
                case TypeScript.SyntaxKind.OpenBraceToken: return TypeScript.SyntaxKind.CloseBraceToken
                case TypeScript.SyntaxKind.OpenParenToken: return TypeScript.SyntaxKind.CloseParenToken;
                case TypeScript.SyntaxKind.OpenBracketToken: return TypeScript.SyntaxKind.CloseBracketToken;
                case TypeScript.SyntaxKind.LessThanToken: return TypeScript.SyntaxKind.GreaterThanToken;
                case TypeScript.SyntaxKind.CloseBraceToken: return TypeScript.SyntaxKind.OpenBraceToken
                case TypeScript.SyntaxKind.CloseParenToken: return TypeScript.SyntaxKind.OpenParenToken;
                case TypeScript.SyntaxKind.CloseBracketToken: return TypeScript.SyntaxKind.OpenBracketToken;
                case TypeScript.SyntaxKind.GreaterThanToken: return TypeScript.SyntaxKind.LessThanToken;
            }

            return null;
        }
    }
}