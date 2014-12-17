/// <reference path='fourslash.ts' />

////interface SnapCrackle {
////    /*def1*/pop(): string;
////}
////
////interface Magnitude {
////    /*def2*/pop(): number;
////}
////
////interface Art {
////    /*def3*/pop(): boolean;
////}
////
////var art: Art;
////var magnitude: Magnitude;
////var snapcrackle: SnapCrackle;
////
////var x = (snapcrackle || magnitude || art)./*usage*/pop;

goTo.marker("usage");
verify.definitionCountIs(3);
goTo.definition(0);
verify.caretAtMarker("def1");

goTo.marker("usage");
goTo.definition(1);
verify.caretAtMarker("def2");

goTo.marker("usage");
goTo.definition(2);
verify.caretAtMarker("def3");