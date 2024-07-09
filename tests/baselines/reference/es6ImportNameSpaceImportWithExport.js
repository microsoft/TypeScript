//// [tests/cases/compiler/es6ImportNameSpaceImportWithExport.ts] ////

//// [server.ts]
export var a = 10;

//// [client.ts]
export import * as nameSpaceBinding from "server";
export var x = nameSpaceBinding.a;
export import * as nameSpaceBinding2 from "server"; // Not referenced imports


//// [server.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
});
//// [client.js]
define(["require", "exports", "server"], function (require, exports, nameSpaceBinding) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = nameSpaceBinding.a;
});


//// [server.d.ts]
export declare var a: number;
//// [client.d.ts]
export declare var x: number;
