///<reference path='references.ts' />

module TypeScript {
    export interface ISyntaxNodeOrToken extends ISyntaxElement {
        childCount: number;
        childAt(index: number): ISyntaxElement;
    }
}