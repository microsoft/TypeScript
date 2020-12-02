// @strict: true
// @target: es6

class A {
    #foo = 3;
    bar = 3;
    baz = 3;
}

type T = keyof A     // should not include '#foo'
