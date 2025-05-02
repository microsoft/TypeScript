//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithOverloadResolution1.ts] ////

//// [taggedTemplateStringsWithOverloadResolution1.ts]
function foo(strs: TemplateStringsArray): number;
function foo(strs: TemplateStringsArray, x: number): string;
function foo(strs: TemplateStringsArray, x: number, y: number): boolean;
function foo(strs: TemplateStringsArray, x: number, y: string): {};
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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function foo() {
    var stuff = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stuff[_i] = arguments[_i];
    }
    return undefined;
}
var a = foo([]); // number
var b = foo([], 1); // string
var c = foo([], 1, 2); // boolean
var d = foo([], 1, true); // boolean (with error)
var e = foo([], 1, "2"); // {}
var f = foo([], 1, 2, 3); // any (with error)
var u = foo(__makeTemplateObject([""], [""])); // number
var v = foo(__makeTemplateObject(["", ""], ["", ""]), 1); // string
var w = foo(__makeTemplateObject(["", "", ""], ["", "", ""]), 1, 2); // boolean
var x = foo(__makeTemplateObject(["", "", ""], ["", "", ""]), 1, true); // boolean (with error)
var y = foo(__makeTemplateObject(["", "", ""], ["", "", ""]), 1, "2"); // {}
var z = foo(__makeTemplateObject(["", "", "", ""], ["", "", "", ""]), 1, 2, 3); // any (with error)
