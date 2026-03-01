/// <reference path="fourslash.ts" />

//// function foo1(a: number, ...b: number[]) {}
//// foo1(1, 1, 1, 1);

//// type Args2 = [a: number, b: number]
//// declare function foo2(c: number, ...args: Args2);
//// foo2(1, 2, 3)

//// type Args3 = [number, number]
//// declare function foo3(c: number, ...args: Args3);
//// foo3(1, 2, 3)

verify.baselineInlayHints(undefined, { includeInlayParameterNameHints: "literals", interactiveInlayHints: true });
