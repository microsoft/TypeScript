//// [tests/cases/compiler/duplicateIdentifierShouldNotShortCircuitBaseTypeBinding.ts] ////

//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_0.ts]
export interface IPoint {}

export module Shapes {

    export class Point implements IPoint {}

}

//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_1.ts]
//var x = new Shapes.Point();
//interface IPoint {}

//module Shapes {

//    export class Point implements IPoint {}

//}

//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Shapes;
    (function (Shapes) {
        var Point = (function () {
            function Point() {
            }
            return Point;
        }());
        Shapes.Point = Point;
    })(Shapes = exports.Shapes || (exports.Shapes = {}));
});
//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_1.js]
//var x = new Shapes.Point();
//interface IPoint {}
//module Shapes {
//    export class Point implements IPoint {}
//} 
