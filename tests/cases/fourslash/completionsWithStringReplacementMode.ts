/// <reference path="fourslash.ts" />

////interface Foo { foo: string; bar: string; }
////type T = Pick<Foo, "[|/*1*/|]">;
////type TT = Pick<Foo, "[|fo/*2*/|]">;
////type TTT = Pick<Foo, "[|b/*3*/|]">;

for (let i = 0 ; i < 3; ++i) {
    verify.completions({
        marker: `${i + 1}`,
        exact: [
            { name: "foo", replacementSpan: test.ranges()[i] },
            { name: "bar", replacementSpan: test.ranges()[i] },
        ]
    });
}