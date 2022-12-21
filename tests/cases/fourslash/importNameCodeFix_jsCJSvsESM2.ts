/// <reference path="fourslash.ts" />
// @allowJs: true
// @checkJs: true

// @Filename: types/dep.d.ts
//// export declare class Dep {}

// @Filename: index.js
//// Dep/**/

// @Filename: util1.ts
//// import fs from 'fs';

// @Filename: util2.js
//// const fs = require('fs');


// TypeScript files don't count as indicators of import style for JS
goTo.marker("");
verify.importFixAtPosition([`const { Dep } = require("./types/dep");

Dep`]);