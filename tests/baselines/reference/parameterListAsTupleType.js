//// [parameterListAsTupleType.ts]
function foo(a: number, b: string) {
  return true;
}
type Foops = Parameters<typeof foo>;

const x = (a: number) => 5;
type Xps = Parameters<typeof x>;
const a: Xps = ['should-not-work']; // works, but shouldn't
function t(...args: Xps) {} // should work

class C {
    constructor(a: number, b: string) {
    }
}

type Cps = Parameters<typeof C>; // should not work
type Ccps = ConstructorParameters<typeof C>; // should be [number, string]

class D {
    constructor(a: number, ...rest: string[]) {
    }
}
type Dcps = ConstructorParameters<typeof D>; // should be [number, ...string[]]


//// [parameterListAsTupleType.js]
function foo(a, b) {
    return true;
}
var x = function (a) { return 5; };
var a = ['should-not-work']; // works, but shouldn't
function t() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
} // should work
var C = /** @class */ (function () {
    function C(a, b) {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D(a) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    return D;
}());
