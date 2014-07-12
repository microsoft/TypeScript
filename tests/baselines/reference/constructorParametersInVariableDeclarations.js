//// [constructorParametersInVariableDeclarations.js]
var A = (function () {
    function A(x) {
        this.a = x;
        this.b = { p: x };
        this.c = function () {
            return x;
        };
    }
    return A;
})();

var B = (function () {
    function B() {
        this.a = x;
        this.b = { p: x };
        this.c = function () {
            return x;
        };
        var x = 1;
    }
    return B;
})();
