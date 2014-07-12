/// <reference path='fourslash.ts' />

////var /*A*/f: {
////    x: number;
////    <
////};

goTo.marker('A');
verify.quickInfoIs('{ x: number; (): any; }', "", "f", "var");
