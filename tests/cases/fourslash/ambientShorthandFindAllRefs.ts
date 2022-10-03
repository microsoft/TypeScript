/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module "jquery";

// @Filename: user.ts
////import {/*1*/x} from "jquery";

// @Filename: user2.ts
////import {/*2*/x} from "jquery";

// TODO: Want these to be in the same group, but that would require creating a symbol for `x`.
verify.baselineFindAllReferences('1', '2');
