//// [tests/cases/compiler/declFileTypeAnnotationTupleType.ts] ////

//// [declFileTypeAnnotationTupleType.ts]
class c {
}
module m {
    export class c {
    }
    export class g<T> {
    }
}
class g<T> {
}

// Just the name
var k: [c, m.c] = [new c(), new m.c()];
var l = k;

var x: [g<string>, m.g<number>, () => c] = [new g<string>(), new m.g<number>(), () => new c()];
var y = x;

//// [declFileTypeAnnotationTupleType.js]
class c {
}
var m;
(function (m) {
    class c {
    }
    m.c = c;
    class g {
    }
    m.g = g;
})(m || (m = {}));
class g {
}
// Just the name
var k = [new c(), new m.c()];
var l = k;
var x = [new g(), new m.g(), () => new c()];
var y = x;
