//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/readonlyInConstructorParameters.ts] ////

//// [readonlyInConstructorParameters.ts]
class C {
    constructor(readonly x: number) {}
}
new C(1).x = 2;

class E {
    constructor(readonly public x: number) {}
}

class F {
    constructor(private readonly x: number) {}
}
new F(1).x;

//// [readonlyInConstructorParameters.js]
class C {
    x;
    constructor(x) {
        this.x = x;
    }
}
new C(1).x = 2;
class E {
    x;
    constructor(x) {
        this.x = x;
    }
}
class F {
    x;
    constructor(x) {
        this.x = x;
    }
}
new F(1).x;
