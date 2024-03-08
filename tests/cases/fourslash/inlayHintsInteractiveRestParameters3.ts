/// <reference path="fourslash.ts" />

////function fn(x: number, y: number, a: number, b: number) {
////    return x + y + a + b;
////}
////const foo: [x: number, y: number] = [1, 2];
////fn(...foo, 3, 4);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
});
