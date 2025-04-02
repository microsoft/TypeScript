//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionKeywordProp.ts] ////

//// [source.js]
function foo() {}
foo.null = true;

function bar() {}
bar.async = true;
bar.normal = false;

function baz() {}
baz.class = true;
baz.normal = false;

//// [source.js]
function foo() { }
foo.null = true;
function bar() { }
bar.async = true;
bar.normal = false;
function baz() { }
baz.class = true;
baz.normal = false;


//// [source.d.ts]
declare function foo(): void;
declare namespace foo {
    let _null: boolean;
    export { _null as null };
}
declare function bar(): void;
declare namespace bar {
    let async: boolean;
    let normal: boolean;
}
declare function baz(): void;
declare namespace baz {
    let _class: boolean;
    export { _class as class };
    let normal_1: boolean;
    export { normal_1 as normal };
}
