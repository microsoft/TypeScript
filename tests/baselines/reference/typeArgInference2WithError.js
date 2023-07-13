//// [tests/cases/compiler/typeArgInference2WithError.ts] ////

//// [typeArgInference2WithError.ts]
interface Item {
    name: string;
}

declare function foo<T extends Item>(x?: T, y?: T): T;

var z7 = foo("abc", 5); // Error

//// [typeArgInference2WithError.js]
var z7 = foo("abc", 5); // Error
