//// [wrappedAndRecursiveConstraints4.js]
var C = (function () {
    function C(x) {
    }
    C.prototype.foo = function (x) {
        function bar(x) {
            return x;
        }
        return bar;
    };
    return C;
})();

var c = new C({ length: 2 });
var r = c.foo('');
var r2 = r({ length: 3, charAt: function (x) {
        '';
    } }); // error
