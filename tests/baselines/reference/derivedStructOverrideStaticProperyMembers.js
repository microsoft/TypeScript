//// [derivedStructOverrideStaticProperyMembers.ts]
// doc 2.3
// derived struct can override base struct's static property members

var x: { foo: string; }
var y: { foo: string; bar: string; }

struct Base {
    static r: typeof x;
    static s(a: typeof x) { return 1; }
    static u: (a: typeof x) => any;

    constructor(a: typeof x) { }
}

struct Derived extends Base {
    static r: typeof y; // ok
    static s(a: typeof y) { } // ok
    static u: (a: typeof y) => void; // ok

    constructor(a: typeof y) { super(x) }
}


/* struct Base2 {
    [i: string]: Object;
    [i: number]: typeof x;
}

struct Derived2 extends Base2 {
    [i: string]: typeof x;
    [i: number]: typeof y;
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1]; */



//// [derivedStructOverrideStaticProperyMembers.js]
// doc 2.3
// derived struct can override base struct's static property members
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var x;
var y;
var Base = (function () {
    var _Base = new TypedObject.StructType({
    });
    function _ctor(a) {
    }
    function Base(a) {
        var obj = new _Base();
        _ctor.call(obj ,);
        return obj;
    }
    Base._TO = _Base;
    _Base.s = function (a) { return 1; };
    return Base;
})();
var Derived = (function () {
    var _Derived = new TypedObject.StructType({
    });
    function _ctor(a) {
        _super.call(this, x);
    }
    function Derived(a) {
        var obj = new _Derived();
        _ctor.call(obj ,);
        return obj;
    }
    Derived._TO = _Derived;
    _Derived.s = function (a) { }; // ok
    return Derived;
})();
/* struct Base2 {
    [i: string]: Object;
    [i: number]: typeof x;
}

struct Derived2 extends Base2 {
    [i: string]: typeof x;
    [i: number]: typeof y;
}

var d2: Derived2;
var r7 = d2[''];
var r8 = d2[1]; */
