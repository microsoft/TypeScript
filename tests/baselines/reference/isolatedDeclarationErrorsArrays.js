//// [tests/cases/compiler/isolatedDeclarationErrorsArrays.ts] ////

//// [ok.ts]
export let a1 = [1, "2"] as const
const x = 0;
export let a2 = [x as 0, "2"] as const
type N = 1;
export let a3 = [x as N, "2" as string] as const
export let a4 = [Math.random() as N, "2" as string] as const
export const a5 = [(s: N):void => {}, "2"] as const

export const o = {
    arr: [x as N,2,3]
} as const

export const o2 = {
    arr: () => [x as N,2,3] as const
};


//// [bad.ts]
export let aBad1 = [1, "2"];
export const aBad2 = [1, "2"];
const y = 0;
type S = "2";

export let aBad3 = [y, "2"] as const
export let a = [1,2,3] as const;
export let aBad4 = [...a] as const

export const oBad1 = {
    arr: [y,2,3]
} as const

export const oBad2 = {
    arr: () => [y,2,3]
} as const

//// [ok.js]
export let a1 = [1, "2"];
const x = 0;
export let a2 = [x, "2"];
export let a3 = [x, "2"];
export let a4 = [Math.random(), "2"];
export const a5 = [(s) => { }, "2"];
export const o = {
    arr: [x, 2, 3]
};
export const o2 = {
    arr: () => [x, 2, 3]
};
//// [bad.js]
export let aBad1 = [1, "2"];
export const aBad2 = [1, "2"];
const y = 0;
export let aBad3 = [y, "2"];
export let a = [1, 2, 3];
export let aBad4 = [...a];
export const oBad1 = {
    arr: [y, 2, 3]
};
export const oBad2 = {
    arr: () => [y, 2, 3]
};


//// [ok.d.ts]
export declare let a1: readonly [1, "2"];
export declare let a2: readonly [0, "2"];
type N = 1;
export declare let a3: readonly [N, string];
export declare let a4: readonly [N, string];
export declare const a5: readonly [(s: N) => void, "2"];
export declare const o: {
    readonly arr: readonly [N, 2, 3];
};
export declare const o2: {
    arr: () => readonly [N, 2, 3];
};
export {};
