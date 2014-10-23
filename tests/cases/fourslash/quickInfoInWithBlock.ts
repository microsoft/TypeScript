/// <reference path='fourslash.ts'/>

////with (x) {
////    function /*1*/f() { }
////    var /*2*/b = /*3*/f;
////}


goTo.marker('1');
verify.quickInfoIs("any");

goTo.marker('2');
verify.quickInfoIs("any");

goTo.marker('3');
verify.quickInfoIs("any");