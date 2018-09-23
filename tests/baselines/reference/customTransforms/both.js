// [source.js]
/*@before*/
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
/*@before*/
function f2() { } // trailing
