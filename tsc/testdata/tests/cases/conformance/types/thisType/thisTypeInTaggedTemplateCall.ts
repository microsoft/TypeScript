// @target: esnext

class Foo {
    static m<T>(this: new () => T, strings: TemplateStringsArray | string) {
        return new this()
    }
}

Foo.m`test`;
(Foo.m)`test`;
