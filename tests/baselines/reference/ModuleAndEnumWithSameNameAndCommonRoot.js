//// [tests/cases/conformance/internalModules/DeclarationMerging/ModuleAndEnumWithSameNameAndCommonRoot.ts] ////

//// [ModuleAndEnumWithSameNameAndCommonRoot.ts]
module enumdule {

    export class Point {
        constructor(public x: number, public y: number) { }
    }
}

enum enumdule {
    Red, Blue
}

var x: enumdule;
var x = enumdule.Red;

var y: { x: number; y: number };
var y = new enumdule.Point(0, 0);

//// [ModuleAndEnumWithSameNameAndCommonRoot.js]
var enumdule;
(function (enumdule) {
    class Point {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    enumdule.Point = Point;
})(enumdule || (enumdule = {}));
(function (enumdule) {
    enumdule[enumdule["Red"] = 0] = "Red";
    enumdule[enumdule["Blue"] = 1] = "Blue";
})(enumdule || (enumdule = {}));
var x;
var x = enumdule.Red;
var y;
var y = new enumdule.Point(0, 0);
