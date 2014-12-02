//// [taggedTemplateStringsWithOverloadResolution1_ES6.ts]
function foo(strs: string[]): number;
function foo(strs: string[], x: number): string;
function foo(strs: string[], x: number, y: number): boolean;
function foo(strs: string[], x: number, y: string): {};
function foo(...stuff: any[]): any {
    return undefined;
}

var a = foo([]);             // number
var b = foo([], 1);          // string
var c = foo([], 1, 2);       // boolean
var d = foo([], 1, true);    // boolean (with error)
var e = foo([], 1, "2");     // {}
var f = foo([], 1, 2, 3);    // any (with error)

var u = foo ``;              // number
var v = foo `${1}`;          // string
var w = foo `${1}${2}`;      // boolean
var x = foo `${1}${true}`;   // boolean (with error)
var y = foo `${1}${"2"}`;    // {}
var z = foo `${1}${2}${3}`;  // any (with error)


//// [taggedTemplateStringsWithOverloadResolution1_ES6.js]
function foo() {
    var stuff = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        stuff[_a - 0] = arguments[_a];
    }
    return undefined;
}
var a = foo([]); // number
var b = foo([], 1); // string
var c = foo([], 1, 2); // boolean
var d = foo([], 1, true); // boolean (with error)
var e = foo([], 1, "2"); // {}
var f = foo([], 1, 2, 3); // any (with error)
var u = foo ``; // number
var v = foo `${1}`; // string
var w = foo `${1}${2}`; // boolean
var x = foo `${1}${true}`; // boolean (with error)
var y = foo `${1}${"2"}`; // {}
var z = foo `${1}${2}${3}`; // any (with error)
