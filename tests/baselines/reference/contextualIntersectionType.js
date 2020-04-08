//// [contextualIntersectionType.ts]
var x: { a: (s: string) => string } & { b: (n: number) => number };
x = {
    a: s => s,
    b: n => n
};


//// [contextualIntersectionType.js]
var x;
x = {
    a: function (s) { return s; },
    b: function (n) { return n; }
};
