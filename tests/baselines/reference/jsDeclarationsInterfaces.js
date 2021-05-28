//// [index.js]
// Pretty much all of this should be an error, (since interfaces are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless

export interface A {}

export interface B {
    cat: string;
}

export interface C<T, U> {
    field: T & U;
    optionalField?: T;
    readonly readonlyField: T & U;
    readonly readonlyOptionalField?: U;
    (): number;
    (x: T): U;
    <Q>(x: Q): T & Q;

    new (): string;
    new (x: T): U;
    new <Q>(x: Q): T & Q;

    method<Q = number>(): number;
    method<Q>(a: T & Q): Q & number;
    method(a?: number): number;
    method(...args: any[]): number;

    optMethod?(): number;
}

interface G {}

export { G };

interface HH {}

export { HH as H };

export interface I {}
export { I as II };

export { J as JJ };
export interface J {}

export interface K extends I,J {
    x: string;
}

export interface L extends K {
    y: string;
}

export interface M<T> {
    field: T;
}

export interface N<U> extends M<U> {
    other: U;
}

export interface O {
    [idx: string]: string;
}

export interface P extends O {}

export interface Q extends O {
    [idx: string]: "ok";
}

export interface R extends O {
    [idx: number]: "ok";
}

export interface S extends O {
    [idx: string]: "ok";
    [idx: number]: never;
}

export interface T {
    [idx: number]: string;
}

export interface U extends T {}


export interface V extends T {
    [idx: string]: string;
}

export interface W extends T {
    [idx: number]: "ok";
}

export interface X extends T {
    [idx: string]: string;
    [idx: number]: "ok";
}

export interface Y {
    [idx: string]: {x: number};
    [idx: number]: {x: number, y: number};
}

export interface Z extends Y {}

export interface AA extends Y {
    [idx: string]: {x: number, y: number};
}

export interface BB extends Y {
    [idx: number]: {x: 0, y: 0};
}

export interface CC extends Y {
    [idx: string]: {x: number, y: number};
    [idx: number]: {x: 0, y: 0};
}


//// [index.js]
"use strict";
// Pretty much all of this should be an error, (since interfaces are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless
Object.defineProperty(exports, "__esModule", { value: true });


//// [index.d.ts]
export interface A {
}
export interface B {
    cat: string;
}
export interface C<T_1, U_1> {
    new (): string;
    new (x: T_1): U_1;
    new <Q_4>(x: Q_4): T_1 & Q_4;
    (): number;
    (x: T_1): U_1;
    <Q_3>(x: Q_3): T_1 & Q_3;
    field: T_1 & U_1;
    optionalField?: T_1;
    readonly readonlyField: T_1 & U_1;
    readonly readonlyOptionalField?: U_1;
    method<Q_1 = number>(): number;
    method<Q_2>(a: T_1 & Q_2): Q_2 & number;
    method(a?: number): number;
    method(...args: any[]): number;
    optMethod?(): number;
}
export interface I {
}
export interface J {
}
export interface K extends I, J {
    x: string;
}
export interface L extends K {
    y: string;
}
export interface M<T_1> {
    field: T_1;
}
export interface N<U_1> extends M<U_1> {
    other: U_1;
}
export interface O {
    [idx: string]: string;
}
export interface P extends O {
}
export interface Q extends O {
    [idx: string]: "ok";
}
export interface R extends O {
    [idx: number]: "ok";
}
export interface S extends O {
    [idx: string]: "ok";
    [idx: number]: never;
}
export interface T {
    [idx: number]: string;
}
export interface U extends T {
}
export interface V extends T {
    [idx: string]: string;
}
export interface W extends T {
    [idx: number]: "ok";
}
export interface X extends T {
    [idx: string]: string;
    [idx: number]: "ok";
}
export interface Y {
    [idx: string]: {
        x: number;
    };
    [idx: number]: {
        x: number;
        y: number;
    };
}
export interface Z extends Y {
}
export interface AA extends Y {
    [idx: string]: {
        x: number;
        y: number;
    };
}
export interface BB extends Y {
    [idx: number]: {
        x: 0;
        y: 0;
    };
}
export interface CC extends Y {
    [idx: string]: {
        x: number;
        y: number;
    };
    [idx: number]: {
        x: 0;
        y: 0;
    };
}
export interface G {
}
interface HH {
}
export { HH as H, I as II, J as JJ };
