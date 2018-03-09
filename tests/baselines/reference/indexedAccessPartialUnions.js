//// [indexedAccessPartialUnions.ts]
// Repro from #21975

interface Foo {
    bar: {
        baz: string;
    } | {
        qux: number;
    }
}

type ShouldBeString = Foo['bar']['baz'];

function f(foo: Foo) {
    return foo['bar']['baz']; // Error
}

function g(foo: Foo) {
    return foo.bar.baz; // Error
}

interface HasOptionalMember {
    bar?: {
        baz: string;
    }
}

type ShouldBeString2 = HasOptionalMember['bar']['baz'];


//// [indexedAccessPartialUnions.js]
"use strict";
// Repro from #21975
function f(foo) {
    return foo['bar']['baz']; // Error
}
function g(foo) {
    return foo.bar.baz; // Error
}
