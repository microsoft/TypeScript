// @declaration: true
// @target: esnext
// @lib: esnext

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
