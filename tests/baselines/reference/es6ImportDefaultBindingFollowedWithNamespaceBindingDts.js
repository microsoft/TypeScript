//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts.ts] ////

//// [server.ts]

export class a { }

//// [client.ts]
import defaultBinding, * as nameSpaceBinding  from "server";
export var x = new nameSpaceBinding.a();

//// [server.js]
var a = (function () {
    function a() {
    }
    return a;
})();
exports.a = a;
//// [client.js]
var nameSpaceBinding = require("server");
exports.x = new nameSpaceBinding.a();


//// [server.d.ts]
export declare class a {
}
