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
    export class BraceMatcher {

        // Given a script name and position in the script, return a pair of text range if the 
        // position corresponds to a "brace matchin" characters (e.g. "{" or "(", etc.)
        // If the position is not on any range, return an empty set.
        public static getMatchSpans(syntaxTree: TypeScript.SyntaxTree, position: number): TypeScript.TextSpan[] {
            var result: TypeScript.TextSpan[] = [];

            var currentToken = syntaxTree.sourceUnit().findToken(position);

            BraceMatcher.getMatchingCloseBrace(currentToken, position, result);
            BraceMatcher.getMatchingOpenBrace(currentToken, position, result);

            return result;
        }

        private static getMatchingCloseBrace(currentToken: TypeScript.PositionedToken, position: number, result: TypeScript.TextSpan[]) {
            if (currentToken.start() === position) {
                var closingBraceKind = BraceMatcher.getMatchingCloseBraceTokenKind(currentToken);
                if (closingBraceKind !== null) {
                    var parentElement = currentToken.parentElement();
                    var currentPosition = currentToken.parent().fullStart();
                    for (var i = 0, n = parentElement.childCount(); i < n; i++) {
                        var element = parentElement.childAt(i);
                        if (element !== null && element.fullWidth() > 0) {
                            if (element.kind() === closingBraceKind) {
                                var range1 = new TypeScript.TextSpan(position, currentToken.token().width());
                                var range2 = new TypeScript.TextSpan(currentPosition + element.leadingTriviaWidth(), element.width());
                                result.push(range1, range2);
                                break;
                            }

                            currentPosition += element.fullWidth();
                        }
                    }
                }
            }
        }

        private static getMatchingOpenBrace(currentToken: TypeScript.PositionedToken, position: number, result: TypeScript.TextSpan[]) {
            // Check if the current token to the left is a close brace
            if (currentToken.fullStart() === position) {
                currentToken = currentToken.previousToken();
            }

            if (currentToken !== null && currentToken.start() === (position - 1)) {
                var openBraceKind = BraceMatcher.getMatchingOpenBraceTokenKind(currentToken);
                if (openBraceKind !== null) {
                    var parentElement = currentToken.parentElement();
                    var currentPosition = currentToken.parent().fullStart() + parentElement.fullWidth();
                    for (var i = parentElement.childCount() - 1 ; i >= 0; i--) {
                        var element = parentElement.childAt(i);
                        if (element !== null && element.fullWidth() > 0) {
                            if (element.kind() === openBraceKind) {
                                var range1 = new TypeScript.TextSpan(position - 1, currentToken.token().width());
                                var range2 = new TypeScript.TextSpan(currentPosition - element.trailingTriviaWidth() - element.width(), element.width());
                                result.push(range1, range2);
                                break;
                            }

                            currentPosition -= element.fullWidth();
                        }
                    }
                }
            }
        }

        private static getMatchingCloseBraceTokenKind(positionedElement: TypeScript.PositionedElement): TypeScript.SyntaxKind {
            var element = positionedElement !== null && positionedElement.element();
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

        private static getMatchingOpenBraceTokenKind(positionedElement: TypeScript.PositionedElement): TypeScript.SyntaxKind {
            var element = positionedElement !== null && positionedElement.element();
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
