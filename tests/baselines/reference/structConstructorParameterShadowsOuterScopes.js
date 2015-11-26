//// [structConstructorParameterShadowsOuterScopes.ts]
// doc 4.1
// Initializer expressions for instance member variables are evaluated in the scope of the struct
// constructor body, but are not permitted to reference parameters or local variables of
// the constructor.
// This effectively means that entities from outer scopes by the same name as a constructor
// parameter or local variable are inaccessible in initializer expressions for instance member
// variables.

var x = 1;
struct C {
    b = x; // error, evaluated in scope of constructor, cannot reference x
    constructor(x: string) {
        x = 2; // error, x is string
    }    
}

var y = 1;
struct D {
    b = y; // error, evaluated in scope of constructor, cannot reference y
    constructor(x: string) {
        var y = "";
    }
}

//// [structConstructorParameterShadowsOuterScopes.js]
// doc 4.1
// Initializer expressions for instance member variables are evaluated in the scope of the struct
// constructor body, but are not permitted to reference parameters or local variables of
// the constructor.
// This effectively means that entities from outer scopes by the same name as a constructor
// parameter or local variable are inaccessible in initializer expressions for instance member
// variables.
var x = 1;
var C = (function () {
    var _C = new TypedObject.StructType({
        b: TypedObject.Any,
    });
    function _ctor(x) {
        x = 2; // error, x is string
    }
    function C(x) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    return C;
})();
var y = 1;
var D = (function () {
    var _D = new TypedObject.StructType({
        b: TypedObject.Any,
    });
    function _ctor(x) {
        var y = "";
    }
    function D(x) {
        var obj = new _D();
        _ctor.call(obj ,);
        return obj;
    }
    D._TO = _D;
    return D;
})();
