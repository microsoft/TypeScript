//// [tests/cases/compiler/parameterPropertyReferencingOtherParameter.ts] ////

//// [parameterPropertyReferencingOtherParameter.ts]
class Foo {
    constructor(public x: number, public y: number = x) { }
}


//// [parameterPropertyReferencingOtherParameter.js]
class Foo {
    x;
    y;
    constructor(x, y = x) {
        this.x = x;
        this.y = y;
    }
}
