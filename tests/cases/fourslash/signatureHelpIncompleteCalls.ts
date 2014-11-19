/// <reference path='fourslash.ts' />

////module IncompleteCalls {
////    class Foo {
////        public f1() { }
////        public f2(n: number): number { return 0; }
////        public f3(n: number, s: string) : string { return ""; }
////    }
////    var x = new Foo();
////    x.f1();
////    x.f2(5);
////    x.f3(5, "");
////    x.f1(/*incompleteCalls1*/
////    x.f2(5,/*incompleteCalls2*/
////    x.f3(5,/*incompleteCalls3*/
////}

goTo.marker('incompleteCalls1');
verify.currentSignatureHelpIs("f1(): void");
verify.currentSignatureParameterCountIs(0);

goTo.marker('incompleteCalls2');
verify.currentSignatureParameterCountIs(1);
verify.currentSignatureHelpIs("f2(n: number): number");
goTo.marker('incompleteCalls3');
verify.currentSignatureParameterCountIs(2);
verify.currentSignatureHelpIs("f3(n: number, s: string): string");

verify.currentParameterHelpArgumentNameIs("s");
verify.currentParameterSpanIs("s: string");  

