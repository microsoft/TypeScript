/// <reference path='fourslash.ts' />

////const f = function() {
////    await Promise.resolve();
////}

verify.codeFix({
    description: "Add async modifier to containing function",
    newFileContent:
`const f = async function() {
    await Promise.resolve();
}`,
});
