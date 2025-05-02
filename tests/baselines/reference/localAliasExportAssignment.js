//// [tests/cases/compiler/localAliasExportAssignment.ts] ////

//// [localAliasExportAssignment_0.ts]
var server: {
    (): any;
};

export = server;

//// [localAliasExportAssignment_1.ts]
///<reference path='localAliasExportAssignment_0.ts'/>
import connect = require('./localAliasExportAssignment_0');

connect();




//// [localAliasExportAssignment_0.js]
"use strict";
var server;
module.exports = server;
//// [localAliasExportAssignment_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='localAliasExportAssignment_0.ts'/>
var connect = require("./localAliasExportAssignment_0");
connect();
