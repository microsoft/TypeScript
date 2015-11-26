//// [structAccessibilityModifiers.ts]
// doc 4

// No errors
struct C {
    private static privateProperty;
    private static privateMethod() { }

    public static publicProperty;
    public static publicMethod() { }
}

// Errors, accessibility modifiers must precede static
struct D {
    static private privateProperty;
    static private privateMethod() { }

    static public publicProperty;
    static public publicMethod() { }
}

// Errors, multiple accessibility modifier
struct E {
    private public property;
    public private method() { }
}


//// [structAccessibilityModifiers.js]
// doc 4
// No errors
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
    _C.privateMethod = function () { };
    _C.publicMethod = function () { };
    return C;
})();
// Errors, accessibility modifiers must precede static
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
    _D.privateMethod = function () { };
    _D.publicMethod = function () { };
    return D;
})();
// Errors, multiple accessibility modifier
var E = (function () {
    var _E = new TypedObject.StructType({
        property: TypedObject.Any,
    });
    function _ctor() {
    }
    function E() {
        var obj = new _E();
        _ctor.call(obj);
        return obj;
    }
    E._TO = _E;
    _E.prototype.method = function () { };
    return E;
})();
