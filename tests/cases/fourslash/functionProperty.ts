/// <reference path='fourslash.ts'/>

////var a = {
////    x(a: number) { }
////};
////
////var b = {
////    x: function (a: number) { }
////};
////
////var c = {
////    x: (a: number) => { }
////};
////a.x(/*signatureA*/1);
////b.x(/*signatureB*/1);
////c.x(/*signatureC*/1);
////a./*completionA*/;
////b./*completionB*/;
////c./*completionC*/;
////a./*quickInfoA*/x;
////b./*quickInfoB*/x;
////c./*quickInfoC*/x;

verify.signatureHelp({ marker: ["signatureA", "signatureB", "signatureC"], text: "x(a: number): void" });

goTo.marker('completionA');
verify.completionListContains("x", "(method) x(a: number): void");

goTo.marker('completionB');
verify.completionListContains("x", "(property) x: (a: number) => void");

goTo.marker('completionC');
verify.completionListContains("x", "(property) x: (a: number) => void");

verify.quickInfos({
    quickInfoA: "(method) x(a: number): void",
    quickInfoB: "(property) x: (a: number) => void",
    quickInfoC: "(property) x: (a: number) => void"
});
