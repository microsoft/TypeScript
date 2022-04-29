/// <reference path='fourslash.ts'/>

////class C {
/////*1*/    private _mspointerupHandler(args) {
////        if (args.button === 3) {
////            return null; 
/////*2*/        } else if (args.button === 4) {
/////*3*/            return null;
////        }
////    }
////}

goTo.marker('1');
verify.not.quickInfoExists();
goTo.marker('2');
verify.not.quickInfoExists();
goTo.marker('3');
verify.not.quickInfoExists();