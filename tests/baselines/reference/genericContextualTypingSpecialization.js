//// [tests/cases/compiler/genericContextualTypingSpecialization.ts] ////

//// [genericContextualTypingSpecialization.ts]
var b: number[];
b.reduce<number>((c, d) => c + d, 0); // should not error on '+'

//// [genericContextualTypingSpecialization.js]
var b;
b.reduce((c, d) => c + d, 0); // should not error on '+'
