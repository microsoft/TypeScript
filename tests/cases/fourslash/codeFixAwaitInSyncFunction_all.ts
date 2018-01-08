/// <reference path='fourslash.ts' />

////function f() {
////    await Promise.resolve();
////}
////
////const g = () => {
////    await f();
////}

verify.codeFixAll({
    fixId: "fixAwaitInSyncFunction",
    newFileContent:
`async function f() {\r
    await Promise.resolve();\r
}
const g = async () => {\r
    await f();\r
}`,
});
