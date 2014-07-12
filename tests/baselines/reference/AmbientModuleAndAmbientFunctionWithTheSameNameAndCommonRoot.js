//// [tests/cases/conformance/internalModules/DeclarationMerging/AmbientModuleAndAmbientFunctionWithTheSameNameAndCommonRoot.ts] ////

//// [module.d.ts]
declare module Point {
    export var Origin: { x: number; y: number; }
}

//// [function.d.ts]
declare function Point(): { x: number; y: number; }

//// [test.ts]
var cl: { x: number; y: number; }
var cl = Point();
var cl = Point.Origin;

//// [test.js]
var cl;
var cl = Point();
var cl = Point.Origin;
