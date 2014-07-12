//// [staticsNotInScopeInClodule.js]
var Clod = (function () {
    function Clod() {
    }
    Clod.x = 10;
    return Clod;
})();

var Clod;
(function (Clod) {
    var p = x;
})(Clod || (Clod = {}));
