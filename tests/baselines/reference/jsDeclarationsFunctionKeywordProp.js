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
    const _null: boolean;
    export { _null as null };
}
declare function bar(): void;
declare namespace bar {
    const async: boolean;
    const normal: boolean;
}
declare function baz(): void;
declare namespace baz {
    const _class: boolean;
    export { _class as class };
    const normal_1: boolean;
    export { normal_1 as normal };
}
