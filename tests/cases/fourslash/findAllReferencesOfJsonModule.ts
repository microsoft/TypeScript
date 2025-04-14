/// <reference path='fourslash.ts' />

// @resolveJsonModule: true
// @module: commonjs
// @esModuleInterop: true

// @Filename: /foo.ts
/////*1*/import /*2*/settings from "./settings.json";
/////*3*/settings;

// @Filename: /settings.json
//// {}

verify.baselineFindAllReferences('1', '2', '3');
