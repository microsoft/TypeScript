//// [structPrivateStaticNotAccessibleInModule2.ts]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration

struct C {
    private foo: string;
    private static bar: string;
}

struct D extends C {
    baz: number;   
}

module D {
    export var y = D.bar; // error
}

//// [structPrivateStaticNotAccessibleInModule2.js]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    var _C = new TypedObject.StructType({
        foo: TypedObject.string,
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
        baz: TypedObject.float64
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
var D;
(function (D) {
    D.y = D.bar; // error
})(D || (D = {}));
