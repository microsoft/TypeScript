//// [cloduleSplitAcrossFiles_class.js]
var D = (function () {
    function D() {
    }
    return D;
})();
//// [cloduleSplitAcrossFiles_module.js]
var D;
(function (D) {
    D.y = "hi";
})(D || (D = {}));
D.y;
