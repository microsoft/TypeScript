//// [tests/cases/conformance/externalModules/moduleScoping.ts] ////

//// [file1.ts]
var v1 = "sausages"; // Global scope

//// [file2.ts]
var v2 = 42; // Global scope
var v4 = () => 5;

//// [file3.ts]
export var v3 = true;
var v2 = [1,2,3]; // Module scope. Should not appear in global scope

//// [file4.ts]
import file3 = require('./file3');
var t1 = v1;
var t2 = v2;
var t3 = file3.v3;
var v4 = {a: true, b: NaN};  // Should shadow global v2 in this module

//// [file5.ts]
var x = v2; // Should be global v2 of type number again


//// [file1.js]
var v1 = "sausages"; // Global scope
//// [file2.js]
var v2 = 42; // Global scope
var v4 = function () { return 5; };
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v3 = void 0;
exports.v3 = true;
var v2 = [1, 2, 3]; // Module scope. Should not appear in global scope
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file3 = require("./file3");
var t1 = v1;
var t2 = v2;
var t3 = file3.v3;
var v4 = { a: true, b: NaN }; // Should shadow global v2 in this module
//// [file5.js]
var x = v2; // Should be global v2 of type number again
