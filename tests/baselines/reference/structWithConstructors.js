//// [structWithConstructors.ts]
// doc 2.5
// If the struct contains a constructor declaration with overloads, a set of construct signatures with
// the parameter lists of the overloads, all having the same type parameters as the struct and returning
// the instance type of the struct.

module NonGeneric {
    struct C {
        constructor(x: string) { }
    }

    var c = new C(); // error
    var c2 = new C(''); // ok

    struct C2 {
        constructor(x: number);
        constructor(x: string);
        constructor(x: any) { }
    }

    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1); // ok

    struct D extends C2 { }

    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
}

/* module Generics {
    struct C<T> {
        constructor(x: T) { }
    }

    var c = new C(); // error
    var c2 = new C(''); // ok

    struct C2<T,U> {
        constructor(x: T);
        constructor(x: T, y: U);
        constructor(x: any) { }
    }

    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1, 2); // ok

    struct D<T, U> extends C2<T, U> { }

    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
} */

//// [structWithConstructors.js]
// doc 2.5
// If the struct contains a constructor declaration with overloads, a set of construct signatures with
// the parameter lists of the overloads, all having the same type parameters as the struct and returning
// the instance type of the struct.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NonGeneric;
(function (NonGeneric) {
    var C = (function () {
        var _C = new TypedObject.StructType({
        });
        function _ctor(x) {
        }
        function C(x) {
            var obj = new _C();
            _ctor.call(obj ,);
            return obj;
        }
        C._TO = _C;
        return C;
    })();
    var c = new C(); // error
    var c2 = new C(''); // ok
    var C2 = (function () {
        var _C2 = new TypedObject.StructType({
        });
        function _ctor(x) {
        }
        function C2(x) {
            var obj = new _C2();
            _ctor.call(obj ,);
            return obj;
        }
        C2._TO = _C2;
        return C2;
    })();
    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1); // ok
    var D = (function () {
        var _D = new TypedObject.StructType({
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
    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
})(NonGeneric || (NonGeneric = {}));
/* module Generics {
    struct C<T> {
        constructor(x: T) { }
    }

    var c = new C(); // error
    var c2 = new C(''); // ok

    struct C2<T,U> {
        constructor(x: T);
        constructor(x: T, y: U);
        constructor(x: any) { }
    }

    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1, 2); // ok

    struct D<T, U> extends C2<T, U> { }

    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
} */ 
