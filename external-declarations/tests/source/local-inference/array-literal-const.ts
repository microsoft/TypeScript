// @strict:true,false
export let arr = [1, 2, 3, -1] as const;
export let arr2 = ["1", 2, true, 1] as const;
export let tupleWithNull = [1, null, undefined] as const;
export let arrObjects = [
    { foo: "A", m(): void {} },
    { bar: "B" },
    { bar: { baz: 1} },
] as const;