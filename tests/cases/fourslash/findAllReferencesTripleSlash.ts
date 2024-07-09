/// <reference path="fourslash.ts" />

// @checkJs: true

// @Filename: /node_modules/@types/globals/index.d.ts
//// declare const someAmbientGlobal: unknown;

// @Filename: /a.ts
//// /// <reference path="b.ts/*1*/" />
//// /// <reference types="globals/*2*/" />

// @Filename: /b.ts
//// console.log("b.ts");

// @Filename: /c.js
//// require("./b");
//// require("globals");

verify.baselineFindAllReferences("1", "2");
