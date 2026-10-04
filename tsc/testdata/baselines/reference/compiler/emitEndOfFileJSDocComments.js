//// [tests/cases/compiler/emitEndOfFileJSDocComments.ts] ////

//// [emitEndOfFileJSDocComments.js]
/** @typedef {number} A */
var unrelated;
/** @typedef {number} B */

//// [emitEndOfFileJSDocComments.js]
"use strict";
/** @typedef {number} A */
var unrelated;
/** @typedef {number} B */ 
