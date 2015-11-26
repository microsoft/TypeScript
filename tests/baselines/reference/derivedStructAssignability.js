//// [derivedStructAssignability.ts]
// doc 2.3
// struct type assignability is based on inheritance declaration.
// The type of an overriding property member doesn’t need to be assignable to the type of
// the overridden property member.

struct C {
    foo(x: number) { }
}

struct D extends C {
    foo() { } // ok
}

struct E extends D {
    foo(x?: string) { } // ok
}

var c: C;
var d: D;
var e: E;
c = d; // ok
c = e; // ok

var r = c.foo(1);
var r2 = e.foo('');
r2 = e.foo();
r2 = e.foo(1); // error, not match
r2 = (<C>e).foo(1); // ok

//// [derivedStructAssignability.js]
// doc 2.3
// struct type assignability is based on inheritance declaration.
// The type of an overriding property member doesn’t need to be assignable to the type of
// the overridden property member.
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
    _C.prototype.foo = function (x) { };
    return C;
})();
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
    _D.prototype.foo = function () { }; // ok
    return D;
})();
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
    _E.prototype.foo = function (x) { }; // ok
    return E;
})();
var c;
var d;
var e;
c = d; // ok
c = e; // ok
var r = c.foo(1);
var r2 = e.foo('');
r2 = e.foo();
r2 = e.foo(1); // error, not match
r2 = e.foo(1); // ok
