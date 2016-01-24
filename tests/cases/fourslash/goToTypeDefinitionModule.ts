/// <reference path='fourslash.ts' />

// @Filename: goToTypeDefinitioAliases_module1.ts
/////*definition*/module M {
////    export var p;
////}
////var m: typeof M;

// @Filename: goToTypeDefinitioAliases_module3.ts
/////*reference1*/M;
/////*reference2*/m;

goTo.marker('reference1');
goTo.type();
verify.caretAtMarker('definition');

goTo.marker('reference2');
goTo.type();
verify.caretAtMarker('definition');