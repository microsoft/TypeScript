//// [structExtendsEveryObjectType.ts]
interface I {
    foo: string;
}
struct C extends I { } // error, cannot find I

struct C2 extends { foo: string; } { } // error
var x: { foo: string; }
struct C3 extends x { } // error

module M { export var x = 1; }
struct C4 extends M { } // error

function foo() { }
struct C5 extends foo { } // error

struct C6 extends []{ } // error

//// [structExtendsEveryObjectType.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
 // error, cannot find I
 // error, cannot find I
var C2 = (function () {
    var _C2 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C2() {
        var obj = new _C2();
        _ctor.call(obj);
        return obj;
    }
    C2._TO = _C2;
    return C2;
})();
 // error
 // error
var x;
var C3 = (function () {
    var _C3 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C3() {
        var obj = new _C3();
        _ctor.call(obj);
        return obj;
    }
    C3._TO = _C3;
    return C3;
})();
 // error
 // error
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
var C4 = (function () {
    var _C4 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C4() {
        var obj = new _C4();
        _ctor.call(obj);
        return obj;
    }
    C4._TO = _C4;
    return C4;
})();
 // error
 // error
function foo() { }
var C5 = (function () {
    var _C5 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C5() {
        var obj = new _C5();
        _ctor.call(obj);
        return obj;
    }
    C5._TO = _C5;
    return C5;
})();
 // error
 // error
var C6 = (function () {
    var _C6 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C6() {
        var obj = new _C6();
        _ctor.call(obj);
        return obj;
    }
    C6._TO = _C6;
    return C6;
})();
 // error // error
