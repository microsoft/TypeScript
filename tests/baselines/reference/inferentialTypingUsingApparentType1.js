//// [inferentialTypingUsingApparentType1.ts]
function foo<T extends (p: string) => number>(x: T): T {
    return undefined;
}

foo(x => x.length);

//// [inferentialTypingUsingApparentType1.js]
function foo(x) {
    return undefined;
}
foo(function (x) { return x.length; });
