//// [tests/cases/compiler/typePredicatesCanNarrowByDiscriminant.ts] ////

//// [typePredicatesCanNarrowByDiscriminant.ts]
// #45770
declare const fruit: { kind: 'apple'} | { kind: 'banana' } | { kind: 'cherry' }

declare function isOneOf<T, U extends T>(item: T, array: readonly U[]): item is U
if (isOneOf(fruit.kind, ['apple', 'banana'] as const)) {
    fruit.kind
    fruit
}

declare const fruit2: { kind: 'apple'} | { kind: 'banana' } | { kind: 'cherry' }
const kind = fruit2.kind;
if (isOneOf(kind, ['apple', 'banana'] as const)) {
    fruit2.kind
    fruit2
}

//// [typePredicatesCanNarrowByDiscriminant.js]
"use strict";
if (isOneOf(fruit.kind, ['apple', 'banana'])) {
    fruit.kind;
    fruit;
}
var kind = fruit2.kind;
if (isOneOf(kind, ['apple', 'banana'])) {
    fruit2.kind;
    fruit2;
}
