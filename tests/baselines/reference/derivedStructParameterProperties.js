//// [derivedStructParameterProperties.ts]
// doc 3.2
// ordering of super calls in derived constructors matters depending on other struct contents
// A 'super' call must be the first statement in the constructor when a struct contains
// initialized properties or has parameter properties.

struct Base {
    x: string;
}

struct Derived extends Base {
    constructor(y: string) {
        var a = 1;
        super(); // ok
    }
}

struct Derived2 extends Base {
    constructor(public y: string) { // has parameter properties
        var a = 1;
        super(); // error
    }
}

struct Derived3 extends Base {
    constructor(public y: string) {
        super(); // ok
        var a = 1;
    }
}

struct Derived4 extends Base {
    a = 1; // contains initialized properties
    constructor(y: string) {
        var b = 2;
        super(); // error
    }
}

struct Derived5 extends Base {
    a = 1;
    constructor(y: string) {
        super(); // ok
        var b = 2;
    }
}

struct Derived6 extends Base {
    a: number;
    constructor(y: string) {
        this.a = 1;
        var b = 2;
        super(); // ok
    }
}

struct Derived7 extends Base {
    a = 1; // contains initialized properties
    b: number;
    constructor(y: string) {
        this.a = 3;
        this.b = 3;
        super(); // error
    }
}

struct Derived8 extends Base {
    a = 1;
    b: number;
    constructor(y: string) {
        super(); // ok
        this.a = 3;
        this.b = 3;        
    }
}

/* generic cases of Derived7 and Derived8
struct Base2<T> { x: T; }

struct Derived9<T> extends Base2<T> {
    a = 1; // contains initialized properties
    b: number;
    constructor(y: string) {
        this.a = 3;
        this.b = 3;
        super(); // error
    }
}

struct Derived10<T> extends Base2<T> {
    a = 1;
    b: number;
    constructor(y: string) {
        super(); // ok
        this.a = 3;
        this.b = 3;
    }
} */

//// [derivedStructParameterProperties.js]
// doc 3.2
// ordering of super calls in derived constructors matters depending on other struct contents
// A 'super' call must be the first statement in the constructor when a struct contains
// initialized properties or has parameter properties.
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
    function _ctor(y) {
        var a = 1;
        _super.call(this); // ok
    }
    function Derived(y) {
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
    function _ctor(y) {
        this.y = y;
        var a = 1;
        _super.call(this); // error
    }
    function Derived2(y) {
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
    function _ctor(y) {
        this.y = y;
        _super.call(this); // ok
        var a = 1;
    }
    function Derived3(y) {
        var obj = new _Derived3();
        _ctor.call(obj ,);
        return obj;
    }
    Derived3._TO = _Derived3;
    return Derived3;
})();
var Derived4 = (function () {
    var _Derived4 = new TypedObject.StructType({
        a: TypedObject.float64,
    });
    function _ctor(y) {
        var b = 2;
        _super.call(this); // error
    }
    function Derived4(y) {
        var obj = new _Derived4();
        _ctor.call(obj ,);
        return obj;
    }
    Derived4._TO = _Derived4;
    return Derived4;
})();
var Derived5 = (function () {
    var _Derived5 = new TypedObject.StructType({
        a: TypedObject.float64,
    });
    function _ctor(y) {
        _super.call(this); // ok
        var b = 2;
    }
    function Derived5(y) {
        var obj = new _Derived5();
        _ctor.call(obj ,);
        return obj;
    }
    Derived5._TO = _Derived5;
    return Derived5;
})();
var Derived6 = (function () {
    var _Derived6 = new TypedObject.StructType({
        a: TypedObject.float64,
    });
    function _ctor(y) {
        this.a = 1;
        var b = 2;
        _super.call(this); // ok
    }
    function Derived6(y) {
        var obj = new _Derived6();
        _ctor.call(obj ,);
        return obj;
    }
    Derived6._TO = _Derived6;
    return Derived6;
})();
var Derived7 = (function () {
    var _Derived7 = new TypedObject.StructType({
        a: TypedObject.float64,
        b: TypedObject.float64,
    });
    function _ctor(y) {
        this.a = 3;
        this.b = 3;
        _super.call(this); // error
    }
    function Derived7(y) {
        var obj = new _Derived7();
        _ctor.call(obj ,);
        return obj;
    }
    Derived7._TO = _Derived7;
    return Derived7;
})();
var Derived8 = (function () {
    var _Derived8 = new TypedObject.StructType({
        a: TypedObject.float64,
        b: TypedObject.float64,
    });
    function _ctor(y) {
        _super.call(this); // ok
        this.a = 3;
        this.b = 3;
    }
    function Derived8(y) {
        var obj = new _Derived8();
        _ctor.call(obj ,);
        return obj;
    }
    Derived8._TO = _Derived8;
    return Derived8;
})();
/* generic cases of Derived7 and Derived8
struct Base2<T> { x: T; }

struct Derived9<T> extends Base2<T> {
    a = 1; // contains initialized properties
    b: number;
    constructor(y: string) {
        this.a = 3;
        this.b = 3;
        super(); // error
    }
}

struct Derived10<T> extends Base2<T> {
    a = 1;
    b: number;
    constructor(y: string) {
        super(); // ok
        this.a = 3;
        this.b = 3;
    }
} */ 
