/// <reference path="fourslash.ts" />

////interface A { a: number; };
////interface B { a: number; b: number; };
////function f<T extends keyof A>(key: T) {}
////f("/*f*/");
////function g<T extends keyof B>(key: T) {}
////g("/*g*/");

verify.completions(
    { marker: "f", exact: "a" },
    { marker: "g", exact: ["a", "b"] },
);
