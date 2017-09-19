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
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
var m;
(function (m) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    m.c = c;
    var g = /** @class */ (function () {
        function g() {
        }
        return g;
    }());
    m.g = g;
})(m || (m = {}));
var g = /** @class */ (function () {
    function g() {
    }
    return g;
}());
// Just the name
var k = [new c(), new m.c()];
var l = k;
var x = [new g(), new m.g(), function () { return new c(); }];
var y = x;


//// [declFileTypeAnnotationTupleType.d.ts]
declare class c {
}
declare module m {
    class c {
    }
    class g<T> {
    }
}
declare class g<T> {
}
declare var k: [c, m.c];
declare var l: [c, m.c];
declare var x: [g<string>, m.g<number>, () => c];
declare var y: [g<string>, m.g<number>, () => c];
