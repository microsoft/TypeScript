//// [castingTuple.ts]
interface I { }
class A { a = 10; }
class C implements I { c };
class D implements I { d };
class E extends A { e };
class F extends A { f };
enum E1 { one }
enum E2 { one }

// no error
var numStrTuple: [number, string] = [5, "foo"];
var emptyObjTuple = <[{}, {}]>numStrTuple;
var numStrBoolTuple = <[number, string, boolean]>numStrTuple;
var shorter = numStrBoolTuple as [number, string]
var longer = numStrTuple as [number, string, boolean]
var classCDTuple: [C, D] = [new C(), new D()];
var interfaceIITuple = <[I, I]>classCDTuple;
var classCDATuple = <[C, D, A]>classCDTuple;
var eleFromCDA1 = classCDATuple[2]; // A
var eleFromCDA2 = classCDATuple[5]; // C | D | A
var t10: [E1, E2] = [E1.one, E2.one];
var t11 = <[number, number]>t10;
var array1 = <{}[]>emptyObjTuple;
var unionTuple: [C, string | number] = [new C(), "foo"];
var unionTuple2: [C, string | number, D] = [new C(), "foo", new D()];
var unionTuple3: [number, string| number] = [10, "foo"]; 
var unionTuple4 = <[number, number]>unionTuple3; 

// error
var t3 = <[number, number]>numStrTuple;
var t9 = <[A, I]>classCDTuple;
var array1 = <number[]>numStrTuple;
t4[2] = 10;


//// [castingTuple.js]
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
        this.a = 10;
    }
    return A;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
;
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
;
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return E;
}(A));
;
var F = /** @class */ (function (_super) {
    __extends(F, _super);
    function F() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return F;
}(A));
;
var E1;
(function (E1) {
    E1[E1["one"] = 0] = "one";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2[E2["one"] = 0] = "one";
})(E2 || (E2 = {}));
// no error
var numStrTuple = [5, "foo"];
var emptyObjTuple = numStrTuple;
var numStrBoolTuple = numStrTuple;
var shorter = numStrBoolTuple;
var longer = numStrTuple;
var classCDTuple = [new C(), new D()];
var interfaceIITuple = classCDTuple;
var classCDATuple = classCDTuple;
var eleFromCDA1 = classCDATuple[2]; // A
var eleFromCDA2 = classCDATuple[5]; // C | D | A
var t10 = [E1.one, E2.one];
var t11 = t10;
var array1 = emptyObjTuple;
var unionTuple = [new C(), "foo"];
var unionTuple2 = [new C(), "foo", new D()];
var unionTuple3 = [10, "foo"];
var unionTuple4 = unionTuple3;
// error
var t3 = numStrTuple;
var t9 = classCDTuple;
var array1 = numStrTuple;
t4[2] = 10;
