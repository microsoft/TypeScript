//// [structBodyWithStatements.ts]
struct C {
    var x = 1; // error, variable statement
}

struct C2 {
    function foo() {} // error, function declaration
}

var x = 1;
var y = 2;
struct C3 {
    x: number = y + 1; // ok, not a statement (need var in the statement production).
}

//// [structBodyWithStatements.js]
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
var x = 1; // error, variable statement
var C2 = (function () {
    var _C2 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C2() {
        var obj = new _C2();
        _ctor.call(obj);
        return obj;
    }
    C2._TO = _C2;
    return C2;
})();
function foo() { } // error, function declaration
var x = 1;
var y = 2;
var C3 = (function () {
    var _C3 = new TypedObject.StructType({
        x: TypedObject.float64
    });
    function _ctor() {
    }
    function C3() {
        var obj = new _C3();
        _ctor.call(obj);
        return obj;
    }
    C3._TO = _C3;
    return C3;
})();
