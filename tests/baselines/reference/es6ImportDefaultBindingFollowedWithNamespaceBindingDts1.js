//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingDts1.ts] ////

//// [server.ts]

class a { }
export default a;

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
    exports.default = a;
});
//// [client.js]
define(["require", "exports", "server"], function (require, exports, nameSpaceBinding) {
    exports.x = new _server.default();
});


//// [server.d.ts]
declare class a {
}
export default a;
//// [client.d.ts]
import defaultBinding from "server";
export declare var x: defaultBinding;
