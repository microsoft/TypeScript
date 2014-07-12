/// <reference path='fourslash.ts'/>

////with (x) {
////    function /*1*/f() { }
////    var /*2*/b = /*3*/f;
////}


goTo.marker('1');
verify.not.quickInfoExists();

goTo.marker('2');
verify.not.quickInfoExists();

goTo.marker('3');
verify.not.quickInfoExists();
