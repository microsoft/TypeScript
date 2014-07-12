//// [targetTypeVoidFunc.js]
function f1() {
    return function () {
        return;
    };
}
;

var x = f1();
var y = new x();
var z = new (f1())();
