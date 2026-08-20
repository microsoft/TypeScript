// @strict: true
// @target: esnext, es2021, es2020, es2015

function foo1 (f?: (a: number) => void) {
    f ??= (a => a)
    f(42)
}

function foo2 (f?: (a: number) => void) {
    f ||= (a => a)
    f(42)
}

function foo3 (f?: (a: number) => void) {
    f &&= (a => a)
    f(42)
}

function bar1 (f?: (a: number) => void) {
    f ??= (f.toString(), (a => a))
    f(42)
}

function bar2 (f?: (a: number) => void) {
    f ||= (f.toString(), (a => a))
    f(42)
}

function bar3 (f?: (a: number) => void) {
    f &&= (f.toString(), (a => a))
    f(42)
}
