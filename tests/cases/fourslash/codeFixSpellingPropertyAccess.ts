/// <reference path='fourslash.ts' />

////const foo = {
////    bar: 1
////}
////
////const bar = [|foo.#bar|];

verify.codeFixAvailable([
    { description: "Change spelling to 'bar'" },
]);

verify.codeFix({
    index: 0,
    description: "Change spelling to 'bar'",
    newRangeContent: "foo.bar"
});
