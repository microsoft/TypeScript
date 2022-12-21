//// [tests/cases/compiler/es6ImportDefaultBindingWithExport.ts] ////

//// [server.ts]
var a = 10;
export default a;

//// [client.ts]
export import defaultBinding from "server";
export var x = defaultBinding;
export import defaultBinding2 from "server"; // non referenced

//// [server.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a = 10;
    exports.default = a;
});
//// [client.js]
define(["require", "exports", "server"], function (require, exports, server_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = server_1.default;
});


//// [server.d.ts]
declare var a: number;
export default a;
//// [client.d.ts]
export declare var x: number;
