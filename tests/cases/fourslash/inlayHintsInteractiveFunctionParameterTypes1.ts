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
////     readonly c: boolean
////     d?: number
////     e(): string
////     f?(): boolean
////     g<T>(): T
////     h?<X, Y>(x: X): Y
////     <X, Y>(x: X): Y
////     [i: string]: number
//// }) => void
//// const foo5: F2 = (a) => { }

// A callable object with no other members gets turned into a function type:
//// type F3 = (a: {
////     (): 42
//// }) => void
//// const foo6: F3 = (a) => { }

////interface Thing {}
////function foo4(callback: (thing: Thing) => void) {}
////foo4(p => {})

//// type F4 = (a: {
////     [i in string]: number
//// }) => void
//// const foo5: F4 = (a) => { }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true,
    interactiveInlayHints: true,
});
