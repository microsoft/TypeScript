//// [structConstructorFunctionTypeIsAssignableToBaseType2.ts]
// the constructor function itself does not need to be a subtype of the base type constructor function

struct Base {
    static foo: {
        bar: Object;
    }
    constructor(x: Object) {
    }
}

struct Derived extends Base {
    // ok
    static foo: {
        bar: number;
    }

    constructor(x: number) { // ok
        super(x);
    }
}

struct Derived2 extends Base {   
    static foo: {
        bar: number;
    }

    // ok, not enforcing assignability relation on this
    constructor(x: any) {
        super(x);
        return 1; // return expression not allowed
    }
}

//// [structConstructorFunctionTypeIsAssignableToBaseType2.js]
// the constructor function itself does not need to be a subtype of the base type constructor function
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
var Derived = (function () {
    var _Derived = new TypedObject.StructType({
    });
    function _ctor(x) {
        _super.call(this, x);
    }
    function Derived(x) {
        var obj = new _Derived();
        _ctor.call(obj ,);
        return obj;
    }
    Derived._TO = _Derived;
    return Derived;
})();
var Derived2 = (function () {
    var _Derived2 = new TypedObject.StructType({
    });
    // ok, not enforcing assignability relation on this
    function _ctor(x) {
        _super.call(this, x);
        return 1; // return expression not allowed
    }
    function Derived2(x) {
        var obj = new _Derived2();
        _ctor.call(obj ,);
        return obj;
    }
    Derived2._TO = _Derived2;
    return Derived2;
})();
