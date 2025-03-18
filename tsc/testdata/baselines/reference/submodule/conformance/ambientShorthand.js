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
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = require("jquery");
const baz = require("fs");
const boom = require("jquery");
(0, jquery_1.default)(jquery_1.bar, baz, boom);
