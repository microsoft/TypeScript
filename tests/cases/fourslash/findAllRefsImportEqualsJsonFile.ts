/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @resolveJsonModule: true

// @Filename: /a.ts
////import /*0*/j = require("/*1*/./j.json");
/////*2*/j;

// @Filename: /b.js
////const /*3*/j = require("/*4*/./j.json");
/////*5*/j;

// @Filename: /j.json
/////*6*/{ "x": 0 }

verify.noErrors();

verify.baselineFindAllReferences('0', '2', '1', '4', '3', '5', '6')
