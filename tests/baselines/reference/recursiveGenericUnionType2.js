//// [tests/cases/compiler/recursiveGenericUnionType2.ts] ////

//// [recursiveGenericUnionType2.ts]
declare namespace Test1 {
    export type Container<T> = T | {
        [i: string]: Container<T>[];
    };
    export type IStringContainer = Container<string>;
}

declare namespace Test2 {
    export type Container<T> = T | {
        [i: string]: Container<T>[];
    };
    export type IStringContainer = Container<string>;
}

var x: Test1.Container<number>;

var s1: Test1.IStringContainer;
var s2: Test2.IStringContainer;
s1 = s2;
s2 = s1;


//// [recursiveGenericUnionType2.js]
var x;
var s1;
var s2;
s1 = s2;
s2 = s1;
