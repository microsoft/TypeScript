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

verify.signatureHelp(
    { marker: "incompleteCalls1", text: "f1(): void", parameterCount: 0 },
    { marker: "incompleteCalls2", text: "f2(n: number): number", parameterCount: 1 },
    { marker: "incompleteCalls3", text: "f3(n: number, s: string): string", parameterCount: 2, parameterName: "s", parameterSpan: "s: string" },
);
