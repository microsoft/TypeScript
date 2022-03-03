//// [invalidMultipleVariableDeclarations.ts]
interface I {
    id: number;
}

class C implements I {
    id: number;
    valid: boolean;
}

class C2 extends C {
    name: string;
}

class D<T>{
    source: T;
    recurse: D<T>;
    wrapped: D<D<T>>
}

function F(x: string): number { return 42; }

module M {
    export class A {
        name: string;
    }

    export function F2(x: number): string { return x.toString(); }
}

// all of these are errors
var a: any;
var a = 1;
var a = 'a string';
var a = new C();
var a = new D<string>();
var a = M;

var b: I;
var b = new C();
var b = new C2();

var f = F;
var f = (x: number) => '';

var arr: string[];
var arr = [1, 2, 3, 4];
var arr = [new C(), new C2(), new D<string>()];

var arr2 = [new D<string>()];
var arr2 = new Array<D<number>>();

var m: typeof M;
var m = M.A;

//// [invalidMultipleVariableDeclarations.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(C));
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
function F(x) { return 42; }
var M;
(function (M) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    M.A = A;
    function F2(x) { return x.toString(); }
    M.F2 = F2;
})(M || (M = {}));
// all of these are errors
var a;
var a = 1;
var a = 'a string';
var a = new C();
var a = new D();
var a = M;
var b;
var b = new C();
var b = new C2();
var f = F;
var f = function (x) { return ''; };
var arr;
var arr = [1, 2, 3, 4];
var arr = [new C(), new C2(), new D()];
var arr2 = [new D()];
var arr2 = new Array();
var m;
var m = M.A;
