//// [tests/cases/compiler/es6ImportWithoutFromClauseWithExport.ts] ////

//// [server.ts]
export var a = 10;

//// [client.ts]
export import "server";

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("server");


//// [server.d.ts]
export declare var a: number;
//// [client.d.ts]
export import "server";
