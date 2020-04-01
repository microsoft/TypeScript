// @strict: true
// @target: esnext, es2020, es2015

function foo (f: (a: number) => void | undefined) {
    f ??= (a => a++)
    f ||= (a => a++)
}
