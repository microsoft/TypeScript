// @strict: true
// @target: esnext, es2020, es2015

function foo1(results: number[] | undefined) {
    (results ||= []).push(100);
}

function foo2(results: number[] | undefined) {
    (results ??= []).push(100);
}