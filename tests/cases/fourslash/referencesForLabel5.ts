/// <reference path='fourslash.ts'/>

// References to shadowed label

/////*outer1*/label:  while (true) {
////            if (false) break /*outer2*/label;
////            function blah() {
/////*inner1*/label:          while (true) {
////                    if (false) break /*inner2*/label;
////                }
////            }
////            if (false) break /*outer3*/label;
////        }

goTo.marker("outer1");
verify.referencesCountIs(3);

goTo.marker("outer2");
verify.referencesCountIs(3);

goTo.marker("outer3");
verify.referencesCountIs(3);

goTo.marker("inner1");
verify.referencesCountIs(2);

goTo.marker("inner2");
verify.referencesCountIs(2);
