//// [tests/cases/compiler/enumFromExternalModule.ts] ////

//// [enumFromExternalModule_0.ts]
export enum Mode { Open }

//// [enumFromExternalModule_1.ts]
///<reference path='enumFromExternalModule_0.ts'/>
import f = require('./enumFromExternalModule_0');

var x = f.Mode.Open;


//// [enumFromExternalModule_0.js]
"use strict";
(function (Mode) {
    Mode[Mode["Open"] = 0] = "Open";
})(exports.Mode || (exports.Mode = {}));
var Mode = exports.Mode;
//// [enumFromExternalModule_1.js]
"use strict";
///<reference path='enumFromExternalModule_0.ts'/>
var f = require('./enumFromExternalModule_0');
var x = f.Mode.Open;
