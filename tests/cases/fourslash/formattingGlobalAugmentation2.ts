/// <reference path="fourslash.ts"/>

////declare module "A" {
/////*1*/                  global                {
////    }
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("    global {");