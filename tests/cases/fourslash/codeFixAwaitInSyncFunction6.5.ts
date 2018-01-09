/// <reference path='fourslash.ts' />

////const f = promise => {
////    await promise;
////}

verify.codeFix({
    description: "Add async modifier to containing function",
    newFileContent:
`const f = async promise => {
    await promise;
}`,
});
