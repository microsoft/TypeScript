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

module ts.BraceMatcher {

    // Given a script name and position in the script, return a pair of text range if the 
    // position corresponds to a "brace matching" characters (e.g. "{" or "(", etc.)
    // If the position is not on any range, return an empty set.
    export function getMatchSpans(sourceFile: SourceFile, position: number): TypeScript.TextSpan[] {
        var result: TypeScript.TextSpan[] = [];

        var token = getTokenAtPosition(sourceFile, position);

        if (token.getStart() === position) {
            var matchKind = getMatchingTokenKind(token);

            // Ensure that there is a corresponding token to match ours.
            if (matchKind) {
                var parentElement = token.parent;

                var childNodes = parentElement.getChildren();
                for (var i = 0, n = childNodes.length; i < n; i++) {
                    var current = childNodes[i];
                    
                    // TODO(drosen): Check if we need the check on 'current'.
                    if (current && current.getFullWidth() > 0) {
                        if (current.kind === matchKind) {
                            var range1 = new TypeScript.TextSpan(token.getStart(), token.getWidth());
                            var range2 = new TypeScript.TextSpan(current.getStart(), current.getWidth());
                            // TODO(drosen): Does order *really* matter here?
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

    function getMatchingTokenKind(token: Node): ts.SyntaxKind {
        switch (token.kind) {
            case ts.SyntaxKind.OpenBraceToken:    return ts.SyntaxKind.CloseBraceToken
            case ts.SyntaxKind.OpenParenToken:    return ts.SyntaxKind.CloseParenToken;
            case ts.SyntaxKind.OpenBracketToken:  return ts.SyntaxKind.CloseBracketToken;
            case ts.SyntaxKind.LessThanToken:     return ts.SyntaxKind.GreaterThanToken;
            case ts.SyntaxKind.CloseBraceToken:   return ts.SyntaxKind.OpenBraceToken
            case ts.SyntaxKind.CloseParenToken:   return ts.SyntaxKind.OpenParenToken;
            case ts.SyntaxKind.CloseBracketToken: return ts.SyntaxKind.OpenBracketToken;
            case ts.SyntaxKind.GreaterThanToken:  return ts.SyntaxKind.LessThanToken;
        }

        return undefined;
    }
}
