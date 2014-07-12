//// [ClassAndModuleThatMergeWithModulesExportedGenericFunctionAndNonGenericClassStaticFunctionOfTheSameName.js]
var clodule = (function () {
    function clodule() {
    }
    clodule.fn = function (id) {
    };
    return clodule;
})();

var clodule;
(function (clodule) {
    // error: duplicate identifier expected
    function fn(x, y) {
        return x;
    }
    clodule.fn = fn;
})(clodule || (clodule = {}));
