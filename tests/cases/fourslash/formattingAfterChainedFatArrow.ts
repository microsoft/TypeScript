/// <reference path="fourslash.ts" />

////var x = n => p => {
////    while (true) {
////        void 0;
////    }/**/
////};

goTo.marker();
format.document();
verify.currentLineContentIs('    }');
