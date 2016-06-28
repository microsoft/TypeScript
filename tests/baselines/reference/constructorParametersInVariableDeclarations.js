//// [constructorParametersInVariableDeclarations.ts]
class A {
    private a = x;
    private b = { p: x };
    private c = () => x;
    constructor(x: number) {
    }
}

class B {
    private a = x;
    private b = { p: x };
    private c = () => x;
    constructor() {
        var x = 1;
    }
}

//// [constructorParametersInVariableDeclarations.js]
var A = (function () {
    function A(x) {
        this.a = x;
        this.b = { p: x };
        this.c = function () { return x; };
    }
    return A;
}());
var B = (function () {
    function B() {
        this.a = x;
        this.b = { p: x };
        this.c = function () { return x; };
        var x = 1;
    }
    return B;
}());
