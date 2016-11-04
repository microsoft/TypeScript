/// <reference path='fourslash.ts' />

////interface I<X> { x: X}
////[|class C<T extends string , U> extends I<T>|]{}

verify.rangeAfterCodeFix("class C<T extends string , U> implements I<T>");