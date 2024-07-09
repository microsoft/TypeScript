//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithOverloadResolution2.ts] ////

//// [taggedTemplateStringsWithOverloadResolution2.ts]
function foo1(strs: TemplateStringsArray, x: number): string;
function foo1(strs: string[], x: number): number;
function foo1(...stuff: any[]): any {
    return undefined;
}

var a = foo1 `${1}`;
var b = foo1([], 1);

function foo2(strs: string[], x: number): number;
function foo2(strs: TemplateStringsArray, x: number): string;
function foo2(...stuff: any[]): any {
    return undefined;
}

var c = foo2 `${1}`;
var d = foo2([], 1);

//// [taggedTemplateStringsWithOverloadResolution2.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function foo1() {
    var stuff = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stuff[_i] = arguments[_i];
    }
    return undefined;
}
var a = foo1(__makeTemplateObject(["", ""], ["", ""]), 1);
var b = foo1([], 1);
function foo2() {
    var stuff = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stuff[_i] = arguments[_i];
    }
    return undefined;
}
var c = foo2(__makeTemplateObject(["", ""], ["", ""]), 1);
var d = foo2([], 1);
