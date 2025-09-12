//// [tests/cases/compiler/thisInTupleTypeParameterConstraints.ts] ////

//// [thisInTupleTypeParameterConstraints.ts]
interface Boolean {}
interface IArguments {}
interface Function {}
interface Number {}
interface RegExp {}
interface Object {}
interface String {}

interface Array<T> {
    // 4 methods will run out of memory if this-types are not instantiated
    // correctly for tuple types that are type parameter constraints
    map<U>(arg: this): void;
    reduceRight<U>(arg: this): void;
    reduce<U>(arg: this): void;
    reduce2<U>(arg: this): void;
}

declare function f<T extends [(x: number) => number]>(a: T): void;
let x: [(x: number) => number];
f(x);


//// [thisInTupleTypeParameterConstraints.js]
var x;
f(x);
