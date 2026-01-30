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
    constructor(x) {
        this.a = x;
        this.b = { p: x };
        this.c = () => x;
    }
}
class B {
    constructor() {
        this.a = x;
        this.b = { p: x };
        this.c = () => x;
        var x = 1;
    }
}
