//// [structAndVariableWithSameName.ts]
struct C { foo: string; } // error
var C = ''; // error

module M {
    struct D { // error
        bar: string;
    }

    var D = 1; // error
}

//// [structAndVariableWithSameName.js]
var C = (function () {
    var _C = new TypedObject.StructType({
        foo: TypedObject.string
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
 // error
 // error
var C = ''; // error
var M;
(function (M) {
    var D = (function () {
        var _D = new TypedObject.StructType({
            bar: TypedObject.string
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
    var D = 1; // error
})(M || (M = {}));
