//// [tests/cases/compiler/identityOfInstantiatedMappedIntersection.ts] ////

//// [identityOfInstantiatedMappedIntersection.ts]
declare const brand: unique symbol;
type Equal<T, U> = (<V>() => V extends T ? 1 : 2) extends (<V>() => V extends U ? 1 : 2) ? true : false;
declare function assertEqual<T, U>(value: Equal<T, U>): void;

type Flatten<T> = { [K in keyof T]: T[K] };
type Branded = Flatten<{ name: string }> & { [brand]: { label: true } };
assertEqual<Branded, { name: string } & { [brand]: { label: true } }>(true);


//// [identityOfInstantiatedMappedIntersection.js]
"use strict";
assertEqual(true);
