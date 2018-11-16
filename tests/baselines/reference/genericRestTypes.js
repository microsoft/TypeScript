//// [genericRestTypes.ts]
// Repro from #25793

// Gets the parameters of a function type as a tuple
// Removes the first element from a tuple
type Tail<T extends any[]> = ((...args: T) => any) extends ((head: any, ...tail: infer U) => any) ? U : never;

type MyFunctionType = (foo: number, bar: string) => boolean;

type Explicit = (...args: Tail<Parameters<MyFunctionType>>) => ReturnType<MyFunctionType>; // (bar: string) => boolean

type Bind1<T extends (head: any, ...tail: any[]) => any> = (...args: Tail<Parameters<T>>) => ReturnType<T>;
type Generic = Bind1<MyFunctionType>; // (bar: string) => boolean


//// [genericRestTypes.js]
"use strict";
// Repro from #25793
