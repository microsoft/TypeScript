//// [structExpression.ts]
// struct expression are supported

var x = struct C {
}

var y = {
    foo: struct C2 {
    }
}

module M {
    var z = struct C4 {
    }
}

//// [structExpression.js]
// struct expression are supported
var x = var C = (function () {
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
;
var y = {
    foo: var C2 = (function () {
        var _C2 = new TypedObject.StructType({
        });
        function _ctor() {
        }
        function C2() {
            var obj = new _C2();
            _ctor.call(obj);
            return obj;
        }
        C2._TO = _C2;
        return C2;
    })();
};
var M;
(function (M) {
    var z = var C4 = (function () {
        var _C4 = new TypedObject.StructType({
        });
        function _ctor() {
        }
        function C4() {
            var obj = new _C4();
            _ctor.call(obj);
            return obj;
        }
        C4._TO = _C4;
        return C4;
    })();
    ;
})(M || (M = {}));
