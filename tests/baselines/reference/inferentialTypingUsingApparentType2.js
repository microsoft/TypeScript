//// [tests/cases/compiler/inferentialTypingUsingApparentType2.ts] ////

//// [inferentialTypingUsingApparentType2.ts]
function foo<T extends { m(p: string): number }>(x: T): T {
    return undefined;
}

foo({ m(x) { return x.length } });

//// [inferentialTypingUsingApparentType2.js]
"use strict";
function foo(x) {
    return undefined;
}
foo({ m(x) { return x.length; } });
