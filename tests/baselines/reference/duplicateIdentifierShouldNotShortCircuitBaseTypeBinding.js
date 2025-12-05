//// [tests/cases/compiler/duplicateIdentifierShouldNotShortCircuitBaseTypeBinding.ts] ////

//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_0.ts]
export interface IPoint {}

export namespace Shapes {

    export class Point implements IPoint {}

}

//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_1.ts]
//var x = new Shapes.Point();
//interface IPoint {}

//namespace Shapes {

//    export class Point implements IPoint {}

//}

//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shapes = void 0;
    var Shapes;
    (function (Shapes) {
        var Point = /** @class */ (function () {
            function Point() {
            }
            return Point;
        }());
        Shapes.Point = Point;
    })(Shapes || (exports.Shapes = Shapes = {}));
});
//// [duplicateIdentifierShouldNotShortCircuitBaseTypeBinding_1.js]
//var x = new Shapes.Point();
//interface IPoint {}
//namespace Shapes {
//    export class Point implements IPoint {}
//}
