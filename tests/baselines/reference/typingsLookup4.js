//// [tests/cases/conformance/typings/typingsLookup4.ts] ////

//// [package.json]
{ "typings": "jquery.d.ts" }

//// [jquery.d.ts]
export const j: number;

//// [package.json]
{ "typings": "kquery" }

//// [kquery.d.ts]
export const k: number;

//// [package.json]
{ "typings": "lquery" }

//// [lquery.ts]
export const l = 2;

//// [a.ts]
import { j } from "jquery";
import { k } from "kquery";
import { l } from "lquery";
j + k + l;


//// [lquery.js]
"use strict";
exports.l = 2;
//// [a.js]
"use strict";
var jquery_1 = require("jquery");
var kquery_1 = require("kquery");
var lquery_1 = require("lquery");
jquery_1.j + kquery_1.k + lquery_1.l;
