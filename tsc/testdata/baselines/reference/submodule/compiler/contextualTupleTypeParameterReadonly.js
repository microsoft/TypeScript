//// [tests/cases/compiler/contextualTupleTypeParameterReadonly.ts] ////

//// [contextualTupleTypeParameterReadonly.ts]
declare function each<T extends ReadonlyArray<any>>(cases: ReadonlyArray<T>): (fn: (...args: T) => any) => void;

const cases = [
    [1, '1'],
    [2, '2'],
] as const;

const eacher = each(cases);

eacher((a, b) => {
    a;
    b;
});

// TODO: https://github.com/microsoft/TypeScript/issues/53255
eacher((...args) => {
    const [a, b] = args;
    a;
    b;
});


//// [contextualTupleTypeParameterReadonly.js]
const cases = [
    [1, '1'],
    [2, '2'],
];
const eacher = each(cases);
eacher((a, b) => {
    a;
    b;
});
// TODO: https://github.com/microsoft/TypeScript/issues/53255
eacher((...args) => {
    const [a, b] = args;
    a;
    b;
});
