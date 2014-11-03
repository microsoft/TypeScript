///<reference path='references.ts' />

module TypeScript {
    export class SyntaxNode implements ISyntaxNode {
        // private __kind: SyntaxKind;
        public __data: number;
        public __cachedTokens: ISyntaxToken[];
        public parent: ISyntaxElement;

        constructor(data: number) {
            if (data) {
                this.__data = data;
            }
        }

        public kind(): SyntaxKind {
            throw Errors.abstract();
        }

        public childCount(): number {
            throw Errors.abstract();
        }

        public childAt(index: number): ISyntaxElement {
            throw Errors.abstract();
        }

        public accept(visitor: ISyntaxVisitor): any {
            throw Errors.abstract();
        }
    }
}