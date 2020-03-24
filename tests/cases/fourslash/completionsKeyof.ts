/// <reference path="fourslash.ts" />

////interface A { a: number; };
////interface B { a: number; b: number; };
////function f<T extends keyof A>(key: T) {}
////f("[|/*f*/|]");
////function g<T extends keyof B>(key: T) {}
////g("[|/*g*/|]");

verify.completions(
    { 
        marker: "f", 
        exact: [
            { name: "a", replacementSpan: test.ranges()[0] }
        ]
    },
    {
        marker: "g", 
        exact: [
            { name: "a", replacementSpan: test.ranges()[1] },
            { name: "b", replacementSpan: test.ranges()[1] },

        ]
    },
);
