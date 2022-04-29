/// <reference path='fourslash.ts' />

////class Foo<T1, T2> {}
////const foo = new Foo</*1*/, /*2*/,
////
////function foo<T1, T2>() {}
////const f = foo</*3*/, /*4*/,

verify.completions({ marker: "1", exact: completion.globalTypesPlus(['Foo']) });
verify.completions({ marker: "2", exact: completion.globalTypesPlus(['Foo']) });
verify.completions({ marker: "3", exact: completion.globalTypesPlus(['Foo']) });
verify.completions({ marker: "4", exact: completion.globalTypesPlus(['Foo']) });
