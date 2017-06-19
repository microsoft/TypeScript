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
var e;
(function (e) {
})(e || (e = {}));
// leading
/*@before*/
function f2() { } // trailing
