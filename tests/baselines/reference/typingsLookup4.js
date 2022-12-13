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

//// [package.json]
{ "typings": "mquery" }

//// [index.tsx]
export const m = 3;

//// [a.ts]
import { j } from "jquery";
import { k } from "kquery";
import { l } from "lquery";
import { m } from "mquery";
j + k + l + m;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = require("jquery");
var kquery_1 = require("kquery");
var lquery_1 = require("lquery");
var mquery_1 = require("mquery");
jquery_1.j + kquery_1.k + lquery_1.l + mquery_1.m;
