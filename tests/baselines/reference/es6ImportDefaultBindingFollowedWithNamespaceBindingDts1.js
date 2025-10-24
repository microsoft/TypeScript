//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts1.ts] ////

//// [server.ts]
class a { }
export default a;

//// [client.ts]
import defaultBinding, * as nameSpaceBinding from "./server";
export var x = new defaultBinding();

//// [server.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class a {
    }
    exports.default = a;
});
//// [client.js]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./server"], function (require, exports, server_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    server_1 = __importDefault(server_1);
    exports.x = new server_1.default();
});


//// [server.d.ts]
declare class a {
}
export default a;
//// [client.d.ts]
import defaultBinding from "./server";
export declare var x: defaultBinding;
