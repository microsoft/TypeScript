//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBinding1WithExport.ts] ////

//// [server.ts]
var a = 10;
export default a;

//// [client.ts]
export import defaultBinding, * as nameSpaceBinding  from "server";
export var x: number = defaultBinding;

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 10;
exports.default = a;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const server_1 = require("server");
exports.x = server_1.default;
