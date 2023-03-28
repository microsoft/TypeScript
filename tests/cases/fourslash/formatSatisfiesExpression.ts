/// <reference path="fourslash.ts" />

////type Foo = "a" | "b" | "c";
////const foo1 = ["a"] satisfies Foo[];
////const foo2 = ["a"]satisfies Foo[];
////const foo3 = ["a"]  satisfies Foo[];

format.document();
verify.currentFileContentIs(
`type Foo = "a" | "b" | "c";
const foo1 = ["a"] satisfies Foo[];
const foo2 = ["a"] satisfies Foo[];
const foo3 = ["a"] satisfies Foo[];`
);
