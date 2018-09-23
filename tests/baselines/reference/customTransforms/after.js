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
var e = e || (e = {});
(function (e) {
})(e);
// leading
function f2() { } // trailing
