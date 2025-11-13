//@module: amd
// @FileName: duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_0.ts
export interface IPoint {}

export namespace Shapes {

    export class Point implements IPoint {}

}

// @FileName: duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_1.ts
//var x = new Shapes.Point();
//interface IPoint {}

//namespace Shapes {

//    export class Point implements IPoint {}

//}