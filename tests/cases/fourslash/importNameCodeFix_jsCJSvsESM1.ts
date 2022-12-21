/// <reference path="fourslash.ts" />
// @allowJs: true
// @checkJs: true

// @Filename: types/dep.d.ts
//// export declare class Dep {}

// @Filename: index.js
//// Dep/**/

// @Filename: util.js
//// import fs from 'fs';


// When current file has no imports/requires, look at other JS files
goTo.marker("");
verify.importFixAtPosition([`import { Dep } from "./types/dep";

Dep`]);