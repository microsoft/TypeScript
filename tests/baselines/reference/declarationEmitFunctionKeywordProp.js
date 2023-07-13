//// [tests/cases/compiler/declarationEmitFunctionKeywordProp.ts] ////

//// [declarationEmitFunctionKeywordProp.ts]
function foo() {}
foo.null = true;

function bar() {}
bar.async = true;
bar.normal = false;

function baz() {}
baz.class = true;
baz.normal = false;

//// [declarationEmitFunctionKeywordProp.js]
function foo() { }
foo.null = true;
function bar() { }
bar.async = true;
bar.normal = false;
function baz() { }
baz.class = true;
baz.normal = false;


//// [declarationEmitFunctionKeywordProp.d.ts]
declare function foo(): void;
declare namespace foo {
    var _a: boolean;
    export { _a as null };
}
declare function bar(): void;
declare namespace bar {
    var async: boolean;
    var normal: boolean;
}
declare function baz(): void;
declare namespace baz {
    var _a: boolean;
    export var normal: boolean;
    export { _a as class };
}
