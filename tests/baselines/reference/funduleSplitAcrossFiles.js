//// [funduleSplitAcrossFiles_function.js]
function D() {
}
//// [funduleSplitAcrossFiles_module.js]
var D;
(function (D) {
    D.y = "hi";
})(D || (D = {}));
D.y;
