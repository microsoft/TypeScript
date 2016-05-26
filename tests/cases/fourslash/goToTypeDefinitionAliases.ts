/// <reference path='fourslash.ts' />

// @Filename: goToTypeDefinitioAliases_module1.ts
/////*definition*/interface I {
////    p;
////}
////export {I as I2};

// @Filename: goToTypeDefinitioAliases_module2.ts
////import {I2 as I3} from "./goToTypeDefinitioAliases_module1";
////var v1: I3;
////export {v1 as v2};

// @Filename: goToTypeDefinitioAliases_module3.ts
////import {/*reference1*/v2 as v3} from "./goToTypeDefinitioAliases_module2";
/////*reference2*/v3;

goTo.marker('reference1');
goTo.type();
verify.caretAtMarker('definition');

goTo.marker('reference2');
goTo.type();
verify.caretAtMarker('definition');
