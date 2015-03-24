//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBinding1WithExport.ts] ////

//// [server.ts]

var a = 10;
export = a;

//// [client.ts]
export import defaultBinding, * as nameSpaceBinding  from "server";
export var x: number = defaultBinding;

//// [server.js]
define(["require", "exports"], function (require, exports) {
    var a = 10;
    return a;
});
//// [client.js]
define(["require", "exports", "server"], function (require, exports, defaultBinding) {
    exports.x = defaultBinding;
});


//// [server.d.ts]
declare var a: number;
export = a;
//// [client.d.ts]
export declare var x: number;
