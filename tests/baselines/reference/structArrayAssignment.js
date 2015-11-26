//// [structArrayAssignment.ts]
// doc 6
// If struct array members are assigned with values of incompatible type, type error will be issued.

class A {}
var a: A;
var b = 1;

struct C { }
var c = new C();
struct D extends C {}
var d = new D();

struct E {}
var e: E;

var structArr: C[];
structArr = new C[5];

structArr[0] = a; // error
structArr[1] = b; // error
structArr[2] = c; // ok
structArr[3] = d; // ok
structArr[4] = e; // error

//// [structArrayAssignment.js]
// doc 6
// If struct array members are assigned with values of incompatible type, type error will be issued.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
})();
var a;
var b = 1;
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    return C;
})();
var c = new C();
var D = (function () {
    var _D = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function D() {
        var obj = new _D();
        _ctor.call(obj);
        return obj;
    }
    D._TO = _D;
    return D;
})();
var d = new D();
var E = (function () {
    var _E = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function E() {
        var obj = new _E();
        _ctor.call(obj);
        return obj;
    }
    E._TO = _E;
    return E;
})();
var e;
var structArr;
structArr = new StructArray(5);
structArr[0] = a; // error
structArr[1] = b; // error
structArr[2] = c; // ok
structArr[3] = d; // ok
structArr[4] = e; // error
