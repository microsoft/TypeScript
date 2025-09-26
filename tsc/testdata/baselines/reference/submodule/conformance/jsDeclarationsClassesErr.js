//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassesErr.ts] ////

//// [index.js]
// Pretty much all of this should be an error, (since index signatures and generics are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless

export class M<T> {
    field: T;
}

export class N<U> extends M<U> {
    other: U;
}

export class O {
    [idx: string]: string;
}

export class P extends O {}

export class Q extends O {
    [idx: string]: "ok";
}

export class R extends O {
    [idx: number]: "ok";
}

export class S extends O {
    [idx: string]: "ok";
    [idx: number]: never;
}

export class T {
    [idx: number]: string;
}

export class U extends T {}


export class V extends T {
    [idx: string]: string;
}

export class W extends T {
    [idx: number]: "ok";
}

export class X extends T {
    [idx: string]: string;
    [idx: number]: "ok";
}

export class Y {
    [idx: string]: {x: number};
    [idx: number]: {x: number, y: number};
}

export class Z extends Y {}

export class AA extends Y {
    [idx: string]: {x: number, y: number};
}

export class BB extends Y {
    [idx: number]: {x: 0, y: 0};
}

export class CC extends Y {
    [idx: string]: {x: number, y: number};
    [idx: number]: {x: 0, y: 0};
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CC = exports.BB = exports.AA = exports.Z = exports.Y = exports.X = exports.W = exports.V = exports.U = exports.T = exports.S = exports.R = exports.Q = exports.P = exports.O = exports.N = exports.M = void 0;
// Pretty much all of this should be an error, (since index signatures and generics are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless
class M {
    field;
}
exports.M = M;
class N extends M {
    other;
}
exports.N = N;
class O {
}
exports.O = O;
class P extends O {
}
exports.P = P;
class Q extends O {
}
exports.Q = Q;
class R extends O {
}
exports.R = R;
class S extends O {
}
exports.S = S;
class T {
}
exports.T = T;
class U extends T {
}
exports.U = U;
class V extends T {
}
exports.V = V;
class W extends T {
}
exports.W = W;
class X extends T {
}
exports.X = X;
class Y {
}
exports.Y = Y;
class Z extends Y {
}
exports.Z = Z;
class AA extends Y {
}
exports.AA = AA;
class BB extends Y {
}
exports.BB = BB;
class CC extends Y {
}
exports.CC = CC;


//// [index.d.ts]
export declare class M<T> {
    field: T;
}
export declare class N<U> extends M<U> {
    other: U;
}
export declare class O {
    [idx: string]: string;
}
export declare class P extends O {
}
export declare class Q extends O {
    [idx: string]: "ok";
}
export declare class R extends O {
    [idx: number]: "ok";
}
export declare class S extends O {
    [idx: string]: "ok";
    [idx: number]: never;
}
export declare class T {
    [idx: number]: string;
}
export declare class U extends T {
}
export declare class V extends T {
    [idx: string]: string;
}
export declare class W extends T {
    [idx: number]: "ok";
}
export declare class X extends T {
    [idx: string]: string;
    [idx: number]: "ok";
}
export declare class Y {
    [idx: string]: {
        x: number;
    };
    [idx: number]: {
        x: number;
        y: number;
    };
}
export declare class Z extends Y {
}
export declare class AA extends Y {
    [idx: string]: {
        x: number;
        y: number;
    };
}
export declare class BB extends Y {
    [idx: number]: {
        x: 0;
        y: 0;
    };
}
export declare class CC extends Y {
    [idx: string]: {
        x: number;
        y: number;
    };
    [idx: number]: {
        x: 0;
        y: 0;
    };
}
