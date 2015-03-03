//// [taggedTemplateStringsWithOverloadResolution1.ts]
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


//// [taggedTemplateStringsWithOverloadResolution1.js]
function foo() {
    var stuff = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stuff[_i - 0] = arguments[_i];
    }
    return undefined;
}
var a = foo([]); // number
var b = foo([], 1); // string
var c = foo([], 1, 2); // boolean
var d = foo([], 1, true); // boolean (with error)
var e = foo([], 1, "2"); // {}
var f = foo([], 1, 2, 3); // any (with error)
var u = (_a = [""], _a.raw = [""], foo(_a)); // number
var v = (_a_1 = ["", ""], _a_1.raw = ["", ""], foo(_a_1, 1)); // string
var w = (_a_2 = ["", "", ""], _a_2.raw = ["", "", ""], foo(_a_2, 1, 2)); // boolean
var x = (_a_3 = ["", "", ""], _a_3.raw = ["", "", ""], foo(_a_3, 1, true)); // boolean (with error)
var y = (_a_4 = ["", "", ""], _a_4.raw = ["", "", ""], foo(_a_4, 1, "2")); // {}
var z = (_a_5 = ["", "", "", ""], _a_5.raw = ["", "", "", ""], foo(_a_5, 1, 2, 3)); // any (with error)
var _a, _a_1, _a_2, _a_3, _a_4, _a_5;
