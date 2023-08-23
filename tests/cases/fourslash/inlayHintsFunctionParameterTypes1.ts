/// <reference path="fourslash.ts" />

//// type F1 = (a: string, b: number) => void
//// const f1: F1 = (a, b) => { }
//// const f2: F1 = (a, b: number) => { }

//// function foo1 (cb: (a: string) => void) {}
//// foo1((a) => { })

//// function foo2 (cb: (a: Exclude<1 | 2 | 3, 1>) => void) {}
//// foo2((a) => { })

//// function foo3 (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
//// foo3(a => {
////     a(d => {})
//// })

//// function foo4<T>(v: T, a: (v: T) => void) {}
//// foo4(1, a => { })

//// type F2 = (a: {
////     a: number
////     b: string
//// }) => void
//// const foo5: F2 = (a) => { }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
