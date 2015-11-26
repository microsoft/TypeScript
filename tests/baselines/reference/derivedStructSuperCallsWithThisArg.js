//// [derivedStructSuperCallsWithThisArg.ts]
// doc 3.2
// it is a compile-time error for argument expressions to reference this.

struct Base {
    x: string;
    constructor(a) { }
}

struct Derived extends Base {
    constructor() {
        super(this); // error, not assignable
    }
}

struct Derived2 extends Base {
    constructor(public a: string) {
        super(this); // error, 'this' cannot be referenced in current location
    }
}

struct Derived3 extends Base {
    constructor(public a: string) {
        super(() => this); // error, 'this' cannot be referenced in current location
    }
}

struct Derived4 extends Base {
    constructor(public a: string) {
        super(function () { return this; }); // ok
    }
}

//// [derivedStructSuperCallsWithThisArg.js]
// doc 3.2
// it is a compile-time error for argument expressions to reference this.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
        x: TypedObject.string,
    });
    function _ctor(a) {
    }
    function Base(a) {
        var obj = new _Base();
        _ctor.call(obj ,);
        return obj;
    }
    Base._TO = _Base;
    return Base;
})();
var Derived = (function () {
    var _Derived = new TypedObject.StructType({
    });
    function _ctor() {
        _super.call(this, this); // error, not assignable
    }
    function Derived() {
        var obj = new _Derived();
        _ctor.call(obj);
        return obj;
    }
    Derived._TO = _Derived;
    return Derived;
})();
var Derived2 = (function () {
    var _Derived2 = new TypedObject.StructType({
    });
    function _ctor(a) {
        this.a = a;
        _super.call(this, this); // error, 'this' cannot be referenced in current location
    }
    function Derived2(a) {
        var obj = new _Derived2();
        _ctor.call(obj ,);
        return obj;
    }
    Derived2._TO = _Derived2;
    return Derived2;
})();
var Derived3 = (function () {
    var _Derived3 = new TypedObject.StructType({
    });
    function _ctor(a) {
        var _this = this;
        this.a = a;
        _super.call(this, function () { return _this; }); // error, 'this' cannot be referenced in current location
    }
    function Derived3(a) {
        var obj = new _Derived3();
        _ctor.call(obj ,);
        return obj;
    }
    Derived3._TO = _Derived3;
    return Derived3;
})();
var Derived4 = (function () {
    var _Derived4 = new TypedObject.StructType({
    });
    function _ctor(a) {
        this.a = a;
        _super.call(this, function () { return this; }); // ok
    }
    function Derived4(a) {
        var obj = new _Derived4();
        _ctor.call(obj ,);
        return obj;
    }
    Derived4._TO = _Derived4;
    return Derived4;
})();
