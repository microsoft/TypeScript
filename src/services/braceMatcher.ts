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

            var currentToken = findToken(syntaxTree.sourceUnit(), position);

            BraceMatcher.getMatchingCloseBrace(currentToken, position, result);
            BraceMatcher.getMatchingOpenBrace(currentToken, position, result);

            return result;
        }

        private static getMatchingCloseBrace(currentToken: TypeScript.ISyntaxToken, position: number, result: TypeScript.TextSpan[]) {
            if (start(currentToken) === position) {
                var closingBraceKind = BraceMatcher.getMatchingCloseBraceTokenKind(currentToken);
                if (closingBraceKind !== null) {
                    var parentElement = currentToken.parent
                    var currentPosition = fullStart(currentToken.parent);
                    for (var i = 0, n = childCount(parentElement); i < n; i++) {
                        var element = childAt(parentElement, i);
                        if (element !== null && fullWidth(element) > 0) {
                            if (element.kind() === closingBraceKind) {
                                var range1 = new TypeScript.TextSpan(position, width(currentToken));
                                var range2 = new TypeScript.TextSpan(currentPosition + leadingTriviaWidth(element), width(element));
                                result.push(range1, range2);
                                break;
                            }

                            currentPosition += fullWidth(element);
                        }
                    }
                }
            }
        }

        private static getMatchingOpenBrace(currentToken: TypeScript.ISyntaxToken, position: number, result: TypeScript.TextSpan[]) {
            // Check if the current token to the left is a close brace
            if (currentToken.fullStart() === position) {
                currentToken = previousToken(currentToken);
            }

            if (currentToken !== null && start(currentToken) === (position - 1)) {
                var openBraceKind = BraceMatcher.getMatchingOpenBraceTokenKind(currentToken);
                if (openBraceKind !== null) {
                    var parentElement = currentToken.parent;
                    var currentPosition = fullStart(currentToken.parent) + fullWidth(parentElement);
                    for (var i = childCount(parentElement) - 1 ; i >= 0; i--) {
                        var element = childAt(parentElement, i);
                        if (element !== null && fullWidth(element) > 0) {
                            if (element.kind() === openBraceKind) {
                                var range1 = new TypeScript.TextSpan(position - 1, width(currentToken));
                                var range2 = new TypeScript.TextSpan(currentPosition - lastToken(element).trailingTriviaWidth() - width(element), width(element));
                                result.push(range1, range2);
                                break;
                            }

                            currentPosition -= fullWidth(element);
                        }
                    }
                }
            }
        }

        private static getMatchingCloseBraceTokenKind(positionedElement: TypeScript.ISyntaxElement): TypeScript.SyntaxKind {
            var element = positionedElement !== null && positionedElement;
            switch (element.kind()) {
                case TypeScript.SyntaxKind.OpenBraceToken:
                    return TypeScript.SyntaxKind.CloseBraceToken
                case TypeScript.SyntaxKind.OpenParenToken:
                    return TypeScript.SyntaxKind.CloseParenToken;
                case TypeScript.SyntaxKind.OpenBracketToken:
                    return TypeScript.SyntaxKind.CloseBracketToken;
                case TypeScript.SyntaxKind.LessThanToken:
                    return TypeScript.SyntaxUtilities.isAngleBracket(positionedElement) ? TypeScript.SyntaxKind.GreaterThanToken : null;
            }
            return null;
        }

        private static getMatchingOpenBraceTokenKind(positionedElement: TypeScript.ISyntaxElement): TypeScript.SyntaxKind {
            var element = positionedElement !== null && positionedElement;
            switch (element.kind()) {
                case TypeScript.SyntaxKind.CloseBraceToken:
                    return TypeScript.SyntaxKind.OpenBraceToken
                case TypeScript.SyntaxKind.CloseParenToken:
                    return TypeScript.SyntaxKind.OpenParenToken;
                case TypeScript.SyntaxKind.CloseBracketToken:
                    return TypeScript.SyntaxKind.OpenBracketToken;
                case TypeScript.SyntaxKind.GreaterThanToken:
                    return TypeScript.SyntaxUtilities.isAngleBracket(positionedElement) ? TypeScript.SyntaxKind.LessThanToken : null;
            }
            return null;
        }
    }
}
