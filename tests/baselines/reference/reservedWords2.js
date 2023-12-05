//// [tests/cases/compiler/reservedWords2.ts] ////

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
function f(default: number) {}
class C { m(null: string) {} }


//// [reservedWords2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var _a = { while: 1, return: 2 },  = _a.while,  = _a.return;
var _b = { this: 1, switch: { continue: 2 } },  = _b.this,  = _b.switch.continue;
var _c = void 0;
debugger;
if ()
    ;
[1, 2];
(function () {
})( || ( = {}));
void {};
function f() { }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function (, string) { };
    return C;
}());
