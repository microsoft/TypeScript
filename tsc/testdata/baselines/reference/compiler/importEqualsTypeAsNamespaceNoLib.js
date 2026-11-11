//// [tests/cases/compiler/importEqualsTypeAsNamespaceNoLib.ts] ////

//// [importEqualsTypeAsNamespaceNoLib.ts]
interface C {}
import x = C.m;


//// [importEqualsTypeAsNamespaceNoLib.js]
"use strict";
var x = C.m;
