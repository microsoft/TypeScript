//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts1.ts] ////

//// [server.ts]
class a { }
export default a;

//// [client.ts]
import defaultBinding, * as nameSpaceBinding from "server";
export var x = new defaultBinding();

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class a {
}
exports.default = a;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const server_1 = require("server");
exports.x = new server_1.default();
