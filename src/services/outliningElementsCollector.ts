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
    export class OutliningElementsCollector extends TypeScript.DepthLimitedWalker {
        // The maximum depth for collecting spans; this will cause us to miss deeply nested function/modules spans, 
        // but will guarantee performance will not be closely tied to tree depth.
        private static MaximumDepth: number = 10;
        private inObjectLiteralExpression: boolean = false;

        private elements: TypeScript.TextSpan[] = [];

        constructor() {
            super(OutliningElementsCollector.MaximumDepth);
        }

        public visitClassDeclaration(node: TypeScript.ClassDeclarationSyntax): void {
            this.addOutlineRange(node, node.openBraceToken, node.closeBraceToken);
            super.visitClassDeclaration(node);
        }

        public visitInterfaceDeclaration(node: TypeScript.InterfaceDeclarationSyntax): void {
            this.addOutlineRange(node, node.body.openBraceToken, node.body.closeBraceToken);
            super.visitInterfaceDeclaration(node);
        }

        public visitModuleDeclaration(node: TypeScript.ModuleDeclarationSyntax): void {
            this.addOutlineRange(node, node.openBraceToken, node.closeBraceToken);
            super.visitModuleDeclaration(node);
        }

        public visitEnumDeclaration(node: TypeScript.EnumDeclarationSyntax): void {
            this.addOutlineRange(node, node.openBraceToken, node.closeBraceToken);
            super.visitEnumDeclaration(node);
        }

        public visitFunctionDeclaration(node: TypeScript.FunctionDeclarationSyntax): void {
            this.addOutlineRange(node, node.block, node.block);
            super.visitFunctionDeclaration(node);
        }

        public visitFunctionExpression(node: TypeScript.FunctionExpressionSyntax): void {
            this.addOutlineRange(node, node.block, node.block);
            super.visitFunctionExpression(node);
        }

        public visitConstructorDeclaration(node: TypeScript.ConstructorDeclarationSyntax): void {
            this.addOutlineRange(node, node.block, node.block);
            super.visitConstructorDeclaration(node);
        }

        public visitMemberFunctionDeclaration(node: TypeScript.MemberFunctionDeclarationSyntax): void {
            this.addOutlineRange(node, node.block, node.block);
            super.visitMemberFunctionDeclaration(node);
        }

        public visitGetAccessor(node: TypeScript.GetAccessorSyntax): void {
            if (!this.inObjectLiteralExpression) {
                this.addOutlineRange(node, node.block, node.block);
            }
            super.visitGetAccessor(node);
        }

        public visitSetAccessor(node: TypeScript.SetAccessorSyntax): void {
            if (!this.inObjectLiteralExpression) {
                this.addOutlineRange(node, node.block, node.block);
            }
            super.visitSetAccessor(node);
        }

        public visitObjectLiteralExpression(node: TypeScript.ObjectLiteralExpressionSyntax): void {
            var savedInObjectLiteralExpression = this.inObjectLiteralExpression;
            this.inObjectLiteralExpression = true;
            super.visitObjectLiteralExpression(node);
            this.inObjectLiteralExpression = savedInObjectLiteralExpression;
        }

        private addOutlineRange(node: TypeScript.ISyntaxNode, startElement: TypeScript.ISyntaxNodeOrToken, endElement: TypeScript.ISyntaxNodeOrToken) {
            if (startElement && endElement && !isShared(startElement) && !isShared(endElement)) {
                // Compute the position
                var start = TypeScript.start(startElement);
                var end = TypeScript.end(endElement);

                // Push the new range
                this.elements.push(TypeScript.TextSpan.fromBounds(start, end));
            }
        }

        public static collectElements(node: TypeScript.SourceUnitSyntax): TypeScript.TextSpan[] {
            var collector = new OutliningElementsCollector();
            visitNodeOrToken(collector, node);
            return collector.elements;
        }
    }
}
