//// [constructorParametersThatShadowExternalNamesInVariableDeclarations.ts]
var x = 1;
class A {
    private a = x;
    constructor(x: number) {
    }
}

class B {
    private a = x;
    constructor() {
        var x = "";
    }
}

//// [constructorParametersThatShadowExternalNamesInVariableDeclarations.js]
var x = 1;
var A = /** @class */ (function () {
    function A(x) {
        this.a = x;
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
        this.a = x;
        var x = "";
    }
    return B;
}());
