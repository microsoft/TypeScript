/// <reference path="fourslash.ts" />

////interface Ctx {
////    foo(): {
////        x: number
////    };
////}
////
////declare function wrap(cb: (this: Ctx) => any): void;
////
////wrap(function () {
////    const xs = this.foo();
////    return xs./*inReturn*/
////});
////
////wrap(function () {
////    const xs = this.foo();
////    const y = xs./*involvedInReturn*/
////    return y;
////});

verify.completions(
    {
        marker: "inReturn",
        exact: ["x"],
    },
    {
        marker: "involvedInReturn",
        exact: ["x"],
    },
);
