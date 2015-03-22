/// <reference path="fourslash.ts"/>

////class C1 {
////    public attr(): string;
////    public attr(i: number): string;
////    public attr(i: number, x: boolean): string;
////    public attr(i?: any, x?: any) {
////        return "hi";
////    }
////}
////var i = new C1;
////i.attr(/*1*/

goTo.marker('1');
verify.signatureHelpCountIs(3);