/// <reference path='fourslash.ts' />

/////*label1Definition*/label1: while (true) {
////    /*label2Definition*/label2: while (true) {
////        break /*1*/label1;
////        continue /*2*/label2;
////        () => { break /*3*/label1; }
////        continue /*4*/unknownLabel;
////    }
////}

goTo.marker('1');
goTo.definition();
verify.caretAtMarker('label1Definition');

goTo.marker('2');
goTo.definition();
verify.caretAtMarker('label2Definition');

// no labels accross function bounderies
goTo.marker('3');
verify.not.definitionLocationExists();

// undefined label
goTo.marker('4');
verify.not.definitionLocationExists();