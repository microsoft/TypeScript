/// <reference path="fourslash.ts" />

////interface Foo { foo: string; bar: string; }
////type T = Pick<Foo, "/**/">;

// TODO: GH#22907
verify.completionsAt("", ["foo", "bar"], { isNewIdentifierLocation: true });
