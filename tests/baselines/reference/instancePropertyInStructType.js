//// [instancePropertyInStructType.ts]
// doc 2.4
// struct type contains all instance member variables and function members.
// ok

module NonGeneric {
    struct C {
        x: string;
        fn() { return this; }
        constructor(public a: number, private b: number) { }
    }

    var c = new C(1, 2);
    var r = c.fn();
    var r2 = r.x;
	c.a;
}

/* module Generic {
    struct C<T,U> {
        x: T;
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
} */

//// [instancePropertyInStructType.js]
// doc 2.4
// struct type contains all instance member variables and function members.
// ok
var NonGeneric;
(function (NonGeneric) {
    var C = (function () {
        var _C = new TypedObject.StructType({
            x: TypedObject.string,
        });
        function _ctor(a, b) {
            this.a = a;
            this.b = b;
        }
        function C(a, b) {
            var obj = new _C();
            _ctor.call(obj ,);
            return obj;
        }
        C._TO = _C;
        _C.prototype.fn = function () { return this; };
        return C;
    })();
    var c = new C(1, 2);
    var r = c.fn();
    var r2 = r.x;
    c.a;
})(NonGeneric || (NonGeneric = {}));
/* module Generic {
    struct C<T,U> {
        x: T;
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
} */ 
