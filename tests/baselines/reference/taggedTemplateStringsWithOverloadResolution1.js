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
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
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
var u = foo(_a || (_a = __getTemplateObject([""], [""]))); // number
var v = foo(_b || (_b = __getTemplateObject(["", ""], ["", ""])), 1); // string
var w = foo(_c || (_c = __getTemplateObject(["", "", ""], ["", "", ""])), 1, 2); // boolean
var x = foo(_d || (_d = __getTemplateObject(["", "", ""], ["", "", ""])), 1, true); // boolean (with error)
var y = foo(_e || (_e = __getTemplateObject(["", "", ""], ["", "", ""])), 1, "2"); // {}
var z = foo(_f || (_f = __getTemplateObject(["", "", "", ""], ["", "", "", ""])), 1, 2, 3); // any (with error)
var _a, _b, _c, _d, _e, _f;
