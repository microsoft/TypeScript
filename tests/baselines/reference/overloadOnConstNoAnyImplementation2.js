//// [overloadOnConstNoAnyImplementation2.js]
var C = (function () {
    function C() {
    }
    C.prototype.x1 = function (a, callback) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
        callback(1); // error
    };
    return C;
})();

var c;
c.x1(1, function (x) {
    return 1;
});
c.x1(1, function (x) {
    return 1;
});
c.x1(1, function (x) {
    return 1;
});

c.x1(1, function (x) {
    return 1;
});
