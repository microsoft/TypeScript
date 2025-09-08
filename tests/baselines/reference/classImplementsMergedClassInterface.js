//// [tests/cases/conformance/classes/classDeclarations/classImplementsMergedClassInterface.ts] ////

//// [classImplementsMergedClassInterface.ts]
declare class C1 {
    x : number;
}

interface C1 {
    y : number;
}

class C2 implements C1 { // error -- missing x
}

class C3 implements C1 { // error -- missing y
    x : number;
}

class C4 implements C1 { // error -- missing x
    y : number;
}

class C5 implements C1 { // okay
    x : number;
    y : number;
}

//// [classImplementsMergedClassInterface.js]
class C2 {
}
class C3 {
    x;
}
class C4 {
    y;
}
class C5 {
    x;
    y;
}
