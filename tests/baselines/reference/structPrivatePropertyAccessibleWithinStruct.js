//// [structPrivatePropertyAccessibleWithinStruct.ts]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration
// no errors

struct C {
    private x: string;
    private foo() { return this.foo; }

    private static x: string;
    private static foo() { return this.foo; }
    private static bar() { this.foo(); }
}

// added level of function nesting
struct C2 {
    private x: string;
    private foo() { () => this.foo; }

    private static x: string;
    private static foo() { () => this.foo; }
    private static bar() { () => this.foo(); }
}


//// [structPrivatePropertyAccessibleWithinStruct.js]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration
// no errors
var C = (function () {
    var _C = new TypedObject.StructType({
        x: TypedObject.string,
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    _C.prototype.foo = function () { return this.foo; };
    _C.foo = function () { return this.foo; };
    _C.bar = function () { this.foo(); };
    return C;
})();
// added level of function nesting
var C2 = (function () {
    var _C2 = new TypedObject.StructType({
        x: TypedObject.string,
    });
    function _ctor() {
    }
    function C2() {
        var obj = new _C2();
        _ctor.call(obj);
        return obj;
    }
    C2._TO = _C2;
    _C2.prototype.foo = function () {
        var _this = this;
        (function () { return _this.foo; });
    };
    _C2.foo = function () {
        var _this = this;
        (function () { return _this.foo; });
    };
    _C2.bar = function () {
        var _this = this;
        (function () { return _this.foo(); });
    };
    return C2;
})();
