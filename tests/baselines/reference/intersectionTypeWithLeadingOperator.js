//// [intersectionTypeWithLeadingOperator.ts]
type A = & string;
type B =
  & { foo: string }
  & { bar: number };

type C = [& { foo: 1 } & { bar: 2 }, & { foo: 3 } & { bar: 4 }];


//// [intersectionTypeWithLeadingOperator.js]
