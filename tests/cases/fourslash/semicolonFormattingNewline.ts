/// <reference path='fourslash.ts' />

////declare var f: { 
////    (): any;
////    (x: number): string;
////            foo: number;/**/
////};

goTo.marker();
edit.insert('\n');
verify.indentationIs(4);
