//// [constructorParameterShadowsOuterScopes.js]
// Initializer expressions for instance member variables are evaluated in the scope of the class constructor
// body but are not permitted to reference parameters or local variables of the constructor.
// This effectively means that entities from outer scopes by the same name as a constructor parameter or
// local variable are inaccessible in initializer expressions for instance member variables
var x = 1;
var C = (function () {
    function C(x) {
        this.b = x;
        x = 2; // error, x is string
    }
    return C;
})();

var y = 1;
var D = (function () {
    function D(x) {
        this.b = y;
        var y = "";
    }
    return D;
})();
