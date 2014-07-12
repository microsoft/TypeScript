//// [constructorParametersThatShadowExternalNamesInVariableDeclarations.js]
var x = 1;
var A = (function () {
    function A(x) {
        this.a = x;
    }
    return A;
})();

var B = (function () {
    function B() {
        this.a = x;
        var x = "";
    }
    return B;
})();
