//// [structWithStaticMembers.ts]
// doc 2.5
// ok

struct C {
    static fn() { return this; }
    constructor(public a: number, private b: number) { }
    static foo: string; 
}

var r = C.fn();
var r2 = r.foo;

struct D extends C {
    bar: string;
}

var r = D.fn();
var r2 = r.foo;

//// [structWithStaticMembers.js]
// doc 2.5
// ok
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor(a, b) {
        this.a = a;
        this.b = b;
    }
    function C(a, b) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    _C.fn = function () { return this; };
    return C;
})();
var r = C.fn();
var r2 = r.foo;
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
var r = D.fn();
var r2 = r.foo;
