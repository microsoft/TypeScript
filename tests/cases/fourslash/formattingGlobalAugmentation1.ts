/// <reference path="fourslash.ts"/>

/////*1*/declare          global                      {
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("declare global {");