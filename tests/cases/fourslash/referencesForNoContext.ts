/// <reference path='fourslash.ts'/>

////module modTest {
////    //Declare
////    export var modVar:number;
////    /*1*/
////
////    //Increments
////    modVar++;
////
////    class testCls{
////        /*2*/
////    }
////
////    function testFn(){
////        //Increments
////        modVar++;
////    }  /*3*/
/////*4*/
////    module testMod {
////    }
////}

goTo.marker("1");
verify.referencesCountIs(0);

goTo.marker("2");
verify.referencesCountIs(0);

goTo.marker("3");
verify.referencesCountIs(0);

goTo.marker("4");
verify.referencesCountIs(0);
