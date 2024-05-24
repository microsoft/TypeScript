///<reference path="fourslash.ts"/>

// @Filename: /index.ts
//// class MyClass {[||]
////     x = 1;
////     foo() {
////         return 1;
////     }
////     bar() {
////         return 2;
////     }
//// }
////

verify.baselineMapCode([test.ranges()], [
`
x = 3;
bar() {
    return 'hello';
}
baz() {
    return 3;
}
y = 2;
`
]);