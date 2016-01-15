/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    /*1*/doStuff(): void;
////    /*2*/propName: string;
//// }
//// interface interface2 extends interface1 {
////    /*3*/doStuff(): void;
////    /*4*/propName: string;
//// }
////
//// var v: interface1;
//// v./*5*/propName;
//// v./*6*/doStuff();

test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(3);
});