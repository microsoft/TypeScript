//// [unionTypeWithLeadingOperator.ts]
type A = | string;
type B =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" };

type C = [| 0 | 1, | "foo" | "bar"];

export type D = 
  /*leading0*/
  | /*leading1*/ 1 /*trailing1*/ 
  | /*leading2*/ 2 /*trailing2*/;

//// [unionTypeWithLeadingOperator.js]
"use strict";
exports.__esModule = true;


//// [unionTypeWithLeadingOperator.d.ts]
export declare type D = /*leading1*/ 1 | /*leading2*/ 2;
