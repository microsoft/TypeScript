// @declaration: true
// @emitDeclarationOnly: true
// @target: es6

export namespace presentNs {
    export const a = Symbol();
}

const aliasing = Symbol;

export type A = {
    [missing]: number,
    [ns.missing]: number,
    [presentNs.a]: number,
    [Symbol.iterator]: number,
    [globalThis.Symbol.toStringTag]: number,
    [(globalThis.Symbol).unscopables]: number,
    [aliasing.isConcatSpreadable]: number,
    [1]: number,
    ["2"]: number,
    [(missing2)]: number,
    [Math.random() > 0.5 ? "f1" : "f2"]: number,
};

export interface B {
    [missing]: number,
    [ns.missing]: number,
    [presentNs.a]: number,
    [Symbol.iterator]: number,
    [globalThis.Symbol.toStringTag]: number,
    [(globalThis.Symbol).unscopables]: number,
    [aliasing.isConcatSpreadable]: number,
    [1]: number,
    ["2"]: number,
    [(missing2)]: number,
    [Math.random() > 0.5 ? "f1" : "f2"]: number,
}

export class C {
    [missing]: number = 1;
    [ns.missing]: number = 1;
    [presentNs.a]: number = 1;
    [Symbol.iterator]: number = 1;
    [globalThis.Symbol.toStringTag]: number = 1;
    [(globalThis.Symbol).unscopables]: number = 1;
    [aliasing.isConcatSpreadable]: number = 1;
    [1]: number = 1;
    ["2"]: number = 1;
    [(missing2)]: number = 1;
    [Math.random() > 0.5 ? "f1" : "f2"]: number = 1;
}

export const D = {
    [missing]: 1,
    [ns.missing]: 1,
    [presentNs.a]: 1,
    [Symbol.iterator]: 1,
    [globalThis.Symbol.toStringTag]: 1,
    [(globalThis.Symbol).unscopables]: 1,
    [aliasing.isConcatSpreadable]: 1,
    [1]: 1,
    ["2"]: 1,
    [(missing2)]: 1,
    [Math.random() > 0.5 ? "f1" : "f2"]: 1,
};
