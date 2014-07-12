/// <reference path='fourslash.ts'/>

// Function overloads should be highlighted together.

////function /*1*/foo(x: string);
////function /*2*/foo(x: string, y: number) {
////    /*3*/foo('', 43);
////}

goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(3);