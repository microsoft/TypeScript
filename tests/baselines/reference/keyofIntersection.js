//// [keyofIntersection.ts]
type A = { a: string };
type B = { b: string };

type T01 = keyof (A & B);  // "a" | "b"
type T02<T> = keyof (T & B);  // "b" | keyof T
type T03<U> = keyof (A & U);  // "a" | keyof U
type T04<T, U> = keyof (T & U);  // keyof T | keyof U
type T05 = T02<A>;  // "a" | "b"
type T06 = T03<B>;  // "a" | "b"
type T07 = T04<A, B>;  // "a" | "b"

// Repros from #22291

type Example1<T extends string, U extends string> = keyof (Record<T, any> & Record<U, any>);
type Result1 = Example1<'x', 'y'>;  // "x" | "y"

type Result2 = keyof (Record<'x', any> & Record<'y', any>);  // "x" | "y"

type Example3<T extends string> = keyof (Record<T, any>);
type Result3 = Example3<'x' | 'y'>;  // "x" | "y"

type Example4<T extends string, U extends string> = (Record<T, any> & Record<U, any>);
type Result4 = keyof Example4<'x', 'y'>;  // "x" | "y"

type Example5<T, U> = keyof (T & U);
type Result5 = Example5<Record<'x', any>, Record<'y', any>>;  // "x" | "y"


//// [keyofIntersection.js]
"use strict";


//// [keyofIntersection.d.ts]
declare type A = {
    a: string;
};
declare type B = {
    b: string;
};
declare type T01 = keyof (A & B);
declare type T02<T> = keyof (T & B);
declare type T03<U> = keyof (A & U);
declare type T04<T, U> = keyof (T & U);
declare type T05 = T02<A>;
declare type T06 = T03<B>;
declare type T07 = T04<A, B>;
declare type Example1<T extends string, U extends string> = keyof (Record<T, any> & Record<U, any>);
declare type Result1 = Example1<'x', 'y'>;
declare type Result2 = keyof (Record<'x', any> & Record<'y', any>);
declare type Example3<T extends string> = keyof (Record<T, any>);
declare type Result3 = Example3<'x' | 'y'>;
declare type Example4<T extends string, U extends string> = (Record<T, any> & Record<U, any>);
declare type Result4 = keyof Example4<'x', 'y'>;
declare type Example5<T, U> = keyof (T & U);
declare type Result5 = Example5<Record<'x', any>, Record<'y', any>>;
