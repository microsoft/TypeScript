/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module "jquery";

// @Filename: user.ts
////import {[|x|]} from "jquery";

// @Filename: user2.ts
////import {[|x|]} from "jquery";

verify.rangesReferenceEachOther();
