//// [taggedTemplateStringsWithOverloadResolution2_ES6.ts]
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

//// [taggedTemplateStringsWithOverloadResolution2_ES6.js]
function foo1(...stuff) {
    return undefined;
}
var a = foo1 `${1}`;
var b = foo1([], 1);
function foo2(...stuff) {
    return undefined;
}
var c = foo2 `${1}`;
var d = foo2([], 1);
