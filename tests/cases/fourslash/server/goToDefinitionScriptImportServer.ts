/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/scriptThing.ts
//// /*1d*/console.log("woooo side effects")

// @Filename: /home/src/workspaces/project/stylez.css
//// /*2d*/div {
////   color: magenta;
//// }

// @Filename: /home/src/workspaces/project/moduleThing.ts

// not a module, but we should let you jump to it.
//// import [|/*1*/"./scriptThing"|];

// not JS/TS, but if we can, you should be able to jump to it.
//// import [|/*2*/"./stylez.css"|];

// does not exist, but should return a response to it anyway so an editor can create it.
//// import [|/*3*/"./foo.txt"|];

verify.baselineGoToDefinition("1", "2", "3");
