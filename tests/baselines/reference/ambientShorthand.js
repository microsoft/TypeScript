//// [tests/cases/conformance/ambient/ambientShorthand.ts] ////

//// [declarations.d.ts]
declare module "jquery"
// Semicolon is optional
declare module "fs";

//// [user.ts]
///<reference path="declarations.d.ts"/>
import foo, {bar} from "jquery";
import * as baz from "fs";
foo(bar, baz);


//// [user.js]
"use strict";
///<reference path="declarations.d.ts"/>
var jquery_1 = require("jquery");
var baz = require("fs");
jquery_1["default"](jquery_1.bar, baz);
