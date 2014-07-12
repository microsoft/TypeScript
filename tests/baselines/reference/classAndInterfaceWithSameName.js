//// [classAndInterfaceWithSameName.js]
var C = (function () {
    function C() {
    }
    return C;
})();

var M;
(function (M) {
    var D = (function () {
        function D() {
        }
        return D;
    })();
})(M || (M = {}));
