/// <reference path="fourslash.ts" />

//// type T = [a: string, b: boolean, ...c: number[]]
//// declare function foo(f: number, ...args: T):void
//// declare function foo1(f1: number, ...args: string[]): void
//// foo(1, '', false, 1, 2)
//// foo1(1, "", "")

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
