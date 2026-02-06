///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// class MyClass {
////     x = 1;
////     foo() {
////         return 1;
////     }
////     bar() {[||]
////         return 2;
////     }
////     baz() {
////         return 3;
////     }
//// }
////

verify.baselineMapCode([test.ranges()], [
`
bar() {
    return 'hello';
}
`
]);
