//// [tests/cases/compiler/requireJsonInCommonJS.ts] ////

//// [data.json]
{
    "a": "a",
    "b": 42
}

//// [m.ts]
const data = require("./data");
const a = data.a;
const b = data.b;

//// [node.d.ts]
interface NodeRequireFunction {
    (id: string): any;
}
interface NodeRequire extends NodeRequireFunction {
}
declare var require: NodeRequire;

//// [m.js]
var data = require("./data");
var a = data.a;
var b = data.b;
