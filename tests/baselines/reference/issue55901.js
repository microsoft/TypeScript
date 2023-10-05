//// [tests/cases/compiler/issue55901.ts] ////

//// [issue55901.ts]
export const l = "A";
export const l1 = l as typeof l;
export const l2 = l;
export let l3 = l as typeof l;
export let a4 = l;

export const s = Symbol();
export const s1 = s as typeof s;
export const s2 = s;
export let s3 = s as typeof s;
export let s4 = s;


//// [issue55901.js]
export const l = "A";
export const l1 = l;
export const l2 = l;
export let l3 = l;
export let a4 = l;
export const s = Symbol();
export const s1 = s;
export const s2 = s;
export let s3 = s;
export let s4 = s;


//// [issue55901.d.ts]
export declare const l = "A";
export declare const l1: "A";
export declare const l2 = "A";
export declare let l3: "A";
export declare let a4: string;
export declare const s: unique symbol;
export declare const s1: symbol;
export declare const s2: symbol;
export declare let s3: symbol;
export declare let s4: symbol;
