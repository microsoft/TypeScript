/// <reference path='fourslash.ts'/>

////namespace modTest {
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
////    namespace testMod {
////    }
////}

verify.baselineFindAllReferences('1', '2', '3', '4')
