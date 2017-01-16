/// <reference path="fourslash.ts" />

//@Filename: a.ts
////var /*def1*/x: number;

//@Filename: b.ts
////var /*def2*/x: number;

//@Filename: c.ts
/////// <reference path="a.ts" />
/////// <reference path="b.ts" />
/////*use*/x++;

verify.goToDefinition("use", ["def1", "def2"]);
