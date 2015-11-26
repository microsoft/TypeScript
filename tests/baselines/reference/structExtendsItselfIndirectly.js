//// [structExtendsItselfIndirectly.ts]
struct C extends E { foo: string; } // error

struct D extends C { bar: string; }

struct E extends D { baz: number; }

/* struct C2<T> extends E2<T> { foo: T; } // error

struct D2<T> extends C2<T> { bar: T; }

struct E2<T> extends D2<T> { baz: T; }

//// [structExtendsItselfIndirectly.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    var _C = new TypedObject.StructType({
        foo: TypedObject.string
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
 // error
 // error
var D = (function () {
    var _D = new TypedObject.StructType({
        bar: TypedObject.string
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
var E = (function () {
    var _E = new TypedObject.StructType({
        baz: TypedObject.float64
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
/* struct C2<T> extends E2<T> { foo: T; } // error

struct D2<T> extends C2<T> { bar: T; }

struct E2<T> extends D2<T> { baz: T; } 
