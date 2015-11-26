//// [structConstructorParameterNotOptional.ts]
// doc 3.1
// optional parameters are not allowed for struct constructor.

struct C1 {
    constructor(public x?: number) { } // error
}

struct C2 {
    constructor(private p?: number) { } // error
}

struct C3 {
    constructor(protected p?: number) { } // error
}


//// [structConstructorParameterNotOptional.js]
// doc 3.1
// optional parameters are not allowed for struct constructor.
var C1 = (function () {
    var _C1 = new TypedObject.StructType({
    });
    function _ctor(x) {
        this.x = x;
    } // error
    function C1(x) {
        var obj = new _C1();
        _ctor.call(obj ,);
        return obj;
    }
    C1._TO = _C1;
    return C1;
})();
var C2 = (function () {
    var _C2 = new TypedObject.StructType({
    });
    function _ctor(p) {
        this.p = p;
    } // error
    function C2(p) {
        var obj = new _C2();
        _ctor.call(obj ,);
        return obj;
    }
    C2._TO = _C2;
    return C2;
})();
var C3 = (function () {
    var _C3 = new TypedObject.StructType({
    });
    function _ctor(p) {
        this.p = p;
    } // error
    function C3(p) {
        var obj = new _C3();
        _ctor.call(obj ,);
        return obj;
    }
    C3._TO = _C3;
    return C3;
})();
