//// [classAndVariableWithSameName.ts]
class C { foo: string; }
var C = ''; // error

module M {
    class D {
        bar: string;
    }

    var D = 1; // error
}

//// [classAndVariableWithSameName.js]
var C = (function () {
    function C() {
    }
    return C;
})();
var C = '';
var M;
(function (M) {
    var D = (function () {
        function D() {
        }
        return D;
    })();
    var D = 1;
})(M || (M = {}));
