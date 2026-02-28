//// [tests/cases/compiler/declarationEmitInterfaceWithNonEntityNameExpressionHeritage.ts] ////

//// [declarationEmitInterfaceWithNonEntityNameExpressionHeritage.ts]
class A { }
interface Class extends (typeof A) { }

//// [declarationEmitInterfaceWithNonEntityNameExpressionHeritage.js]
"use strict";
class A {
}


//// [declarationEmitInterfaceWithNonEntityNameExpressionHeritage.d.ts]
declare class A {
}
interface Class {
}
