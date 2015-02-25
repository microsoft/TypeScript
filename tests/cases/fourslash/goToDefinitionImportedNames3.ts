/// <reference path='fourslash.ts' />

// @Filename: e.ts
//// import {M, /*classAliasDefinition*/C, I} from "d";
//// var c = new /*classReference*/C();


// @Filename: d.ts
////export * from "c";


// @Filename: c.ts
////export {Module as M, Class as C, Interface as I} from "b";


// @Filename: b.ts
////export * from "a";


// @Filename: a.ts
////export module Module {
////}
/////*classDefinition*/export class Class {
////    private f;
////}
////export interface Interface {
////    x;
////}

goTo.file("e.ts");

goTo.marker('classReference');
goTo.definition();
verify.caretAtMarker('classAliasDefinition');

goTo.marker('classAliasDefinition');
goTo.definition();
verify.caretAtMarker('classDefinition');
