//// [tests/cases/compiler/constructorParametersInVariableDeclarations.ts] ////

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
class A {
    a = x;
    b = { p: x };
    c = () => x;
    constructor(x) {
    }
}
class B {
    a = x;
    b = { p: x };
    c = () => x;
    constructor() {
        var x = 1;
    }
}
