// @target: es2015
// @strict: false
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