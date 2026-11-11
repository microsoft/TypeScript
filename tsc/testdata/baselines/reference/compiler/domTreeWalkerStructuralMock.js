//// [tests/cases/compiler/domTreeWalkerStructuralMock.ts] ////

//// [domTreeWalkerStructuralMock.ts]
declare class Walker implements TreeWalker {
    currentNode: Node;
    readonly filter: NodeFilter | null;
    readonly root: Node;
    readonly whatToShow: number;
    firstChild(): Node | null;
    lastChild(): Node | null;
    nextNode(): Node | null;
    nextSibling(): Node | null;
    parentNode(): Node | null;
    previousNode(): Node | null;
    previousSibling(): Node | null;
}

declare const walker: Walker;
const result: TreeWalker = walker;


//// [domTreeWalkerStructuralMock.js]
"use strict";
const result = walker;
