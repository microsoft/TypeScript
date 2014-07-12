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

goTo.marker('signatureA');
verify.currentSignatureHelpIs('x(a: number): void');

goTo.marker('signatureB');
verify.currentSignatureHelpIs('x(a: number): void');

goTo.marker('signatureC');
verify.currentSignatureHelpIs('x(a: number): void');

goTo.marker('completionA');
verify.completionListContains("x", "(a: number): void");

goTo.marker('completionB');
verify.completionListContains("x", "(a: number) => void");

goTo.marker('completionC');
verify.completionListContains("x", "(a: number) => void");

goTo.marker('quickInfoA');
verify.quickInfoIs("(a: number): void", undefined, "x", "local function");

goTo.marker('quickInfoB');
verify.quickInfoIs("(a: number) => void", undefined, "x", "property");

goTo.marker('quickInfoC');
verify.quickInfoIs("(a: number) => void", undefined, "x", "property");