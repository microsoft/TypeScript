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

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker('Part2Use');
goTo.definition();
verify.caretAtMarker('Part1Definition');
