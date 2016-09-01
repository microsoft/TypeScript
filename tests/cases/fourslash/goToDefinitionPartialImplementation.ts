/// <reference path='fourslash.ts' />

// @Filename: goToDefinitionPartialImplementation_1.ts
////module A {
////    /*Part1Definition*/export interface IA {
////        y: string;
////    }
////}

// @Filename: goToDefinitionPartialImplementation_2.ts
////module A {
////    export interface IA {
////        x: number;
////    }
////
////    var x: /*Part2Use*/IA;
////}

goTo.marker('Part2Use');
goTo.definition();
verify.caretAtMarker('Part1Definition');
