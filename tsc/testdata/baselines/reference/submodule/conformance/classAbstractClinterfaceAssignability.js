//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractClinterfaceAssignability.ts] ////

//// [classAbstractClinterfaceAssignability.ts]
interface I {
    x: number;
}

interface IConstructor {
    new (): I;
    
    y: number;
    prototype: I;
}

declare var I: IConstructor;

abstract class A {
    x: number;
    static y: number;
}

declare var AA: typeof A;
AA = I;

declare var AAA: typeof I;
AAA = A;

//// [classAbstractClinterfaceAssignability.js]
"use strict";
class A {
    x;
    static y;
}
AA = I;
AAA = A;
