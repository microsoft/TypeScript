//// [tests/cases/conformance/internalModules/DeclarationMerging/AmbientModuleAndNonAmbientFunctionWithTheSameNameAndCommonRoot.ts] ////

//// [module.d.ts]
declare module Point {
    export var Origin: { x: number; y: number; }
}

//// [function.ts]
function Point() {
    return { x: 0, y: 0 };
}

//// [test.ts]
var cl: { x: number; y: number; }
var cl = Point();
var cl = Point.Origin;

//// [function.js]
function Point() {
    return { x: 0, y: 0 };
}
//// [test.js]
var cl;
var cl = Point();
var cl = Point.Origin;
