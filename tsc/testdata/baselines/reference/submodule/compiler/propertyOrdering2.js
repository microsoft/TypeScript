//// [tests/cases/compiler/propertyOrdering2.ts] ////

//// [propertyOrdering2.ts]
class Foo {
    constructor(public x, y) { }
       foo() {
        var a = this.x;
        return this.y;
    }
}


//// [propertyOrdering2.js]
class Foo {
    x;
    constructor(x, y) {
        this.x = x;
    }
    foo() {
        var a = this.x;
        return this.y;
    }
}
