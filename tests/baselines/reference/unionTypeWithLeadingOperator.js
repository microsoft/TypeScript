//// [unionTypeWithLeadingOperator.ts]
type A = | string;
type B =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" };


//// [unionTypeWithLeadingOperator.js]
