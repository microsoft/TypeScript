//// [tests/cases/compiler/emitEndOfFileJSDocComments.ts] ////

//// [emitEndOfFileJSDocComments.js]
/** @typedef {number} A */
var unrelated;
/** @typedef {number} B */

//// [emitEndOfFileJSDocComments.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @typedef {number} A */
var unrelated;
/** @typedef {number} B */ 
