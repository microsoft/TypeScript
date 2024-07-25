// @strict: true
/// <reference path='fourslash.ts' />
//// function f(x: [|void?|]) {
//// }

verify.codeFix({
    description: "Change 'void?' to 'void'",
    errorCode: 17019,
    index: 0,
    newRangeContent: "void",
});
