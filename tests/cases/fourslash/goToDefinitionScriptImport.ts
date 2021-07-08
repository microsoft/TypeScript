/// <reference path="fourslash.ts" />

// @filename: scriptThing.ts
//// /*1d*/console.log("woooo side effects")

// @filename: stylez.css
//// /*2d*/div {
////   color: magenta;
//// }

// @filename: moduleThing.ts

// not a module, but we should let you jump to it.
//// import [|/*1*/"./scriptThing"|];

// not JS/TS, but if we can, you should be able to jump to it.
//// import [|/*2*/"./stylez.css"|];

verify.goToDefinition("1", { marker: "1d", unverified: true });
verify.goToDefinition("2", { marker: "2d", unverified: true });
