//// [structAndInterfaceWithSameName.ts]
struct C { foo: string; }
interface C { foo: string; } // error

module M {
    struct D {
        bar: string;
    }

    interface D { // error
        bar: string;
    }
}

//// [structAndInterfaceWithSameName.js]
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
})(M || (M = {}));
