//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts1.ts] ////

//// [server.ts]
class a { }
export default a;

//// [client.ts]
import defaultBinding, * as nameSpaceBinding from "./server";
export var x = new defaultBinding();

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class a {
}
exports.default = a;
//// [client.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const server_1 = __importDefault(require("./server"));
exports.x = new server_1.default();


//// [server.d.ts]
declare class a {
}
export default a;
//// [client.d.ts]
import defaultBinding from "./server";
export declare var x: defaultBinding;
