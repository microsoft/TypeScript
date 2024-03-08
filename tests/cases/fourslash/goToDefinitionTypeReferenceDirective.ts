/// <reference path="fourslash.ts"/>

// @typeRoots: src/types
// @Filename: src/types/lib/index.d.ts
/////*0*/declare let $: {x: number};

// @Filename: src/app.ts
//// /// <reference types="[|lib/*1*/|]"/>
//// $.x;

verify.baselineGoToDefinition("1");
