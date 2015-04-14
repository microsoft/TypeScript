//// [functionExpressionContextualTyping2.ts]
var g0: (n: number, s: string) => number
var i: typeof g0 | ((n: number, s: string) => string);
i = (foo, bar) => { return true; }

class C<T> { }

var j: (c: C<Number>) => number = (j) => { return 1; }
class C<T, U> {
    constructor() {
        var k: (j: T, k: U) => (T|U)[] = (j = 1, k = 0) => {
            return [j, k];
        }
    }
}

//// [functionExpressionContextualTyping2.js]
var g0;
var i;
i = function (foo, bar) { return true; };
var C = (function () {
    function C() {
    }
    return C;
})();
var j = function (j) { return 1; };
var C = (function () {
    function C() {
        var k = function (j, k) {
            if (j === void 0) { j = 1; }
            if (k === void 0) { k = 0; }
            return [j, k];
        };
    }
    return C;
})();
