//// [structWithNoConstructorOrBaseStruct.ts]
// doc 2.5
// If the struct contains no constructor declaration and has no base struct, a single construct signature
// with no parameters, having the same type parameters as the struct and returning the instance type of
// the struct.
// ok

struct C {
    x: string;
}

var c = new C();
var r = C;

/* struct D<T,U> {
    x: T;
    y: U;
}

var d = new D();
var d2 = new D<string, number>();
var r2 = D; */


//// [structWithNoConstructorOrBaseStruct.js]
// doc 2.5
// If the struct contains no constructor declaration and has no base struct, a single construct signature
// with no parameters, having the same type parameters as the struct and returning the instance type of
// the struct.
// ok
var C = (function () {
    var _C = new TypedObject.StructType({
        x: TypedObject.string
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
var c = new C();
var r = C;
/* struct D<T,U> {
    x: T;
    y: U;
}

var d = new D();
var d2 = new D<string, number>();
var r2 = D; */
