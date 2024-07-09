//// [tests/cases/compiler/inferentialTypingUsingApparentType2.ts] ////

//// [inferentialTypingUsingApparentType2.ts]
function foo<T extends { m(p: string): number }>(x: T): T {
    return undefined;
}

foo({ m(x) { return x.length } });

//// [inferentialTypingUsingApparentType2.js]
function foo(x) {
    return undefined;
}
foo({ m: function (x) { return x.length; } });
