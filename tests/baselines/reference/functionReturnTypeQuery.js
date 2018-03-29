//// [functionReturnTypeQuery.ts]
declare let foo: number;

declare function test1(foo: string, bar: typeof foo): typeof foo;
declare function test2({foo}: {foo: string}, bar: typeof foo): typeof foo;

//// [functionReturnTypeQuery.js]
