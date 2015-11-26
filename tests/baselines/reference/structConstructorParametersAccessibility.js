//// [structConstructorParametersAccessibility.ts]
// doc 3.1
// Only public and private modifiers are allowed for constructor parameters, but not protected.

struct C1 {
    constructor(public x: number) { }
}
var c1: C1;
c1.x // OK


struct C2 {
    constructor(private p: number) { }
}
var c2: C2;
c2.p // private, error


struct C3 {
    constructor(protected p: number) { } // error
}
var c3: C3;
c3.p // protected, error



//// [structConstructorParametersAccessibility.js]
// doc 3.1
// Only public and private modifiers are allowed for constructor parameters, but not protected.
var C1 = (function () {
    var _C1 = new TypedObject.StructType({
    });
    function _ctor(x) {
        this.x = x;
    }
    function C1(x) {
        var obj = new _C1();
        _ctor.call(obj ,);
        return obj;
    }
    C1._TO = _C1;
    return C1;
})();
var c1;
c1.x; // OK
var C2 = (function () {
    var _C2 = new TypedObject.StructType({
    });
    function _ctor(p) {
        this.p = p;
    }
    function C2(p) {
        var obj = new _C2();
        _ctor.call(obj ,);
        return obj;
    }
    C2._TO = _C2;
    return C2;
})();
var c2;
c2.p; // private, error
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
var c3;
c3.p; // protected, error
