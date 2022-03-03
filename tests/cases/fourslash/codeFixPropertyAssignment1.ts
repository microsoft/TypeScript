/// <reference path='fourslash.ts'/>

////const a = {
////    x/**/= 1
////}

verify.codeFix({
    description: [ts.Diagnostics.Change_0_to_1.message, "=", ":"],
    index: 0,
    newFileContent:
`const a = {
    x: 1
}`,
});
