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
exports.__esModule = true;
var b = require("./b.json");
var c = require("./c.json");
var d = require("./d.json");
var e = require("./e.json");
var f = require("./f.json");
var g = require("./g.json");
var booleanLiteral, nullLiteral;
var stringLiteral;
var numberLiteral;
booleanLiteral = b.a;
stringLiteral = b.b;
nullLiteral = b.c;
booleanLiteral = b.d;
var stringOrNumberOrNull = c[0];
stringLiteral = d;
numberLiteral = e;
numberLiteral = f[0];
booleanLiteral = g[0];
