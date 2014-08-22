//// [genericContextualTypingSpecialization.ts]
var b: number[];
b.reduce<number>((c, d) => c + d, 0); // should not error on '+'

//// [genericContextualTypingSpecialization.js]
var b;
b.reduce(function (c, d) { return c + d; }, 0); // should not error on '+'
