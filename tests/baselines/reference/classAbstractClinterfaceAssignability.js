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

var I: IConstructor;

abstract class A {
    x: number;
    static y: number;
}

var AA: typeof A;
AA = I;

var AAA: typeof I;
AAA = A;

//// [classAbstractClinterfaceAssignability.js]
var I;
class A {
    x;
    static y;
}
var AA;
AA = I;
var AAA;
AAA = A;
