//// [tests/cases/conformance/expressions/typeGuards/typeGuardFunctionGenerics.ts] ////

//// [typeGuardFunctionGenerics.ts]
class A {
    propA: number;
}

class B {
    propB: number;
}

class C extends A {
    propC: number;
}

declare function isB(p1): p1 is B;
declare function isC(p1): p1 is C;
declare function retC(x): C; 

declare function funA<T>(p1: (p1) => T): T;
declare function funB<T>(p1: (p1) => T, p2: any): p2 is T;
declare function funC<T>(p1: (p1) => p1 is T): T;
declare function funD<T>(p1: (p1) => p1 is T, p2: any): p2 is T;
declare function funE<T, U>(p1: (p1) => p1 is T, p2: U): T;

let a: A;
let test1: boolean = funA(isB);
if (funB(retC, a)) {
    a.propC;
}
let test2: B = funC(isB);
if (funD(isC, a)) {
    a.propC;
}
let test3: B = funE(isB, 1);

//// [typeGuardFunctionGenerics.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A));
var a;
var test1 = funA(isB);
if (funB(retC, a)) {
    a.propC;
}
var test2 = funC(isB);
if (funD(isC, a)) {
    a.propC;
}
var test3 = funE(isB, 1);
