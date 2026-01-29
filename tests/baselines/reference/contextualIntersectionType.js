//// [tests/cases/conformance/types/intersection/contextualIntersectionType.ts] ////

//// [contextualIntersectionType.ts]
var x: { a: (s: string) => string } & { b: (n: number) => number };
x = {
    a: s => s,
    b: n => n
};


//// [contextualIntersectionType.js]
var x;
x = {
    a: s => s,
    b: n => n
};
