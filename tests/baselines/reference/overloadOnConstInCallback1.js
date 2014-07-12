//// [overloadOnConstInCallback1.js]
var C = (function () {
    function C() {
    }
    C.prototype.x1 = function (a, callback) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
    };
    return C;
})();
