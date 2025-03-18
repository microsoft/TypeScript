//// [tests/cases/compiler/unionTypeWithLeadingOperator.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
