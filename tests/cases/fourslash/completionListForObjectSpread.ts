/// <reference path='fourslash.ts'/>
////let o = { a: 1, b: 'no' }
////let o2 = { b: 'yes', c: true }
////let swap = { a: 'yes', b: -1 };
////let addAfter: { a: number, b: string, c: boolean } =
////    { ...o, c: false }
////let addBefore: { a: number, b: string, c: boolean } =
////    { c: false, ...o }
////let ignore: { a: number, b: string } =
////    { b: 'ignored', ...o }
////ignore./*1*/a;
////let combinedNestedChangeType: { a: number, b: boolean, c: number } =
////    { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: -1 }
////combinedNestedChangeType./*2*/a;
////let spreadNull: { a: number } =
////    { a: 7, ...null }
////let spreadUndefined: { a: number } =
////    { a: 7, ...undefined }
////spreadNull./*3*/a;
////spreadUndefined./*4*/a;

const a: FourSlashInterface.ExpectedCompletionEntry = { name: "a", text: "(property) a: number" };
verify.completions(
    {
        marker: "1",
        exact: [a, { name: "b", text: "(property) b: string" }],
    },
    {
        marker: "2",
        exact: [a, { name: "b", text: "(property) b: boolean" }, { name: "c", text: "(property) c: number" }],
    },
    { marker: ["3", "4"], exact: a },
);
