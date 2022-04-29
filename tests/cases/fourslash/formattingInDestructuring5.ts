/// <reference path='fourslash.ts'/>

//// let a, b;
//// /*1*/if (false)[a, b] = [1, 2];
//// /*2*/if (true)        [a, b] = [1, 2];
//// /*3*/var a = [1, 2, 3].map(num => num) [0];

format.document();

goTo.marker("1");
verify.currentLineContentIs("if (false) [a, b] = [1, 2];");
goTo.marker("2");
verify.currentLineContentIs("if (true) [a, b] = [1, 2];");
goTo.marker("3");
verify.currentLineContentIs("var a = [1, 2, 3].map(num => num)[0];");