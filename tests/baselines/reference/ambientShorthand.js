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
///<reference path="declarations.d.ts"/>
import foo, { bar } from "jquery";
import * as baz from "fs";
foo(bar, baz, boom);
