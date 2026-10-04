//// [tests/cases/compiler/globalThis.ts] ////

//// [globalThis.ts]
var __e = Math.E;  // should not generate 'this.Math.E'

//// [globalThis.js]
"use strict";
var __e = Math.E; // should not generate 'this.Math.E'
