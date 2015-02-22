//// [classExpression.ts]
var x = class C {
}

var y = {
    foo: class C2 {
    }
}

module M {
    var z = class C4 {
    }
}

//// [classExpression.js]
var x = ;
var C = (function () {
    function C() {
    }
    return C;
})();
var y = {
    foo: , class: C2 }, _a = void 0;
var M;
(function (M) {
    var z = ;
    var C4 = (function () {
        function C4() {
        }
        return C4;
    })();
})(M || (M = {}));
