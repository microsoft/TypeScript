// @declaration: true
// @isolatedDeclarations: true 
// @declarationMap: false
// @strict: true
// @target: ESNext

// @fileName: ok.ts
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


// @fileName:bad.ts
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