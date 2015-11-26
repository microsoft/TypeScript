//// [derivedStructConstructorWithoutSuperCall.ts]
// doc 3.2
// derived struct constructors must contain a super call

struct Base {
    x: string;
}

struct Derived extends Base {
    constructor() { // error
    }
}

struct Base2 {
    x: any;
}

struct Derived2 extends Base2 {
    constructor() { // error for no super call (nested scopes don't count)
        var r2 = () => super(); // error for misplaced super call (nested function)
    }
}

struct Derived3 extends Base2 {
    constructor() { // error
        var r = function () { super() } // error
    }
}

struct Derived4 extends Base2 {
    constructor() {
        var r = super(); // ok
    }
}

//// [derivedStructConstructorWithoutSuperCall.js]
// doc 3.2
// derived struct constructors must contain a super call
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
        x: TypedObject.string
    });
    function _ctor() {
    }
    function Base() {
        var obj = new _Base();
        _ctor.call(obj);
        return obj;
    }
    Base._TO = _Base;
    return Base;
})();
var Derived = (function () {
    var _Derived = new TypedObject.StructType({
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
var Base2 = (function () {
    var _Base2 = new TypedObject.StructType({
        x: TypedObject.Any
    });
    function _ctor() {
    }
    function Base2() {
        var obj = new _Base2();
        _ctor.call(obj);
        return obj;
    }
    Base2._TO = _Base2;
    return Base2;
})();
var Derived2 = (function () {
    var _Derived2 = new TypedObject.StructType({
    });
    function _ctor() {
        var r2 = function () { return _super.call(this); }; // error for misplaced super call (nested function)
    }
    function Derived2() {
        var obj = new _Derived2();
        _ctor.call(obj);
        return obj;
    }
    Derived2._TO = _Derived2;
    return Derived2;
})();
var Derived3 = (function () {
    var _Derived3 = new TypedObject.StructType({
    });
    function _ctor() {
        var r = function () { _super.call(this); }; // error
    }
    function Derived3() {
        var obj = new _Derived3();
        _ctor.call(obj);
        return obj;
    }
    Derived3._TO = _Derived3;
    return Derived3;
})();
var Derived4 = (function () {
    var _Derived4 = new TypedObject.StructType({
    });
    function _ctor() {
        var r = _super.call(this); // ok
    }
    function Derived4() {
        var obj = new _Derived4();
        _ctor.call(obj);
        return obj;
    }
    Derived4._TO = _Derived4;
    return Derived4;
})();
