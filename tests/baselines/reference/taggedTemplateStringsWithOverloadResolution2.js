//// [taggedTemplateStringsWithOverloadResolution2.ts]

function foo1(strs: TemplateStringsArray, x: number): string;
function foo1(strs: string[], x: number): number;
function foo1(...stuff: any[]): any {
    return undefined;
}

var a = foo1 `${1}`;          // string
var b = foo1([], 1);          // number

function foo2(strs: string[], x: number): number;
function foo2(strs: TemplateStringsArray, x: number): string;
function foo2(...stuff: any[]): any {
    return undefined;
}

var c = foo2 `${1}`;          // number
var d = foo2([], 1);          // number

//// [taggedTemplateStringsWithOverloadResolution2.js]
function foo1() {
    var stuff = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stuff[_i - 0] = arguments[_i];
    }
    return undefined;
}
var a = foo1 "" + 1; // string
var b = foo1([], 1); // number
function foo2() {
    var stuff = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        stuff[_i - 0] = arguments[_i];
    }
    return undefined;
}
var c = foo2 "" + 1; // number
var d = foo2([], 1); // number
