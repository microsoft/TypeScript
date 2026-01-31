// [source.js]
function f1() { }
class c {
}
() => { };
//@after
var e;
(function (e) {
})(e || (e = {}));
// leading
function f2() { } // trailing
