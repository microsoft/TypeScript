//// [intersectionTypeWithLeadingOperator.ts]
type A = & string;
type B =
  & { foo: string }
  & { bar: number };


//// [intersectionTypeWithLeadingOperator.js]
