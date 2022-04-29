/// <reference path="fourslash.ts"/>
////declare module "fs" { };
////import im = module("fs");/**/

goTo.marker();
edit.insert("\n");
// [Smart Indent] Auto indent after module import decl
verify.indentationIs(0);
