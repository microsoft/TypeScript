//// [structWithEmptyBody.ts]
struct C {
}

var c: C;
var o: {} = c; // error
c = 1; // error
c = { foo: '' }; // error
c = () => { }; // error
c = new C(); // ok

struct D {
    constructor() {
        return 1; // error
    }
}

var d: D;
var o: {} = d; // error
d = 1; // error
d = { foo: '' }; // error
d = () => { }; // error
d = c; // error, no inheritance

struct E {
	foo: number;
}

var e: E;
e = 1; // error, Type 'number' is not assignable to type 'E'


//// [structWithEmptyBody.js]
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
var c;
var o = c; // error
c = 1; // error
c = { foo: '' }; // error
c = function () { }; // error
c = new C(); // ok
var D = (function () {
    var _D = new TypedObject.StructType({
    });
    function _ctor() {
        return 1; // error
    }
    function D() {
        var obj = new _D();
        _ctor.call(obj);
        return obj;
    }
    D._TO = _D;
    return D;
})();
var d;
var o = d; // error
d = 1; // error
d = { foo: '' }; // error
d = function () { }; // error
d = c; // error, no inheritance
var E = (function () {
    var _E = new TypedObject.StructType({
        foo: TypedObject.float64
    });
    function _ctor() {
    }
    function E() {
        var obj = new _E();
        _ctor.call(obj);
        return obj;
    }
    E._TO = _E;
    return E;
})();
var e;
e = 1; // error, Type 'number' is not assignable to type 'E'
