//// [tests/cases/conformance/statements/returnStatements/returnStatements.ts] ////

//// [returnStatements.ts]
// all the following should be valid
function fn1(): number { return 1; }
function fn2(): string { return ''; }
function fn3(): void { return undefined; }
function fn4(): void { return; }
function fn5(): boolean { return true; }
function fn6(): Date { return new Date(12); }
function fn7(): any { return null; }
function fn8(): any { return; } // OK, eq. to 'return undefined'

interface I { id: number }
class C implements I {
    id: number;
    dispose() {}
}
class D extends C {
    name: string;
}
function fn10(): I { return { id: 12 }; } 

function fn11(): I { return new C(); }
function fn12(): C { return new D(); }
function fn13(): C { return null; }


//// [returnStatements.js]
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
// all the following should be valid
function fn1() { return 1; }
function fn2() { return ''; }
function fn3() { return undefined; }
function fn4() { return; }
function fn5() { return true; }
function fn6() { return new Date(12); }
function fn7() { return null; }
function fn8() { return; } // OK, eq. to 'return undefined'
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.dispose = function () { };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
function fn10() { return { id: 12 }; }
function fn11() { return new C(); }
function fn12() { return new D(); }
function fn13() { return null; }
