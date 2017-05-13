///<reference path='references.ts' />

module TypeScript {
    export class SyntaxNode implements ISyntaxNodeOrToken {
        private __kind: SyntaxKind;
        public data: number;
        public parent: ISyntaxElement;

        constructor(data: number) {
            if (data) {
                this.data = data;
            }
        }

        public kind(): SyntaxKind {
            return this.__kind;
        }
    }
}