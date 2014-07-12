//// [functionOverloads5.js]
var baz = (function () {
    function baz() {
    }
    baz.prototype.foo = function (bar) {
    };
    return baz;
})();
