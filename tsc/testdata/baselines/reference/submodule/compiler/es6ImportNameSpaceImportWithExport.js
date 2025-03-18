//// [tests/cases/compiler/es6ImportNameSpaceImportWithExport.ts] ////

//// [server.ts]
export var a = 10;

//// [client.ts]
export import * as nameSpaceBinding from "server";
export var x = nameSpaceBinding.a;
export import * as nameSpaceBinding2 from "server"; // Not referenced imports


//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const nameSpaceBinding = require("server");
exports.x = nameSpaceBinding.a;
