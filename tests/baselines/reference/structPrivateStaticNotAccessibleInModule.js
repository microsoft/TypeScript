//// [structPrivateStaticNotAccessibleInModule.ts]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration

struct C {
    private foo: string;
    private static bar: string;
}

module C {
    export var y = C.bar; // error
}

//// [structPrivateStaticNotAccessibleInModule.js]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration
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
var C;
(function (C) {
    C.y = C.bar; // error
})(C || (C = {}));
