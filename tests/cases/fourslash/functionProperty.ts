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

const method = "(method) x(a: number): void";
const property = "(property) x: (a: number) => void";
verify.completions(
    { marker: "completionA", exact: { name: "x", text: method } },
    { marker: ["completionB", "completionC"], exact: { name: "x", text: property } },
);

verify.quickInfos({
    quickInfoA: method,
    quickInfoB: property,
    quickInfoC: property,
});
