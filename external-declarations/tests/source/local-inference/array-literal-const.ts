// @strict:true,false
// @target: es2015
export let arr = [1, 2, 3, -1] as const;
export let arrTrue = [true] as const;
export let arr2 = ["1", 2, true, 1] as const;
export let tupleWithNull = [1, null, undefined] as const;
export let arrObjects = [
    { foo: "A", m(): void {} },
    { bar: "B" },
    { bar: { baz: 1} },
] as const;


let tuple = [1, 2, 3] as const
export const composedTuple = [0, ...tuple] as const
export const composedArray = [0, ...tuple];