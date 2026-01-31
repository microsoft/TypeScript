// @target: es2015
// @strict: false
interface Test {
    readonly [key: string]: string;
}

declare var a: Test;
a.foo = 'baz';
