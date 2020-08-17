//// [tests/cases/compiler/aliasUsedAsNameValue.ts] ////

//// [aliasUsedAsNameValue_0.ts]
export var id: number;

//// [aliasUsedAsNameValue_1.ts]
export function b(a: any): any { return null; }

//// [aliasUsedAsNameValue_2.ts]
///<reference path='aliasUsedAsNameValue_0.ts' />
///<reference path='aliasUsedAsNameValue_1.ts' />
import mod = require("./aliasUsedAsNameValue_0");
import b = require("./aliasUsedAsNameValue_1");
 
export var a = function () {
    //var x = mod.id; // TODO needed hack that mod is loaded
    b.b(mod);
}


//// [aliasUsedAsNameValue_0.js]
"use strict";
exports.__esModule = true;
exports.id = void 0;
//// [aliasUsedAsNameValue_1.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
function b(a) { return null; }
exports.b = b;
//// [aliasUsedAsNameValue_2.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
///<reference path='aliasUsedAsNameValue_0.ts' />
///<reference path='aliasUsedAsNameValue_1.ts' />
var mod = require("./aliasUsedAsNameValue_0");
var b = require("./aliasUsedAsNameValue_1");
var a = function () {
    //var x = mod.id; // TODO needed hack that mod is loaded
    b.b(mod);
};
exports.a = a;
