//// [tests/cases/conformance/esDecorators/esDecorators-arguments.ts] ////

//// [esDecorators-arguments.ts]
@(() => {})
@((a: any) => {})
@((a: any, b: any) => {})
@((a: any, b: any, c: any) => {})
@((a: any, b: any, c: any, ...d: any[]) => {})
class C1 {}


//// [esDecorators-arguments.js]
@(() => { })
@((a) => { })
@((a, b) => { })
@((a, b, c) => { })
@((a, b, c, ...d) => { })
class C1 {
}
