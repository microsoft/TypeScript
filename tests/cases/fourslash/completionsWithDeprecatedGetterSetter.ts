/// <reference path="fourslash.ts" />

// Tests that @deprecated on getter/setter pairs correctly marks the property as deprecated in completions.
// Regression from #41941, reported in #62965.

//// class Test {
////     /** @deprecated */
////     public get test1() { return 0; }
////     public set test1(_value: number) {}
////
////     public get test2() { return 0; }
////     /** @deprecated */
////     public set test2(_value: number) {}
////
////     /** @deprecated */
////     public get test3() { return 0; }
////     /** @deprecated */
////     public set test3(_value: number) {}
////
////     public get test4() { return 0; }
////     public set test4(_value: number) {}
//// }
////
//// const t = new Test();
//// t./*1*/;

verify.completions({
    marker: "1",
    includes: [
        { name: "test1", kind: "getter", kindModifiers: "public,deprecated", sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority) },
        { name: "test2", kind: "getter", kindModifiers: "public,deprecated", sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority) },
        { name: "test3", kind: "getter", kindModifiers: "public,deprecated", sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority) },
        { name: "test4", kind: "getter", kindModifiers: "public", sortText: completion.SortText.LocationPriority },
    ],
});
