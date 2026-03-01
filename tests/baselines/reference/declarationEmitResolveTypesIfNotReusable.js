//// [tests/cases/compiler/declarationEmitResolveTypesIfNotReusable.ts] ////

//// [decl.ts]
const u = "X";
type A = { a: { b : "value of b", notNecessary: typeof u }}
const a = { a: "value of a", notNecessary: u } as const


export const o1 = (o: A['a']['b']) => {}

export const o2 = (o: (typeof a)['a']) => {}
export const o3 = (o:  typeof a['a']) => {}

export const o4 = (o: keyof (A['a'])) => {}

//// [main.ts]
import * as d  from './decl'

export const f = {...d}

//// [decl.js]
const u = "X";
const a = { a: "value of a", notNecessary: u };
export const o1 = (o) => { };
export const o2 = (o) => { };
export const o3 = (o) => { };
export const o4 = (o) => { };
//// [main.js]
import * as d from './decl';
export const f = { ...d };


//// [decl.d.ts]
declare const u = "X";
type A = {
    a: {
        b: "value of b";
        notNecessary: typeof u;
    };
};
declare const a: {
    readonly a: "value of a";
    readonly notNecessary: "X";
};
export declare const o1: (o: A["a"]["b"]) => void;
export declare const o2: (o: (typeof a)["a"]) => void;
export declare const o3: (o: (typeof a)["a"]) => void;
export declare const o4: (o: keyof A["a"]) => void;
export {};
//// [main.d.ts]
export declare const f: {
    o1: (o: "value of b") => void;
    o2: (o: "value of a") => void;
    o3: (o: "value of a") => void;
    o4: (o: "b" | "notNecessary") => void;
};
