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
////var x = (snapcrackle || magnitude || art).[|/*usage*/pop|];

verify.baselineGoToDefinition("usage");
