//// [instancePropertiesInheritedIntoStructType.ts]
// doc 2.4
// All base struct instance type property that are not overridden in the struct
// ok

module NonGeneric {
    struct C {
        x: string;
        fn() { return this; }
        constructor(public a: number, private b: number) { }
    }

    struct D extends C { e: string; }

    var d = new D(1, 2);
    var r = d.fn();
    var r2 = r.x;

}

/* module Generic {
    struct C<T, U> {
        x: T;
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    struct D<T, U> extends C<T, U> { e: T; }

    var d = new D(1, '');
    var r = d.fn();
    var r2 = r.x;
} */

//// [instancePropertiesInheritedIntoStructType.js]
// doc 2.4
// All base struct instance type property that are not overridden in the struct
// ok
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    var D = (function () {
        var _D = new TypedObject.StructType({
            e: TypedObject.string
        });
        function _ctor() {
        }
        function D() {
            var obj = new _D();
            _ctor.call(obj);
            return obj;
        }
        D._TO = _D;
        return D;
    })();
    var d = new D(1, 2);
    var r = d.fn();
    var r2 = r.x;
})(NonGeneric || (NonGeneric = {}));
/* module Generic {
    struct C<T, U> {
        x: T;
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    struct D<T, U> extends C<T, U> { e: T; }

    var d = new D(1, '');
    var r = d.fn();
    var r2 = r.x;
} */ 
