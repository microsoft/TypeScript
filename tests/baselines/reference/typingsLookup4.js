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
import { j } from "jquery";
import { k } from "kquery";
import { l } from "lquery";
import { m } from "mquery";
j + k + l + m;
