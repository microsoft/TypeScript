/// <reference path='fourslash.ts' />

////enum Foo {
////    bar,
////    baz
////}
////
////var v = Foo./*valueReference*/ba;
////var t :Foo./*typeReference*/ba;
////Foo.bar./*enumValueReference*/;

verify.completions(
    { marker: ["valueReference", "typeReference"], exact: ["bar", "baz"] },
    { marker: "enumValueReference", exact: ["toString", "toFixed", "toExponential", "toPrecision", "valueOf", "toLocaleString"] },
);
