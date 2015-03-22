//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts1.ts] ////

//// [server.ts]

class a { }
export = a;

//// [client.ts]
import defaultBinding, * as nameSpaceBinding from "server";
export var x = new defaultBinding();

//// [server.js]
define(["require", "exports"], function (require, exports) {
    var a = (function () {
        function a() {
        }
        return a;
    })();
    return a;
});
//// [client.js]
define(["require", "exports", "server"], function (require, exports, defaultBinding) {
    exports.x = new defaultBinding();
});


//// [server.d.ts]
declare class a {
}
export = a;
//// [client.d.ts]
import defaultBinding from "server";
export declare var x: defaultBinding;
