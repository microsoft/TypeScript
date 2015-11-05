//// [structAndClassWithSameName.ts]
struct C { foo: string; }
class C { foo: string; } // error

module M {
    struct D {
        bar: string;
    }

    class D { // error
        bar: string;
    }
}

//// [structAndClassWithSameName.js]
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
var C = (function () {
    function C() {
    }
    return C;
})(); // error
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
    var D = (function () {
        function D() {
        }
        return D;
    })();
})(M || (M = {}));
