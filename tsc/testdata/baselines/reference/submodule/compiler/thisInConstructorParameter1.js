//// [tests/cases/compiler/thisInConstructorParameter1.ts] ////

//// [thisInConstructorParameter1.ts]
class Foo {
    public y;
    constructor(x = this.y) { }
}

//// [thisInConstructorParameter1.js]
class Foo {
    y;
    constructor(x = this.y) { }
}
