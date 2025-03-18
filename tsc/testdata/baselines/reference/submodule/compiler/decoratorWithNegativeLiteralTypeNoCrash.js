//// [tests/cases/compiler/decoratorWithNegativeLiteralTypeNoCrash.ts] ////

//// [decoratorWithNegativeLiteralTypeNoCrash.ts]
class A {
    @decorator
    public field1: -1 = -1;
}
function decorator(target: any, field: any) {}

//// [decoratorWithNegativeLiteralTypeNoCrash.js]
class A {
    @decorator
    field1 = -1;
}
function decorator(target, field) { }
