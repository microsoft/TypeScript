//// [fuzzy.js]
var M;
(function (M) {
    var C = (function () {
        function C(x) {
            this.x = x;
        }
        C.prototype.works = function () {
            return ({ anything: 1 });
        };

        C.prototype.doesntWork = function () {
            return { anything: 1, oneI: this };
        };

        C.prototype.worksToo = function () {
            return ({ oneI: this });
        };
        return C;
    })();
    M.C = C;
})(M || (M = {}));
