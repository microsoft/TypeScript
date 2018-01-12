/// <reference path="fourslash.ts" />

////interface Foo { foo: string; bar: string; }
////type T = Pick<Foo, "/**/">;

verify.completionsAt("", ["foo", "bar"]);
