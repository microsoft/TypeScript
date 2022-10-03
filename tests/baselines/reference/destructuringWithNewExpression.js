//// [destructuringWithNewExpression.ts]
class C {
    x = 0;
}

var { x } = new C;

//// [destructuringWithNewExpression.js]
var C = /** @class */ (function () {
    function C() {
        this.x = 0;
    }
    return C;
}());
var x = (new C).x;
