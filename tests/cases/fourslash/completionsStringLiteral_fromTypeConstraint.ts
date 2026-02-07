/// <reference path="fourslash.ts" />

// @stableTypeOrdering: true
////interface Foo { foo: string; bar: string; }
////type T = Pick<Foo, "[|/**/|]">;

verify.completions({ marker: "", exact: [
    { name: "bar", replacementSpan: test.ranges()[0] },
    { name: "foo", replacementSpan: test.ranges()[0] },
] });
