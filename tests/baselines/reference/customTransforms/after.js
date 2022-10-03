// [source.js]
function f1() { }
//@after
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
(function () { });
//@after
var e;
(function (e) {
})(e || (e = {}));
// leading
function f2() { } // trailing
