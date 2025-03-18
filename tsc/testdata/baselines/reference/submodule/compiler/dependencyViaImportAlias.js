//// [tests/cases/compiler/dependencyViaImportAlias.ts] ////

//// [A.ts]
export class A {
}
//// [B.ts]
import a = require('A');

import A = a.A;

export = A;

//// [B.js]
"use strict";
const a = require("A");
module.exports = A;
