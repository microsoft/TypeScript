/// <reference path='fourslash.ts'/>



//// {
////     type Foo = { a: "a" | "c" };
////     type Bar = { a: "a" | "b" };
////     const obj/*o1*/: Foo & Bar = { a: "a" };
//// }
//// {
////     type Foo = { a: "c" };
////     type Bar = { a: "b" };
////     const obj/*o2*/: Foo & Bar = { a: "" };
//// }
//// {
////     type Foo = { a: "c" };
////     type Bar = { a: "b" };
////     type Never = Foo & Bar;
////     const obj/*o3*/: Never = { a: "" };
//// }

verify.baselineQuickInfo({ "o1": [0, 1], "o2": 0, "o3": 0 });