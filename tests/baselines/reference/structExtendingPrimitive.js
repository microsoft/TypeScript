//// [structExtendingPrimitive.ts]
// structes cannot extend primitives

struct C extends number { }
struct C2 extends string { }
struct C3 extends boolean { }
struct C4 extends Void  { }
struct C4a extends void {}
struct C5 extends Null { }
struct C5a extends null { }
struct C6 extends undefined { }
struct C7 extends Undefined { }

enum E { A }
struct C8 extends E { }

//// [structExtendingPrimitive.js]
// structes cannot extend primitives
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
var C4a = (function () {
    var _C4a = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C4a() {
        var obj = new _C4a();
        _ctor.call(obj);
        return obj;
    }
    C4a._TO = _C4a;
    return C4a;
})();
void {};
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
var C5a = (function () {
    var _C5a = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C5a() {
        var obj = new _C5a();
        _ctor.call(obj);
        return obj;
    }
    C5a._TO = _C5a;
    return C5a;
})();
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
var C7 = (function () {
    var _C7 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C7() {
        var obj = new _C7();
        _ctor.call(obj);
        return obj;
    }
    C7._TO = _C7;
    return C7;
})();
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var C8 = (function () {
    var _C8 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C8() {
        var obj = new _C8();
        _ctor.call(obj);
        return obj;
    }
    C8._TO = _C8;
    return C8;
})();
