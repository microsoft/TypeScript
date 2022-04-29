/// <reference path='fourslash.ts'/>

//// /*1*/label : while(true){
////     break /*2*/label;
//// }

goTo.marker('1');
verify.not.quickInfoExists();

goTo.marker('2');
verify.not.quickInfoExists();
