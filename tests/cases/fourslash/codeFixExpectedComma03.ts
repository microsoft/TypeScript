/// <reference path='fourslash.ts' />

////class C {
////    const example = [|{ one: 1 one }|]
////}

verify.not.codeFixAvailable("fixExpectedComma")