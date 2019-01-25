//// [spreadBooleanRespectsFreshness.ts]
type Foo = FooBase | FooArray;
type FooBase = string | false;
type FooArray = FooBase[];

declare let foo1: Foo;
declare let foo2: Foo;
foo1 = [...Array.isArray(foo2) ? foo2 : [foo2]];

//// [spreadBooleanRespectsFreshness.js]
foo1 = (Array.isArray(foo2) ? foo2 : [foo2]).slice();
