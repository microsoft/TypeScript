//// [tests/cases/compiler/constructorParametersThatShadowExternalNamesInVariableDeclarations.ts] ////

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
class A {
    constructor(x) {
        this.a = x;
    }
}
class B {
    constructor() {
        this.a = x;
        var x = "";
    }
}
