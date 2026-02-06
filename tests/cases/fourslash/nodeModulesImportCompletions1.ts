/// <reference path="fourslash.ts" />
// @allowJs: true
// @module: node18
// @Filename: /src/module.mts
//// export {}
// @Filename: /src/module.cts
//// export {}
// @Filename: /src/module.js
//// export {}
// @Filename: /src/decl.d.mts
//// export {}
// @Filename: /src/decl.d.cts
//// export {}
// @Filename: /src/decl.d.ts
//// export {}
// @Filename: /src/js.mjs
//// export {}
// @Filename: /src/js.cjs
//// export {}
// @Filename: /src/js.js
//// export {}

// @Filename: /main.mts
//// import {} from "./src//*1*/";
//// import mod = require("./src//*2*/");
//// const m = import("./src//*3*/");

// @Filename: /main.cts
//// import {} from "./src//*4*/";
//// import mod = require("./src//*5*/");
//// const m = import("./src//*6*/");

// @Filename: /main.ts
//// import {} from "./src//*7*/";
//// import mod = require("./src//*8*/");
//// const m = import("./src//*9*/");

verify.completions({
    marker: ["1", "3", "6", "9"],
    exact: ["decl.cjs", "decl.mjs", "decl.js", "js.cjs", "js.js", "js.mjs", "module.cjs", "module.js", "module.mjs"],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: ["2", "4", "5", "7", "8"],
    exact: ["decl.cjs", "decl.mjs", "decl", "js.cjs", "js", "js.mjs", "module.cjs", "module", "module.mjs"],
    isNewIdentifierLocation: true,
});