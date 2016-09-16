/// <reference path='fourslash.ts' />

// @Filename: goToDefinitionPartialImplementation_1.ts
////module A {
////    /*Part1Definition*/export interface IA {
////        y: string;
////    }
////}

// @Filename: goToDefinitionPartialImplementation_2.ts
////module A {
////    /*Part2Definition*/export interface IA {
////        x: number;
////    }
////
////    var x: /*Part2Use*/IA;
////}

verify.goToDefinition("Part2Use", ["Part1Definition", "Part2Definition"]);
