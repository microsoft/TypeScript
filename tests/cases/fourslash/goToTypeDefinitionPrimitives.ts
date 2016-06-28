/// <reference path='fourslash.ts' />

// @Filename: module1.ts
////var w: {a: number};
////var x = "string";
////var y: number | string;
////var z; // any

// @Filename: module2.ts
////w./*reference1*/a;
/////*reference2*/x;
/////*reference3*/y;
/////*reference4*/y;

goTo.marker('reference1');
verify.typeDefinitionCountIs(0);

goTo.marker('reference1');
verify.typeDefinitionCountIs(0);

goTo.marker('reference2');
verify.typeDefinitionCountIs(0);

goTo.marker('reference4');
verify.typeDefinitionCountIs(0);
