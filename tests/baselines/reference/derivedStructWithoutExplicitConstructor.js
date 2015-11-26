//// [derivedStructWithoutExplicitConstructor.ts]
// doc 3.3
// In a derived struct, the automatic constructor has the same parameter list
// (and possibly overloads) as the base struct constructor.

struct Base {
    a = 1;
    constructor(x: number) { this.a = x; }
}

struct Derived extends Base {
    x = 1
    y = 'hello';
}

var r = new Derived(); // error, Supplied parameters do not match any signature of call target
var r2 = new Derived(1); 

/* struct Base2<T> {
    a: T;
    constructor(x: T) { this.a = x; }
}

struct D<T extends Date> extends Base2<T> {
    x = 2
    y: T = null;
}

var d = new D(); // error, Supplied parameters do not match any signature of call target
var d2 = new D(new Date()); // ok
*/

//// [derivedStructWithoutExplicitConstructor.js]
// doc 3.3
// In a derived struct, the automatic constructor has the same parameter list
// (and possibly overloads) as the base struct constructor.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
        a: TypedObject.float64,
    });
    function _ctor(x) {
        this.a = x;
    }
    function Base(x) {
        var obj = new _Base();
        _ctor.call(obj ,);
        return obj;
    }
    Base._TO = _Base;
    return Base;
})();
var Derived = (function () {
    var _Derived = new TypedObject.StructType({
        x: TypedObject.float64,
        y: TypedObject.string
    });
    function _ctor() {
    }
    function Derived() {
        var obj = new _Derived();
        _ctor.call(obj);
        return obj;
    }
    Derived._TO = _Derived;
    return Derived;
})();
var r = new Derived(); // error, Supplied parameters do not match any signature of call target
var r2 = new Derived(1);
/* struct Base2<T> {
    a: T;
    constructor(x: T) { this.a = x; }
}

struct D<T extends Date> extends Base2<T> {
    x = 2
    y: T = null;
}

var d = new D(); // error, Supplied parameters do not match any signature of call target
var d2 = new D(new Date()); // ok
*/ 
