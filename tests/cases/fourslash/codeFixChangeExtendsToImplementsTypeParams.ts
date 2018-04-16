/// <reference path='fourslash.ts' />

////interface I<X, Y> { x: X; y: Y; }
////[|class C<T extends string , U> extends I<T , U>|]{}

verify.codeFix({
    description: "Change 'extends' to 'implements'",
    newRangeContent: "class C<T extends string , U> implements I<T , U>",
});
