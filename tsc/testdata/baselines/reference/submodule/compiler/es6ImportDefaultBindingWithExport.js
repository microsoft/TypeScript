//// [tests/cases/compiler/es6ImportDefaultBindingWithExport.ts] ////

//// [server.ts]
var a = 10;
export default a;

//// [client.ts]
export import defaultBinding from "server";
export var x = defaultBinding;
export import defaultBinding2 from "server"; // non referenced

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
