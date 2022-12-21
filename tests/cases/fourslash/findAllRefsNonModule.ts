/// <reference path="fourslash.ts" />

// @checkJs: true

// @Filename: /script.ts
//// console.log("I'm a script!");

// @Filename: /import.ts
//// import "./script/*1*/";

// @Filename: /require.js
//// require("./script/*2*/");
//// console.log("./script/*3*/");

// @Filename: /tripleSlash.ts
//// /// <reference path="script.ts" />

// @Filename: /stringLiteral.ts
//// console.log("./script");

verify.baselineFindAllReferences("1", "2", "3");
