/// <reference path="fourslash.ts" />

////let a = <string> "";
////let b = <number> 1;
////let c = <any[]> [];
////let d = <string[]> [];
////let e = <string[]> ["e"];

format.setFormatOptions({
    insertSpaceAfterTypeAssertion: true,
})
format.document();
verify.currentFileContentIs(
`let a=<string> "";
let b=<number> 1;
let c=<any[]> [];
let d=<string[]> [];
let e=<string[]> ["e"];`
);
