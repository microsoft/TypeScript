//// [tests/cases/compiler/enumFromExternalModule.ts] ////

//// [enumFromExternalModule_0.ts]
export enum Mode { Open }

//// [enumFromExternalModule_1.ts]
///<reference path='enumFromExternalModule_0.ts'/>
import f = require('./enumFromExternalModule_0');

var x = f.Mode.Open;


//// [enumFromExternalModule_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = void 0;
var Mode;
(function (Mode) {
    Mode[Mode["Open"] = 0] = "Open";
})(Mode || (exports.Mode = Mode = {}));
//// [enumFromExternalModule_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='enumFromExternalModule_0.ts'/>
var f = require("./enumFromExternalModule_0");
var x = f.Mode.Open;
