// @strict: true
// @target: esnext, es2021, es2020, es2015

function foo1(results: number[] | undefined, results1: number[] | undefined) {
    (results ||= (results1 ||= [])).push(100);
}

function foo2(results: number[] | undefined, results1: number[] | undefined) {
    (results ??= (results1 ??= [])).push(100);
}

function foo3(results: number[] | undefined, results1: number[] | undefined) {
    (results &&= (results1 &&= [])).push(100);
}
