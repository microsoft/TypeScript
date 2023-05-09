//@nolib:true

//@fileName: lib.d.ts

interface Object { type: "object" }
interface String { type: "string" }
interface BigInt { type: "bigint" }
interface Number { type: "number" }
interface Boolean { type: "boolean" }
interface Function { type: "function" }
interface Array<T> { type: "array" }

//@fileName: unions.ts
export let arrStrings3 = [`A` as `A`, `B` as `B`];
export let arrStrings0 = ["", "A" as "A"];
export let arrStrings1 = ["A" as "A", ""];
export let arrStrings2 = [`A` as `A`, ""];
export let arrStrings4 = [`A` as `B${number}`, `E`];
export let arrStrings5 = [`A` as `A`, `B` as `B`, 'C' as const, 'D' as const, "", 'E' as const, 'F' as const];
export let arrStrings6 = [`A` as `B${number}`, `G` as const];

export let arrBooleans1 = [true as const, false];
export let arrBooleans2 = [false, true as const];
export let arrBooleans3 = [false as const, true as const];



export let arrNumber1 = [1 as const, 0];
export let arrNumber2 = [0, 1 as const];
export let arrNumber3 = [1 as const, 2 as const];
export let arrNumber4 = [1 as const, 2 as const, 3 as const, 0, 4 as const, 5 as const];


export let arrBigInt1 = [1n as const, 0n];
export let arrBigInt2 = [0n, 1n as const];
export let arrBigInt3 = [1n as const, 2n as const];


export let arrMixed1 = [false as const, true as const, 0 as const];
export let arrMixed2 = [false as const, true as const, 0 as const, 1];
export let arrMixed3 = [false as const, true as const, 0 as const, 1 as const];
export let arrMixed4 = [false as const, true as const, "A" as const, 1 as const];
export let arrMixed5 = [false as const, true as const, "A" as const, 1 as const, ""];
export let arrMixed6 = [true as const, "A" as const, 1 as const, "", 0];
export let arrMixed7 = [true as const, "A" as const, 1 as const, "", 0, 1n as const];
export let arrMixed8 = [true as const, 2n, "A" as const, 1 as const, "", 0, 1n as const];

export let unionOrder1 = [0, ""]
export let unionOrder2 = ["", 0]
export let unionOrder3 = ["", { foo: 0}, 0]
export let unionOrder4 = [{ foo: 0}, 0, "", 0]
export let unionOrder5 = [{ foo: 0}, 0, "", 0, true as const]
export let unionOrder6 = [{ foo: 0}, 0, "", 0, 1n, true as const]