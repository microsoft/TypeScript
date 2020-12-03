declare module Foo {
    enum Bar {
        a = `1`,
        b = '2',
        c = '3'
    }

    export const a = 'string';
    export const b = `template`;

    export const c = Bar.a;
    export const d = Bar['b'];
    export const e = Bar[`c`];
}

Foo.a;
Foo.b;
Foo.c;
Foo.d;
Foo.e;