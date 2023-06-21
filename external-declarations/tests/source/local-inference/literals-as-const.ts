// @strict:true,false
// @target: es2015

export let n = 0 as const;
export let hex = 0x1 as const;
export let neg = -11 as const;
export const negP = { n: -((11)) } as const;
export const hexNeg = -0x1 as const;
export const hexNegParan = {  n: -(((0x1))) } as const;

export let s = "X" as const;
export let b = true as const;
export let bn = 10n as const;

export let t0 = `A` as const;
export let t1 = `A${1}` as const;
export let t2 = `A${1 as number}` as const;
export let t3 = `A number=${1 as 1|2} string=${"1" as "1" | "2"} bigint=${1n as 1n | 2n} ` as const;
export let t4 = `A number=${1 as 1|2} mixed=${"1" as "X" | number}` as const;
export let t5 = `A number=${1 as 1|2} mixed=${"1" as "1" | number}` as const;

export let n2 = <const>0;
export let s2 = <const>"X";
export let b2 = <const>true;
export let bn2 = <const>10n;