// @target: es6
const directive = Symbol('directive');
declare function foo<TArg, TRet, TDir>(options:
    {[x in string]: (arg: TArg) => TRet}
    & {[directive]?: TDir}
): [TArg, TRet, TDir];


let case1 = foo({
    [directive]: (x: string) => 'str',
    addOne: (x: number) => x + 1,
    double: (x: number) => x + x,
}); // [number, number, string => string]

let case2 = foo({
    addOne: (x: number) => x + 1,
    double: (x: number) => x + x,
    [directive]: (x: string) => 'str',
}); // [number, number, string => string]

let case3 = foo({
    [directive]: 'str',
    addOne: (x: number) => x + 1,
    double: (x: number) => x + x,
}); // [number, number, string]

const strdirective = "directive";
declare function bar<TArg, TRet, TDir>(options:
    {[x in symbol]: (arg: TArg) => TRet}
    & {[strdirective]?: TDir}
): [TArg, TRet, TDir];

const s1 = Symbol("s1");
const s2 = Symbol("s2");
let case4 = bar({
    [strdirective]: (x: string) => 'str',
    [s1]: (x: number) => x + 1,
    [s2]: (x: number) => x + x,
}); // [number, number, string => string]

let case5 = bar({
    [s1]: (x: number) => x + 1,
    [s2]: (x: number) => x + x,
    [strdirective]: (x: string) => 'str',
}); // [number, number, string => string]

let case6 = bar({
    [strdirective]: 'str',
    [s1]: (x: number) => x + 1,
    [s2]: (x: number) => x + x,
}); // [number, number, string]
