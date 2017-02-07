//// [tests/cases/compiler/es6ImportWithoutFromClauseWithExport.ts] ////

//// [server.ts]

export var a = 10;

//// [client.ts]
export import "server";

//// [server.js]
"use strict";
exports.a = 10;
exports.__esModule = true;
//// [client.js]
"use strict";
require("server");
exports.__esModule = true;


//// [server.d.ts]
export declare var a: number;
//// [client.d.ts]
export import "server";
