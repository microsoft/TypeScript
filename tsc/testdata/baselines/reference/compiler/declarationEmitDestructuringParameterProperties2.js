//// [tests/cases/compiler/declarationEmitDestructuringParameterProperties2.ts] ////

//// [declarationEmitDestructuringParameterProperties2.ts]
class C1 {
    constructor(public [x, y, z]: string[]) {
    }
}

type TupleType1 =[string, number, boolean];
class C2 {
    constructor(public [x, y, z]: TupleType1) {
    }
}

type ObjType1 = { x: number; y: string; z: boolean }
class C3 {
    constructor(public { x, y, z }: ObjType1) {
    }
}

//// [declarationEmitDestructuringParameterProperties2.js]
"use strict";
class C1 {
    constructor([x, y, z]) {
    }
}
class C2 {
    constructor([x, y, z]) {
    }
}
class C3 {
    constructor({ x, y, z }) {
    }
}


//// [declarationEmitDestructuringParameterProperties2.d.ts]
declare class C1 {
    x: string;
    y: string;
    z: string;
    constructor([x, y, z]: string[]);
}
type TupleType1 = [string, number, boolean];
declare class C2 {
    x: string;
    y: number;
    z: boolean;
    constructor([x, y, z]: TupleType1);
}
type ObjType1 = {
    x: number;
    y: string;
    z: boolean;
};
declare class C3 {
    x: number;
    y: string;
    z: boolean;
    constructor({ x, y, z }: ObjType1);
}
