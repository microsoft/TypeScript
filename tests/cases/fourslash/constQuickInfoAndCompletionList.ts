/// <reference path='fourslash.ts' />

////const /*1*/a = 10;
////var x = /*2*/a;
/////*3*/
////function foo() {
////    const /*4*/b = 20;
////    var y = /*5*/b;
////    var z = /*6*/a;
////    /*7*/
////}

const a = "const a: 10";
const b = "const b: 20";
const completeA: FourSlashInterface.ExpectedCompletionEntry = { name: "a", text: a };
const completeB: FourSlashInterface.ExpectedCompletionEntry = { name: "b", text: b };
verify.completions(
    { marker: "2", includes: completeA, excludes: "b", isNewIdentifierLocation: true },
    { marker: "3", includes: completeA, excludes: "b" },
    { marker: ["5", "6"], includes: [completeA, completeB], isNewIdentifierLocation: true },
    { marker: "7", includes: [completeA, completeB] },
);

verify.quickInfos({
    1: a,
    2: a,
    4: b,
    5: b,
    6: a,
});
