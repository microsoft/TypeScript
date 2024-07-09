// @strict: true
// @target: es6

class A {
    #fooField = 3;
    #fooMethod() { };
    get #fooProp() { return 1; };
    set #fooProp(value: number) { };
    bar = 3;
    baz = 3;
}

// `keyof A` should not include '#foo*'
let k: keyof A = "bar"; // OK
k = "baz"; // OK

k = "#fooField"; // Error
k = "#fooMethod"; // Error
k = "#fooProp"; // Error

k = "fooField"; // Error
k = "fooMethod"; // Error
k = "fooProp"; // Error
