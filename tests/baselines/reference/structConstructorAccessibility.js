//// [structConstructorAccessibility.ts]
// doc 3
// Only public constructors are supported. Private and protected constructors result in an error

struct C {
    public constructor(public x: number) { }
}

struct D {
    private constructor(public x: number) { } // error
}

struct E {
    protected constructor(public x: number) { } // error
}

var c = new C(1);
var d = new D(1);
var e = new E(1);

/* module Generic {
    struct C<T> {
        public constructor(public x: T) { }
    }

    struct D<T> {
        private constructor(public x: T) { } // error
    }

    struct E<T> {
        protected constructor(public x: T) { } // error
    }

    var c = new C(1);
    var d = new D(1);
    var e = new E(1);
} */


//// [structConstructorAccessibility.js]
// doc 3
// Only public constructors are supported. Private and protected constructors result in an error
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor(x) {
        this.x = x;
    }
    function C(x) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    return C;
})();
var D = (function () {
    var _D = new TypedObject.StructType({
    });
    function _ctor(x) {
        this.x = x;
    } // error
    function D(x) {
        var obj = new _D();
        _ctor.call(obj ,);
        return obj;
    }
    D._TO = _D;
    return D;
})();
var E = (function () {
    var _E = new TypedObject.StructType({
    });
    function _ctor(x) {
        this.x = x;
    } // error
    function E(x) {
        var obj = new _E();
        _ctor.call(obj ,);
        return obj;
    }
    E._TO = _E;
    return E;
})();
var c = new C(1);
var d = new D(1);
var e = new E(1);
/* module Generic {
    struct C<T> {
        public constructor(public x: T) { }
    }

    struct D<T> {
        private constructor(public x: T) { } // error
    }

    struct E<T> {
        protected constructor(public x: T) { } // error
    }

    var c = new C(1);
    var d = new D(1);
    var e = new E(1);
} */
