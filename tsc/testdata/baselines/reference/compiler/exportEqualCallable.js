//// [tests/cases/compiler/exportEqualCallable.ts] ////

//// [exportEqualCallable_0.ts]
var server: {
    (): any;
};
export = server;

//// [exportEqualCallable_1.ts]
///<reference path='exportEqualCallable_0.ts'/>
import connect = require('exportEqualCallable_0');
connect();


//// [exportEqualCallable_0.js]
"use strict";
var server;
module.exports = server;
//// [exportEqualCallable_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='exportEqualCallable_0.ts'/>
const connect = require("exportEqualCallable_0");
connect();
