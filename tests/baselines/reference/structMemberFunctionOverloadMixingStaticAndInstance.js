//// [structMemberFunctionOverloadMixingStaticAndInstance.ts]
// doc 4.2
// All overloads of a member function must have the same accessibility (public or private) and
// kind (instance or static).
struct C {
    foo();
    static foo(); // error, Function overload must not be static.
}

struct D {
    static foo();
    foo(); // error, Function overload must be static.
}

/* struct E<T> {
    foo(x: T);
    static foo(x: number); // error, Function overload must not be static.
}

struct F<T> {
    static foo(x: number);
    foo(x: T); // error, Function overload must be static.
} */

//// [structMemberFunctionOverloadMixingStaticAndInstance.js]
// doc 4.2
// All overloads of a member function must have the same accessibility (public or private) and
// kind (instance or static).
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    return C;
})();
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
/* struct E<T> {
    foo(x: T);
    static foo(x: number); // error, Function overload must not be static.
}

struct F<T> {
    static foo(x: number);
    foo(x: T); // error, Function overload must be static.
} */ 
