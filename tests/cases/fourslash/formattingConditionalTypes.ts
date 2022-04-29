/// <reference path='fourslash.ts'/>

/////*L1*/type Diff1<T, U> = T extends U?never:T;
/////*L2*/type Diff2<T, U> = T    extends    U  ?    never   :     T;

format.document();

goTo.marker("L1");
verify.currentLineContentIs("type Diff1<T, U> = T extends U ? never : T;");

goTo.marker("L2");
verify.currentLineContentIs("type Diff2<T, U> = T extends U ? never : T;");