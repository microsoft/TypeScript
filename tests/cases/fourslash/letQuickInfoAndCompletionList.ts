/// <reference path='fourslash.ts' />

////let /*1*/a = 10;
/////*2*/a = 30;
////function foo() {
////    let /*3*/b = 20;
////    /*4*/b = /*5*/a;
////}

const a = "let a: number";
const b = "let b: number";
const completionA: FourSlashInterface.ExpectedCompletionEntry = { name: "a", text: a };
const completionB: FourSlashInterface.ExpectedCompletionEntry = { name: "b", text: b };

verify.completions(
    { marker: "2", includes: completionA },
    { marker: "4", includes: [completionA, completionB] },
    { marker: "5", includes: [completionA, completionB], isNewIdentifierLocation: true },
);

verify.quickInfos({
    1: a,
    2: a,
    3: b,
    4: b,
    5: a,
});
