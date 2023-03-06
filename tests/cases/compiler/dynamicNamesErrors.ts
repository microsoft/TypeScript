// @target: esnext
// @module: commonjs
// @declaration: true
// @useDefineForClassFields: false

const c0 = "1";
const c1 = 1;

interface T0 {
    [c0]: number;
    1: number;
}

interface T1 {
    [c0]: number;
}

interface T2 {
    [c0]: string;
}

interface T3 {
    [c0]: number;
    [c1]: string;
}

let t1: T1;
let t2: T2;
t1 = t2;
t2 = t1;

const x = Symbol();
const y = Symbol();
const z = Symbol();
const w = Symbol();

export interface InterfaceMemberVisibility {
    [x]: number;
    [y](): number;
}

export class ClassMemberVisibility {
    static [x]: number;
    static [y](): number { return 0; }
    static get [z](): number { return 0; }
    static set [w](value: number) { }

    [x]: number;
    [y](): number { return 0; }
    get [z](): number { return 0; }
    set [w](value: number) { }
}

export type ObjectTypeVisibility = {
    [x]: number;
    [y](): number;
};

export const ObjectLiteralVisibility = {
    [x]: 0,
    [y](): number { return 0; },
    get [z](): number { return 0; },
    set [w](value: number) { },
};