//// [tests/cases/compiler/constructorReturnsInvalidType.ts] ////

//// [constructorReturnsInvalidType.ts]
class X {
    constructor() {
        return 1;
    }
    foo() { }
}
 
var x = new X();


//// [constructorReturnsInvalidType.js]
class X {
    constructor() {
        return 1;
    }
    foo() { }
}
var x = new X();
