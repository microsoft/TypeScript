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
    a = x;
    constructor(x) {
    }
}
class B {
    a = x;
    constructor() {
        var x = "";
    }
}
