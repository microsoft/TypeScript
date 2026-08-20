// @target: es2015
interface Foo {
    f(): string;
}

interface Bar extends Foo {
    f(key: string): string;
}
