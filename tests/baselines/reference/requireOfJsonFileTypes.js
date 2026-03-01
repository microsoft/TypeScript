//// [tests/cases/compiler/requireOfJsonFileTypes.ts] ////

//// [file1.ts]
import b = require('./b.json');
import c = require('./c.json');
import d = require('./d.json');
import e = require('./e.json');
import f = require('./f.json');
import g = require('./g.json');

let booleanLiteral: boolean, nullLiteral: null;
let stringLiteral: string;
let numberLiteral: number;

booleanLiteral = b.a;
stringLiteral = b.b;
nullLiteral = b.c;
booleanLiteral = b.d;
const stringOrNumberOrNull: string | number | null = c[0];
stringLiteral = d;
numberLiteral = e;
numberLiteral = f[0];
booleanLiteral = g[0];

//// [b.json]
{
    "a": true,
    "b": "hello",
    "c": null,
    "d": false
}

//// [c.json]
["a", null, "string"]

//// [d.json]
"dConfig"

//// [e.json]
-10

//// [f.json]
[-10, 30]

//// [g.json]
[true, false]

//// [out/b.json]
{
    "a": true,
    "b": "hello",
    "c": null,
    "d": false
}
//// [out/c.json]
["a", null, "string"]
//// [out/d.json]
"dConfig"
//// [out/e.json]
-10
//// [out/f.json]
[-10, 30]
//// [out/g.json]
[true, false]
//// [out/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b = require("./b.json");
const c = require("./c.json");
const d = require("./d.json");
const e = require("./e.json");
const f = require("./f.json");
const g = require("./g.json");
let booleanLiteral, nullLiteral;
let stringLiteral;
let numberLiteral;
booleanLiteral = b.a;
stringLiteral = b.b;
nullLiteral = b.c;
booleanLiteral = b.d;
const stringOrNumberOrNull = c[0];
stringLiteral = d;
numberLiteral = e;
numberLiteral = f[0];
booleanLiteral = g[0];


//// [out/file1.d.ts]
export {};
