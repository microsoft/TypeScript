/// <reference path="fourslash.ts" />
// @allowJs: true
// @checkJs: true

// @Filename: types/dep.d.ts
//// export declare class Dep {}

// @Filename: index.js
//// import fs from 'fs';
//// const path = require('path');
////
//// Dep/**/

// @Filename: util2.js
//// export {};


// When current file has both imports and requires, get import style from other files
goTo.marker("");
verify.importFixAtPosition([`import fs from 'fs';
import { Dep } from './types/dep';
const path = require('path');

Dep`]);