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

module ts {
    export module OutliningElementsCollector {
        export function collectElements(sourceFile: SourceFile): OutliningSpan[] {
            var elements: OutliningSpan[] = [];
            var collapseText = "...";

            function addOutliningSpan(hintSpanNode: Node, startElement: Node, endElement: Node, autoCollapse: boolean) {
                if (hintSpanNode && startElement && endElement) {
                    var span: OutliningSpan = {
                        textSpan: TextSpan.fromBounds(startElement.pos, endElement.end),
                        hintSpan: TextSpan.fromBounds(hintSpanNode.getStart(), hintSpanNode.end),
                        bannerText: collapseText,
                        autoCollapse: autoCollapse
                    };
                    elements.push(span);
                }
            }

            function autoCollapse(node: Node) {
                switch (node.kind) {
                    case SyntaxKind.ModuleBlock:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                        return false;
                }

                return true;
            }

            var depth = 0;
            var maxDepth = 20;
            function walk(n: Node): void {
                if (depth > maxDepth) {
                    return;
                }
                switch (n.kind) {
                    case SyntaxKind.Block:
                        if (!isFunctionBlock(n)) {
                            var parent = n.parent;
                            var openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                            var closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);

                            // Check if the block is standalone, or 'attached' to some parent statement.
                            // If the latter, we want to collaps the block, but consider its hint span
                            // to be the entire span of the parent.
                            if (parent.kind === SyntaxKind.DoStatement ||
                                parent.kind === SyntaxKind.ForInStatement ||
                                parent.kind === SyntaxKind.ForStatement ||
                                parent.kind === SyntaxKind.IfStatement ||
                                parent.kind === SyntaxKind.WhileStatement ||
                                parent.kind === SyntaxKind.WithStatement ||
                                parent.kind === SyntaxKind.CatchClause) {

                                addOutliningSpan(parent, openBrace, closeBrace, autoCollapse(n));
                            }
                            else {
                                // Block was a standalone block.  In this case we want to only collapse
                                // the span of the block, independent of any parent span.
                                var span = TextSpan.fromBounds(n.getStart(), n.end);
                                elements.push({
                                    textSpan: span,
                                    hintSpan: span,
                                    bannerText: collapseText,
                                    autoCollapse: autoCollapse(n)
                                });
                            }
                            break;
                        }
                        // Fallthrough.

                    case SyntaxKind.ModuleBlock:
                    case SyntaxKind.TryBlock:
                    case SyntaxKind.FinallyBlock:
                        var openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                        var closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);
                        addOutliningSpan(n.parent, openBrace, closeBrace, autoCollapse(n));
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ObjectLiteralExpression:
                    case SyntaxKind.SwitchStatement:
                        var openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                        var closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);
                        addOutliningSpan(n, openBrace, closeBrace, autoCollapse(n));
                        break;
                    case SyntaxKind.ArrayLiteralExpression:
                        var openBracket = findChildOfKind(n, SyntaxKind.OpenBracketToken, sourceFile);
                        var closeBracket = findChildOfKind(n, SyntaxKind.CloseBracketToken, sourceFile);
                        addOutliningSpan(n, openBracket, closeBracket, autoCollapse(n));
                        break;
                }
                depth++;
                forEachChild(n, walk);
                depth--;
            }

            walk(sourceFile);
            return elements;
        }
    }
}