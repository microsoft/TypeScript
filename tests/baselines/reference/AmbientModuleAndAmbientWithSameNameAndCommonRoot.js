//// [tests/cases/conformance/internalModules/DeclarationMerging/AmbientModuleAndAmbientWithSameNameAndCommonRoot.ts] ////

//// [module.d.ts]
declare module A {
    export module Point {
        export var Origin: {
            x: number;
            y: number;
        }
    }
}

//// [class.d.ts]
declare module A {
    export class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
    }
}

//// [test.ts]
var p: { x: number; y: number; }
var p = A.Point.Origin;
var p = new A.Point(0, 0); // unexpected error here, bug 840000
 

//// [test.js]
var p;
var p = A.Point.Origin;
var p = new A.Point(0, 0); // unexpected error here, bug 840000
