//// [tests/cases/compiler/declarationEmitDestructuringParameterProperties.ts] ////

//// [declarationEmitDestructuringParameterProperties.ts]
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

//// [declarationEmitDestructuringParameterProperties.js]
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
