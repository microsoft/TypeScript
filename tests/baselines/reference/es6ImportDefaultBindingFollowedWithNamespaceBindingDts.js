//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts.ts] ////

//// [server.ts]
export class a { }

//// [client.ts]
import defaultBinding, * as nameSpaceBinding  from "./server";
export var x = new nameSpaceBinding.a();

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
class a {
}
exports.a = a;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const nameSpaceBinding = require("./server");
exports.x = new nameSpaceBinding.a();


//// [server.d.ts]
export declare class a {
}
//// [client.d.ts]
import * as nameSpaceBinding from "./server";
export declare var x: nameSpaceBinding.a;
