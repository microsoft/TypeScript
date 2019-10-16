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
var u = foo(templateObject_5381_1 || (templateObject_5381_1 = __makeTemplateObject([""], [""]))); // number
var v = foo(templateObject_193515161_1 || (templateObject_193515161_1 = __makeTemplateObject(["", ""], ["", ""])), 1); // string
var w = foo(templateObject_802426797_1 || (templateObject_802426797_1 = __makeTemplateObject(["", "", ""], ["", "", ""])), 1, 2); // boolean
var x = foo(templateObject_802426797_2 || (templateObject_802426797_2 = __makeTemplateObject(["", "", ""], ["", "", ""])), 1, true); // boolean (with error)
var y = foo(templateObject_802426797_3 || (templateObject_802426797_3 = __makeTemplateObject(["", "", ""], ["", "", ""])), 1, "2"); // {}
var z = foo(templateObject_401516609_1 || (templateObject_401516609_1 = __makeTemplateObject(["", "", "", ""], ["", "", "", ""])), 1, 2, 3); // any (with error)
var templateObject_5381_1, templateObject_193515161_1, templateObject_802426797_1, templateObject_802426797_2, templateObject_802426797_3, templateObject_401516609_1;
