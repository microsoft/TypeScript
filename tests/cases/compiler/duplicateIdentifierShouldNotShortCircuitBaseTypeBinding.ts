//@module: amd
// @FileName: duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_0.ts
export interface IPoint {}

export module Shapes {

    export class Point implements IPoint {}

}

// @FileName: duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_1.ts
//var x = new Shapes.Point();
//interface IPoint {}

//module Shapes {

//    export class Point implements IPoint {}

//}