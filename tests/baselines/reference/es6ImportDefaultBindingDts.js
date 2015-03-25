//// [tests/cases/compiler/es6ImportDefaultBindingDts.ts] ////

//// [server.ts]

class c { }
export = c;

//// [client.ts]
import defaultBinding from "server";
export var x = new defaultBinding();
import defaultBinding2 from "server"; // elide this import since defaultBinding2 is not used


//// [server.js]
var c = (function () {
    function c() {
    }
    return c;
})();
module.exports = c;
//// [client.js]
var defaultBinding = require("server");
exports.x = new defaultBinding();


//// [server.d.ts]
declare class c {
}
export = c;
//// [client.d.ts]
import defaultBinding from "server";
export declare var x: defaultBinding;
