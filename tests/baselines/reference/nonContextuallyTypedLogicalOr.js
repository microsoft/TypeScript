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
var c;
var e;
(c || e).dummy;
