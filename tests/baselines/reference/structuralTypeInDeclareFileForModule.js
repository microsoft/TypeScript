//// [tests/cases/compiler/structuralTypeInDeclareFileForModule.ts] ////

//// [structuralTypeInDeclareFileForModule.ts]
module M { export var x; }
var m = M;

//// [structuralTypeInDeclareFileForModule.js]
var M;
(function (M) {
})(M || (M = {}));
var m = M;


//// [structuralTypeInDeclareFileForModule.d.ts]
declare namespace M {
    var x: any;
}
declare var m: typeof M;
