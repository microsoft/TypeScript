//// [optionalProperties02.ts]
interface Foo {
    a?: string;
    b: string;
}

<Foo>{ a: undefined };

//// [optionalProperties02.js]
({ a: undefined });


//// [optionalProperties02.d.ts]
interface Foo {
    a?: string;
    b: string;
}
