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
    export module OutliningElementsCollector {
        export function collectElements(sourceFile: SourceFile): TypeScript.TextSpan[] {
            var elements: TypeScript.TextSpan[] = [];

            function addOutlineRange(startElement: Node, endElement: Node) {
                if (startElement && endElement) {
                    // Push the new range
                    elements.push(TypeScript.TextSpan.fromBounds(startElement.pos, endElement.end));
                }
            }

            function walk(n: Node) {
                switch (n.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ObjectLiteral:
                        var openBrace = forEach(n.getChildren(), c => c.kind === SyntaxKind.OpenBraceToken && c);
                        var closeBrace = forEach(n.getChildren(), c => c.kind === SyntaxKind.CloseBraceToken && c);
                        addOutlineRange(openBrace, closeBrace);
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
                            addOutlineRange(openBrace, closeBrace);
                        }
                        break;
                }
                forEachChild(n, walk);
            }

            walk(sourceFile);
            return elements;
        }
    }
}