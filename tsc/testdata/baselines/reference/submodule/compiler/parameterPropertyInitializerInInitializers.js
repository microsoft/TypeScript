//// [tests/cases/compiler/parameterPropertyInitializerInInitializers.ts] ////

//// [parameterPropertyInitializerInInitializers.ts]
class Foo {
    constructor(public x: number, public y: number = x) { }
}

//// [parameterPropertyInitializerInInitializers.js]
class Foo {
    x;
    y;
    constructor(x, y = x) {
        this.x = x;
        this.y = y;
    }
}
