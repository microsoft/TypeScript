// @strict: true
// @target: esnext, es2020, es2015

declare const bar: { value?: number[] } | undefined

function foo1(results: number[] | undefined) {
    (results ||= bar?.value ?? []).push(100);
}

function foo2(results: number[] | undefined) {
    (results ??= bar?.value ?? []).push(100);
}

function foo3(results: number[] | undefined) {
    (results &&= bar?.value ?? []).push(100);
}