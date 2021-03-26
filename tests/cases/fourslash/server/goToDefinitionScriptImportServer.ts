/// <reference path="../fourslash.ts" />

// @filename: /scriptThing.ts
//// /*1d*/console.log("woooo side effects")

// @filename: /stylez.css
//// /*2d*/div {
////   color: magenta;
//// }

// @filename: /moduleThing.ts

// not a module, but we should let you jump to it.
//// import [|/*1*/"./scriptThing"|];

// not JS/TS, but if we can, you should be able to jump to it.
//// import [|/*2*/"./stylez.css"|];

// does not exist, but should return a response to it anyway so an editor can create it.
//// import [|/*3*/"./foo.txt"|];

verify.goToDefinition("1", "1d");
verify.goToDefinition("2", "2d");
verify.goToDefinition("3", { file: "/foo.txt" });
