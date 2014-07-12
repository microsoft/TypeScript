//// [callOverloadViaElementAccessExpression.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return null;
    };
    return C;
})();

var c = new C();
var r = c['foo'](1);
var r2 = c['foo']('');
