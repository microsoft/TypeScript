///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// class MyClass {[||]
//// }
////

verify.baselineMapCode([test.ranges()], [
`
if (false) {
    return "hello";
}
`
]);