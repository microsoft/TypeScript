//// [typeParametersInStaticMethods.js]
var foo = (function () {
    function foo() {
    }
    foo.M = function (x) {
    };
    return foo;
})();
