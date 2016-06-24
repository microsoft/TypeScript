/// <reference path='fourslash.ts' />

// @Filename: test0.ts
//// import * as foo from "/*0*/

// @Filename: test1.ts
//// import * as foo from "a/*1*/

// @Filename: ambientModules.d.ts
//// declare module "ambientModule" {}
//// declare module "otherAmbientModule" {}

// @Filename: ambientModules2.d.ts
//// declare module "otherOtherAmbientModule" {}


goTo.marker("0");

verify.completionListContains("ambientModule");
verify.completionListContains("otherAmbientModule");
verify.completionListContains("otherOtherAmbientModule");
verify.not.completionListItemsCountIsGreaterThan(3);

goTo.marker("1");

verify.completionListContains("ambientModule");
verify.not.completionListItemsCountIsGreaterThan(1);

