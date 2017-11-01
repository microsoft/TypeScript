//// [tests/cases/conformance/ambient/ambientShorthand.ts] ////

//// [declarations.d.ts]
declare module "jquery"
// Semicolon is optional
declare module "fs";

//// [user.ts]
///<reference path="declarations.d.ts"/>
import foo, {bar} from "jquery";
import * as baz from "fs";
import boom = require("jquery");
foo(bar, baz, boom);


//// [user.js]
"use strict";
function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
///<reference path="declarations.d.ts"/>
var jquery_1 = __importDefault(require("jquery"));
var baz = __importStar(require("fs"));
var boom = require("jquery");
jquery_1["default"](jquery_1.bar, baz, boom);
