//// [typeofInternalModules.js]
var Outer;
(function (Outer) {
    (function (instantiated) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        instantiated.C = C;
    })(Outer.instantiated || (Outer.instantiated = {}));
    var instantiated = Outer.instantiated;
})(Outer || (Outer = {}));

var importInst = Outer.instantiated;

var x1 = importInst.C;
var x2 = new x1();
var x3;

var x4 = Outer;
var x5;
x5 = Outer;
x5 = Outer.instantiated;
var x6;
var x7 = Outer;
x7 = importInst;
