/// <reference path='fourslash.ts' />

////const f = function() {
////    await Promise.resolve();
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`const f = async function() {
    await Promise.resolve();
}`,
});
