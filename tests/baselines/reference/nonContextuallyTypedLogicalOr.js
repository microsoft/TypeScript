//// [tests/cases/compiler/nonContextuallyTypedLogicalOr.ts] ////

//// [nonContextuallyTypedLogicalOr.ts]
interface Contextual {
    dummy;
    p?: number;
}

interface Element {
    dummy;
    p: any;
}

var c: Contextual;
var e: Element;

(c || e).dummy;

//// [nonContextuallyTypedLogicalOr.js]
"use strict";
var c;
var e;
(c || e).dummy;
