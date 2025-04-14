//// [tests/cases/conformance/types/thisType/thisTypeInTaggedTemplateCall.ts] ////

//// [thisTypeInTaggedTemplateCall.ts]
class Foo {
    static m<T>(this: new () => T, strings: TemplateStringsArray | string) {
        return new this()
    }
}

Foo.m`test`;
(Foo.m)`test`;


//// [thisTypeInTaggedTemplateCall.js]
class Foo {
    static m(strings) {
        return new this();
    }
}
Foo.m `test`;
(Foo.m) `test`;
