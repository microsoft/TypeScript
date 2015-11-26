//// [structWithBaseStructButNoConstructor.ts]
// doc 2.5

struct Base {
    constructor(x: number) { }
}

struct C extends Base {
    foo: string;
}

var r = C;
var c = new C(); // error
var c2 = new C(1); // ok

/* struct Base2<T,U> {
    constructor(x: T) { }
}

struct D<T,U> extends Base2<T,U> {
    foo: U;
}

var r2 = D;
var d = new D(); // error
var d2 = new D(1); // ok

// specialized base struct
struct D2<T, U> extends Base2<string, number> {
    foo: U;
}

var r3 = D2;
var d3 = new D(); // error
var d4 = new D(1); // ok

struct D3 extends Base2<string, number> {
    foo: string;
}

var r4 = D3;
var d5 = new D(); // error
var d6 = new D(1); // ok */

//// [structWithBaseStructButNoConstructor.js]
// doc 2.5
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
    });
    function _ctor(x) {
    }
    function Base(x) {
        var obj = new _Base();
        _ctor.call(obj ,);
        return obj;
    }
    Base._TO = _Base;
    return Base;
})();
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
var r = C;
var c = new C(); // error
var c2 = new C(1); // ok
/* struct Base2<T,U> {
    constructor(x: T) { }
}

struct D<T,U> extends Base2<T,U> {
    foo: U;
}

var r2 = D;
var d = new D(); // error
var d2 = new D(1); // ok

// specialized base struct
struct D2<T, U> extends Base2<string, number> {
    foo: U;
}

var r3 = D2;
var d3 = new D(); // error
var d4 = new D(1); // ok

struct D3 extends Base2<string, number> {
    foo: string;
}

var r4 = D3;
var d5 = new D(); // error
var d6 = new D(1); // ok */ 
