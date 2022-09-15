//// [parseInvalidNullableTypes.ts]
function f1(a: string): a is string? {
    return true;
}

function f2(a: string): a is ?string {
    return true;
}

function f3(a: string?) {}
function f4(a: number?) {}

function f5(a: ?string) {}
function f6(a: ?number) {}

const a = 1 as any?;
const b: number? = 1;

const c = 1 as ?any;
const d: ?number = 1;

const e: unknown?;
const f: never?;
const g: void?;
const h: undefined?;


//// [parseInvalidNullableTypes.js]
function f1(a) {
    return true;
}
function f2(a) {
    return true;
}
function f3(a) { }
function f4(a) { }
function f5(a) { }
function f6(a) { }
var a = 1;
var b = 1;
var c = 1;
var d = 1;
var e;
var f;
var g;
var h;
