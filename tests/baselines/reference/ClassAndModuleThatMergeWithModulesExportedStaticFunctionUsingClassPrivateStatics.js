//// [ClassAndModuleThatMergeWithModulesExportedStaticFunctionUsingClassPrivateStatics.js]
var clodule = (function () {
    function clodule() {
    }
    clodule.sfn = function (id) {
        return 42;
    };
    return clodule;
})();

var clodule;
(function (clodule) {
    // error: duplicate identifier expected
    function fn(x, y) {
        return clodule.sfn('a');
    }
    clodule.fn = fn;
})(clodule || (clodule = {}));
