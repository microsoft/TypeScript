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

module ts {

    export interface OutliningSpan {
        /** 
         * @param textSpan The span of the document to actually collapse.
         * @param hintSpan The span of the document to display when the user hovers over the 
         *       collapsed span.
         * @param bannerText The text to display in the editor for the collapsed region.
         * @param autoCollapse Whether or not this region should be automatically collapsed when 
         *        the 'Collapse to Definitions' command is invoked.
         */
        textSpan: TypeScript.TextSpan;
        hintSpan: TypeScript.TextSpan;
        bannerText: string;
        autoCollapse: boolean;
    }

    export module OutliningElementsCollector {
        export function collectElements(sourceFile: SourceFile): OutliningSpan[] {
            var elements: OutliningSpan[] = [];

            function addOutlineRange(node: Node, startElement: Node, endElement: Node) {
                if (node && startElement && endElement) {
                    var span: OutliningSpan = {
                        textSpan: TypeScript.TextSpan.fromBounds(startElement.pos, endElement.end),
                        hintSpan: TypeScript.TextSpan.fromBounds(node.getStart(), node.end),
                        bannerText: "...",
                        autoCollapse: false
                    };
                    elements.push(span);
                }
            }

            var depth = 0;
            var maxDepth = 10;
            function walk(n: Node): void {
                if (depth >= maxDepth) {
                    return;
                }
                switch (n.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ObjectLiteral:
                        var openBrace = forEach(n.getChildren(), c => c.kind === SyntaxKind.OpenBraceToken && c);
                        var closeBrace = forEach(n.getChildren(), c => c.kind === SyntaxKind.CloseBraceToken && c);
                        addOutlineRange(n, openBrace, closeBrace);
                        break;
                    case SyntaxKind.Constructor:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.Method:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        var body = (<FunctionDeclaration>n).body;
                        if (body) {
                            var openBrace = forEach(body.getChildren(), c => c.kind === SyntaxKind.OpenBraceToken && c);
                            var closeBrace = forEach(body.getChildren(), c => c.kind === SyntaxKind.CloseBraceToken && c);
                            addOutlineRange(n, openBrace, closeBrace);
                        }
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