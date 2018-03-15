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
    fixAllDescription: "Fix all like: Add async modifier to containing function",
    newFileContent:
`async function f() {
    await Promise.resolve();
}

const g = async () => {
    await f();
}`,
});
