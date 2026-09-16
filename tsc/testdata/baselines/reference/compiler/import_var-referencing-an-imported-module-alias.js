//// [tests/cases/compiler/import_var-referencing-an-imported-module-alias.ts] ////

//// [host.ts]
export class Host { }

//// [consumer.ts]
import host = require("host");
var hostVar = host;
var v = new hostVar.Host();
 

//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const host = require("host");
var hostVar = host;
var v = new hostVar.Host();
