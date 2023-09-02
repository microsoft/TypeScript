//// [tests/cases/compiler/recursiveConditionalCrash1.ts] ////

//// [recursiveConditionalCrash1.ts]
type C1<T> = [T extends string ? C1<T> : never][0];
type C2<T> = [T extends string ? [C2<T>] : never][0];


//// [recursiveConditionalCrash1.js]
