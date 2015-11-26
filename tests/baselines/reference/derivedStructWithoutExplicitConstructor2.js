//// [derivedStructWithoutExplicitConstructor2.ts]
// doc 3.3
// In a derived struct, the automatic constructor has the same parameter list
// (and possibly overloads) as the base struct constructor.
// automatic constructors with a struct hieararchy of depth > 2

struct Base {
    a = 1;
    constructor(x: number) { this.a = x; }
}

struct Derived extends Base {
    b = '';
    constructor(y: string, z: string) {
        super(2);
        this.b = y;
    }
}

struct Derived2 extends Derived {
    x = 1
    y = 'hello';
}

var r = new Derived(); // error, Supplied parameters do not match any signature of call target.
var r2 = new Derived2(1); // error, Supplied parameters do not match any signature of call target.
var r3 = new Derived('', '');

/* struct Base2<T> {
    a: T;
    constructor(x: T) { this.a = x; }
}

struct D<T> extends Base {
    b: T = null;
    constructor(y: T, z: T) {
        super(2);
        this.b = y;
    }
}


struct D2<T extends Date> extends D<T> {
    x = 2
    y: T = null;
}

var d = new D2(); // error, Supplied parameters do not match any signature of call target.
var d2 = new D2(new Date()); // error, Supplied parameters do not match any signature of call target.
var d3 = new D2(new Date(), new Date()); // ok
    */

//// [derivedStructWithoutExplicitConstructor2.js]
// doc 3.3
// In a derived struct, the automatic constructor has the same parameter list
// (and possibly overloads) as the base struct constructor.
// automatic constructors with a struct hieararchy of depth > 2
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
        b: TypedObject.string,
    });
    function _ctor(y, z) {
        _super.call(this, 2);
        this.b = y;
    }
    function Derived(y, z) {
        var obj = new _Derived();
        _ctor.call(obj ,);
        return obj;
    }
    Derived._TO = _Derived;
    return Derived;
})();
var Derived2 = (function () {
    var _Derived2 = new TypedObject.StructType({
        x: TypedObject.float64,
        y: TypedObject.string
    });
    function _ctor() {
    }
    function Derived2() {
        var obj = new _Derived2();
        _ctor.call(obj);
        return obj;
    }
    Derived2._TO = _Derived2;
    return Derived2;
})();
var r = new Derived(); // error, Supplied parameters do not match any signature of call target.
var r2 = new Derived2(1); // error, Supplied parameters do not match any signature of call target.
var r3 = new Derived('', '');
/* struct Base2<T> {
    a: T;
    constructor(x: T) { this.a = x; }
}

struct D<T> extends Base {
    b: T = null;
    constructor(y: T, z: T) {
        super(2);
        this.b = y;
    }
}


struct D2<T extends Date> extends D<T> {
    x = 2
    y: T = null;
}

var d = new D2(); // error, Supplied parameters do not match any signature of call target.
var d2 = new D2(new Date()); // error, Supplied parameters do not match any signature of call target.
var d3 = new D2(new Date(), new Date()); // ok
    */ 
