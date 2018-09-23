//// [structuralTypeInDeclareFileForModule.ts]
module M { export var x; }
var m = M;

//// [structuralTypeInDeclareFileForModule.js]
var M = M || (M = {});
(function (M) {
})(M);
var m = M;


//// [structuralTypeInDeclareFileForModule.d.ts]
declare module M {
    var x: any;
}
declare var m: typeof M;
