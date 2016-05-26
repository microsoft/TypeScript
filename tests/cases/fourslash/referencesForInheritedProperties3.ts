/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    /*1*/doStuff(): void;
////    /*2*/propName: string;
//// }
////
//// var v: interface1;
//// v./*3*/propName;
//// v./*4*/doStuff();

test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(2);
});