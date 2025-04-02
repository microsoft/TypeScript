//// [tests/cases/compiler/declarationEmitInterfaceWithNonEntityNameExpressionHeritage.ts] ////

//// [declarationEmitInterfaceWithNonEntityNameExpressionHeritage.ts]
class A { }
interface Class extends (typeof A) { }

//// [declarationEmitInterfaceWithNonEntityNameExpressionHeritage.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());


//// [declarationEmitInterfaceWithNonEntityNameExpressionHeritage.d.ts]
declare class A {
}
interface Class {
}
