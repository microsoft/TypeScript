//// [structConstructorParameterPropertyDeclarationCannotOverride.ts]
// doc 3.1
// derived struct cannot override inherited member variables from base struct

struct Base {
    constructor(public x: number) { }
}

struct Derived extends Base {
	constructor(public x: number) { // cannot overrides inherited member variables
        super(x);
        this.x; // OK
    }
}

struct Derived1 extends Base {
	constructor(public y: number) { // ok
		super(y);
		this.x; // OK
		this.y; // OK
	}
}

var d: Derived1;
d.x;  // public, OK

//// [structConstructorParameterPropertyDeclarationCannotOverride.js]
// doc 3.1
// derived struct cannot override inherited member variables from base struct
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
    });
    function _ctor(x) {
        this.x = x;
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
        this.x = x;
        _super.call(this, x);
        this.x; // OK
    }
    function Derived(x) {
        var obj = new _Derived();
        _ctor.call(obj ,);
        return obj;
    }
    Derived._TO = _Derived;
    return Derived;
})();
var Derived1 = (function () {
    var _Derived1 = new TypedObject.StructType({
    });
    function _ctor(y) {
        this.y = y;
        _super.call(this, y);
        this.x; // OK
        this.y; // OK
    }
    function Derived1(y) {
        var obj = new _Derived1();
        _ctor.call(obj ,);
        return obj;
    }
    Derived1._TO = _Derived1;
    return Derived1;
})();
var d;
d.x; // public, OK
