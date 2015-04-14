//// [functionExpressionContextualTyping1.ts]
enum E { red, blue }

var g0: (n: number, s:string) => number;
var g: ((s: string, w: boolean) => void) | ((n: number) => number);
var g1: ((s: string, w: boolean) => void) | ((s: string, w: number) => string);

g1 = (j, m) => { } // Per spec, no contextual signature can be extracted in this case.
g = (k, h=true) => { k.toLowerCase() };
g = (k) => { k.toLowerCase() };
g = (i) => {
    i.toExponential();
    return i;
};  // Per spec, no contextual signature can be extracted in this case.

var h: ((s: string, w: boolean) => void) | ((s: string, w: boolean) => string);
h = (k, h) => { };

var i: typeof g0 | ((n: number, s: string) => string);
i = (foo, bar) => { return foo + 1; }
i = (foo, bar) => { return "hello"; }
var j: (name: string, num: number, boo: boolean) => void;
j = (name, number) => { };

var k: (n: E) => string = (number = 1) => { return "hello"; };
var k1: (n: {}) => string = (number = 1) => { return "hello"; };
class C<T, U> {
    constructor() {
        var k: ((j: T, k: U) => (T|U)[]) | ((j: number,k :U) => number[]) = (j, k) => {
            return [j, k];
        }   // Per spec, no contextual signature can be extracted in this case.
    }
}

//// [functionExpressionContextualTyping1.js]
var E;
(function (E) {
    E[E["red"] = 0] = "red";
    E[E["blue"] = 1] = "blue";
})(E || (E = {}));
var g0;
var g;
var g1;
g1 = function (j, m) { }; // Per spec, no contextual signature can be extracted in this case.
g = function (k, h) {
    if (h === void 0) { h = true; }
    k.toLowerCase();
};
g = function (k) { k.toLowerCase(); };
g = function (i) {
    i.toExponential();
    return i;
}; // Per spec, no contextual signature can be extracted in this case.
var h;
h = function (k, h) { };
var i;
i = function (foo, bar) { return foo + 1; };
i = function (foo, bar) { return "hello"; };
var j;
j = function (name, number) { };
var k = function (number) {
    if (number === void 0) { number = 1; }
    return "hello";
};
var k1 = function (number) {
    if (number === void 0) { number = 1; }
    return "hello";
};
var C = (function () {
    function C() {
        var k = function (j, k) {
            return [j, k];
        }; // Per spec, no contextual signature can be extracted in this case.
    }
    return C;
})();
