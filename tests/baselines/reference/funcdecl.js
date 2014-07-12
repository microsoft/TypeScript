//// [funcdecl.ts]
function simpleFunc() {
    return "this is my simple func";
}
var simpleFuncVar = simpleFunc;

function anotherFuncNoReturn() {
}
var anotherFuncNoReturnVar = anotherFuncNoReturn;

function withReturn() : string{
    return "Hello";
}
var withReturnVar = withReturn;

function withParams(a : string) : string{
    return a;
}
var withparamsVar = withParams;

function withMultiParams(a : number, b, c: Object) {
    return a;
}
var withMultiParamsVar = withMultiParams;

function withOptionalParams(a?: string) {
}
var withOptionalParamsVar = withOptionalParams;

function withInitializedParams(a: string, b0, b = 30, c = "string value") {
}
var withInitializedParamsVar = withInitializedParams;

function withOptionalInitializedParams(a: string, c: string = "hello string") {
}
var withOptionalInitializedParamsVar = withOptionalInitializedParams;

function withRestParams(a: string, ... myRestParameter : number[]) {
    return myRestParameter;
}
var withRestParamsVar = withRestParams;

function overload1(n: number) : string;
function overload1(s: string) : string;
function overload1(ns: any) {
    return ns.toString();
}
var withOverloadSignature = overload1;

function f(n: () => void) { }

module m2 {
    export function foo(n: () => void ) {
    }

}

m2.foo(() =>  {

    var b = 30;
    return b;
});


declare function fooAmbient(n: number): string;

declare function overloadAmbient(n: number): string;
declare function overloadAmbient(s: string): string;

var f2 = () => {
    return "string";
}

//// [funcdecl.js]
function simpleFunc() {
    return "this is my simple func";
}
var simpleFuncVar = simpleFunc;
function anotherFuncNoReturn() {
}
var anotherFuncNoReturnVar = anotherFuncNoReturn;
function withReturn() {
    return "Hello";
}
var withReturnVar = withReturn;
function withParams(a) {
    return a;
}
var withparamsVar = withParams;
function withMultiParams(a, b, c) {
    return a;
}
var withMultiParamsVar = withMultiParams;
function withOptionalParams(a) {
}
var withOptionalParamsVar = withOptionalParams;
function withInitializedParams(a, b0, b, c) {
    if (b === void 0) { b = 30; }
    if (c === void 0) { c = "string value"; }
}
var withInitializedParamsVar = withInitializedParams;
function withOptionalInitializedParams(a, c) {
    if (c === void 0) { c = "hello string"; }
}
var withOptionalInitializedParamsVar = withOptionalInitializedParams;
function withRestParams(a) {
    var myRestParameter = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        myRestParameter[_i - 1] = arguments[_i];
    }
    return myRestParameter;
}
var withRestParamsVar = withRestParams;
function overload1(ns) {
    return ns.toString();
}
var withOverloadSignature = overload1;
function f(n) {
}
var m2;
(function (m2) {
    function foo(n) {
    }
    m2.foo = foo;
})(m2 || (m2 = {}));
m2.foo(function () {
    var b = 30;
    return b;
});
var f2 = function () {
    return "string";
};


//// [funcdecl.d.ts]
