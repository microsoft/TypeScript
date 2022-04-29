/// <reference path='fourslash.ts'/>

// References to shadowed label

/////*1*/label:  while (true) {
////            if (false) /*2*/break /*3*/label;
////            function blah() {
/////*4*/label:          while (true) {
////                    if (false) /*5*/break /*6*/label;
////                }
////            }
////            if (false) /*7*/break /*8*/label;
////        }

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8');
