//// [thisBinding.js]
var M;
(function (M) {
    var C = (function () {
        function C() {
            this.x = 0;
            ({ z: 10, f: this.f }).f(({}));
        }
        C.prototype.f = function (x) {
            x.e; // e not found
            x.z; // ok
        };
        return C;
    })();
    M.C = C;
})(M || (M = {}));

var C = (function () {
    function C() {
    }
    C.prototype.f = function (x) {
    };
    return C;
})();
