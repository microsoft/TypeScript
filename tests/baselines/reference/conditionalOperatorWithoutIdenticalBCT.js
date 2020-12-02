//// [conditionalOperatorWithoutIdenticalBCT.ts]
//Cond ? Expr1 : Expr2,  Expr1 and Expr2 have no identical best common type
class X { propertyX: any; propertyX1: number; propertyX2: string };
class A extends X { propertyA: number };
class B extends X { propertyB: string };

var x: X;
var a: A;
var b: B;

// No errors anymore, uses union types
true ? a : b;
var result1 = true ? a : b;

//Be contextually typed and and bct is not identical, results in errors that union type is not assignable to target
var result2: A = true ? a : b;
var result3: B = true ? a : b;
var result31: A | B = true ? a : b;

var result4: (t: X) => number = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result5: (t: X) => string = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result6: (t: X) => boolean = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result61: (t: X) => number| string = true ? (m) => m.propertyX1 : (n) => n.propertyX2;


//// [conditionalOperatorWithoutIdenticalBCT.js]
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
//Cond ? Expr1 : Expr2,  Expr1 and Expr2 have no identical best common type
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
;
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(X));
;
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(X));
;
var x;
var a;
var b;
// No errors anymore, uses union types
true ? a : b;
var result1 = true ? a : b;
//Be contextually typed and and bct is not identical, results in errors that union type is not assignable to target
var result2 = true ? a : b;
var result3 = true ? a : b;
var result31 = true ? a : b;
var result4 = true ? function (m) { return m.propertyX1; } : function (n) { return n.propertyX2; };
var result5 = true ? function (m) { return m.propertyX1; } : function (n) { return n.propertyX2; };
var result6 = true ? function (m) { return m.propertyX1; } : function (n) { return n.propertyX2; };
var result61 = true ? function (m) { return m.propertyX1; } : function (n) { return n.propertyX2; };
