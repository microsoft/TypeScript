/// <reference path='fourslash.ts'/>

////with (x) {
////    function /*1*/f() { }
////    var /*2*/b = /*3*/f;
////}


goTo.marker('1');
verify.quickInfoIs("");

goTo.marker('2');
verify.quickInfoIs("");

goTo.marker('3');
verify.quickInfoIs("");