//// [nonContextuallyTypedLogicalOr.ts]
interface Contextual {
    dummy;
    p?: number;
}

interface Ellement {
    dummy;
    p: any;
}

var c: Contextual;
var e: Ellement;

(c || e).dummy;

//// [nonContextuallyTypedLogicalOr.js]
var c;
var e;
(c || e).dummy;
