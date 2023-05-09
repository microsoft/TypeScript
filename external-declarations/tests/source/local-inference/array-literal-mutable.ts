// @strict:false,true
export let normalizedObjectArray = [
    { foo: "" },
    { bar: "" },
    { foo: "" },
    { bar: "" },
    { foo: "" },
    { bar: "" },
    { foo: "" },
    { bar: "" }, 
]

export let simpleObjetArray = [
    {foo : "" },
    {foo : "" },
    {foo : "" },
    {foo : "" },
]        
export let stringLiterals = [ `A` as 'A', 'A' as 'A', 'A' as `A`];
export let numberLiterals = [ 1 as 1, 2 as 2, 1 as 1, 0x1 as 0x1];
export let numberLiteralsNeg = [ -1 as -1, -2 as -2, -1 as -1, 0x1 as -0x1];
export let nulls = [null, null, null];
export let undefineds = [undefined, undefined, undefined];
export let empty = []
export let explicitAny = [1, "2", null as any];
export let implicitAny = ["1", null];
export let mixed = ["1", 1, true, null, 2, undefined, "2", false, null]
export let numbers = [1, 2, 3];
export let numbersNeg = [1, 2, 3, -1, -2, -3, -1, -2];
export let strings = ["1", "2", "3"];

export let arrNestedObjects = [
    { bar: { baz: 1} },
    { bar: { bat: 1} },
];

export let arrObjects = [
    { foo: "A", m(): void {} },
    { bar: "B" },
    { bar: { baz: 1} },
    { bar: { bat: 1} },
];