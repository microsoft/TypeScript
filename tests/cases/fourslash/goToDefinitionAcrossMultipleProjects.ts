/// <reference path="fourslash.ts" />

//@Filename: a.ts
////var /*def1*/x: number;

//@Filename: b.ts
////var /*def2*/x: number;

//@Filename: c.ts
////var /*def3*/x: number;

//@Filename: d.ts
////var /*def4*/x: number;

//@Filename: e.ts
/////// <reference path="a.ts" />
/////// <reference path="b.ts" />
/////// <reference path="c.ts" />
/////// <reference path="d.ts" />
////[|/*use*/x|]++;

verify.baselineGoToDefinition("use");
