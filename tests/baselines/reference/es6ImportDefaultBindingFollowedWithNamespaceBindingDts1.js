//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts1.ts] ////

//// [server.ts]

class a { }
export default a;

//// [client.ts]
import defaultBinding, * as nameSpaceBinding from "server";
export var x = new defaultBinding();

//// [server.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var a = (function () {
        function a() {
        }
        return a;
    }());
    exports.default = a;
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [client.js]
define(["require", "exports", "server"], function (require, exports, server_1) {
    "use strict";
    exports.x = new server_1.default();
    Object.defineProperty(exports, "__esModule", { value: true });
});


//// [server.d.ts]
declare class a {
}
export default a;
//// [client.d.ts]
import defaultBinding from "server";
export declare var x: defaultBinding;
