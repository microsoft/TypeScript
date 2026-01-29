//// [tests/cases/compiler/declarationEmitAliasInlineing.ts] ////

//// [a.ts]
type O = {
    prop: string
    prop2: string
}

type I = {
    prop: string
}

export const fn = (v: O['prop'], p: Omit<O, 'prop'>, key: keyof O, p2: Omit<O, keyof I>) => {};

//// [aExp.ts]
export type O = {
    prop: string
    prop2: string
}

export type I = {
    prop: string
}

export const fnExp = (v: O['prop'], p: Omit<O, 'prop'>, key: keyof O, p2: Omit<O, keyof I>) => {};

//// [b.ts]
import {fn} from './a'
import {fnExp} from './aExp'
export const f = fn;
export const fExp = fnExp;

//// [a.js]
export const fn = (v, p, key, p2) => { };
//// [aExp.js]
export const fnExp = (v, p, key, p2) => { };
//// [b.js]
import { fn } from './a';
import { fnExp } from './aExp';
export const f = fn;
export const fExp = fnExp;


//// [a.d.ts]
type O = {
    prop: string;
    prop2: string;
};
type I = {
    prop: string;
};
export declare const fn: (v: O["prop"], p: Omit<O, "prop">, key: keyof O, p2: Omit<O, keyof I>) => void;
export {};
//// [aExp.d.ts]
export type O = {
    prop: string;
    prop2: string;
};
export type I = {
    prop: string;
};
export declare const fnExp: (v: O["prop"], p: Omit<O, "prop">, key: keyof O, p2: Omit<O, keyof I>) => void;
//// [b.d.ts]
export declare const f: (v: string, p: Omit<{
    prop: string;
    prop2: string;
}, "prop">, key: keyof {
    prop: string;
    prop2: string;
}, p2: Omit<{
    prop: string;
    prop2: string;
}, "prop">) => void;
export declare const fExp: (v: import("./aExp").O["prop"], p: Omit<import("./aExp").O, "prop">, key: keyof import("./aExp").O, p2: Omit<import("./aExp").O, keyof import("./aExp").I>) => void;
