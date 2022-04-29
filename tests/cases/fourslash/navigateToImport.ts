/// <reference path="fourslash.ts" />

// @Filename: library.ts
////[|export function foo() {}|]
////[|export function bar() {}|]
// @Filename: user.ts
////import {foo, [|bar as baz|]} from './library';

const [r0, r1, r2] = test.ranges();
verify.navigateTo(
    { pattern: "foo", expected: [{ name: "foo", kind: "function", kindModifiers: "export", range: r0 }] },
    { pattern: "bar", expected: [{ name: "bar", kind: "function", kindModifiers: "export", range: r1 }] },
    { pattern: "baz", expected: [{ name: "baz", kind: "alias", range: r2 }] },
);
