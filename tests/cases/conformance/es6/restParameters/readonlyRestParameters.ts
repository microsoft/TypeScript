// @strict: true
// @declaration: true

function f0(a: string, b: string) {
    f0(a, b);
    f1(a, b);
    f2(a, b);
}

function f1(...args: readonly string[]) {
    f0(...args);  // Error
    f1('abc', 'def');
    f1('abc', ...args);
    f1(...args);
}

function f2(...args: readonly [string, string]) {
    f0(...args);
    f1('abc', 'def');
    f1('abc', ...args);
    f1(...args);
    f2('abc', 'def');
    f2('abc', ...args);  // Error
    f2(...args);
}

function f4(...args: readonly string[]) {
    args[0] = 'abc';  // Error
}
