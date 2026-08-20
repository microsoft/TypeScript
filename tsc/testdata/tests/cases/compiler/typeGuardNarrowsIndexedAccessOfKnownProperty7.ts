// @strict: true
// @target: esnext

export namespace Foo {
    export const key = Symbol();
}

export class C {
    [Foo.key]: string;

    constructor() {
        this[Foo.key] = "hello";
    }
}
