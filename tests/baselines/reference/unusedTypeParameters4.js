//// [tests/cases/compiler/unusedTypeParameters4.ts] ////

//// [unusedTypeParameters4.ts]
var x: {
    new <T, U>(a: T): void;
}

//// [unusedTypeParameters4.js]
var x;
