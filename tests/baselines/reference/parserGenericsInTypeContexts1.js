//// [tests/cases/conformance/parser/ecmascript5/Generics/parserGenericsInTypeContexts1.ts] ////

//// [parserGenericsInTypeContexts1.ts]
class C extends A<T> implements B<T> {
}

var v1: C<T>;
var v2: D<T> = null;
var v3: E.F<T>;
var v3: G.H.I<T>;
var v6: K<T>[];


function f1(a: E<T>) {
}

function f2(): F<T> {
}



//// [parserGenericsInTypeContexts1.js]
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
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A));
var v1;
var v2 = null;
var v3;
var v3;
var v6;
function f1(a) {
}
function f2() {
}
