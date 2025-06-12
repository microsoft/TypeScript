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
throw () => { };
module;
void {};
var { while: , return:  } = { while: 1, return: 2 };
var { this: , switch: { continue:  } } = { this: 1, switch: { continue: 2 } };
var [];
debugger;
if ()
    ;
[1, 2];
(function () {
})( || ( = {}));
void {};
function f() { }
class C {
    m(, string) { }
}
