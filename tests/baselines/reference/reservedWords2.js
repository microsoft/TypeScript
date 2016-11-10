//// [reservedWords2.ts]
import while = require("dfdf");
import * as  while from "foo"

var typeof = 10;
function throw() {}
module void {}
var {while, return} = { while: 1, return: 2 };
var {this, switch: { continue} } = { this: 1, switch: { continue: 2 }};
var [debugger, if] = [1, 2];
enum void {}




//// [reservedWords2.js]
"use strict";
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
require();
while ( = require("dfdf"))
    ;
while (from)
    "foo";
var ;
typeof ;
10;
function () { }
throw function () { };
module;
void {};
var _a = { "while": 1, "return": 2 },  = _a["while"],  = _a["return"];
var _b = { "this": 1, "switch": { "continue": 2 } },  = _b["this"],  = _b["switch"]["continue"];
var _c = __read(void 0, 0);
debugger;
if ()
    ;
[1, 2];
(function () {
})( || ( = {}));
void {};
