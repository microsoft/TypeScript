/// <reference path='fourslash.ts' />

// @Filename: goToDefinitionPartialImplementation_1.ts
////module A {
////    export interface /*Part1Definition*/IA {
////        y: string;
////    }
////}

// @Filename: goToDefinitionPartialImplementation_2.ts
////module A {
////    export interface /*Part2Definition*/IA {
////        x: number;
////    }
////
////    var x: [|/*Part2Use*/IA|];
////}

verify.baselineGoToDefinition("Part2Use");
