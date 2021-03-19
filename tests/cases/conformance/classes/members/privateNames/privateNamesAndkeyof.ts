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

type T = keyof A     // should not include '#foo*'
