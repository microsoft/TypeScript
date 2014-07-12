//// [moduleNewExportBug.js]
var mod1;
(function (mod1) {
    var C = (function () {
        function C() {
        }
        C.prototype.moo = function () {
        };
        return C;
    })();
})(mod1 || (mod1 = {}));

var c;
