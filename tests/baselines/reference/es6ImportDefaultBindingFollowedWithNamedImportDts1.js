//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImportDts1.ts] ////

//// [server.ts]

class a { }
export = a;

//// [client.ts]
import defaultBinding1, { } from "server";
export var x1 = new defaultBinding1();
import defaultBinding2, { a } from "server";
export var x2 = new defaultBinding2();
import defaultBinding3, { a as b } from "server";
export var x3 = new defaultBinding3();
import defaultBinding4, { x, a as y } from "server";
export var x4 = new defaultBinding4();
import defaultBinding5, { x as z,  } from "server";
export var x5 = new defaultBinding5();
import defaultBinding6, { m,  } from "server";
export var x6 = new defaultBinding6();

//// [server.js]
var a = (function () {
    function a() {
    }
    return a;
})();
module.exports = a;
//// [client.js]
var defaultBinding1 = require("server");
exports.x1 = new defaultBinding1();
var defaultBinding2 = require("server");
exports.x2 = new defaultBinding2();
var defaultBinding3 = require("server");
exports.x3 = new defaultBinding3();
var defaultBinding4 = require("server");
exports.x4 = new defaultBinding4();
var defaultBinding5 = require("server");
exports.x5 = new defaultBinding5();
var defaultBinding6 = require("server");
exports.x6 = new defaultBinding6();


//// [server.d.ts]
declare class a {
}
export = a;
//// [client.d.ts]
import defaultBinding1 from "server";
export declare var x1: defaultBinding1;
export declare var x2: defaultBinding1;
export declare var x3: defaultBinding1;
export declare var x4: defaultBinding1;
export declare var x5: defaultBinding1;
export declare var x6: defaultBinding1;
